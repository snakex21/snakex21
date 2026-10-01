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
    const mixed=simulate(seed,'mixed',600),rush=simulate(seed,'rush',600),ranged=simulate(seed,'ranged',600);
    assert.ok(mixed.ended&&rush.ended&&ranged.ended,JSON.stringify({seed,mixed,rush,ranged}));
    mixedWins+=Number(mixed.won);rushWins+=Number(rush.won);rangedWins+=Number(ranged.won);
    assert.ok(mixed.seconds>=100&&mixed.seconds<=360,JSON.stringify({seed,mixed}));
    assert.ok(mixed.changes[0]>=45&&mixed.changes[0]<=120,JSON.stringify({seed,mixed}));
    assert.ok(mixed.era>=1,JSON.stringify({seed,mixed}));
    assert.ok(mixed.peak<=28&&rush.peak<=28&&ranged.peak<=28);
  }
  // Normal-mode research is damage-based, so failed one-unit tactics can
  // survive longer while still losing. Keep these separate from human-paced
  // purchase/evolution tests in war-balance.test.cjs.
  assert.ok(mixedWins>=2&&mixedWins>rushWins&&mixedWins>rangedWins,JSON.stringify({mixedWins,rushWins,rangedWins}));
});
test('Wojna Er: artwork clips to the virtual battlefield before any scenery is painted',()=>{
  const p=war();p.drawing.length=0;p.run('draw()');
  const scale=p.drawing.findIndex(c=>c[0]==='scale');
  const bounds=p.drawing.findIndex(c=>c[0]==='rect'&&c[1]===0&&c[2]===0&&c[3]===1200&&c[4]===600);
  const clip=p.drawing.findIndex(c=>c[0]==='clip');
  const firstScenery=p.drawing.findIndex((c,i)=>i>scale&&c[0]==='fillRect');
  assert.ok(scale<bounds&&bounds<clip&&clip<firstScenery,'Unclipped scenery may paint into the aspect-ratio gutters');
});
test('Wojna Er: different firing lines can pass a crowded ally queue, while equal-range units keep spacing',()=>{
  for(const team of ['player','enemy']) {
    const p=war();
    p.run(`startGame();const dir='${team}'==='player'?1:-1;
      const rear=new Unit(ERAS[1].units[2],'${team}');rear.x=600;
      const ahead=new Unit(ERAS[1].units[1],'${team}');ahead.x=600+dir*20;
      state.units=[rear,ahead];rear.update()`);
    assert.equal(p.run('rear.x'),team==='player'?600.5:599.5,'Siege must reach its own firing line');
    p.run('rear.x=600;ahead.def=rear.def;rear.update()');
    assert.equal(p.run('rear.x'),600,'Equal-range allies must not collapse into one position');
  }
});
test('Wojna Er: a mixed-era full army reaches and destroys the base despite recurring defenders',()=>{
  for(const seed of [1,7,42]) {
    const p=war(seed);
    const result=p.run(`startGame();state.era=3;state.gold=16747;state.xp=3204;state.enemyHP=448;
      for(let i=0;i<6;i++){const u=new Unit(ERAS[0].units[1],'player');u.x=910-i*26;state.units.push(u);}
      for(let i=0;i<5;i++){const u=new Unit(ERAS[1].units[1],'player');u.x=754-i*26;state.units.push(u);}
      for(let i=0;i<3;i++){const u=new Unit(ERAS[[2,1,2][i]].units[[0,2,1][i]],'player');u.x=624-i*26;state.units.push(u);}
      const originals=[...state.units],defs=originals.map(u=>u.def),defenders=new Set();
      let siegeFired=false;
      for(let frame=0;frame<60*60&&!state.gameOver;frame++) {
        update(STEP_MS);
        state.units.filter(u=>u.team==='enemy').forEach(u=>defenders.add(u));
        siegeFired ||= originals.some(u=>['tank','catapult'].includes(u.def.id)&&u.cooldown>0);
      }
      ({hp:state.enemyHP,ended:state.gameOver,defenders:defenders.size,siegeFired,
        oldDefinitionsPreserved:originals.every((u,i)=>u.def===defs[i]),seconds:state.elapsed/1000})`);
    assert.ok(result.defenders>=2,JSON.stringify({seed,...result}));
    assert.ok(result.siegeFired,JSON.stringify({seed,...result}));
    assert.ok(result.ended&&result.hp===0,JSON.stringify({seed,...result}));
    assert.ok(result.oldDefinitionsPreserved);
  }
});
test('Wojna Er: melee and projectiles hit the visible base front on either side',()=>{
  for(const team of ['player','enemy'])for(const slot of [0,1]) {
    const p=war();
    const result=p.run(`startGame();const dir='${team}'==='player'?1:-1,front='${team}'==='player'?1100:100;
      const attacker=new Unit(ERAS[0].units[${slot}],'${team}');
      attacker.x=front-dir*(attacker.def.range-1);state.units=[attacker];attacker.update();
      const target=attacker.target;
      for(let i=0;i<30;i++)state.projectiles.forEach(p=>p.update());
      ({target:target?.type,x:target?.x,hp:state['${team}'==='player'?'enemyHP':'playerHP']})`);
    assert.equal(result.target,'base');assert.equal(result.x,team==='player'?1100:100);
    assert.ok(result.hp<500,JSON.stringify(result));
  }
});
test('Wojna Er: defenders still intercept siege shots and approaching units never walk through enemies',()=>{
  for(const team of ['player','enemy']) {
    const p=war();
    const result=p.run(`startGame();const dir='${team}'==='player'?1:-1,front='${team}'==='player'?1100:100;
      const attacker=new Unit(ERAS[1].units[2],'${team}');attacker.x=front-dir*350;
      const defender=new Unit(ERAS[0].units[0],'${team}'==='player'?'enemy':'player');defender.x=front-dir*20;
      state.units=[attacker,defender];const startX=attacker.x;
      attacker.update();for(let i=0;i<40;i++)state.projectiles.forEach(p=>p.update());
      ({x:attacker.x,startX,defenderHP:defender.hp,hp:state['${team}'==='player'?'enemyHP':'playerHP']})`);
    assert.equal(result.x,result.startX);assert.ok(result.defenderHP<=0);assert.equal(result.hp,500);
  }
});
