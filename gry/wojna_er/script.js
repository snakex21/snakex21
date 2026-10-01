const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// --- Config & Stats ---
const GAME_WIDTH = 1200; // Virtual width
const GAME_HEIGHT = 600; // Virtual height
const GROUND_Y = 450;
const BASE_OFFSET = 100;
const STEP_MS = 1000 / 60;
let accumulator = 0;
let incomeElapsed = 0;
let enemyElapsed = 0;
let uiElapsed = 0;
const ARMY_LIMIT = 14;
const TRAINING_MS = 1200;
const ERA_INCOME = [7, 20, 65, 220];

const ERAS = [
    {
        name: "Epoka Kamienia",
        bg: "linear-gradient(to bottom, #87CEEB 0%, #e0f7fa 60%, #4caf50 60%, #388e3c 100%)",
        units: [
            { id: 'clubman', name: 'Maczugowiec', cost: 15, hp: 50, dmg: 10, range: 30, speed: 1, reload: 60, color: '#8d6e63', type: 'melee' },
            { id: 'slinger', name: 'Procarz', cost: 25, hp: 30, dmg: 8, range: 200, speed: 1, reload: 90, color: '#a1887f', type: 'ranged' },
            { id: 'dino', name: 'Jeździec Dino', cost: 40, hp: 80, dmg: 15, range: 30, speed: 1.5, reload: 50, color: '#4e342e', type: 'melee' }
        ],
        evolveCost: 500
    },
    {
        name: "Średniowiecze",
        bg: "linear-gradient(to bottom, #1a237e 0%, #3949ab 60%, #2e7d32 60%, #1b5e20 100%)",
        units: [
            { id: 'knight', name: 'Rycerz', cost: 50, hp: 120, dmg: 25, range: 30, speed: 1.2, reload: 50, color: '#9e9e9e', type: 'melee' },
            { id: 'archer', name: 'Łucznik', cost: 75, hp: 60, dmg: 20, range: 300, speed: 1.2, reload: 80, color: '#8bc34a', type: 'ranged' },
            { id: 'catapult', name: 'Katapulta', cost: 120, hp: 50, dmg: 60, range: 400, speed: 0.5, reload: 150, color: '#5d4037', type: 'ranged' }
        ],
        evolveCost: 1500
    },
    {
        name: "Współczesność",
        bg: "linear-gradient(to bottom, #607d8b 0%, #90a4ae 60%, #546e7a 60%, #37474f 100%)",
        units: [
            { id: 'marine', name: 'Żołnierz', cost: 150, hp: 250, dmg: 50, range: 250, speed: 1.5, reload: 10, color: '#2e7d32', type: 'ranged' },
            { id: 'tank', name: 'Czołg', cost: 400, hp: 800, dmg: 150, range: 350, speed: 0.8, reload: 120, color: '#3e2723', type: 'ranged' },
            { id: 'sniper', name: 'Snajper', cost: 250, hp: 100, dmg: 100, range: 500, speed: 1.0, reload: 100, color: '#1b5e20', type: 'ranged' }
        ],
        evolveCost: 4000
    },
    {
        name: "Przyszłość",
        bg: "linear-gradient(to bottom, #000000 0%, #1a237e 60%, #311b92 60%, #000000 100%)",
        units: [
            { id: 'mech', name: 'Mech', cost: 1000, hp: 2000, dmg: 300, range: 50, speed: 2, reload: 30, color: '#00bcd4', type: 'melee' },
            { id: 'hover', name: 'Hover Tank', cost: 2000, hp: 1500, dmg: 500, range: 500, speed: 2.5, reload: 60, color: '#e040fb', type: 'ranged' },
            { id: 'drone', name: 'Laser Drone', cost: 1500, hp: 800, dmg: 100, range: 200, speed: 3.0, reload: 20, color: '#ffeb3b', type: 'melee' }
        ],
        evolveCost: Infinity
    }
];

