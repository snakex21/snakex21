const test = require('node:test');
const assert = require('node:assert/strict');
const {war,simulateNormal} = require('./helpers/war-harness.cjs');

const close = (actual, expected) => assert.ok(Math.abs(actual - expected) < 1e-8, `${actual} != ${expected}`);

test('Wojna Er normal: every enemy troop has exactly the advertised player stats', () => {
  const p = war();
  const result = p.run(`ERAS.flatMap(era=>era.units.map(def=>{
    const player=new Unit(def,'player'),enemy=new Unit(def,'enemy');
    return [def.id,player.hp,enemy.hp,player.maxHp,enemy.maxHp,player.def===enemy.def];
  }))`);
  assert.equal(result.length,12);
  for (const [id,hp,enemyHP,maxHP,enemyMaxHP,sameDefinition] of result) {
    assert.equal(enemyHP,hp,id);assert.equal(enemyMaxHP,maxHP,id);assert.ok(sameDefinition,id);
  }
});

test('Wojna Er normal: XP rewards health removed, not attack frequency or overkill', () => {
  for (const team of ['player','enemy']) for (const era of [0,1,2,3]) {
    const results=[];
    for (const hits of [1,2,10,100]) {
      const p=war();
      results.push(p.run(`const target=new Unit(ERAS[${era}].units[0],'${team}'==='player'?'enemy':'player');
        for(let i=0;i<${hits};i++)damageUnit(target,target.maxHp/${hits},'${team}');
        damageUnit(target,1e9,'${team}');damageUnit(target,1e9,'${team}');
        state['${team}'==='player'?'xp':'enemyXP']`));
    }
    for(const xp of results)close(xp,22*(1+era*2));
  }
});

test('Wojna Er normal: advanced attackers cannot farm extra XP from obsolete victims', () => {
  for(const attackerEra of [0,1,2,3]) {
    const p=war();
    p.run(`const target=new Unit(ERAS[0].units[0],'enemy');damageUnit(target,10000,'player',ERAS[${attackerEra}].units[0]);`);
    close(p.run('state.xp'),22);assert.equal(p.run('state.gold'),103);
  }
});

test('Wojna Er normal: both armies receive the same explicit gold and research income in all eras', () => {
  for(const era of [0,1,2,3]) {
    const p=war();
    p.run(`startGame();state.era=${era};state.enemyEra=${era};state.gold=state.enemyGold=0;enemyElapsed=-1e9;
      for(let i=0;i<600;i++)update(STEP_MS);`);
    assert.equal(p.run('state.gold'),[7,20,65,220][era]*10);
    assert.equal(p.run('state.enemyGold'),p.run('state.gold'));
    assert.equal(p.run('state.xp'),[2,5,12,0][era]*10);
    assert.equal(p.run('state.enemyXP'),p.run('state.xp'));
  }
});

test('Wojna Er normal: AI cannot unlock an era before the player regardless of saved XP', () => {
  const p=war();
  for(const era of [0,1,2]) {
    p.run(`startGame();state.era=state.enemyEra=${era};state.enemyXP=1e9;state.elapsed=1e9;enemyAI()`);
    assert.equal(p.run('state.enemyEra'),era);
    assert.equal(p.run('state.enemyXP'),1e9);
  }
});

test('Wojna Er normal: AI waits twelve active seconds after unlock and still pays the full XP cost', () => {
  const p=war();
  p.run('startGame();state.xp=500;state.enemyXP=499;state.enemyHP=100;evolve();state.elapsed=12000;enemyAI()');
  assert.equal(p.run('state.enemyEra'),0,'Delay alone does not provide free research');
  p.run('state.enemyXP=700;state.elapsed=11999;enemyAI()');
  assert.equal(p.run('state.enemyEra'),0);
  p.run('state.elapsed=12000;enemyAI()');
  assert.equal(p.run('state.enemyEra'),1);assert.equal(p.run('state.enemyXP'),200);
  assert.equal(p.run('state.enemyHP'),600);assert.equal(p.run('state.enemyMaxHP'),1000);
});

