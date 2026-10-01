const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {parseHTML} = require('linkedom');
const root = path.join(__dirname, '../..');
function war(seed = 1, options = {}) {
  const {document, Event} = parseHTML(fs.readFileSync(path.join(root, 'gry/wojna_er/index.html'), 'utf8'));
  const drawing = [];
  const ctx = new Proxy({}, {get: (_, key) => key === 'createLinearGradient' ? () => ({addColorStop(){}}) : (...args) => drawing.push([key, ...args]), set: () => true});
  const canvas = document.querySelector('canvas');
  canvas.getContext = () => ctx;
  canvas.getBoundingClientRect = () => ({width:1200,height:600,left:0,top:0});
  const random = () => {seed = (Math.imul(seed,1664525) + 1013904223) >>> 0; return seed / 4294967296;};
  const context = vm.createContext({document, console, Math:Object.assign(Object.create(Math), {random}),
    window:{addEventListener(){}}, ResizeObserver:options.ResizeObserver, requestAnimationFrame(){}, cancelAnimationFrame(){}});
  const art = path.join(root, 'gry/wojna_er/art.js');
  if (fs.existsSync(art)) vm.runInContext(fs.readFileSync(art,'utf8'), context);
  vm.runInContext(options.scriptSource || fs.readFileSync(path.join(root,'gry/wojna_er/script.js'),'utf8'),context);
  return {document,Event,drawing,run:(code) => vm.runInContext(code,context,{timeout:20000})};
}
function simulate(seed, strategy, seconds=360) {
  const p=war(seed);
  return p.run(`startGame();
    let wave=0, nextOrder=0, peak=0, changes=[];
    const strategy=${JSON.stringify(strategy)};
    for(let frame=0;frame<${seconds}*60 && !state.gameOver;frame++) {
      if(frame>=nextOrder && strategy!=='idle') {
        nextOrder=frame+60;
        const oldEra=state.era; evolve(); if(state.era!==oldEra)changes.push(frame/60);
        const order=strategy==='mixed' ? [0,1,2][wave++%3] : strategy==='ranged' ? 1 : 0;
        const def=ERAS[state.era].units[order];
        for(let attempt=0;attempt<8;attempt++)spawnUnit(def.id,'player');
      }
      update(STEP_MS);peak=Math.max(peak,state.units.length);
      if(frame===${seconds}*60-1) nextOrder=frame;
      if(state.gameOver)nextOrder=frame;
    }
    ({strategy,seconds:Math.round(nextOrder/60),ended:state.gameOver,won:state.enemyHP<=0,era:state.era,enemyEra:state.enemyEra,changes,peak,playerHP:Math.round(state.playerHP),enemyHP:Math.round(state.enemyHP),xp:state.xp});`);
}
// Deliberately human-paced: one attempted order per interval, retry an
// unaffordable order later, notice evolution late, and use the visible turret.
// Trace snapshots and successful actions are returned even on defeat/timeout.
function simulateNormal(seed, options = {}) {
  const {scriptSource, ...settings} = options;
  const config = {seconds:600, orderEvery:3, opening:5, evolveReaction:8,
    turret:true, strategy:'mixed', ...settings};
  const p = war(seed, options);
  return p.run(`startGame();
    const config=${JSON.stringify(config)};
    let wave=0, nextOrder=config.opening*60, evolutionReady=Infinity;
    let peak=0, maxEnemyLead=0, minGold=100, firstDamage=null, lowestHealth=1;
    const changes=[], enemyChanges=[], events=[], trace=[];
    const stamp=()=>Math.round(state.elapsed/100)/10;
    const snapshot=()=>({seconds:stamp(),era:state.era,enemyEra:state.enemyEra,
      playerHP:Math.round(state.playerHP),enemyHP:Math.round(state.enemyHP),
      gold:state.gold,enemyGold:state.enemyGold,xp:Math.round(state.xp*100)/100,
      enemyXP:Math.round(state.enemyXP*100)/100,army:state.units.filter(u=>u.hp>0&&u.team==='player').length,
      enemyArmy:state.units.filter(u=>u.hp>0&&u.team==='enemy').length,turret:state.turret.level});
    for(let frame=0;frame<config.seconds*60&&!state.gameOver;frame++) {
      if(config.strategy!=='idle') {
        if(state.xp>=ERAS[state.era].evolveCost&&evolutionReady===Infinity)
          evolutionReady=frame+config.evolveReaction*60;
        if(frame>=evolutionReady) {
          const before=state.era;evolve();evolutionReady=Infinity;
          if(state.era!==before){changes.push(stamp());events.push({seconds:stamp(),action:'evolve',era:state.era});}
        }
        if(frame>=nextOrder) {
          nextOrder=frame+config.orderEvery*60;
          const slot=config.strategy==='mixed'?wave%3:config.strategy==='ranged'?1:0;
          const def=ERAS[state.era].units[slot];
          if(config.turret&&state.elapsed>20000&&state.turret.level<3&&state.gold>=state.turret.cost+def.cost) {
            buyTurret();events.push({seconds:stamp(),action:'turret',level:state.turret.level});
          }
          const before=state.units.length;spawnUnit(def.id,'player');
          if(state.units.length>before){wave++;events.push({seconds:stamp(),action:'recruit',unit:def.id,cost:def.cost});}
        }
      }
      const beforeEnemyEra=state.enemyEra;
      update(STEP_MS);
      if(state.enemyEra!==beforeEnemyEra) {
        enemyChanges.push(stamp());events.push({seconds:stamp(),action:'enemy-evolve',era:state.enemyEra});
      }
      peak=Math.max(peak,state.units.filter(u=>u.hp>0).length);
      maxEnemyLead=Math.max(maxEnemyLead,state.enemyEra-state.era);
      minGold=Math.min(minGold,state.gold,state.enemyGold);
      lowestHealth=Math.min(lowestHealth,state.playerHP/state.maxHP);
      if(firstDamage===null&&state.playerHP<state.maxHP)firstDamage=stamp();
      if(frame%1800===0)trace.push(snapshot());
    }
    trace.push(snapshot());
    ({strategy:config.strategy,orderEvery:config.orderEvery,seconds:stamp(),ended:state.gameOver,
      won:state.enemyHP===0,era:state.era,enemyEra:state.enemyEra,changes,enemyChanges,peak,
      maxEnemyLead,minGold,firstDamage,lowestHealth,events,trace,
      playerHP:Math.round(state.playerHP),enemyHP:Math.round(state.enemyHP)});`);
}
module.exports={war,simulate,simulateNormal};
