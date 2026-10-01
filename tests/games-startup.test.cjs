const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const vm=require('node:vm');
const {loadGame}=require('./helpers/arcade-harness.cjs');
const context={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'../assets/js/games-data.js'),'utf8')+';this.routes=gamesCatalog.map(g=>g.url)',context);
for(const route of context.routes.filter(route=>!route.includes('wojna_er'))) {
 test(`Catalog startup: ${route} initializes with unavailable storage`,()=>{
   const page=loadGame('gry/'+route,{blockStorage:true,onload:true});
   page.frame(0);page.frame(16);assert.ok(page.document.querySelector('script'));
   assert.ok(page.document.querySelector('.site-context a'));
 });
}