test('Wojna Er normal: a delayed opponent cannot chain several evolutions in one response window', () => {
  const p=war();
  p.run('startGame();state.xp=6000;evolve();evolve();evolve();state.enemyXP=10000;state.elapsed=12000;enemyAI();enemyAI()');
  assert.equal(p.run('state.era'),3);assert.equal(p.run('state.enemyEra'),1);
  p.run('state.elapsed=23999;enemyAI()');assert.equal(p.run('state.enemyEra'),1);
  p.run('state.elapsed=24000;enemyAI()');assert.equal(p.run('state.enemyEra'),2);
  p.run('state.elapsed=36000;enemyAI()');assert.equal(p.run('state.enemyEra'),3);
  assert.equal(p.run('state.enemyXP'),4000);
});

test('Wojna Er normal: opening and AI order timing leave time to read and react', () => {
  const p=war();
  p.run('startGame();for(let i=0;i<239;i++)update(STEP_MS)');
  assert.equal(p.run('state.units.length'),0);
  p.run('update(STEP_MS)');assert.equal(p.run('state.units.length'),1);
  p.run('for(let i=0;i<119;i++)update(STEP_MS)');assert.equal(p.run('state.units.length'),1);
  p.run('update(STEP_MS)');assert.equal(p.run('state.units.length'),2);
});

test('Wojna Er normal: pause freezes research and the enemy evolution response window', () => {
  const p=war();
  p.run('startGame();state.xp=500;evolve();state.enemyXP=10000;setPaused(true);for(let i=0;i<3600;i++)update(STEP_MS);enemyAI()');
  assert.equal(p.run('state.elapsed'),0);assert.equal(p.run('state.xp'),0);assert.equal(p.run('state.enemyEra'),0);
  p.run('setPaused(false);for(let i=0;i<719;i++)update(STEP_MS)');assert.equal(p.run('state.enemyEra'),0);
  p.run('update(STEP_MS)');assert.equal(p.run('state.enemyEra'),1);
});

test('Wojna Er normal: E and T are repeat-safe, pause-safe and ignore text input', () => {
  const p=war();p.run('startGame();state.xp=6000;state.gold=1000');
  const input=p.document.createElement('input');p.document.body.append(input);
  function key(value,target=p.document.body,extra={}) {
    const e=new p.Event('keydown',{bubbles:true});
    for(const [name,data] of Object.entries({key:value,...extra}))Object.defineProperty(e,name,{value:data});
    target.dispatchEvent(e);
  }
  key('e',input);key('t',input);
  const header=p.document.createElement('header');header.className='site-header';
  const navigationButton=p.document.createElement('button');header.append(navigationButton);p.document.body.append(header);
  key('e',navigationButton);key('t',p.document.querySelector('a'));key('1',navigationButton);
  const editable=p.document.createElement('div');editable.setAttribute('contenteditable','true');
  const child=p.document.createElement('span');editable.append(child);p.document.body.append(editable);key('e',child);key('t',child);key('e',p.document.body,{repeat:true});key('t',p.document.body,{ctrlKey:true});
  assert.equal(p.run('state.era'),0);assert.equal(p.run('state.turret.level'),0);
  key('E',p.document.getElementById('turret-btn'));key('T',p.document.getElementById('evolve-btn'));
  key('1',p.document.getElementById('turret-btn'));
  assert.equal(p.run('state.era'),1);assert.equal(p.run('state.turret.level'),1);assert.equal(p.run('state.units.length'),1);
  p.run('setPaused(true)');key('e');key('t');assert.equal(p.run('state.era'),1);assert.equal(p.run('state.turret.level'),1);
});

test('Wojna Er normal: human-paced mixed play can finish complete battles across varied seeds', () => {
  for(const seed of [1,7,42,77,2026]) for(const orderEvery of [2,4]) {
    const result=simulateNormal(seed,{orderEvery});
    const summary=JSON.stringify({...result,events:undefined,trace:undefined});
    assert.ok(result.ended&&result.won,summary);
    assert.ok(result.seconds>=90&&result.seconds<=600,summary);
    assert.ok(result.changes[0]>=45&&result.changes[0]<=120,summary);
    assert.ok(result.era>=2&&result.enemyEra>=1,summary);
    assert.equal(result.maxEnemyLead,0,summary);assert.ok(result.minGold>=0,summary);assert.ok(result.peak<=28,summary);
    assert.ok(result.events.some(e=>e.action==='turret'),summary);
    for(let era=0;era<result.enemyChanges.length;era++)assert.ok(result.enemyChanges[era]>=result.changes[era]+11.9,summary);
  }
});

