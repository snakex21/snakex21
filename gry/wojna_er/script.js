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

// --- Game State ---
let state = {
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
        cost: 500,
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
            this.x += this.def.speed * dir;
        }

        if (this.cooldown > 0) this.cooldown--;
        if (this.attackAnim > 0) this.attackAnim -= 0.1; // Decay animation
    }

    attack() {
        if (this.def.type === 'melee') {
            if (this.target.type === 'base') {
                if (this.team === 'player') state.enemyHP -= this.def.dmg;
                else state.playerHP -= this.def.dmg;
                addParticle(this.target.x, GROUND_Y - 50, '💥', 20);
            } else {
                this.target.hp -= this.def.dmg;
                addParticle(this.target.x, this.target.y - 20, '💥', 10);
                // XP for player if enemy hit
                if (this.team === 'player') state.xp += 10;
                else state.enemyXP += 10;

                if (this.target.hp <= 0) {
                    if (this.team === 'player') {
                        state.xp += 50;
                        addParticle(this.target.x, this.target.y - 40, '+50 XP', 30);
                    } else {
                        state.enemyXP += 50;
                    }
                }
            }
        } else {
            // Ranged
            const targetX = this.target.x || (this.team === 'player' ? GAME_WIDTH - 50 : 50);
            state.projectiles.push(new Projectile(this.x, this.y - 30, targetX, GROUND_Y - 30, this.def.dmg, this.team));
        }
    }

    draw(ctx) {
        ctx.fillStyle = this.def.color;
        // Simple shape for now
        const w = 20;
        const h = 40;

        // Attack bump offset
        let xOff = 0;
        if (this.attackAnim > 0) {
            const dir = this.team === 'player' ? 1 : -1;
            xOff = Math.sin(this.attackAnim * Math.PI) * 10 * dir;
        }

        ctx.fillRect(this.x - w / 2 + xOff, this.y - h, w, h);
        ctx.strokeStyle = this.team === 'player' ? '#1263be' : '#b91825';
        ctx.lineWidth = 4;
        ctx.strokeRect(this.x - w / 2 + xOff, this.y - h, w, h);

        // HP Bar
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x - 15 + xOff, this.y - h - 10, 30, 4);
        ctx.fillStyle = '#0f0';
        ctx.fillRect(this.x - 15 + xOff, this.y - h - 10, 30 * (this.hp / this.maxHp), 4);
    }
}

class Projectile {
    constructor(x, y, tx, ty, dmg, team) {
        this.x = x;
        this.y = y;
        this.tx = tx;
        this.ty = ty;
        this.dmg = dmg;
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
        if (unit) {
            unit.hp -= this.dmg;
            if (this.team === 'player') state.xp += 10;
            else state.enemyXP += 10;
            if (unit.hp <= 0) {
                if (this.team === 'player') {
                    state.xp += 50;
                    addParticle(unit.x, unit.y - 40, '+50 XP', 30);
                } else state.enemyXP += 50;
            }
        } else {
            if (this.team === 'player') state.enemyHP -= this.dmg;
            else state.playerHP -= this.dmg;
        }
        addParticle(this.x, this.y, '✨', 5);
    }

    draw(ctx) {
        ctx.fillStyle = 'yellow';
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
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
    draw(ctx) {
        ctx.globalAlpha = this.life / this.maxLife;
        ctx.fillStyle = 'white';
        ctx.font = 'bold 16px Arial';
        ctx.fillText(this.text, this.x, this.y);
        ctx.globalAlpha = 1;
    }
}

// --- Functions ---

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
    if (!isRunning()) return;
    const era = team === 'player' ? state.era : state.enemyEra;
    const unitDef = ERAS[era].units.find(u => u.id === unitId);

    if (!unitDef) return;