// Roles describe actual damage rules, not just a label on the recruitment card.
const UNIT_ROLES = {
    clubman: ['guard', 'Osłona · odporny na ostrzał'], slinger: ['volley', 'Ostrzał · kontra szturm'], dino: ['pierce', 'Szturm · przełamuje osłonę'],
    knight: ['guard', 'Osłona · odporny na ostrzał'], archer: ['volley', 'Ostrzał · kontra oblężenie'], catapult: ['pierce', 'Oblężenie · kontra osłona'],
    marine: ['volley', 'Ostrzał · kontra snajper'], tank: ['guard', 'Pancerz · osłania piechotę'], sniper: ['pierce', 'Przebicie · kontra pancerz'],
    mech: ['guard', 'Pancerz · osłania wsparcie'], hover: ['volley', 'Ostrzał · kontra drony'], drone: ['pierce', 'Przebicie · kontra mechy']
};
ERAS.forEach((era, index) => era.units.forEach(def => {
    [def.role, def.roleLabel] = UNIT_ROLES[def.id]; def.era = index;
}));
// The future drone fires its visible laser, rather than dealing invisible melee damage at range.
ERAS[3].units[2].type = 'ranged';

// --- Game State ---
let state = {
    elapsed: 0,
    training: {player: 0, enemy: 0},
    gold: 100,
    xp: 0,
    era: 0,
    playerHP: 500,
    enemyHP: 500,
    maxHP: 500,
    enemyMaxHP: 500,
    units: [], // Both player and enemy
    projectiles: [],
    particles: [],
    gameOver: false,
    started: false,
    paused: true,
    enemyGold: 100,
    enemyEra: 0,
    enemyXP: 0,
    lastTime: null,
    turret: {
        level: 0, // 0 = none
        cost: 100,
        dmg: 20,
        range: 300,
        cooldown: 0,
        maxCooldown: 60
    }
};

// --- Classes ---

class Unit {
    constructor(def, team) { // team: 'player' or 'enemy'
        this.def = def;
        this.team = team;
        this.x = team === 'player' ? BASE_OFFSET : GAME_WIDTH - BASE_OFFSET;
        this.y = GROUND_Y;
        this.hp = def.hp;
        this.maxHp = def.hp;

        // Buff Enemy HP
        if (team === 'enemy') {
            this.hp *= 1.2;
            this.maxHp *= 1.2;
        }

        this.cooldown = 0;
        this.state = 'walk'; // walk, idle, attack
        this.target = null;
        this.attackAnim = 0; // 0 to 1 for bump animation
        this.hitFlash = 0;
        this.walkFrame = 0;
    }

    update() {
        if (this.hp <= 0) return;

        // Find target
        this.target = null;
        let closestDist = Infinity;

        // Look for units
        for (let u of state.units) {
            if (u.team !== this.team && u.hp > 0) {
                const dist = Math.abs(u.x - this.x);
                if (dist < this.def.range && dist < closestDist) {
                    closestDist = dist;
                    this.target = u;
                }
            }
        }

        // Look for base if no unit
        if (!this.target) {
            const baseX = this.team === 'player' ? GAME_WIDTH - 50 : 50;
            const distToBase = Math.abs(baseX - this.x);
            if (distToBase < this.def.range) {
                this.target = { type: 'base', x: baseX };
            }
        }

        // Action
        if (this.target) {
            this.state = 'attack';
            if (this.cooldown <= 0) {
                this.attack();
                this.cooldown = this.def.reload;
                this.attackAnim = 1; // Start animation
            }
        } else {
            this.state = 'walk';
            const dir = this.team === 'player' ? 1 : -1;
            const ahead = state.units.filter(u => u !== this && u.team === this.team && u.hp > 0 && u.def.range <= this.def.range && (u.x - this.x) * dir > 0);
            const room = ahead.reduce((space, u) => Math.min(space, (u.x - this.x) * dir - 26), Infinity);
            const step = Math.max(0, Math.min(this.def.speed, room));
            this.x += step * dir;
            if (step > 0) this.walkFrame += step / 10;
            else this.state = 'idle';
        }

        if (this.hitFlash > 0) this.hitFlash--;
        if (this.cooldown > 0) this.cooldown--;
        if (this.attackAnim > 0) this.attackAnim -= 0.1; // Decay animation
    }

    attack() {
        if (this.def.type === 'melee') {
            if (this.target.type === 'base') {
                damageBase(this.team, this.def.dmg, this.def);
                addParticle(this.target.x, GROUND_Y - 50, 'impact', 20);
            } else {
                damageUnit(this.target, this.def.dmg, this.team, this.def);
            }
        } else {
            // Ranged
            const targetX = this.target.x || (this.team === 'player' ? GAME_WIDTH - 50 : 50);
            state.projectiles.push(new Projectile(this.x, this.y - 30, targetX, GROUND_Y - 30, this.def.dmg, this.team, this.def));
        }
    }

