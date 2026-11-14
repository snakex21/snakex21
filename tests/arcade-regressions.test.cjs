const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./helpers/arcade-harness.cjs');
// linkedom has no innerText setter (the typing test writes its words with it): behave like textContent.
{const proto=require('linkedom').parseHTML('<p></p>').HTMLElement.prototype;const own=Object.getOwnPropertyDescriptor(proto,'innerText');
 if(!own||!own.set)Object.defineProperty(proto,'innerText',{configurable:true,get(){return this.textContent;},set(v){this.textContent=String(v);}});}
// Games run inside closures, so the tests drive them like a player (GryKit overlay, keys, pointer, clock)
// and read the result from the HUD tiles, the DOM board or the canvas draw calls.
const game=(name,options)=>loadGame(name==='snakex21'?'gry/snakex21/snake.html':`gry/${name}/${name}.html`,options);
const $=(p,sel)=>p.document.querySelector(sel);
// Advances the page clock in animation frames of `step` ms (the harness runs every queued rAF callback).
function advance(p,ms,step=1000/60){p.t??=0;const end=p.t+ms;while(p.t+step<=end+1e-9){p.t+=step;p.draws.length=0;p.frame(p.t);}if(end-p.t>1e-9){p.t=end;p.frame(end);}}
// Draw calls of one extra zero-length frame: the scene exactly as the game shows it now.
function drawn(p,name){const n=p.draws.length;p.frame(p.t??0);const calls=p.draws.slice(n);p.draws.length=0;return name?calls.filter(c=>c[0]===name):calls;}
// Clicks the overlay's primary button, then runs a zero-length frame so the game clock starts at p.t.
function clickStart(p){p.frame(p.t??0);const b=$(p,'.gk-overlay .kit-btn.primary');assert.ok(b,'overlay start button');b.focus();p.fire('click',{},b);assert.equal(p.run('GryKit.state'),'playing');p.frame(p.t??0);}
const key=(p,code,extra={},target=p.document)=>p.fire('keydown',{code,key:{Space:' ',KeyP:'p',Escape:'Escape',Enter:'Enter'}[code]??code,...extra},target);
const state=p=>p.run('GryKit.state');
// Frames queued once by the kit (fit) disappear after one frame; what stays is the game loop.
function loops(p){p.frame(p.t??0);return p.frames.size;}
function hide(p){p.document.hidden=true;p.fire('visibilitychange');}
function show(p){p.document.hidden=false;p.fire('visibilitychange');}

/* ---------- Tower ---------- */
const towerBlock=p=>drawn(p,'strokeRect').at(-1).slice(1);   // last outlined block = the moving one
test('Tower: pause and hidden-tab return freeze the block without placing it',()=>{
 const p=game('tower');clickStart(p);advance(p,300);const moving=towerBlock(p);assert.notEqual(moving[0],0,'block slides while playing');
 key(p,'KeyP');assert.equal(state(p),'paused');advance(p,2000);assert.deepEqual(towerBlock(p),moving);
 p.fire('pointerdown',{isPrimary:true,button:0},$(p,'#game'));assert.equal($(p,'#score').textContent,'0','paused tap places nothing');
 key(p,'KeyP');assert.equal(state(p),'playing');advance(p,100);assert.notDeepEqual(towerBlock(p),moving,'resume moves on');
 const before=towerBlock(p);hide(p);assert.equal(state(p),'paused');advance(p,3000);show(p);assert.equal(state(p),'paused','returning to the tab waits for the player');
 assert.deepEqual(towerBlock(p),before);assert.equal($(p,'#score').textContent,'0');
});

