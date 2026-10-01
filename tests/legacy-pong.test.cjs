const test=require('node:test');
const assert=require('node:assert/strict');
const {loadGame}=require('./helpers/arcade-harness.cjs');
const ping=()=>loadGame('gry/pingpong/Ping-pong.html');
const coop=()=>loadGame('gry/pongcoop/pongcoop.html');
test('Legacy Ping-Pong: waits for Start and rapid restarts retain one timer',()=>{
 const p=ping();const before=p.run('ball.x');p.tick(20);assert.equal(p.run('ball.x'),before);p.run('restartGame();restartGame();restartGame()');assert.equal(p.timers.size,1);p.tick(20);assert.notEqual(p.run('ball.x'),before);
});
test('Legacy Ping-Pong: seventh point stops immediately, stays visible and restarts cleanly',()=>{
 const p=ping();p.run('restartGame();user.score=6;ball.x=cvs.width;ball.y=10;ball.velocityX=5;ball.velocityY=0;update()');assert.equal(p.run('user.score'),7);assert.equal(p.run('running'),false);assert.match(p.document.getElementById('game-status').textContent,/Wygrywasz/);for(let i=0;i<50;i++)p.tick(20);assert.equal(p.run('user.score'),7);p.run('restartGame()');assert.equal(p.run('user.score'),0);assert.equal(p.run('running'),true);
});
test('Legacy Ping-Pong: scaled pointer clamps paddle and pause rejects site shortcuts',()=>{
 const p=ping();p.run('restartGame()');p.fire('pointerdown',{clientY:400,pointerId:1},p.document.getElementById('pong'));assert.equal(p.run('user.y'),420);p.fire('keydown',{code:'KeyP'},p.document.querySelector('.site-links a'));assert.equal(p.run('paused'),false);p.fire('keydown',{code:'KeyP'},p.document.getElementById('pause-game'));assert.equal(p.run('paused'),true);const before=p.run('ball.x');p.tick(20);assert.equal(p.run('ball.x'),before);p.run('setPaused(false)');p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('paused'),true);
});
test('Legacy Pong Coop: unrelated/site/repeat keys cannot start or resume a round',()=>{
 const p=coop();p.fire('keydown',{code:'KeyX',key:'x'});p.fire('keydown',{code:'Enter'},p.document.querySelector('.site-links a'));assert.equal(p.run('state.running'),false);p.fire('keydown',{code:'Enter'});assert.equal(p.run('state.running'),true);p.fire('keydown',{code:'Escape'});assert.equal(p.run('state.paused'),true);p.fire('keydown',{code:'Escape',repeat:true});assert.equal(p.run('state.paused'),true);const x=p.run('state.x');p.tick(30);assert.equal(p.run('state.x'),x);
});
test('Legacy Pong Coop: point waits for explicit serve and seventh point ends once',()=>{
 const p=coop();p.run('startGame();state.x=645;state.y=5;state.vx=5;update()');assert.equal(p.run('state.leftScore'),1);assert.equal(p.run('state.running'),false);for(let i=0;i<50;i++)p.tick(30);assert.equal(p.run('state.leftScore'),1);p.run('startGame();state.leftScore=6;state.x=645;state.y=5;state.vx=5;update()');assert.equal(p.run('state.leftScore'),7);assert.equal(p.run('state.over'),true);assert.match(p.document.getElementById('game-status').textContent,/Wygrywa lewy/);p.run('startGame()');assert.equal(p.run('state.leftScore'),0);assert.equal(p.run('state.running'),true);
});
test('Legacy Pong Coop: repeated restart retains one loop, pointer maps each half and hide pauses',()=>{
 const p=coop();p.run('restartGame();restartGame();restartGame()');assert.equal(p.timers.size,1);const canvas=p.document.getElementById('c');p.fire('pointerdown',{clientX:20,clientY:400,pointerId:1},canvas);p.fire('pointerdown',{clientX:390,clientY:0,pointerId:2},canvas);assert.equal(p.run('state.left'),380);assert.equal(p.run('state.right'),0);p.document.hidden=true;p.fire('visibilitychange');assert.equal(p.run('state.paused'),true);
});
test('Legacy Pong controls return focus to the playfield after start and resume',()=>{
 for(const[name,load,id]of[['Ping-Pong',ping,'pong'],['Pong Coop',coop,'c']]){const p=load(),canvas=p.document.getElementById(id),button=p.document.getElementById('pause-game');button.focus();p.run('restartGame()');assert.equal(p.document.activeElement,canvas,name+' restart');button.focus();p.run('setPaused(true);setPaused(false)');assert.equal(p.document.activeElement,canvas,name+' resume');const e=p.fire('keydown',{code:'ArrowUp',key:'ArrowUp'},p.document.activeElement);assert.equal(e.defaultPrevented,true);}
});