    draw(ctx) { drawUnitArt(ctx, this); }

}

class Projectile {
    constructor(x, y, tx, ty, dmg, team, def = null) {
        this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.dmg = dmg;
        this.def = def;
        this.team = team;
        this.speed = 10;
        this.active = true;

        const angle = Math.atan2(ty - y, tx - x);
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
    }

    update() {
        if (!this.active) return;
        const previousX = this.x;
        this.x += this.vx;
        this.y += this.vy;
        // Test the travelled segment, not the target's old position. Moving enemies
        // must not become immune to slow/long-range shots.
        const targets = state.units.filter(u => u.team !== this.team && u.hp > 0 &&
            u.x >= Math.min(previousX, this.x) - 10 && u.x <= Math.max(previousX, this.x) + 10);
        targets.sort((a, b) => Math.abs(a.x - previousX) - Math.abs(b.x - previousX));
        if (targets.length) { this.hit(targets[0]); return; }
        if ((this.team === 'player' && this.x >= GAME_WIDTH - 50) ||
            (this.team === 'enemy' && this.x <= 50)) { this.hit(); return; }
        // A missed shot expires at its aim point; it does not damage a remote base.
        if ((this.vx >= 0 && this.x >= this.tx) || (this.vx < 0 && this.x <= this.tx)) this.active = false;
    }

    hit(unit) {
        if (!this.active) return;
        this.active = false;
        if (unit) damageUnit(unit, this.dmg, this.team, this.def);
        else damageBase(this.team, this.dmg, this.def);
        addParticle(this.x, this.y, 'impact', 14);
    }

    draw(ctx) { drawShotArt(ctx, this); }

}

class Particle {
    constructor(x, y, text, life) {
        this.x = x;
        this.y = y;
        this.text = text;
        this.life = life;
        this.maxLife = life;
    }
    update() { this.life--; this.y -= 1; }
    draw(ctx) { drawImpactArt(ctx, this); }

}

// --- Functions ---

function damageFor(amount, attacker, target) {
    if (attacker?.role === 'pierce' && target.def.role === 'guard') return amount * 1.5;
    if (attacker?.role === 'volley' && target.def.role === 'pierce') return amount * 1.5;
    if (attacker?.role === 'volley' && target.def.role === 'guard') return amount * 0.65;
    return amount;
}
function damageUnit(target, amount, team, def) {
    if (target.hp <= 0) return;
    target.hp -= damageFor(amount, def, target);
    target.hitFlash = 8;
    const xpKey = team === 'player' ? 'xp' : 'enemyXP';
    const goldKey = team === 'player' ? 'gold' : 'enemyGold';
    const experience = 1 + (def?.era || 0) * 2;
    state[xpKey] += 2 * experience;
    if (target.hp <= 0) {
        state[xpKey] += 20 * experience;
        state[goldKey] += Math.ceil(target.def.cost * 0.2);
        if (team === 'player') addParticle(target.x, target.y - 65, `+${20 * experience} XP`, 45);
    }
    addParticle(target.x, target.y - 28, 'impact', 14);
}
function damageBase(team, amount, def) {
    // Fortifications resist small arms. Siege units make a deliberate push worthwhile.
    const siege = ['catapult', 'tank', 'hover'].includes(def?.id) ? 1.5 : 1;
    state[team === 'player' ? 'enemyHP' : 'playerHP'] -= amount * 0.22 * siege;
}
function canRecruit(team) {
    const units = state.units.filter(u => u.team === team && u.hp > 0);
    const spawn = team === 'player' ? BASE_OFFSET : GAME_WIDTH - BASE_OFFSET;
    return state.training[team] <= 0 && units.length < ARMY_LIMIT && !units.some(u => Math.abs(u.x - spawn) < 26);
}

function isRunning() { return state.started && !state.paused && !state.gameOver; }

function init() {
    resize();
    window.addEventListener('resize', resize);
    document.getElementById('start-btn').addEventListener('click', startGame);
    document.getElementById('pause-btn').addEventListener('click', togglePause);
    document.getElementById('resume-btn').addEventListener('click', togglePause);
    document.getElementById('turret-btn').addEventListener('click', buyTurret);
    document.getElementById('evolve-btn').addEventListener('click', evolve);
    document.addEventListener('visibilitychange', () => {
        if (document.hidden && isRunning()) setPaused(true);
        state.lastTime = null; accumulator = 0;
    });
    document.addEventListener('keydown', event => {
        if (event.repeat || event.altKey || event.ctrlKey || event.metaKey ||
            event.target?.matches?.('input, textarea, select, [contenteditable="true"]')) return;
        if (event.key?.toLowerCase() === 'p') { event.preventDefault(); togglePause(); }
        const slot = ['1', '2', '3'].indexOf(event.key);
        if (slot >= 0 && isRunning()) { event.preventDefault(); spawnUnit(ERAS[state.era].units[slot].id, 'player'); }
    });
    updateUI();
    requestAnimationFrame(loop);
}

