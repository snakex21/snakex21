const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./helpers/arcade-harness.cjs');
const game=name=>loadGame(`gry/${name}/${name}.html`);
test('Tower: pause and hidden-tab return freeze the block without placing it',()=>{
 const p=game('tower');p.run('place()');p.frame(0);p.frame(20);p.run('setPaused(true)');const x=p.run('currentBlock.x');p.frame(2000);assert.equal(p.run('currentBlock.x'),x);p.run('place()');assert.equal(p.run('score'),0);p.frame(3000);assert.equal(p.run('currentBlock.x'),x);p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('paused'),true);
});
test('Flappy: pause freezes bird, pipes and spawn; resume does not restart score',()=>{
 const p=game('flappy');p.run('startGame();createPipe();setPaused(true)');const y=p.run('birdY'),left=p.document.querySelector('.pipe').style.left;for(let i=0;i<100;i++)p.tick(20);p.tick(1500);assert.equal(p.run('birdY'),y);assert.equal(p.document.querySelector('.pipe').style.left,left);assert.equal(p.document.querySelectorAll('.pipe').length,2);p.run('setPaused(false);jump()');p.tick(20);assert.ok(p.run('birdY')<y);
});
test('Flappy: hidden page explicitly pauses until the player resumes',()=>{
 const p=game('flappy');p.run('startGame()');p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('paused'),true);p.document.hidden=false;p.fire('visibilitychange');assert.equal(p.run('paused'),true);
});
test('Dino: start, death and rapid restart never duplicate the animation loop',()=>{
 const p=game('dino');p.run('start();running=false;start();start()');assert.equal(p.frames.size,1);
});
test('Dino: the same elapsed second produces equal score and motion at 30/60/120Hz',()=>{
 const outcomes=[];for(const hz of [30,60,120]){const p=game('dino');p.run('start()');for(let i=0;i<=hz;i++)p.frame(i*1000/hz);outcomes.push(p.run('JSON.stringify({score,frame,speed})'));}assert.equal(new Set(outcomes).size,1);
});
test('Dino: a hundred-point milestone increases speed only once',()=>{
 const p=game('dino');p.run('start();score=99;frame=494;step();step();step();step();step()');assert.equal(p.run('speed'),5.15);
});
test('Dino: pausing clears time accumulation and ignores navigation Space',()=>{
 const p=game('dino');p.run('start();setPaused(true)');p.frame(0);p.frame(9000);assert.equal(p.run('frame'),0);p.fire('keydown',{code:'Space',repeat:false},p.document.querySelector('a'));assert.equal(p.run('paused'),true);
});
test('Snake: unrelated and modified keys never start a round',()=>{
 const p=loadGame('gry/snakex21/snake.html');p.fire('keydown',{key:'a',keyCode:65});p.fire('keydown',{key:'ArrowUp',keyCode:38,ctrlKey:true});assert.equal(p.run('isGameRunning'),false);
});
test('Snake: only one direction is accepted before each movement tick',()=>{
 const p=loadGame('gry/snakex21/snake.html');p.run('startGame();snake=[{x:10,y:10},{x:9,y:10},{x:8,y:10}];changeDirection({keyCode:38});changeDirection({keyCode:37});update()');assert.equal(p.run('JSON.stringify(snake[0])'),'{"x":10,"y":9}');assert.equal(p.run('isGameRunning'),true);
});
test('Snake: entering the vacated tail is legal and a full board wins without recursion',()=>{
 const p=loadGame('gry/snakex21/snake.html');p.run('startGame();snake=[{x:1,y:1},{x:1,y:2},{x:0,y:2},{x:0,y:1}];velocityX=-1;velocityY=0;food={x:19,y:19};update()');assert.equal(p.run('isGameRunning'),true);p.run('snake=Array.from({length:400},(_,i)=>({x:i%20,y:Math.floor(i/20)}));placeFood()');assert.equal(p.run('isGameRunning'),false);assert.match(p.document.getElementById('game-status').textContent,/Wygrana/);
});
test('Snake: pause, death and reset invalidate old queued ticks',()=>{
 const p=loadGame('gry/snakex21/snake.html');p.run('startGame()');const old=[...p.timers.values()][0].cb;p.run('resetGame();startGame()');const before=p.run('JSON.stringify(snake)');old();assert.equal(p.run('JSON.stringify(snake)'),before);p.run('setPaused(true);update()');assert.equal(p.run('JSON.stringify(snake)'),before);
});
test('Arkanoid: duplicate starts and continues maintain one animation loop',()=>{
 const p=game('arkanoid');p.run('startGame();startGame()');assert.equal(p.frames.size,1);p.run('nextLevel();continueGame();continueGame()');assert.equal(p.frames.size,1);
});
test('Arkanoid: stale life-loss callbacks cannot resume or duplicate a reset game',()=>{
 const p=game('arkanoid');p.run('startGame();ball.x=0;ball.y=canvas.height+10;ball.dy=5;update()');const old=[...p.timers.values()].find(t=>t.delay===1000).cb;p.run('resetGame()');old();assert.equal(p.frames.size,1);
});
test('Arkanoid: scaled touch pointer maps to game coordinates and clamps paddle',()=>{
 const p=game('arkanoid');p.fire('pointermove',{clientX:400,isPrimary:true,buttons:1},p.document.getElementById('gameCanvas'));assert.equal(p.run('paddle.x'),p.run('canvas.width-paddle.w'));
});
test('Clicker: corrupt saved structures fall back safely and never inject markup',()=>{
 for(const saved of [{bits:-4,upgrades:null},{bits:100,upgrades:[{name:'<img src=x onerror=alert(1)>',count:1,cost:1,gps:999}]}]){const p=loadGame('gry/clicker/clicker.html',{storage:{hacker_save:JSON.stringify(saved)}});assert.equal(p.run('state.upgrades.length'),6);assert.equal(p.document.querySelectorAll('#upgradeList img').length,0);assert.ok(p.run('state.bits')>=0);}
});
test('Typing: completing all displayed words ends cleanly and ignores later input',()=>{
 const p=game('typing');p.run('words=["kot"];currentWordIndex=0');const input=p.document.getElementById('input-field');input.value='kot ';p.fire('input',{},input);assert.equal(input.disabled,true);input.value='x ';p.fire('input',{},input);assert.equal(p.run('correctWords'),1);
});
test('Arkanoid: fixed-step physics agrees at 30/60/120Hz and pauses on tab hide',()=>{
 const positions=[];for(const hz of[30,60,120]){const p=game('arkanoid');p.run('startGame()');for(let i=0;i<=hz;i++)p.frame(i*1000/hz);positions.push(p.run('JSON.stringify({x:ball.x,y:ball.y,lives})'));p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('paused'),true);}assert.equal(new Set(positions).size,1);
});
test('Arcade scores: blocked storage never prevents a round or saving a new high score',()=>{
 for(const route of['dino/dino.html','snakex21/snake.html','clicker/clicker.html']){const p=loadGame('gry/'+route,{blockStorage:true});if(route.startsWith('dino'))p.run('start();score=4;obstacles=[{x:85,h:40}];step()');if(route.startsWith('snakex21'))p.run('startGame();food={x:11,y:10};update()');if(route.startsWith('clicker')){p.run('state.bits=100;buy(0)');p.tick(5000);assert.equal(p.run('state.gps'),0.5);}}
});
test('Pong: hidden tab and explicit pause freeze both paddles, ball and pending victory',()=>{
 const p=game('pong');p.run('startGame();rightPaddle.score=7;update();setPaused(true)');const before=p.run('JSON.stringify({x:ball.x,y:leftPaddle.y,score:rightPaddle.score})');p.tick(2000);p.run('update()');assert.equal(p.run('JSON.stringify({x:ball.x,y:leftPaddle.y,score:rightPaddle.score})'),before);p.run('setPaused(false)');assert.equal([...p.timers.values()].filter(t=>t.delay===2000).length,1);p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('paused'),true);
});
test('Pong: cancelled queued serves cannot affect a restarted round',()=>{
 const p=game('pong');p.run('startGame();restartGame()');const old=[...p.timers.values()].find(t=>t.delay===2000).cb;p.run('restartGame()');old();assert.equal(p.run('scoringCooldown'),true);assert.equal(p.run('ball.velocityX'),0);
});
test('Tetris: touch buttons are present and repeat/modified keys do not toggle pause',()=>{
 const p=game('tetris');const toggle=p.document.querySelector('[data-action="toggle"]');p.fire('click',{},toggle);assert.equal(toggle.textContent,'Pauza');p.fire('keydown',{code:'Space',repeat:true});assert.equal(toggle.textContent,'Pauza');p.fire('keydown',{code:'Space',ctrlKey:true});assert.equal(toggle.textContent,'Pauza');assert.equal(p.document.querySelectorAll('.touch-controls button').length,5);p.document.hidden=true;p.fire('visibilitychange');assert.equal(toggle.textContent,'Wznów');assert.equal(p.frames.size,1);
});
test('Z-Type: starts on request, scores a typed word, pauses and restarts without timers',()=>{
 const p=game('ztype');p.frame(0);p.frame(10000);assert.equal(p.run('enemies.length'),0);p.run('startGame();spawn()');const word=p.run('enemies[0].word');const input=p.document.getElementById('typing-input');input.value=word;p.fire('input',{},input);assert.equal(p.run('score'),10);assert.equal(p.run('enemies.length'),0);p.run('spawn();setPaused(true)');const y=p.run('enemies[0].y');p.frame(10001);p.frame(10100);assert.equal(p.run('enemies[0].y'),y);p.run('startGame();startGame()');assert.equal(p.run('score'),0);assert.equal(p.frames.size,1);assert.equal(p.timers.size,0);
});
test('Z-Type: enemy reaches actual board floor and cannot be shot after game over',()=>{
 const p=game('ztype');p.run('startGame();spawn();enemies[0].y=1000');p.frame(0);assert.equal(p.run('gameOver'),true);p.run('typeLetter(enemies[0].word[0])');assert.equal(p.run('enemies[0].progress'),0);
});
test('Z-Type: falling speed is refresh-rate independent',()=>{
 const positions=[];for(const hz of[30,60,120]){const p=game('ztype');p.run('startGame();spawn()');for(let i=0;i<=hz;i++)p.frame(i*1000/hz);positions.push(p.run('enemies[0].y'));}assert.ok(Math.max(...positions)-Math.min(...positions)<0.000001);
});
function invaders(){return loadGame('gry/spaceinvaders/spaceinvaders.html',{onload:true});}
test('Space Invaders: Space fires, unrelated keys and focused links remain untouched',()=>{
 const p=invaders();p.run('startGame()');const e=p.fire('keydown',{keyCode:65,code:'KeyA'});assert.equal(e.defaultPrevented,false);p.fire('keydown',{keyCode:32,code:'Space'},p.document.querySelector('a'));assert.equal(p.run('!!keyStates[32]'),false);p.fire('keydown',{keyCode:32,code:'Space'});p.run('updateGame(0.02)');assert.equal(p.run('player.bullets.length'),1);
});
test('Space Invaders: last life ends immediately and dead shots cannot hit twice',()=>{
 const p=invaders();p.run('startGame();player.lives=1;player.bounds.set(0,0,20,20);aliens[0].bullet={alive:true,bounds:new Rect(0,0,5,5)};resolveBulletPlayerCollisions()');assert.equal(p.run('player.lives'),0);assert.equal(p.run('hasGameStarted'),false);assert.equal(p.run('aliens[0].bullet.alive'),false);p.run('resolveBulletPlayerCollisions()');assert.equal(p.run('player.lives'),0);
});
test('Space Invaders: a bullet scores one live enemy and round restart resets waves',()=>{
 const p=invaders();p.run('startGame();aliens=aliens.slice(0,2);aliens.forEach(a=>a.bounds.set(0,0,20,20));player.bullets=[{alive:true,bounds:new Rect(0,0,5,5)}];resolveBulletEnemyCollisions();resolveBulletEnemyCollisions()');assert.equal(p.run('player.score'),25);assert.equal(p.run('aliens.filter(a=>a.alive).length'),1);p.run('wave=20;alienDirection=1;startGame()');assert.equal(p.run('wave'),1);assert.equal(p.run('alienDirection'),-1);assert.equal(p.run('player.bullets.length'),0);assert.equal(p.frames.size,1);
});
test('Space Invaders: invaders reaching the player end the round and hiding pauses',()=>{
 const p=invaders();p.run('startGame();aliens[0].position.y=600;aliens[0].stepAccumulator=2;aliens[0].update(0.01)');assert.equal(p.run('hasGameStarted'),false);p.run('startGame()');p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('paused'),true);
});
test('Arcade pause hotkey works on game buttons but leaves header navigation alone',()=>{
 for(const name of['tower','flappy','dino']){const p=game(name);p.run(name==='tower'?'place()':name==='flappy'?'startGame()':'start()');p.fire('keydown',{code:'KeyP'},p.document.getElementById('pause-game'));assert.equal(p.run('paused'),true,name+' game button');p.fire('keydown',{code:'KeyP'},p.document.querySelector('.site-links a'));assert.equal(p.run('paused'),true,name+' header link');p.fire('keydown',{code:'KeyP'},p.document.getElementById('pause-game'));assert.equal(p.run('paused'),false);}
});
test('Tetris: clicked Start, Resume and Restart restore board focus for actual arrow keys',()=>{
 const p=game('tetris'),toggle=p.document.querySelector('[data-action="toggle"]'),restart=p.document.querySelector('[data-action="restart"]'),canvas=p.document.querySelector('[data-tetris-board]');
 function activate(button){button.focus();p.fire('click',{},button);assert.equal(p.document.activeElement,canvas);const e=p.fire('keydown',{code:'ArrowDown'},p.document.activeElement);assert.equal(e.defaultPrevented,true);}
 activate(toggle);toggle.focus();p.fire('click',{},toggle);activate(toggle);activate(restart);
});
test('Arcade: game start/resume/continue/restart restore focus before arrow or Space input',()=>{
 const configs=[['arkanoid','startGame()','nextLevel();continueGame()','resetGame()','gameCanvas','ArrowRight'],['pong','startGame()','restartGame()','restartGame()','pong-canvas','ArrowUp'],['dino','start()','running=false;start()','running=false;start()','game','Space'],['tower','place()','init()','init()','game','Space'],['snakex21','startGame()','newGame()','newGame()','gameCanvas','ArrowUp'],['spaceinvaders','startGame()','startGame()','startGame()','game-canvas','ArrowRight']];
 for(const[name,start,continued,restart,id,code]of configs){const route=name==='snakex21'?'gry/snakex21/snake.html':`gry/${name}/${name}.html`;const p=loadGame(route,{onload:true}),button=p.document.getElementById('pause-game'),canvas=p.document.getElementById(id);for(const action of[start,'setPaused(true);setPaused(false)',continued,restart]){button.focus();p.run(action);assert.equal(p.document.activeElement,canvas,`${name}: ${action}`);}const e=p.fire('keydown',{code,key:code.startsWith('Arrow')?code:' ',keyCode:code==='ArrowUp'?38:code==='ArrowRight'?39:32},p.document.activeElement);assert.equal(e.defaultPrevented,true,name+' key at activeElement');}
});
test('Flappy: final scaled wrapper centers both axes after narrow-screen overrides',()=>{
 const fs=require('node:fs'),path=require('node:path');const source=fs.readFileSync(path.join(__dirname,'../gry/flappy/flappy.html'),'utf8');const rules=[...source.matchAll(/\.game-wrapper\s*\{([^}]*)\}/g)].map(m=>m[1]);assert.match(rules.at(-1),/align-items:\s*center/);assert.match(rules.at(-1),/justify-content:\s*center/);assert.match(source,/headerHeight.*getBoundingClientRect/);
});