/* ---------- Flappy ---------- */
const birdY=p=>parseFloat($(p,'#bird').style.top);
const pipeLefts=p=>[...p.document.querySelectorAll('.pipe')].map(x=>x.style.left);
function flap(p,ms){for(let done=0;done<ms;done+=560){key(p,'Space');advance(p,Math.min(560,ms-done),20);}}
test('Flappy: pause freezes bird, pipes and spawn; resume does not restart score',()=>{
 const p=game('flappy');clickStart(p);flap(p,1560);assert.equal(state(p),'playing');assert.equal(pipeLefts(p).length,2,'first pipe pair spawned');
 key(p,'Escape');assert.equal(state(p),'paused');const y=birdY(p),pipes=pipeLefts(p);
 advance(p,3000,20);key(p,'KeyW');assert.equal(birdY(p),y);assert.deepEqual(pipeLefts(p),pipes,'pipes and spawning stand still');
 key(p,'Escape');assert.equal(state(p),'playing');key(p,'Space');advance(p,40,20);assert.ok(birdY(p)<y,'jump after resume');
 assert.deepEqual(pipeLefts(p).length,2);assert.notDeepEqual(pipeLefts(p),pipes);
});
test('Flappy: hidden page explicitly pauses until the player resumes',()=>{
 const p=game('flappy');clickStart(p);advance(p,100,20);hide(p);assert.equal(state(p),'paused');show(p);assert.equal(state(p),'paused');
 const y=birdY(p);advance(p,500,20);assert.equal(birdY(p),y);
});
test('Flappy: board sits in the centered game stage and zoom-fits a small window',()=>{
 const fs=require('node:fs'),path=require('node:path');
 assert.match(fs.readFileSync(path.join(__dirname,'../assets/workshop/kit.css'),'utf8'),/\.game-stage\s*\{[^}]*display:\s*flex;[^}]*justify-content:\s*center/);
 const p=game('flappy',{width:360,height:420}),board=$(p,'#game');
 assert.ok(board.parentElement.classList.contains('game-stage'));
 // linkedom has no layout: give the board and its stage their CSS sizes.
 Object.defineProperties(board,{offsetWidth:{value:488},offsetHeight:{value:648}});Object.defineProperty(board.parentElement,'clientWidth',{value:360});
 p.frame(0);const zoom=parseFloat(board.style.zoom);assert.ok(zoom>0.3&&zoom<1,'zoom '+board.style.zoom);
});

/* ---------- Dino ---------- */
const dinoScore=p=>$(p,'#score').textContent;
const cactusX=p=>drawn(p,'fillRect').filter(c=>c[3]===18&&c[4]>30).map(c=>c[1]);
const dinoTop=p=>drawn(p,'fillRect').find(c=>c[1]===75&&c[3]===25)[2]-5;
test('Dino: start, death and rapid restart never duplicate the animation loop',()=>{
 const p=game('dino');clickStart(p);advance(p,6000);assert.equal(state(p),'over','first cactus ends an idle run');p.tick(550);
 clickStart(p);p.fire('click',{},$(p,'#new-game'));p.fire('click',{},$(p,'#new-game'));assert.equal(state(p),'playing');assert.equal(loops(p),1);
});
test('Dino: the same elapsed second produces equal score and motion at 30/60/120Hz',()=>{
 const outcomes=[];for(const hz of[30,60,120]){const p=game('dino');clickStart(p);advance(p,1000,1000/hz);outcomes.push(JSON.stringify({score:dinoScore(p),scene:drawn(p,'fillRect')}));}
 assert.equal(JSON.parse(outcomes[0]).score,'12');assert.equal(new Set(outcomes).size,1);
});
test('Dino: a hundred-point milestone increases speed only once',()=>{
 const p=game('dino');clickStart(p);const speeds=new Map();let prev=null;
 while(Number(dinoScore(p))<150){
  const xs=cactusX(p);if(xs.some(x=>x>=120&&x<=150)&&dinoTop(p)===180)key(p,'Space');
  advance(p,1000/60);assert.equal(state(p),'playing','auto-jumper survives at score '+dinoScore(p));
  const now=cactusX(p),score=Number(dinoScore(p));if(prev&&now.length&&prev.length===now.length&&now[0]<prev[0])speeds.set(score,+(prev[0]-now[0]).toFixed(4));prev=now;
 }
 assert.deepEqual([...new Set([...speeds].filter(([s])=>s<100).map(([,v])=>v))],[5]);
 assert.deepEqual([...new Set([...speeds].filter(([s])=>s>100).map(([,v])=>v))],[5.15]);
});
test('Dino: pausing clears time accumulation and ignores navigation Space',()=>{
 const p=game('dino');clickStart(p);advance(p,500);key(p,'KeyP');assert.equal(state(p),'paused');const score=dinoScore(p),scene=cactusX(p);
 p.t+=9000;p.frame(p.t);advance(p,100);assert.equal(dinoScore(p),score);assert.deepEqual(cactusX(p),scene);
 key(p,'KeyP');advance(p,1000/60);assert.ok(Number(dinoScore(p))-Number(score)<=1,'no catch-up burst after pause');
 key(p,'KeyP');p.fire('click',{},$(p,'#jump-btn'));assert.equal(state(p),'paused','jump button does not resume');
});
test('Dino: Space or Enter on a focused header link while paused stays with the link',{todo:'GryKit resumes on Space/Enter from any non-overlay target (needs a fix in assets/gry-kit)'},()=>{
 const p=game('dino');clickStart(p);key(p,'KeyP');const link=$(p,'.site-links a');
 for(const code of['Space','Enter']){const e=key(p,code,{},link);assert.equal(state(p),'paused',code);assert.equal(e.defaultPrevented,false,code);}
});