function startGame() {
    if (state.started) return;
    state.started = true;
    document.getElementById('start-screen').classList.add('hidden');
    setPaused(false);
    canvas.focus();
}
function setPaused(paused) {
    if (!state.started || state.gameOver) return;
    state.paused = paused;
    state.lastTime = null; accumulator = 0;
    document.getElementById('pause-screen').classList.toggle('hidden', !paused);
    document.getElementById('pause-btn').textContent = paused ? 'Wznów (P)' : 'Pauza (P)';
    updateUI();
    if (paused) document.getElementById('resume-btn').focus();
    else canvas.focus();
}
function togglePause() { setPaused(!state.paused); }

function resize() {
    const bounds = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(bounds.width));
    canvas.height = Math.max(1, Math.round(bounds.height));
}

function spawnUnit(unitId, team) {
    if (!isRunning() || !canRecruit(team)) return;
    const era = team === 'player' ? state.era : state.enemyEra;
    const unitDef = ERAS[era].units.find(u => u.id === unitId);

    if (!unitDef) return;

    if (team === 'player') {
        if (state.gold >= unitDef.cost) {
            state.gold -= unitDef.cost;
            state.units.push(new Unit(unitDef, 'player'));
            state.training.player = TRAINING_MS;
            updateUI();
        }
    } else {
        if (state.enemyGold >= unitDef.cost) {
            state.enemyGold -= unitDef.cost;
            state.units.push(new Unit(unitDef, 'enemy'));
            state.training.enemy = TRAINING_MS;
        }
    }
}

function evolve() {
    if (!isRunning()) return;
    const nextEra = ERAS[state.era + 1];
    if (nextEra && state.xp >= ERAS[state.era].evolveCost) {
        state.xp -= ERAS[state.era].evolveCost;
        state.era++;
        state.maxHP += 500;
        state.playerHP += 500; // Heal on evolve
        updateUI();
        addParticle(BASE_OFFSET, GROUND_Y - 100, "EWOLUCJA!", 100);
    }
}

function buyTurret() {
    if (!isRunning()) return;
    if (state.turret.level < 3 && state.gold >= state.turret.cost) {
        state.gold -= state.turret.cost;
        state.turret.level++;
        state.turret.cost = Math.floor(state.turret.cost * 1.5);
        state.turret.dmg += 10;
        state.turret.range += 50;
        updateUI();
        addParticle(BASE_OFFSET, GROUND_Y - 150, "WIEŻYCZKA UP!", 60);
    }
}

function updateTurret() {
    if (state.turret.level === 0) return;

    if (state.turret.cooldown > 0) {
        state.turret.cooldown--;
        return;
    }

    // Find target
    let target = null;
    let closest = Infinity;

    for (let u of state.units) {
        if (u.team === 'enemy' && u.hp > 0) {
            const dist = u.x - BASE_OFFSET; // Distance from base
            if (dist < state.turret.range && dist < closest) {
                closest = dist;
                target = u;
            }
        }
    }

    if (target) {
        // Shoot
        state.projectiles.push(new Projectile(BASE_OFFSET, GROUND_Y - 120, target.x, target.y - 20, state.turret.dmg * (state.era + 1), 'player'));
        state.turret.cooldown = state.turret.maxCooldown;
    }
}

