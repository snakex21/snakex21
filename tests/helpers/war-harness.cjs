const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const {parseHTML} = require('linkedom');
const root = path.join(__dirname, '../..');
function war(seed = 1) {
  const {document} = parseHTML(fs.readFileSync(path.join(root, 'gry/wojna_er/index.html'), 'utf8'));
  const drawing = [];
  const ctx = new Proxy({}, {get: (_, key) => key === 'createLinearGradient' ? () => ({addColorStop(){}}) : (...args) => drawing.push([key, ...args]), set: () => true});
  const canvas = document.querySelector('canvas');
  canvas.getContext = () => ctx;
  canvas.getBoundingClientRect = () => ({width:1200,height:600,left:0,top:0});
  const random = () => {seed = (Math.imul(seed,1664525) + 1013904223) >>> 0; return seed / 4294967296;};
  const context = vm.createContext({document, console, Math:Object.assign(Object.create(Math), {random}),
    window:{addEventListener(){}}, requestAnimationFrame(){}, cancelAnimationFrame(){}});
  const art = path.join(root, 'gry/wojna_er/art.js');
  if (fs.existsSync(art)) vm.runInContext(fs.readFileSync(art,'utf8'), context);
  vm.runInContext(fs.readFileSync(path.join(root,'gry/wojna_er/script.js'),'utf8'),context);
  return {document,drawing,run:(code) => vm.runInContext(code,context,{timeout:20000})};
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
module.exports={war,simulate};