/* ---------- Snake ---------- */
const snakeLen=p=>Number($(p,'#length').textContent);
// One movement tick (140 ms at the start), fed in frames of at most 100 ms like the game clamps them.
function snakeTicks(p,n,ms=140){for(let i=0;i<n;i++)advance(p,ms,ms/2);}
test('Snake: unrelated and modified keys never start a round',()=>{
 const p=game('snakex21');p.frame(0);p.fire('keydown',{key:'a',code:'KeyA'});p.fire('keydown',{key:'ArrowUp',code:'ArrowUp',ctrlKey:true});p.fire('keydown',{key:'x',code:'KeyX'});
 assert.equal(state(p),'menu');p.fire('keydown',{key:'ArrowUp',code:'ArrowUp'});assert.equal(state(p),'playing');
});
test('Snake: quick turns are buffered and a reversal is never accepted',()=>{
 const p=game('snakex21');clickStart(p);
 key(p,'ArrowLeft',{key:'ArrowLeft'});snakeTicks(p,3);assert.equal(state(p),'playing','reverse into the neck is ignored');
 key(p,'ArrowUp',{key:'ArrowUp'});key(p,'ArrowDown',{key:'ArrowDown'});key(p,'ArrowLeft',{key:'ArrowLeft'});
 snakeTicks(p,2);assert.equal(state(p),'playing','up then left, the down in between is ignored');
 // Head went from (12,10) up to (12,9) and left to (11,9); moving left reaches the wall after 11 more ticks.
 snakeTicks(p,11);assert.equal(state(p),'playing');snakeTicks(p,1);assert.equal(state(p),'over');p.tick(650);
 assert.match($(p,'.gk-overlay').textContent,/ścianę/);
});
test('Snake: entering the vacated tail is legal and a full board wins',()=>{
 // Hamiltonian cycle: even rows right (x 1..19), odd rows left (x 19..1), then up column 0. Contains the start (7..9,10).
 const cycle=[];for(let y=0;y<20;y++){const xs=Array.from({length:19},(_,i)=>i+1);for(const x of y%2?xs.reverse():xs)cycle.push([x,y]);}
 for(let y=19;y>=0;y--)cycle.push([0,y]);
 const at=([x,y])=>cycle.findIndex(c=>c[0]===x&&c[1]===y);
 let body=[[9,10],[8,10],[7,10]],queued=[];
 // Math.random picks the food among free cells (row-major); always put it on the next cell of the cycle.
 const random=()=>/freeCell/.test(new Error().stack)?queued.shift():0.99;   // effects use Math.random too
 const aim=()=>{const next=cycle[(at(body[0])+1)%400],used=new Set(body.map(([x,y])=>y*20+x));const free=[];for(let i=0;i<400;i++)if(!used.has(i))free.push(i);
  const i=free.indexOf(next[1]*20+next[0]);if(i>=0)queued.push((i+0.5)/free.length);};
 aim();aim();const p=game('snakex21',{random});   // the page places food at load and again at start
clickStart(p);
 const names={'1,0':'ArrowRight','-1,0':'ArrowLeft','0,1':'ArrowDown','0,-1':'ArrowUp'};let dir='1,0',stepMs=140,score=0;
 while(body.length<400){
  const next=cycle[(at(body[0])+1)%400],d=(next[0]-body[0][0])+','+(next[1]-body[0][1]);
  if(d!==dir){key(p,names[d],{key:names[d]});dir=d;}
  body.unshift(next);score+=10;if(body.length<400)aim();   // 0.99 elsewhere: never a golden bonus
  snakeTicks(p,1,stepMs);if(score%50===0)stepMs=Math.max(70,stepMs-8);
  if(body.length===5){assert.equal(snakeLen(p),5);}
  if(body.length<400)assert.equal(state(p),'playing','alive at length '+body.length);
 }
 assert.equal(snakeLen(p),400);assert.equal(state(p),'over');assert.match($(p,'.gk-overlay').textContent,/Wygrana/);
});
test('Snake: the head may follow straight into the cell its tail leaves',()=>{
 // Food right in front of the head grows the snake to 4: (10,10),(9,10),(8,10),(7,10).
 const seq=[207.5/397,207.5/397];const p=game('snakex21',{random:()=>/freeCell/.test(new Error().stack)&&seq.length?seq.shift():0.99});clickStart(p);
 snakeTicks(p,1);assert.equal(snakeLen(p),4);
 for(const k of['ArrowDown','ArrowLeft','ArrowUp']){key(p,k,{key:k});snakeTicks(p,1);}
 assert.equal(state(p),'playing','(9,10) was the tail cell');snakeTicks(p,1);assert.equal(state(p),'playing');
});
test('Snake: pause freezes movement and a restart keeps a single loop',()=>{
 const p=game('snakex21');clickStart(p);snakeTicks(p,2);key(p,'Escape');assert.equal(state(p),'paused');
 const before=drawn(p,'translate');advance(p,5000,50);assert.deepEqual(drawn(p,'translate'),before,'snake stands still');
 key(p,'Escape');snakeTicks(p,8);assert.equal(state(p),'playing','paused time did not move the snake into the wall');
 p.fire('click',{},$(p,'#new-game'));p.fire('click',{},$(p,'#new-game'));assert.equal(loops(p),1);assert.equal($(p,'#score').textContent,'0');
 snakeTicks(p,10);assert.equal(state(p),'playing','fresh snake starts at (9,10)');snakeTicks(p,1);assert.equal(state(p),'over');
});

