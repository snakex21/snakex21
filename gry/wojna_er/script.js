const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// --- Config & Stats ---
const GAME_WIDTH = 1200; // Virtual width
const GAME_HEIGHT = 600; // Virtual height
const GROUND_Y = 450;
const BASE_OFFSET = 100;

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
    enemyGold: 100,
    enemyEra: 0,
    enemyXP: 0,
    lastTime: 0,
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
        this.x += this.vx;
        this.y += this.vy;

        // Check collision (simple distance check to target X)
        if (this.team === 'player' && this.x >= this.tx) this.hit();
        if (this.team === 'enemy' && this.x <= this.tx) this.hit();
    }

    hit() {
        this.active = false;

        let hitSomething = false;
        for (let u of state.units) {
            if (u.team !== this.team && u.hp > 0 && Math.abs(u.x - this.x) < 30) {
                u.hp -= this.dmg;
                hitSomething = true;
                if (this.team === 'player') state.xp += 10;
                else state.enemyXP += 10;

                if (u.hp <= 0) {
                    if (this.team === 'player') {
                        state.xp += 50;
                        addParticle(u.x, u.y - 40, '+50 XP', 30);
                    } else {
                        state.enemyXP += 50;
                    }
                }
                break; // Hit one unit
            }
        }

        if (!hitSomething) {
            // Check base
            if (this.team === 'player' && this.x > GAME_WIDTH - 100) state.enemyHP -= this.dmg;
            if (this.team === 'enemy' && this.x < 100) state.playerHP -= this.dmg;
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

function init() {
    resize();
    window.addEventListener('resize', resize);
    updateUI();
    requestAnimationFrame(loop);

    // Passive Income
    setInterval(() => {
        if (state.gameOver) return;
        state.gold += 7 + (state.era * 2); // Player Reduced
        state.enemyGold += 6 + (state.enemyEra * 2); // Enemy Reduced
        updateUI();
    }, 1000);

    // Enemy AI
    setInterval(enemyAI, 1600); // Medium speed spawns
}

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

function spawnUnit(unitId, team) {
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
    if (state.gameOver) return;

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
function update(dt) {
    if (state.gameOver) return;

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
        document.getElementById('game-over-screen').classList.remove('hidden');
        document.getElementById('game-over-title').textContent = state.playerHP <= 0 ? "Przegrana!" : "Zwycięstwo!";
    }
}

function addParticle(x, y, text, life) {
    state.particles.push(new Particle(x, y, text, life));
}

function draw() {
    // Clear & Background
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#87CEEB'; // Default sky
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = '#4caf50';
    ctx.fillRect(0, GROUND_Y, canvas.width, canvas.height - GROUND_Y);

    // Bases
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, GROUND_Y - 100, 80, 100); // Player Base

    // Turret
    if (state.turret.level > 0) {
        ctx.fillStyle = '#555';
        ctx.fillRect(20, GROUND_Y - 130, 40, 30); // Base
        ctx.fillStyle = '#222';
        ctx.fillRect(30, GROUND_Y - 140, 10, 10); // Barrel
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(canvas.width - 80, GROUND_Y - 100, 80, 100); // Enemy Base

    // Scale context to fit virtual width into real width
    const scale = canvas.width / GAME_WIDTH;
    ctx.save();
    ctx.scale(scale, scale);

    // Draw Game Objects (scaled)
    state.units.forEach(u => u.draw(ctx));
    state.projectiles.forEach(p => p.draw(ctx));
    state.particles.forEach(p => p.draw(ctx));

    ctx.restore();
}

function loop(timestamp) {
    const dt = timestamp - state.lastTime;
    state.lastTime = timestamp;

    update(dt);
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
    unitPanel.innerHTML = '';

    ERAS[state.era].units.forEach(u => {
        const btn = document.createElement('button');
        btn.className = 'unit-btn';
        btn.disabled = state.gold < u.cost;
        btn.innerHTML = `<span>${u.name}</span><span class="unit-cost">${u.cost}g</span>`;
        btn.onclick = () => spawnUnit(u.id, 'player');
        unitPanel.appendChild(btn);
    });

    // Turret Button
    const turretBtn = document.getElementById('turret-btn');
    if (turretBtn) {
        const tCost = state.turret.cost;
        turretBtn.innerHTML = state.turret.level === 0 ? `Wieżyczka (${tCost}g)` : `Ulepsz Wieżę (${tCost}g)`;
        turretBtn.disabled = state.gold < tCost;
    }

    // Evolve Button
    const evolveBtn = document.getElementById('evolve-btn');
    const nextEra = ERAS[state.era + 1];
    if (nextEra) {
        evolveBtn.innerHTML = `Ewolucja (${ERAS[state.era].evolveCost}xp)`;
        evolveBtn.disabled = state.xp < ERAS[state.era].evolveCost;
        evolveBtn.onclick = evolve; // Ensure click handler
    } else {
        evolveBtn.innerHTML = "Max Level";
        evolveBtn.disabled = true;
    }
}

// Start
init();