    if (team === 'player') {
        if (state.gold >= unitDef.cost) {
            state.gold -= unitDef.cost;
            state.units.push(new Unit(unitDef, 'player'));
            updateUI();
        }
    } else {
        if (state.enemyGold >= unitDef.cost) {
            state.enemyGold -= unitDef.cost;
            state.units.push(new Unit(unitDef, 'enemy'));
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
    if (state.gold >= state.turret.cost) {
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
        state.projectiles.push(new Projectile(BASE_OFFSET, GROUND_Y - 120, target.x, target.y - 20, state.turret.dmg, 'player'));
        state.turret.cooldown = state.turret.maxCooldown;
    }
}

function enemyAI() {
    if (!isRunning()) return;

    // Evolve Logic
    const nextEra = ERAS[state.enemyEra + 1];
    const enemyEvolveCost = Math.floor(ERAS[state.enemyEra].evolveCost * 1.5); // 50% more expensive for AI

    if (nextEra && state.enemyXP >= enemyEvolveCost) {
        state.enemyXP -= enemyEvolveCost;
        state.enemyEra++;
        state.enemyMaxHP += 500;
        state.enemyHP += 500;
    }

    const era = state.enemyEra;
    const units = ERAS[era].units;
    const unitToSpawn = units[Math.floor(Math.random() * units.length)];

    if (state.enemyGold >= unitToSpawn.cost) {
        spawnUnit(unitToSpawn.id, 'enemy');
    }
}
function update(dt = STEP_MS) {
    if (!isRunning()) return;
    incomeElapsed += dt;
    enemyElapsed += dt;
    uiElapsed += dt;
    if (incomeElapsed + 0.001 >= 1000) {
        incomeElapsed -= 1000;
        state.gold += 7 + state.era * 2;
        state.enemyGold += 6 + state.enemyEra * 2;
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
    state.particles.push(new Particle(x, y, text, life));
}

function draw() {
    ctx.fillStyle = '#10232b';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    const scale = Math.min(canvas.width / GAME_WIDTH, canvas.height / GAME_HEIGHT);
    ctx.save();
    ctx.translate((canvas.width - GAME_WIDTH * scale) / 2, (canvas.height - GAME_HEIGHT * scale) / 2);
    ctx.scale(scale, scale);
    ctx.fillStyle = ['#87CEEB', '#7c8baf', '#a1b5bd', '#25284e'][state.era];
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    ctx.fillStyle = ['#4caf50', '#426c46', '#5c7361', '#493c66'][state.era];
    ctx.fillRect(0, GROUND_Y, GAME_WIDTH, GAME_HEIGHT - GROUND_Y);
    ctx.fillStyle = '#235da8';
    ctx.fillRect(0, GROUND_Y - 100, 80, 100);
    if (state.turret.level > 0) {
        ctx.fillStyle = '#555'; ctx.fillRect(20, GROUND_Y - 130, 40, 30);
        ctx.fillStyle = '#222'; ctx.fillRect(30, GROUND_Y - 140, 10, 10);
    }
    ctx.fillStyle = '#bd3737';
    ctx.fillRect(GAME_WIDTH - 80, GROUND_Y - 100, 80, 100);
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
            btn.innerHTML = `<span>${index + 1}. ${u.name}</span><span class="unit-cost">${u.cost} złota</span>`;
            btn.title = `${u.hp} HP · ${u.dmg} obrażeń · zasięg ${u.range}`;
            btn.addEventListener('click', () => spawnUnit(u.id, 'player'));
            unitPanel.appendChild(btn);
        });
    }
    [...unitPanel.children].forEach((btn, index) => { btn.disabled = !isRunning() || state.gold < ERAS[state.era].units[index].cost; });
    document.getElementById('pause-btn').disabled = !state.started || state.gameOver;

    // Turret Button
    const turretBtn = document.getElementById('turret-btn');
    if (turretBtn) {
        const tCost = state.turret.cost;
        turretBtn.innerHTML = state.turret.level === 0 ? `Wieżyczka (${tCost}g)` : `Ulepsz Wieżę (${tCost}g)`;
        turretBtn.disabled = !isRunning() || state.gold < tCost;
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