/* ---------- Arkanoid ---------- */
const arkBall=p=>drawn(p,'arc').at(-1).slice(1,3);
const arkPaddle=p=>drawn(p,'roundRect').find(c=>c[2]===525)[1];
test('Arkanoid: duplicate starts and restarts maintain one animation loop',()=>{
 const p=game('arkanoid');clickStart(p);p.fire('click',{},$(p,'#new-game'));p.fire('click',{},$(p,'#new-game'));assert.equal(loops(p),1);
 key(p,'KeyP');key(p,'KeyP');p.fire('click',{},$(p,'#new-game'));assert.equal(loops(p),1);
});
test('Arkanoid: a lost life waits on the paddle, pause holds the wait and restart clears it',()=>{
 const p=game('arkanoid'),canvas=$(p,'#gameCanvas');clickStart(p);
 p.fire('pointermove',{clientX:400,isPrimary:true},canvas);
 for(let i=0;i<600&&$(p,'#lives').textContent==='♥♥♥';i++)advance(p,1000/60);
 assert.equal($(p,'#lives').textContent,'♥♥');advance(p,100);const waiting=arkBall(p);assert.equal(waiting[1],517,'ball rests on the paddle');
 key(p,'KeyP');advance(p,3000);key(p,'KeyP');advance(p,500);assert.deepEqual(arkBall(p),waiting,'pause does not count down the respawn');
 p.fire('click',{},$(p,'#new-game'));assert.equal($(p,'#lives').textContent,'♥♥♥');advance(p,100);assert.ok(arkBall(p)[1]<510,'restart serves at once');assert.equal(loops(p),1);
});
test('Arkanoid: scaled touch pointer maps to game coordinates and clamps paddle',()=>{
 const p=game('arkanoid'),canvas=$(p,'#gameCanvas');clickStart(p);
 p.fire('pointermove',{clientX:400,isPrimary:true,buttons:1},canvas);assert.equal(arkPaddle(p),680);
 p.fire('pointermove',{clientX:100,isPrimary:true},canvas);assert.equal(arkPaddle(p),140,'400px wide canvas shows 800 game units');
 key(p,'KeyP');p.fire('pointermove',{clientX:300,isPrimary:true},canvas);assert.equal(arkPaddle(p),140,'pointer ignored in pause');
});
test('Arkanoid: fixed-step physics agrees at 30/60/120Hz and pauses on tab hide',()=>{
 const positions=[];for(const hz of[30,60,120]){const p=game('arkanoid');clickStart(p);advance(p,1000,1000/hz);positions.push(JSON.stringify({ball:arkBall(p),lives:$(p,'#lives').textContent}));hide(p);assert.equal(state(p),'paused');}
 assert.equal(new Set(positions).size,1);
});

