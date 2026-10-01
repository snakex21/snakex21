const test = require('node:test');
const assert = require('node:assert/strict');
const {war,simulate} = require('./helpers/war-harness.cjs');

test('Wojna Er: one muster at a time, blocked purchases spend nothing, and capacity is bounded',()=>{
  const p=war();p.run("startGame();spawnUnit('clubman','player');spawnUnit('slinger','player')");
  assert.equal(p.run('state.units.length'),1);assert.equal(p.run('state.gold'),85);
  p.run("for(let i=0;i<73;i++)update(STEP_MS);spawnUnit('slinger','player')");
  assert.equal(p.run("state.units.filter(u=>u.team==='player').length"),2);
  p.run("state.training.player=0;state.gold=9999;state.units=Array.from({length:14},(_,i)=>{const u=new Unit(ERAS[0].units[0],'player');u.x=200+i*30;return u});spawnUnit('clubman','player')");
  assert.equal(p.run('state.units.length'),14);assert.equal(p.run('state.gold'),9999);
});
test('Wojna Er: a front-line unit can pass a firing ally, but cannot stack on another front-line unit',()=>{
  const p=war();p.run("startGame();const front=new Unit(ERAS[0].units[0],'player');const bow=new Unit(ERAS[0].units[1],'player');front.x=200;bow.x=220;state.units=[front,bow];front.update()");
  assert.equal(p.run('front.x'),201);
  p.run("bow.def=ERAS[0].units[0];front.x=200;front.update()");
  assert.equal(p.run('front.x'),200);
});
test('Wojna Er: counter roles work in every era and on either team',()=>{
  const p=war();
  for(let era=0;era<4;era++)for(const team of ['player','enemy']) {
    const result=p.run(`(()=>{const defs=ERAS[${era}].units;const guard=defs.find(u=>u.role==='guard');const volley=defs.find(u=>u.role==='volley');const pierce=defs.find(u=>u.role==='pierce');return [damageFor(100,volley,new Unit(guard,'${team}')),damageFor(100,pierce,new Unit(guard,'${team}')),damageFor(100,volley,new Unit(pierce,'${team}'))]})()`);
    assert.deepEqual(Array.from(result),[65,150,150]);
  }
});
test('Wojna Er: fortification resistance and siege bonus are symmetric',()=>{
  const p=war();p.run("startGame();damageBase('player',100,ERAS[0].units[0]);damageBase('enemy',100,ERAS[0].units[0])");
  assert.equal(p.run('state.enemyHP'),478);assert.equal(p.run('state.playerHP'),478);
  p.run("damageBase('player',100,ERAS[1].units[2])");assert.equal(p.run('state.enemyHP'),445);
});
test('Wojna Er: an affordable counter is chosen under pressure; no random unaffordable skip',()=>{
  const p=war();p.run("startGame();state.enemyGold=25;state.units=[new Unit(ERAS[0].units[1],'enemy'),new Unit(ERAS[0].units[2],'player')];state.units[0].x=990;state.units[1].x=1000;enemyAI()");
  assert.equal(p.run("state.units.at(-1).def.id"),'clubman');assert.equal(p.run('state.enemyGold'),10);
});
test('Wojna Er: evolution scales income for both armies and paused training never advances',()=>{
  const p=war();p.run('startGame();state.era=2;state.enemyEra=2;state.gold=0;state.enemyGold=0;state.training.player=900;setPaused(true);update(1000)');
  assert.equal(p.run('state.training.player'),900);assert.equal(p.run('state.gold'),0);
  p.run('setPaused(false);for(let i=0;i<60;i++)update(STEP_MS)');assert.equal(p.run('state.gold'),65);assert.equal(p.run('state.enemyGold'),65);
});
test('Wojna Er: only one kill bounty is granted and particle bursts remain bounded',()=>{
  const p=war();p.run("startGame();const victim=new Unit(ERAS[0].units[0],'enemy');damageUnit(victim,100,'player',ERAS[0].units[0]);damageUnit(victim,100,'player',ERAS[0].units[0]);for(let i=0;i<500;i++)addParticle(0,0,'impact',14)");
  assert.equal(p.run('state.xp'),22);assert.equal(p.run('state.gold'),103);assert.equal(p.run('state.particles.length'),140);
});
test('Wojna Er: all twelve silhouettes render with balanced transforms and never consume combat randomness',()=>{
  const p=war();p.run('Math.random=()=>{throw new Error("art consumed combat RNG")};startGame()');
  const signatures=[];
  for(let era=0;era<4;era++)for(let slot=0;slot<3;slot++) {
    p.drawing.length=0;p.run(`const sample${era}${slot}=new Unit(ERAS[${era}].units[${slot}],'player');sample${era}${slot}.draw(ctx)`);
    assert.equal(p.drawing.filter(c=>c[0]==='save').length,p.drawing.filter(c=>c[0]==='restore').length);
    signatures.push(JSON.stringify(p.drawing));
  }
  assert.equal(new Set(signatures).size,12);
  for(let era=0;era<4;era++){p.drawing.length=0;p.run(`state.era=${era};state.enemyEra=${era};draw()`);assert.equal(p.drawing.filter(c=>c[0]==='save').length,p.drawing.filter(c=>c[0]==='restore').length);}
});
test('Wojna Er: seeded mixed armies have an opening and advance through eras; one-unit spam is not dominant',()=>{
  let mixedWins=0, rushWins=0, rangedWins=0;
  for(const seed of [1,7,42,77]) {
    const mixed=simulate(seed,'mixed'),rush=simulate(seed,'rush'),ranged=simulate(seed,'ranged');
    assert.ok(mixed.ended&&rush.ended&&ranged.ended,JSON.stringify({seed,mixed,rush,ranged}));
    mixedWins+=Number(mixed.won);rushWins+=Number(rush.won);rangedWins+=Number(ranged.won);
    assert.ok(mixed.seconds>=100&&mixed.seconds<=360,JSON.stringify({seed,mixed}));
    assert.ok(mixed.changes[0]>=45&&mixed.changes[0]<=120,JSON.stringify({seed,mixed}));
    assert.ok(mixed.era>=1,JSON.stringify({seed,mixed}));
    assert.ok(mixed.peak<=28&&rush.peak<=28&&ranged.peak<=28);
  }
  assert.ok(mixedWins>=3&&mixedWins>rushWins&&mixedWins>rangedWins,JSON.stringify({mixedWins,rushWins,rangedWins}));
});
