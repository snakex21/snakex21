const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
const { loadGame } = require('./helpers/arcade-harness.cjs');
const root = path.join(__dirname, '..');
const read = f => fs.readFileSync(path.join(root, f), 'utf8');
function load(file, external, options = {}) {
  const { document, Event } = parseHTML(read(file));
  const drawing = [];
  const ctx = new Proxy({}, { get: (_, key) => key === 'createLinearGradient' ? () => ({addColorStop(){}}) : (...args) => drawing.push([key, ...args]), set: () => true });
  for (const canvas of document.querySelectorAll('canvas')) {
    canvas.getContext = () => ctx;
    canvas.getBoundingClientRect = () => ({width:600,height:300,left:0,top:0});
  }
  const timers = new Map(), frames = new Map(), events = {};
  let next = 1;
  const storage = new Map(Object.entries(options.storage || {}));
  const context = vm.createContext({ document, console, Event,
    window: { innerWidth:600,innerHeight:700,addEventListener(type,cb){events[type]=cb;} },
    localStorage: {getItem(k){if(options.blockStorage)throw Error('blocked');return storage.get(k)??null;},setItem(k,v){if(options.blockStorage)throw Error('blocked');storage.set(k,String(v));}},
    Math:Object.assign(Object.create(Math),{random:()=>0.5}),
    requestAnimationFrame(cb){const id=next++;frames.set(id,cb);return id;},cancelAnimationFrame(id){frames.delete(id);},
    setInterval(cb,delay){const id=next++;timers.set(id,{cb,delay});return id;},clearInterval(id){timers.delete(id);},
    setTimeout(cb,delay){const id=next++;timers.set(id,{cb,delay});return id;},clearTimeout(id){timers.delete(id);}
  });
  const run = js => vm.runInContext(js,context,{timeout:1000});
  if(external==='gry/wojna_er/script.js')run(read('gry/wojna_er/art.js'));
  if(external)run(read(external));else for(const m of read(file).matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))run(m[1]);
  return {document,Event,run,context,timers,frames,drawing,storage,events,
    frame(time){const queue=[...frames.values()];frames.clear();queue.forEach(cb=>cb(time));},
    tick(delay){[...timers.values()].filter(t=>t.delay===delay).forEach(t=>t.cb());}
  };
}
const war = () => load('gry/wojna_er/index.html','gry/wojna_er/script.js');
function prepareWar(p) { p.run("if (typeof startGame === 'function') startGame(); state.units=[new Unit(ERAS[0].units[0],'player')];"); }
test('Wojna Er: recruitment controls retain identity through HUD refresh',()=>{
  const p=war();const first=p.document.querySelector('.unit-btn');p.run('updateUI()');assert.ok(p.document.querySelector('.unit-btn')===first, 'Recruitment button was replaced');
});
test('Wojna Er: equal elapsed time gives equal movement at 30, 60 and 120 Hz',()=>{
  const positions=[];
  for(const hz of [30,60,120]){const p=war();prepareWar(p);for(let i=0;i<=hz;i++)p.frame(i*1000/hz);positions.push(p.run('state.units[0].x'));}
  assert.ok(Math.max(...positions)-Math.min(...positions)<=1,JSON.stringify(positions));
});
test('Wojna Er: a finished battle shows zero HP immediately and rejects further purchases',()=>{
  const p=war();prepareWar(p);p.run('state.playerHP=-10;update(1000/60)');
  assert.equal(p.document.getElementById('player-hp-text').textContent,'0/500');
  const before=p.run('state.gold');p.run("spawnUnit('clubman','player');buyTurret();evolve()");assert.equal(p.run('state.gold'),before);
});
test('Wojna Er: a projectile collides with a moving unit before its old target point',()=>{
  const p=war();prepareWar(p);
  p.run("state.units=[new Unit(ERAS[0].units[0],'enemy')];state.units[0].x=150;state.projectiles=[new Projectile(140,420,200,420,10,'player')];state.projectiles[0].update()");
  assert.equal(p.run('state.units[0].hp'),40);
});
test('Wojna Er: waits for Start, and pause freezes combat, income and recruitment',()=>{
  const p=war();for(let i=0;i<180;i++)p.frame(i*1000/60);
  assert.equal(p.run('state.gold'),100);assert.equal(p.run('state.units.length'),0);
  p.run("spawnUnit('clubman','player')");assert.equal(p.run('state.gold'),100);
  prepareWar(p);p.frame(4000);p.frame(4100);p.run('setPaused(true)');
  const before=p.run('JSON.stringify({gold:state.gold,x:state.units[0].x,enemyGold:state.enemyGold})');
  for(let i=0;i<180;i++)p.frame(4200+i*1000/60);
  p.run("spawnUnit('clubman','player');buyTurret();evolve()");
  assert.equal(p.run('JSON.stringify({gold:state.gold,x:state.units[0].x,enemyGold:state.enemyGold})'),before);
  p.run('setPaused(false)');p.frame(100000);assert.equal(p.run('state.units[0].x'),JSON.parse(before).x);
});
test('Wojna Er: start is idempotent and hidden tab automatically pauses',()=>{
  const p=war();p.run('startGame();startGame()');assert.equal(p.frames.size,1);
  p.document.hidden=true;p.document.dispatchEvent(new p.Event('visibilitychange'));
  assert.equal(p.run('state.paused'),true);
  assert.equal(p.document.getElementById('pause-screen').classList.contains('hidden'),false);
});
test('Wojna Er: fixed-time income and AI have the same economy at every refresh rate',()=>{
  const outcomes=[];
  for(const hz of [30,60,120]) {const p=war();p.run('startGame()');for(let i=0;i<=hz*5;i++)p.frame(i*1000/hz);outcomes.push(p.run('JSON.stringify({gold:state.gold,enemyGold:state.enemyGold,units:state.units.length})'));}
  assert.equal(new Set(outcomes).size,1);assert.equal(JSON.parse(outcomes[0]).gold,135);
});
test('Wojna Er: bases, ground and units use the same virtual canvas transform',()=>{
  const p=war();p.drawing.length=0;p.run('draw()');
  const scaleIndex=p.drawing.findIndex(c=>c[0]==='scale');
  const baseIndex=p.drawing.findIndex(c=>c[0]==='translate'&&c[1]===1152&&c[2]===450);
  assert.ok(scaleIndex>=0&&baseIndex>scaleIndex);
  assert.deepEqual(p.drawing[scaleIndex],['scale',0.5,0.5]);
  assert.ok(p.drawing.some(c=>c[0]==='fillRect'&&c[1]===0&&c[2]===450&&c[3]===1200));
});
test('Wojna Er: insufficient money and XP never produce free upgrades',()=>{
  const p=war();p.run('startGame();state.gold=14;state.xp=499');
  p.run("spawnUnit('clubman','player');buyTurret();evolve()");
  assert.equal(p.run('state.units.length'),0);assert.equal(p.run('state.gold'),14);assert.equal(p.run('state.era'),0);
});
test('Wojna Er: evolution preserves health damage and changes recruitment exactly once',()=>{
  const p=war();p.run('startGame();state.xp=500;state.playerHP=100;evolve()');
  assert.equal(p.run('state.era'),1);assert.equal(p.run('state.xp'),0);assert.equal(p.run('state.playerHP'),600);assert.equal(p.run('state.maxHP'),1000);
  assert.match(p.document.getElementById('unit-buttons').textContent,/Rycerz/);
  const first=p.document.querySelector('.unit-btn');p.run('updateUI()');assert.ok(p.document.querySelector('.unit-btn')===first);
});
test('Wojna Er: a projectile hits only the first enemy and awards a kill once',()=>{
  const p=war();p.run("startGame();state.units=[new Unit(ERAS[0].units[0],'enemy'),new Unit(ERAS[0].units[0],'enemy')];state.units[0].x=150;state.units[0].hp=5;state.units[1].x=151;const shot=new Projectile(140,420,200,420,10,'player');shot.update();shot.update()");
  assert.equal(p.run('state.xp'),20.2);assert.equal(p.run('state.units[1].hp'),50);
});
test('Wojna Er: a missed distant shot never damages a base',()=>{
  const p=war();p.run("startGame();const shot=new Projectile(100,420,200,420,10,'player');for(let i=0;i<20;i++)shot.update()");assert.equal(p.run('state.enemyHP'),500);
});
test('Wojna Er: keyboard shortcuts are repeat-safe and ignore editing fields',()=>{
  const p=war();p.run('startGame()');
  function key(value,target,repeat=false){const e=new p.Event('keydown',{bubbles:true});Object.defineProperties(e,{key:{value},repeat:{value:repeat}});target.dispatchEvent(e);}
  const input=p.document.createElement('input');p.document.body.append(input);key('1',input);key('1',p.document.body,true);assert.equal(p.run('state.units.length'),0);
  key('1',p.document.body);assert.equal(p.run('state.units.length'),1);key('p',p.document.body);assert.equal(p.run('state.paused'),true);
});
test('Games: all changed local navigation and asset links resolve',()=>{
  for(const file of ['gry/wojna_er/index.html','gry/tower/tower.html','gry/flappy/flappy.html']){
    const {document}=parseHTML(read(file));for(const node of document.querySelectorAll('a[href],link[href],script[src]')){const v=node.getAttribute('href')||node.getAttribute('src');if(/^(?:[a-z]+:|#|\/\/)/i.test(v))continue;assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),decodeURIComponent(v.split(/[?#]/)[0]))),v);}
  }
});
test('Flappy and Tower: narrow layouts retain the visible games catalogue backlink',()=>{
  for(const file of ['gry/flappy/flappy.html','gry/tower/tower.html']) {
    const source=read(file);const {document}=parseHTML(source);
    assert.equal(document.querySelector('.site-context a').getAttribute('href'),'../../gry/gry.html');
    assert.equal(document.querySelector('.site-links a[aria-current="location"]').textContent,'Gry');
    assert.ok(document.querySelector('link[href="../../assets/workshop/shell.css?v=20261010-prefs"]'));
    assert.doesNotMatch(read('assets/workshop/shell.css'),/\.site-(?:links|context)\s*\{[^}]*display:\s*none/);
  }
});
// Tower Stack and Flappy run on GryKit inside an IIFE: tests drive them through the real page (GryKit API,
// overlay buttons, key/pointer events) and observe only what the player sees (canvas draws, DOM, HUD tiles).
function arcade(file, options) {
  const p = loadGame(file, options);
  let time = 0;
  Object.assign(p, {
    state: () => p.run('GryKit.state'),
    key(props, target = p.document.body) { return p.fire('keydown', props, target); },
    clickPrimary() { p.document.querySelector('.gk-overlay .kit-btn.primary').dispatchEvent(new p.Event('click', { bubbles: true })); },
    overlayVisible() { const o = p.document.querySelector('.gk-overlay'); return !!o && !o.hidden; },
    step(ms) { time += ms; p.frame(time); },
    steps(n, ms, each) { for (let i = 0; i < n; i++) { p.step(ms); if (each && each(i) === false) break; } }
  });
  p.step(16);   // first frame: GryKit.fit's one-off measuring callback runs, only the game loop stays queued
  return p;
}
const tower = options => arcade('gry/tower/tower.html', options);
// The moving block is drawn last; its outline (strokeRect x, y, w, h) gives its position.
function towerBlock(p) { const s = p.draws.filter(d => d[0] === 'strokeRect').at(-1); return { x: s[1], w: s[3] }; }
function towerFrame(p, ms) { p.draws.length = 0; p.step(ms); return towerBlock(p); }
const towerScore = p => p.document.getElementById('score').textContent;
const space = { code: 'Space', key: ' ' };
const newRound = p => p.document.getElementById('new-game').dispatchEvent(new p.Event('click'));
test('Tower: start and rapid restart keep exactly one animation loop', () => {
  const p = tower(); assert.equal(p.frames.size, 1);
  p.run('GryKit.start(); GryKit.start()'); assert.equal(p.frames.size, 1);
  p.key(space); assert.equal(towerScore(p), '1'); assert.equal(p.frames.size, 1);
  newRound(p); assert.equal(towerScore(p), '0'); assert.equal(p.frames.size, 1);
  // One loop: one second at 60 Hz moves the fresh block 2 px per frame, not double.
  let block; for (let i = 0; i <= 60; i++) block = towerFrame(p, 1000 / 60);
  assert.ok(Math.abs(block.x - 120) < 0.001, String(block.x));
});
test('Tower: one second of block movement is refresh-rate independent', () => {
  const xs = [];
  for (const hz of [30, 60, 120]) { const p = tower(); p.run('GryKit.start()'); let b; for (let i = 0; i <= hz; i++) b = towerFrame(p, 1000 / hz); xs.push(b.x); }
  assert.ok(Math.max(...xs) - Math.min(...xs) < 0.001, JSON.stringify(xs));
  assert.ok(Math.abs(xs[0] - 120) < 0.001, JSON.stringify(xs));
});
test('Tower: blocked and corrupt storage cannot prevent a round, game-over screen or record', () => {
  for (const options of [{ blockStorage: true }, { storage: { towerHighScore: 'corrupt' } }]) {
    const p = tower(options); p.run('GryKit.start()'); p.step(16);
    p.key(space);                                                       // far off: the block is trimmed to 10 px
    assert.equal(towerScore(p), '1'); assert.equal(towerFrame(p, 1000 / 60).w, 10);
    p.steps(200, 1000 / 60, () => { const b = towerBlock(p); p.draws.length = 0; if (Math.abs(b.x - 130) < 4) { p.key(space); return false; } });
    assert.equal(towerScore(p), '2');
    p.key(space);                                                       // new 10 px block at x=0 misses the tower
    assert.equal(p.state(), 'over'); assert.equal(towerScore(p), '2');
    assert.equal(p.document.getElementById('highscore').textContent, '2'); assert.equal(p.run('GryKit.best'), 2);
    if (!options.blockStorage) assert.equal(p.storage.get('gry:tower-stack:best'), '2');
    p.tick(450); assert.ok(p.overlayVisible());
    assert.match(p.document.querySelector('.gk-overlay h2').textContent, /Wieża skończona/);
    p.clickPrimary(); assert.equal(p.state(), 'playing'); assert.equal(towerScore(p), '0'); assert.equal(p.frames.size, 1);
  }
});
test('Tower: repeated/modified Space and focused navigation controls never place blocks; Space never pauses', () => {
  const p = tower(); p.run('GryKit.start()'); p.step(16);
  for (const props of [{ repeat: true }, { ctrlKey: true }, { altKey: true }]) p.key({ ...space, ...props });
  p.key(space, p.document.querySelector('.site-header a'));
  p.key(space, p.document.getElementById('new-game'));
  p.key({ code: 'Enter', key: 'Enter' });                               // Enter places only from the focused board
  assert.equal(towerScore(p), '0'); assert.equal(p.state(), 'playing');
  p.key(space); assert.equal(towerScore(p), '1'); assert.equal(p.state(), 'playing');
  newRound(p); p.key({ code: 'Enter', key: 'Enter' }, p.document.getElementById('game')); assert.equal(towerScore(p), '1');
});
test('Tower: the start screen and pause freeze the block and reject placing; resume continues', () => {
  const p = tower(); const board = p.document.getElementById('game'); const menuX = towerFrame(p, 16).x;
  p.steps(30, 1000 / 60); assert.equal(towerFrame(p, 16).x, menuX);
  p.fire('pointerdown', { isPrimary: true, button: 0 }, board); assert.equal(towerScore(p), '0'); assert.equal(p.state(), 'menu');
  p.run('GryKit.start()'); p.steps(10, 1000 / 60); const before = towerFrame(p, 1000 / 60).x; assert.ok(before > 0);
  p.key({ key: 'Escape', code: 'Escape' }); assert.equal(p.state(), 'paused');
  p.steps(60, 1000 / 60); assert.equal(towerFrame(p, 1000 / 60).x, before);
  p.fire('pointerdown', { isPrimary: true, button: 0 }, board); assert.equal(towerScore(p), '0');
  p.key({ key: 'p', code: 'KeyP' }); assert.equal(p.state(), 'playing');
  towerFrame(p, 1000 / 60); assert.ok(towerFrame(p, 1000 / 60).x > before);
  p.fire('pointerdown', { isPrimary: true, button: 0 }, board); assert.equal(towerScore(p), '1');
});

const flappy = options => arcade('gry/flappy/flappy.html', options);
const birdY = p => parseFloat(p.document.getElementById('bird').style.top);
const pipes = p => [...p.document.querySelectorAll('#game .pipe')];
const flappyScore = p => p.document.getElementById('board-score').textContent;
const hudTiles = p => [...p.document.querySelectorAll('.game-stats .game-stat b')].map(b => b.textContent);
const flap = p => p.key(space);
const newGame = newRound;
// Physics runs in fixed 20 ms steps; with 20 ms frames every frame is exactly one step.
const STEP = 20;
test('Flappy: repeated start never duplicates the simulation loop', () => {
  const p = flappy(); p.run('GryKit.start(); GryKit.start()'); newGame(p);
  assert.equal(p.frames.size, 1); p.steps(11, STEP);
  assert.equal(p.frames.size, 1); assert.equal(birdY(p), 280 + 0.5 * 55);   // exactly 10 physics steps, not 20
});
test('Flappy: game over stops physics and a fast restart starts from a clean board', () => {
  const p = flappy(); p.clickPrimary(); assert.equal(p.state(), 'playing');
  p.steps(60, STEP, () => p.state() === 'playing');                       // no flaps: the bird falls
  assert.equal(p.state(), 'over'); const y = birdY(p);
  p.steps(200, STEP); assert.equal(birdY(p), y); assert.equal(pipes(p).length, 0);
  newGame(p);
  assert.equal(p.state(), 'playing'); assert.equal(birdY(p), 280); assert.equal(flappyScore(p), '0'); assert.equal(pipes(p).length, 0); assert.equal(p.frames.size, 1);
});
test('Flappy: a stale game-over screen from the previous round cannot end a restarted round', () => {
  const p = flappy(); p.clickPrimary(); p.steps(60, STEP, () => p.state() === 'playing'); assert.equal(p.state(), 'over');
  newGame(p);                                                             // restart before the delayed screen appears
  p.tick(550); assert.equal(p.state(), 'playing'); assert.equal(p.overlayVisible(), false); assert.equal(flappyScore(p), '0');
  p.steps(5, STEP); assert.ok(birdY(p) > 280);
});
test('Flappy: overlay buttons and pointers under the start screen are not game actions', () => {
  const p = flappy();
  p.fire('pointerdown', { isPrimary: true, button: 0 }, p.document.querySelector('.gk-overlay .kit-btn.primary'));
  p.fire('pointerdown', { isPrimary: true, button: 0 }, p.document.getElementById('game'));
  p.key(space, p.document.querySelector('.site-header a'));            // Space on a focused header link is not a start
  assert.equal(p.state(), 'menu'); p.steps(20, STEP); assert.equal(birdY(p), 280);
});
test('Flappy: primary pointer jumps through one handler; secondary pointers and header keys do nothing', () => {
  const p = flappy(); const game = p.document.getElementById('game'); p.clickPrimary(); p.step(STEP);
  p.fire('pointerdown', { isPrimary: false, button: 0 }, game); p.fire('pointerdown', { isPrimary: true, button: 2 }, game);
  p.key(space, p.document.querySelector('.site-header a'));
  p.step(STEP); assert.equal(birdY(p), 280.5);
  p.fire('pointerdown', { isPrimary: true, button: 0 }, game); p.step(STEP); assert.equal(birdY(p), 280.5 - 6.5);
  assert.equal(p.frames.size, 1);
});
test('Flappy: pause (Esc, P, hidden tab) freezes bird and pipes; Space jumps but never pauses', () => {
  const p = flappy(); p.clickPrimary();
  p.steps(100, STEP, () => { if (birdY(p) > 320) flap(p); });
  assert.equal(p.state(), 'playing'); assert.equal(pipes(p).length, 2);
  const view = () => JSON.stringify([birdY(p), pipes(p).map(e => e.style.left)]);
  const hideTab = () => { p.document.hidden = true; p.document.dispatchEvent(new p.Event('visibilitychange')); p.document.hidden = false; };
  for (const pause of [() => p.key({ key: 'Escape', code: 'Escape' }), () => p.key({ key: 'p', code: 'KeyP' }), hideTab]) {
    pause(); assert.equal(p.state(), 'paused');
    const snapshot = view();
    p.steps(150, STEP); p.fire('pointerdown', { isPrimary: true, button: 0 }, p.document.getElementById('game'));
    assert.equal(view(), snapshot);
    p.run('GryKit.resume()'); p.step(STEP); assert.notEqual(view(), snapshot);
  }
  flap(p); assert.equal(p.state(), 'playing');
});
test('Flappy: blocked storage still allows a complete start/score/end/restart lifecycle with a record', () => {
  const p = flappy({ blockStorage: true }); p.clickPrimary();
  p.steps(400, STEP, () => { if (birdY(p) > 320) flap(p); return flappyScore(p) !== '1'; });
  assert.equal(flappyScore(p), '1'); assert.deepEqual(hudTiles(p), ['1', '1']);
  p.steps(200, STEP, () => p.state() === 'playing'); assert.equal(p.state(), 'over');
  assert.equal(p.run('GryKit.best'), 1);
  p.tick(550); assert.ok(p.overlayVisible()); assert.match(p.document.querySelector('.gk-overlay').textContent, /Koniec gry/);
  p.clickPrimary(); assert.equal(p.state(), 'playing'); assert.equal(p.frames.size, 1);
  assert.deepEqual(hudTiles(p), ['0', '1']); assert.equal(pipes(p).length, 0);
});
test('Flappy: pipe gaps fit within the ground and points require fully passing a pipe', () => {
  const p = flappy({ random: () => 1 }); p.clickPrimary();
  let checked = 0;
  p.steps(400, STEP, () => {
    if (birdY(p) > 470) flap(p);
    assert.equal(p.state(), 'playing');
    const first = pipes(p)[0]; if (!first) return;
    if (checked === 0) { assert.equal(first.style.height, '360px'); assert.equal(pipes(p)[1].style.height, '50px'); }
    const passed = parseFloat(first.style.left) + 70 <= 80;
    assert.equal(flappyScore(p), passed ? '1' : '0', 'pipe at ' + first.style.left);
    checked++;
    return parseFloat(first.style.left) > 0;
  });
  assert.equal(flappyScore(p), '1'); assert.ok(checked > 150, String(checked));
});
test('Flappy: the bird cannot remain alive after crossing the ground hitbox', () => {
  const p = flappy(); p.clickPrimary();
  p.steps(100, STEP, () => { if (p.state() === 'playing') assert.ok(birdY(p) + 40 < 590, String(birdY(p))); });
  assert.equal(p.state(), 'over'); assert.ok(birdY(p) + 40 >= 590);
});