/* ---------- Clicker ---------- */
test('Clicker: corrupt saved structures fall back safely and never inject markup',()=>{
 for(const saved of [{bits:-4,upgrades:null},{bits:100,upgrades:[{name:'<img src=x onerror=alert(1)>',count:1,cost:1,gps:999}]}]){const p=loadGame('gry/clicker/clicker.html',{storage:{hacker_save:JSON.stringify(saved)}});assert.equal(p.run('state.upgrades.length'),6);assert.equal(p.document.querySelectorAll('#upgradeList img').length,0);assert.ok(p.run('state.bits')>=0);}
});

/* ---------- Typing ---------- */
test('Typing: completing all displayed words ends cleanly and ignores later input',()=>{
 const p=game('typing');clickStart(p);const input=$(p,'#input-field');assert.equal(p.document.activeElement,input);
 const words=[...p.document.querySelectorAll('#word-display .word')].map(w=>w.textContent);assert.ok(words.length>=90);
 for(const w of words){input.value=w+' ';p.fire('input',{},input);}
 assert.equal(input.disabled,true);assert.equal(state(p),'over');assert.equal(p.document.querySelectorAll('.word.correct').length,words.length);
 input.value='x ';p.fire('input',{},input);assert.equal(p.document.querySelectorAll('.word.error').length,0);assert.equal($(p,'#accuracy').textContent,'100%');
});
test('Typing: P is typed text, Esc pauses the clock and locks the field',()=>{
 const p=game('typing');clickStart(p);const input=$(p,'#input-field');
 key(p,'KeyP',{},input);assert.equal(state(p),'playing');input.value='p';p.fire('input',{},input);
 p.t=1000;p.tick(100);key(p,'Escape',{},input);assert.equal(state(p),'paused');assert.equal(input.disabled,true);
 const left=$(p,'#timer').textContent;for(let i=0;i<50;i++){p.frame(p.t+=100);p.tick(100);}assert.equal($(p,'#timer').textContent,left);
});

