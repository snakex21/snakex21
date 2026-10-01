const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
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
test('Tower: start and rapid restart keep exactly one animation loop',()=>{
  const p=load('gry/tower/tower.html');assert.equal(p.frames.size,1);p.run('place()');assert.equal(p.frames.size,1);p.run('gameOver=true;place()');assert.equal(p.frames.size,1);
});
test('Flappy: repeated start never duplicates simulation or pipe spawn timers',()=>{
  const p=load('gry/flappy/flappy.html');p.run('startGame();startGame()');assert.equal(p.timers.size,2);
});
test('Flappy: game over clears every pipe timer before a fast restart',()=>{
  const p=load('gry/flappy/flappy.html');p.run('startGame();createPipe();gameOver()');assert.equal(p.timers.size,0);p.run('resetGame()');assert.equal(p.timers.size,2);
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
test('Tower: one second of block movement is refresh-rate independent',()=>{
  const xs=[];
  for(const hz of [30,60,120]){const p=load('gry/tower/tower.html');p.run('place()');for(let i=0;i<=hz;i++)p.frame(i*1000/hz);xs.push(p.run('currentBlock.x'));}
  assert.ok(Math.max(...xs)-Math.min(...xs)<0.001,JSON.stringify(xs));
});
test('Tower: blocked and corrupt storage cannot prevent a round or game-over message',()=>{
  for(const options of [{blockStorage:true},{storage:{towerHighScore:'corrupt'}}]) {
    const p=load('gry/tower/tower.html',null,options);p.run('place();score=2;currentBlock.x=400;place()');assert.equal(p.run('gameOver'),true);assert.match(p.document.getElementById('msg').textContent,/Game Over/);assert.equal(p.run('highScore'),2);
  }
});
test('Tower: repeated/modified Space and focused navigation controls never place blocks',()=>{
  const p=load('gry/tower/tower.html');const before=p.run('gameOver');
  for(const props of [{repeat:true},{ctrlKey:true},{target:p.document.querySelector('a')}]){const e=new p.Event('keydown',{bubbles:true});Object.defineProperty(e,'code',{value:'Space'});for(const[k,v]of Object.entries(props))if(k!=='target')Object.defineProperty(e,k,{value:v});(props.target||p.document.body).dispatchEvent(e);}
  assert.equal(p.run('gameOver'),before);
});
test('Flappy: stale pipe callbacks cannot score or kill a new round',()=>{
  const p=load('gry/flappy/flappy.html');p.run('startGame();createPipe()');const old=[...p.timers.values()].at(-1).cb;p.run('gameOver();resetGame()');for(let i=0;i<200;i++)old();assert.equal(p.run('score'),0);assert.equal(p.run('isGameRunning'),true);
});
test('Flappy: cleared physics callback does nothing after game over',()=>{
  const p=load('gry/flappy/flappy.html');p.run('startGame();gameOver()');const y=p.run('birdY');p.run('update()');assert.equal(p.run('birdY'),y);
});
test('Flappy: button pointerdown is not also a game action',()=>{
  const p=load('gry/flappy/flappy.html');const game=p.document.getElementById('game');const e=new p.Event('pointerdown',{bubbles:true});Object.defineProperties(e,{isPrimary:{value:true},button:{value:0}});p.document.querySelector('#start-screen button').dispatchEvent(e);assert.equal(p.run('isGameRunning'),false);
});
test('Flappy: touch-style primary pointer starts and jumps using one game handler',()=>{
  const p=load('gry/flappy/flappy.html');const game=p.document.getElementById('game');function pointer(){const e=new p.Event('pointerdown');Object.defineProperties(e,{isPrimary:{value:true},button:{value:0},target:{value:game}});game.dispatchEvent(e);}
  pointer();assert.equal(p.timers.size,2);pointer();assert.equal(p.run('velocity'),-7);assert.equal(p.timers.size,2);
});
test('Flappy: blocked storage still allows a complete start/end/restart lifecycle',()=>{
  const p=load('gry/flappy/flappy.html',null,{blockStorage:true});p.run('startGame();gameOver();resetGame()');assert.equal(p.run('isGameRunning'),true);assert.equal(p.timers.size,2);
});
test('Games: all changed local navigation and asset links resolve',()=>{
  for(const file of ['gry/wojna_er/index.html','gry/tower/tower.html','gry/flappy/flappy.html']){
    const {document}=parseHTML(read(file));for(const node of document.querySelectorAll('a[href],link[href],script[src]')){const v=node.getAttribute('href')||node.getAttribute('src');if(/^(?:[a-z]+:|#|\/\/)/i.test(v))continue;assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),decodeURIComponent(v.split(/[?#]/)[0]))),v);}
  }
});
test('Flappy: queued old physics and spawn callbacks cannot change a restarted round',()=>{
  const p=load('gry/flappy/flappy.html');p.run('startGame()');const old=[...p.timers.values()].map(t=>t.cb);p.run('gameOver();resetGame()');old.forEach(cb=>cb());assert.equal(p.run('birdY'),280);assert.equal(p.document.querySelectorAll('.pipe').length,0);
});
test('Flappy: pipe gaps fit within the ground and points require fully passing a pipe',()=>{
  const p=load('gry/flappy/flappy.html');p.run('Math.random=()=>1;startGame();createPipe()');const pipes=p.document.querySelectorAll('.pipe');assert.equal(pipes[0].style.height,'360px');assert.equal(pipes[1].style.height,'50px');
  p.run('birdY=430');const tick=[...p.timers.values()].at(-1).cb;for(let i=0;i<135;i++)tick();assert.equal(p.run('score'),0);for(let i=0;i<23;i++)tick();assert.equal(p.run('score'),1);
});
test('Flappy: the bird cannot remain alive after crossing the ground hitbox',()=>{
  const p=load('gry/flappy/flappy.html');p.run('startGame();birdY=551;velocity=0;update()');assert.equal(p.run('isGameRunning'),false);
});
test('Flappy and Tower: narrow layouts retain the visible games catalogue backlink',()=>{
  for(const file of ['gry/flappy/flappy.html','gry/tower/tower.html']) {
    const source=read(file);const {document}=parseHTML(source);
    assert.equal(document.querySelector('.site-context a').getAttribute('href'),'../../gry/gry.html');
    assert.equal(document.querySelector('.site-links a[aria-current="location"]').textContent,'Gry');
    assert.ok(document.querySelector('link[href="../../assets/workshop/shell.css"]'));
    assert.doesNotMatch(read('assets/workshop/shell.css'),/\.site-(?:links|context)\s*\{[^}]*display:\s*none/);
  }
});