function enemyAI() {
    if (!isRunning()) return;

    // Evolve Logic
    const nextEra = ERAS[state.enemyEra + 1];
    const enemyEvolveCost = ERAS[state.enemyEra].evolveCost; // Both sides pay the same XP cost

    if (nextEra && state.enemyXP >= enemyEvolveCost) {
        state.enemyXP -= enemyEvolveCost;
        state.enemyEra++;
        state.enemyMaxHP += 500;
        state.enemyHP += 500;
    }

    const own = state.units.filter(u => u.team === 'enemy' && u.hp > 0);
    const opposition = state.units.filter(u => u.team === 'player' && u.hp > 0);
    const counts = role => opposition.filter(u => u.def.role === role).length;
    const needGuard = !own.some(u => u.def.role === 'guard');
    const threat = ['guard', 'volley', 'pierce'].sort((a, b) => counts(b) - counts(a))[0];
    const desired = needGuard ? 'guard' : {guard: 'pierce', volley: 'guard', pierce: 'volley'}[threat];
    const choices = [...ERAS[state.enemyEra].units].sort((a, b) =>
        (b.role === desired) - (a.role === desired) || a.cost - b.cost);
    // Save for the needed counter briefly; under pressure always choose an affordable defender.
    const danger = opposition.some(u => u.x > GAME_WIDTH - 360);
    const preferred = choices[0];
    const affordable = choices.filter(u => u.cost <= state.enemyGold);
    if (affordable.length && (danger || preferred.cost <= state.enemyGold || own.length < 2)) {
        let choice = preferred.cost <= state.enemyGold ? preferred : affordable[0];
        if (!needGuard && !danger && affordable.length > 1 && Math.random() < 0.2) {
            choice = affordable[Math.floor(Math.random() * affordable.length)];
        }
        spawnUnit(choice.id, 'enemy');
    }
}
function update(dt = STEP_MS) {
    if (!isRunning()) return;
    state.elapsed += dt;
    for (const team of ['player', 'enemy']) state.training[team] = Math.max(0, state.training[team] - dt);
    incomeElapsed += dt;
    enemyElapsed += dt;
    uiElapsed += dt;
    if (incomeElapsed + 0.001 >= 1000) {
        incomeElapsed -= 1000;
        state.gold += ERA_INCOME[state.era];
        state.enemyGold += ERA_INCOME[state.enemyEra];
    }
    if (enemyElapsed + 0.001 >= 1600) { enemyElapsed -= 1600; enemyAI(); }

    // Update Units
    state.units = state.units.filter(u => u.hp > 0);
    state.units.forEach(u => u.update());

    // Update Turret
    updateTurret();

    // Update Projectiles
    state.projectiles = state.projectiles.filter(p => p.active);
    state.projectiles.forEach(p => p.update());

    // Update Particles
    state.particles = state.particles.filter(p => p.life > 0);
    state.particles.forEach(p => p.update());

    // Check Game Over
    if (state.playerHP <= 0 || state.enemyHP <= 0) {
        state.gameOver = true;
        state.playerHP = Math.max(0, state.playerHP);
        state.enemyHP = Math.max(0, state.enemyHP);
        document.getElementById('game-over-screen').classList.remove('hidden');
        document.getElementById('game-over-title').textContent = state.playerHP <= 0 ? "Przegrana!" : "Zwycięstwo!";
        updateUI();
        document.getElementById("restart-btn").focus();
    } else if (uiElapsed >= 100) { uiElapsed = 0; updateUI(); }
}

function addParticle(x, y, text, life) {
    if (state.particles.length < 140) state.particles.push(new Particle(x, y, text, life));
}

function draw() {
    ctx.fillStyle = '#10232b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width / GAME_WIDTH, canvas.height / GAME_HEIGHT);
    ctx.save();
    ctx.translate((canvas.width - GAME_WIDTH * scale) / 2, (canvas.height - GAME_HEIGHT * scale) / 2);
    ctx.scale(scale, scale);
    ctx.beginPath();
    ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.clip();
    drawBattlefieldArt(ctx, state.era, state.elapsed);
    drawBaseArt(ctx, 'player', state.era, state.playerHP / state.maxHP, state.turret.level);
    drawBaseArt(ctx, 'enemy', state.enemyEra, state.enemyHP / state.enemyMaxHP, 0);
    state.units.forEach(u => u.draw(ctx));
    state.projectiles.forEach(p => p.draw(ctx));
    state.particles.forEach(p => p.draw(ctx));
    ctx.restore();
}

function loop(timestamp) {
    if (state.lastTime === null) state.lastTime = timestamp;
    const dt = Math.max(0, Math.min(timestamp - state.lastTime, 250));
    state.lastTime = timestamp;
    if (isRunning()) {
        accumulator += dt;
        while (accumulator + 0.001 >= STEP_MS && isRunning()) {
            update(STEP_MS);
            accumulator -= STEP_MS;
        }
    } else accumulator = 0;
    draw();
    requestAnimationFrame(loop);
}