/* ---------- Space Invaders ---------- */
const invaders=()=>loadGame('gry/spaceinvaders/spaceinvaders.html');
test('Space Invaders: Space fires, unrelated keys and focused links remain untouched',()=>{
 const p=invaders();clickStart(p);const e=p.fire('keydown',{keyCode:65,code:'KeyA',key:'a'});assert.equal(e.defaultPrevented,false);
 const link=p.fire('keydown',{keyCode:32,code:'Space',key:' '},$(p,'.site-links a'));assert.equal(link.defaultPrevented,false);p.run('updateGame(0.02)');assert.equal(p.run('player.bullets.length'),0);
 p.fire('keydown',{keyCode:32,code:'Space',key:' '});p.run('updateGame(0.02)');assert.equal(p.run('player.bullets.length'),1);assert.equal(state(p),'playing','Space never pauses');
});
test('Space Invaders: last life ends immediately and dead shots cannot hit twice',()=>{
 const p=invaders();clickStart(p);p.run('player.lives=1;player.bounds.set(0,0,20,20);aliens[0].bullet={alive:true,bounds:new Rect(0,0,5,5)};resolveBulletPlayerCollisions()');assert.equal(p.run('player.lives'),0);assert.equal(p.run('hasGameStarted'),false);assert.equal(state(p),'over');assert.equal(p.run('aliens[0].bullet.alive'),false);p.run('resolveBulletPlayerCollisions()');assert.equal(p.run('player.lives'),0);
});
test('Space Invaders: a bullet scores one live enemy and round restart resets waves',()=>{
 const p=invaders();clickStart(p);p.run('aliens=aliens.slice(0,2);aliens.forEach(a=>{a.position.set(10,10);a.bounds.set(0,0,20,20);});player.bullets=[{alive:true,bounds:new Rect(0,0,5,5)}];resolveBulletEnemyCollisions();resolveBulletEnemyCollisions()');
 assert.equal(p.run('player.score'),25);assert.equal($(p,'#score').textContent,'25');assert.equal(p.run('aliens.filter(a=>a.alive).length'),1);
 p.run('wave=20;alienDirection=1');p.fire('click',{},$(p,'#start-game'));assert.equal(p.run('wave'),1);assert.equal($(p,'#wave').textContent,'1');assert.equal(p.run('alienDirection'),-1);assert.equal(p.run('player.bullets.length'),0);assert.equal(loops(p),1);
});
test('Space Invaders: invaders reaching the player end the round and hiding pauses',()=>{
 const p=invaders();clickStart(p);p.run('aliens[0].position.y=600;aliens[0].stepAccumulator=2;aliens[0].update(0.01)');assert.equal(p.run('hasGameStarted'),false);assert.equal(state(p),'over');
 p.tick(600);clickStart(p);hide(p);assert.equal(state(p),'paused');const x=p.run('aliens[0].position.x');advance(p,3000);assert.equal(p.run('aliens[0].position.x'),x);
});

/* ---------- Pong (merged game, mode from the start screen) ---------- */
const pongScores=p=>$(p,'#score-left').textContent+':'+$(p,'#score-right').textContent;
test('Pong: hidden tab and explicit pause freeze both paddles, ball and score',()=>{
 const p=game('pong');clickStart(p);advance(p,2500);const scene=()=>JSON.stringify([drawn(p,'arc'),drawn(p,'arcTo').slice(0,24)]);
 key(p,'KeyP');assert.equal(state(p),'paused');const before=scene(),score=pongScores(p);advance(p,4000);key(p,'KeyS');
 assert.equal(scene(),before);assert.equal(pongScores(p),score);key(p,'KeyP');advance(p,200);assert.notEqual(scene(),before);
 hide(p);assert.equal(state(p),'paused');
});
test('Pong: a restarted match starts from 0:0 with one loop and a fresh serve',()=>{
 const p=game('pong',{random:()=>0.9});clickStart(p);for(let i=0;i<600&&pongScores(p)==='0:0';i++)advance(p,50);assert.notEqual(pongScores(p),'0:0');
 p.fire('click',{},$(p,'#new-game'));p.fire('click',{},$(p,'#new-game'));assert.equal(pongScores(p),'0:0');assert.equal(loops(p),1);
 const ball=drawn(p,'arc').at(-2).slice(1,3);assert.equal(ball[0],450,'ball waits in the middle for the serve');
});