test('Wojna Er normal: inaction and ignoring defenses still have a genuine defeat condition', () => {
  for(const seed of [1,42]) {
    for(const config of [{strategy:'idle'},{orderEvery:4,turret:false}]) {
      const result=simulateNormal(seed,config);
      assert.ok(result.ended&&!result.won,JSON.stringify({...result,events:undefined,trace:undefined}));
      assert.equal(result.playerHP,0);assert.equal(result.maxEnemyLead,0);
    }
  }
});

test('Wojna Er normal: readiness is visible and focus/tab order follow start, pause and resume', () => {
  const p=war();
  const canvas=p.document.getElementById('game-canvas');
  const status=p.document.getElementById('evolution-status');
  const focus=[];canvas.focus=()=>focus.push('battlefield');
  p.document.getElementById('resume-btn').focus=()=>focus.push('resume');
  assert.equal(canvas.getAttribute('tabindex'),'-1');assert.equal(status.dataset.ready,'false');
  p.run('startGame();state.xp=500;updateUI()');
  assert.equal(canvas.getAttribute('tabindex'),'0');assert.equal(status.dataset.ready,'true');
  assert.match(status.textContent,/gotowa.*E/);assert.ok(p.document.getElementById('evolve-btn').classList.contains('ready'));
  p.run('setPaused(true)');assert.equal(canvas.getAttribute('tabindex'),'-1');assert.equal(status.dataset.ready,'false');assert.equal(focus.at(-1),'resume');
  p.run('setPaused(false)');assert.equal(canvas.getAttribute('tabindex'),'0');assert.equal(focus.at(-1),'battlefield');
  p.run('evolve()');assert.equal(status.dataset.ready,'false');assert.match(p.document.getElementById('enemy-status').textContent,/12 s/);
  p.run('state.playerHP=0;update(STEP_MS)');assert.equal(canvas.getAttribute('tabindex'),'-1');assert.equal(status.dataset.ready,'false');
});


test('Wojna Er: field resize after deferred shell layout updates the canvas bitmap', () => {
  let notify, observed;
  const p=war(1,{ResizeObserver:class {constructor(fn){notify=fn;}observe(element){observed=element;}}});
  assert.equal(observed.id,'battlefield');
  const canvas=p.document.querySelector('canvas');
  canvas.getBoundingClientRect=()=>({width:973,height:412,left:0,top:0});
  notify();assert.equal(Number(canvas.width),973);assert.equal(Number(canvas.height),412);
  notify();assert.equal(Number(canvas.height),412);
});


test('Wojna Er normal: turret-only camping cannot bank a three-era jump indefinitely', () => {
  for (const seed of [1,7,42,77,2026]) {
    const p=war(seed);
    const result=p.run(`startGame();for(let frame=0;frame<360*60&&!state.gameOver;frame++) {
      if(frame%60===0)buyTurret();update(STEP_MS);
    }({ended:state.gameOver,hp:state.playerHP,xp:state.xp,turret:state.turret.level,time:state.elapsed});`);
    assert.equal(result.turret,3);assert.equal(result.ended,true);assert.equal(result.hp,0);
    assert.ok(result.xp<6000);assert.ok(result.time<360000);
  }
});

test('Wojna Er normal: supporting defense and active mixed offense remain viable', () => {
  for(const seed of [1,7,42,77,2026]) for(const turret of [true,false]) {
    const result=simulateNormal(seed,{turret,orderEvery:turret?3:2});
    assert.equal(result.ended,true,JSON.stringify({seed,turret}));assert.equal(result.won,true,JSON.stringify({seed,turret}));
    assert.equal(result.maxEnemyLead,0);assert.ok(result.minGold>=0);
    if(!turret)assert.equal(result.events.filter(event=>event.action==='turret').length,0);
  }
});