// --- UI Updates ---

function updateUI() {
    // Stats
    document.getElementById('gold-display').textContent = Math.floor(state.gold);
    document.getElementById('xp-display').textContent = Math.floor(state.xp);
    document.getElementById('era-display').textContent = ERAS[state.era].name;

    // HP Bars
    const playerPct = Math.max(0, (state.playerHP / state.maxHP) * 100);
    const enemyPct = Math.max(0, (state.enemyHP / state.enemyMaxHP) * 100);

    document.getElementById('player-hp-fill').style.width = playerPct + '%';
    document.getElementById('player-hp-text').textContent = `${Math.floor(state.playerHP)}/${state.maxHP}`;

    document.getElementById('enemy-hp-fill').style.width = enemyPct + '%';
    document.getElementById('enemy-hp-text').textContent = `${Math.floor(state.enemyHP)}/${state.enemyMaxHP}`;

    // Buttons
    const unitPanel = document.getElementById('unit-buttons');
    if (unitPanel.dataset.era !== String(state.era)) {
        unitPanel.replaceChildren();
        unitPanel.dataset.era = String(state.era);
        ERAS[state.era].units.forEach((u, index) => {
            const btn = document.createElement('button');
            btn.className = 'unit-btn';
            btn.innerHTML = `<span class="unit-info"><span class="unit-name">${index + 1}. ${u.name}</span><span class="unit-role">${u.roleLabel}</span><span class="unit-cost">${u.cost} złota</span></span>`;
            const portrait = document.createElement('canvas');
            portrait.width = 96; portrait.height = 104; portrait.className = 'unit-portrait';
            portrait.setAttribute('aria-hidden', 'true');
            const painter = portrait.getContext?.('2d');
            if (painter) {
                const sample = new Unit(u, 'player'); sample.x = 48; sample.y = 96;
                drawUnitArt(painter, sample); btn.prepend(portrait);
            }
            btn.title = `${u.roleLabel} · ${u.hp} HP · ${u.dmg} obrażeń · zasięg ${u.range}`;
            btn.addEventListener('click', () => spawnUnit(u.id, 'player'));
            unitPanel.appendChild(btn);
        });
    }
    [...unitPanel.children].forEach((btn, index) => { btn.disabled = !isRunning() || !canRecruit('player') || state.gold < ERAS[state.era].units[index].cost; });
    document.getElementById('army-display').textContent = `${state.units.filter(u => u.team === 'player' && u.hp > 0).length}/${ARMY_LIMIT}`;
    document.getElementById('income-display').textContent = `+${ERA_INCOME[state.era]}/s`;
    document.getElementById('battle-time').textContent = `${Math.floor(state.elapsed / 60000)}:${String(Math.floor(state.elapsed / 1000) % 60).padStart(2, '0')}`;
    document.getElementById('training-status').textContent = state.training.player > 0 ? 'Mobilizacja…' : canRecruit('player') ? 'Oddział gotowy do wymarszu' : 'Poczekaj na miejsce w szyku';
    document.getElementById('evolution-progress').style.width = `${Number.isFinite(ERAS[state.era].evolveCost) ? Math.min(100, state.xp / ERAS[state.era].evolveCost * 100) : 100}%`;
    document.getElementById('enemy-era-display').textContent = ERAS[state.enemyEra].name;
    document.getElementById('pause-btn').disabled = !state.started || state.gameOver;

    // Turret Button
    const turretBtn = document.getElementById('turret-btn');
    if (turretBtn) {
        const tCost = state.turret.cost;
        turretBtn.innerHTML = state.turret.level === 0 ? `Wieżyczka (${tCost}g)` : `Ulepsz Wieżę (${tCost}g)`;
        if (state.turret.level >= 3) turretBtn.textContent = 'Wieża: poziom maks.';
        turretBtn.disabled = !isRunning() || state.turret.level >= 3 || state.gold < tCost;
    }

    // Evolve Button
    const evolveBtn = document.getElementById('evolve-btn');
    const nextEra = ERAS[state.era + 1];
    if (nextEra) {
        evolveBtn.innerHTML = `Ewolucja (${ERAS[state.era].evolveCost}xp)`;
        evolveBtn.disabled = !isRunning() || state.xp < ERAS[state.era].evolveCost;
    } else {
        evolveBtn.innerHTML = "Ostatnia epoka";
        evolveBtn.disabled = true;
    }
}

// Start
init();