/* ---------- Tetris ---------- */
const tetrisScore=p=>$(p,'[data-tetris-score]').textContent;
test('Tetris: touch buttons are present, Space hard-drops and repeat/modified keys do not pause',()=>{
 const p=game('tetris');p.frame(0);const buttons=p.document.querySelectorAll('.touch-controls button');assert.equal(buttons.length,5);
 p.fire('click',{},buttons[0]);assert.equal(state(p),'playing','a touch button starts from the menu');
 const pause=$(p,'[data-gk-pause]');assert.equal(pause.textContent,'Pauza');
 key(p,'Space');assert.equal(state(p),'playing','Space is not pause');assert.equal(tetrisScore(p),'40','O piece hard-dropped 20 rows');
 key(p,'Space',{repeat:true});assert.equal(tetrisScore(p),'40','held Space drops once');
 key(p,'KeyP',{ctrlKey:true});key(p,'KeyP',{repeat:true});assert.equal(state(p),'playing');assert.equal(pause.textContent,'Pauza');
 p.fire('click',{},pause);assert.equal(pause.textContent,'Wznów');p.fire('click',{},pause);assert.equal(pause.textContent,'Pauza');
 hide(p);assert.equal(pause.textContent,'Wznów');assert.equal(state(p),'paused');assert.equal(loops(p),1);
});
test('Tetris: clicked Start, Resume and Restart restore board focus for actual arrow keys',()=>{
 const p=game('tetris'),canvas=$(p,'[data-tetris-board]'),pause=$(p,'[data-gk-pause]'),restart=$(p,'[data-action="restart"]');
 const arrowWorks=()=>{assert.equal(p.document.activeElement,canvas);const e=key(p,'ArrowDown',{},p.document.activeElement);assert.equal(e.defaultPrevented,true);};
 clickStart(p);arrowWorks();
 pause.focus();p.fire('click',{},pause);assert.equal(state(p),'paused');const resume=$(p,'.gk-overlay .kit-btn.primary');resume.focus();p.fire('click',{},resume);arrowWorks();
 pause.focus();p.fire('click',{},pause);p.fire('click',{},pause);arrowWorks();
 restart.focus();p.fire('click',{},restart);arrowWorks();
});

/* ---------- Z-Type ---------- */
const enemies=p=>[...p.document.querySelectorAll('#game-area .enemy')];
test('Z-Type: starts on request, scores a typed word, pauses and restarts without timers',()=>{
 const p=game('ztype');advance(p,10000,50);assert.equal(enemies(p).length,0);clickStart(p);advance(p,1000,50);assert.equal(enemies(p).length,1);
 const input=$(p,'#typing-input');input.value=enemies(p)[0].textContent;p.fire('input',{},input);
 assert.equal($(p,'#score').textContent,'10');assert.equal(enemies(p).length,0);
 advance(p,2000,50);assert.equal(enemies(p).length,1);key(p,'Escape',{},input);assert.equal(state(p),'paused');const top=enemies(p)[0].style.top;
 advance(p,5000,50);assert.equal(enemies(p)[0].style.top,top);assert.equal(enemies(p).length,1);
 p.fire('click',{},$(p,'#new-game'));p.fire('click',{},$(p,'#new-game'));assert.equal($(p,'#score').textContent,'0');assert.equal(enemies(p).length,0);assert.equal(loops(p),1);assert.equal(p.timers.size,0);
});
test('Z-Type: enemy reaches the board floor and cannot be shot after game over',()=>{
 const p=game('ztype');clickStart(p);for(let i=0;i<400&&state(p)==='playing';i++)advance(p,50,50);
 assert.equal(state(p),'over');const first=enemies(p).find(e=>e.classList.contains('hit'));assert.ok(parseFloat(first.style.top)>=430,'floor is board height minus the ship');
 key(p,'Key'+first.textContent[0],{key:first.textContent[0].toLowerCase()});const input=$(p,'#typing-input');input.value=first.textContent;p.fire('input',{},input);
 assert.equal(p.document.querySelectorAll('.enemy .matched').length,0);assert.equal($(p,'#score').textContent,'0');
});
test('Z-Type: falling speed is refresh-rate independent',()=>{
 // Spawns land on frame boundaries, so compare how far the same word falls in the same second.
 const falls=[];for(const hz of[30,60,120]){const p=game('ztype');clickStart(p);advance(p,1500,1000/hz);const word=enemies(p)[0],y=parseFloat(word.style.top);
  advance(p,1000,1000/hz);falls.push(parseFloat(word.style.top)-y);}
 assert.ok(Math.abs(falls[0]-30)<1e-6,'30 px/s at the start: '+falls[0]);for(const f of falls)assert.ok(Math.abs(f-falls[0])<1e-6,String(falls));
});

/* ---------- shared arcade behaviour ---------- */
test('Arcade scores: blocked storage never prevents a round or saving a new high score',()=>{
 const dino=game('dino',{blockStorage:true});clickStart(dino);advance(dino,6000);assert.equal(dino.run('GryKit.state'),'over');assert.equal($(dino,'#highscore').textContent,$(dino,'#score').textContent);assert.notEqual($(dino,'#score').textContent,'0');
 const snake=game('snakex21',{blockStorage:true,random:()=>/freeCell/.test(new Error().stack)?207.5/397:0.99});clickStart(snake);snakeTicks(snake,1);assert.equal($(snake,'#high-score').textContent,'10');
 advance(snake,3000,50);assert.equal(snake.run('GryKit.state'),'over');assert.equal($(snake,'#high-score').textContent,$(snake,'#score').textContent);snake.tick(650);assert.match($(snake,'.gk-overlay').textContent,/Nowy rekord/);
 const clicker=loadGame('gry/clicker/clicker.html',{blockStorage:true});clicker.run('state.bits=100;buy(0)');clicker.tick(5000);assert.equal(clicker.run('state.gps'),0.5);
});
test('Arcade pause hotkey works from game buttons and the header, Space never pauses',()=>{
 for(const name of['tower','flappy','dino']){const p=game(name);clickStart(p);const button=$(p,'[data-gk-pause]'),link=$(p,'.site-links a');
  key(p,'Space');assert.equal(state(p),'playing',name+' Space');
  key(p,'KeyP',{},button);assert.equal(state(p),'paused',name+' game button');key(p,'KeyP',{},link);assert.equal(state(p),'playing',name+' header link');
  key(p,'Escape',{},link);assert.equal(state(p),'paused');p.fire('click',{},button);assert.equal(state(p),'playing',name+' pause button resumes');}
});
test('Arcade: game start/resume/restart restore focus before arrow or Space input',()=>{
 const configs=[['arkanoid','#gameCanvas','ArrowRight'],['pong','#pong-canvas','ArrowUp'],['dino','#game','Space'],['tower','#game','Space'],['snakex21','#gameCanvas','ArrowUp'],['spaceinvaders','#game-canvas','ArrowRight'],['flappy','#game','Space']];
 for(const[name,id,code]of configs){const p=name==='spaceinvaders'?invaders():game(name),board=$(p,id),pause=$(p,'[data-gk-pause]'),restart=$(p,'#new-game,#start-game');
  clickStart(p);assert.equal(p.document.activeElement,board,name+' start');
  pause.focus();p.fire('click',{},pause);pause.focus();p.fire('click',{},pause);assert.equal(p.document.activeElement,board,name+' resume');
  restart.focus();p.fire('click',{},restart);assert.equal(p.document.activeElement,board,name+' restart');
  const e=key(p,code,{key:code==='Space'?' ':code,keyCode:{ArrowUp:38,ArrowRight:39,Space:32}[code]},p.document.activeElement);assert.equal(e.defaultPrevented,true,name+' key at activeElement');assert.equal(state(p),'playing');}
});
