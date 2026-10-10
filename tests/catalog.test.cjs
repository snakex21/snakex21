const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { parseHTML } = require('linkedom');
const root = path.join(__dirname, '..');
function catalog(options={}) {
 const games = options.games;
 const source=fs.readFileSync(path.join(root,games?'gry/gry.html':'Programy/programy.html'),'utf8');
 const {document,Event}=parseHTML(source);
 const store=new Map(Object.entries(options.storage||{})); const events={}; let scrollTo; let focusTarget;
 for(const e of document.querySelectorAll('*')) e.focus=()=>{focusTarget=e;};
 const window={document,scrollY:options.scrollY||0,addEventListener:(event,fn)=>{events[event]=fn;},scrollTo:(x,y)=>{scrollTo=y;}};
 const location=new URL('https://example.test/'+(games?'gry/gry.html':'Programy/programy.html')+(options.query||''));
 const localStore=new Map(Object.entries(options.local||{}));
 window.localStorage={getItem:k=>{if(options.localBlocked)throw Error('blocked');return localStore.get(k)??null;},setItem:(k,v)=>{if(options.localBlocked)throw Error('blocked');localStore.set(k,String(v));}};
 const context=vm.createContext({document,window,location,URL,URLSearchParams,localStorage:window.localStorage,history:{replaceState:(_,__,url)=>{location.href=url.href;}},sessionStorage:{getItem:k=>{if(options.blocked)throw Error('blocked');return store.get(k)||null;},setItem:(k,v)=>{if(options.blocked)throw Error('blocked');store.set(k,v);}},requestAnimationFrame:fn=>fn()});
 if(games){vm.runInContext(fs.readFileSync(path.join(root,'assets/js/games-data.js'),'utf8'),context);if(options.before)options.before(context);vm.runInContext(fs.readFileSync(path.join(root,'assets/workshop/games.js'),'utf8'),context);for(const e of document.querySelectorAll('a'))e.focus=()=>{focusTarget=e;};}
 vm.runInContext(fs.readFileSync(path.join(root,'assets/workshop/catalog.js'),'utf8'),context);
 return {document,Event,store,localStore,events,location,window,get scroll(){return scrollTo;},get focus(){return focusTarget;}};
}
function type(p,text){const input=p.document.getElementById('search-input');input.value=text;input.dispatchEvent(new p.Event('input'));}
test('catalog:35 real tools match the shared homepage index and every target exists',()=>{
 const p=catalog();const cards=[...p.document.querySelectorAll('.tool-card')];assert.equal(cards.length,35);assert.equal(p.document.getElementById('catalog-total').textContent,'35');
 const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/workshop/tools-data.js'),'utf8'),ctx);assert.equal(ctx.window.toolsCatalog.length,35);
 cards.forEach((card,index)=>{const url='Programy/'+card.getAttribute('href');assert.equal(url,ctx.window.toolsCatalog[index].url);assert.ok(fs.existsSync(path.join(root,url)),url);});
});
test('catalog:query deep link supports Polish names without diacritics',()=>{
 const p=catalog({query:'?q=slow'});assert.ok([...p.document.querySelectorAll('.tool-card')].filter(c=>!c.hidden).some(c=>c.textContent.includes('Licznik Słów')));assert.match(p.document.getElementById('results-counter').textContent,/z 35/);
});
test('catalog:empty result is announced and Clear restores all tools',()=>{
 const p=catalog();type(p,'not-a-tool-xyz');assert.equal(p.document.getElementById('no-results').hidden,false);assert.match(p.document.getElementById('results-counter').textContent,/Wyświetlono 0/);
 p.document.getElementById('search-clear').dispatchEvent(new p.Event('click'));assert.equal([...p.document.querySelectorAll('.tool-card')].filter(c=>!c.hidden).length,35);assert.equal(p.focus.id,'search-input');assert.equal(p.location.search,'');
});
test('catalog:return restores query, scroll and focused link',()=>{
 const first=catalog({scrollY:426});type(first,'generator');const card=[...first.document.querySelectorAll('.tool-card')].find(c=>!c.hidden);card.dispatchEvent(new first.Event('click'));
 const p=catalog({storage:Object.fromEntries(first.store)});assert.equal(p.document.getElementById('search-input').value,'generator');assert.equal(p.scroll,426);assert.equal(p.focus.getAttribute('href'),card.getAttribute('href'));
});
test('catalog:an explicit different query does not restore an unrelated scroll position',()=>{
 const p=catalog({query:'?q=json',storage:{'workshop-catalog:tools':JSON.stringify({query:'kolor',scroll:999,resume:true})}});assert.equal(p.scroll,undefined);assert.equal(p.document.getElementById('search-input').value,'json');
});
test('catalog:blocked or malformed session storage never prevents search',()=>{
 for(const options of [{blocked:true},{storage:{'workshop-catalog:tools':'{oops'}},{storage:{'workshop-catalog:tools':'null'}}]){const p=catalog(options);type(p,'json');assert.equal([...p.document.querySelectorAll('.tool-card')].filter(c=>!c.hidden).length,1);}
});
test('catalog:games stay discoverable and missing covers never leave a blank card',()=>{
 const p=catalog({games:true});const cards=[...p.document.querySelectorAll('.game-card')];assert.ok(cards.length>20);cards.forEach(c=>{assert.ok(c.querySelector('.game-fallback').textContent);assert.ok(fs.existsSync(path.join(root,'gry',c.getAttribute('href'))));});
 type(p,'wojna');assert.equal(cards.filter(c=>!c.hidden).length,1);const war=cards.find(c=>!c.hidden);assert.equal(war.querySelector('img'),null);assert.equal(war.querySelector('.game-fallback').textContent,'WE');
});
test('shell:theme remains usable when localStorage is unavailable',()=>{
 const {document,Event}=parseHTML('<html><body><button id="theme-toggle"></button></body></html>');
 vm.runInNewContext(fs.readFileSync(path.join(root,'assets/workshop/shell.js'),'utf8'),{document,localStorage:{getItem(){throw Error('blocked');},setItem(){throw Error('blocked');}}});
 const button=document.getElementById('theme-toggle');button.dispatchEvent(new Event('click'));assert.equal(document.documentElement.getAttribute('data-theme'),'dark');assert.equal(button.getAttribute('aria-pressed'),'true');
});
test('workshop:local navigation, stylesheets and scripts resolve on every changed hub page',()=>{
 for(const file of ['index.html','Programy/programy.html','gry/gry.html','filmy/filmy glowna.html','zmiany.html']){
 const {document}=parseHTML(fs.readFileSync(path.join(root,file),'utf8'));
 for(const el of document.querySelectorAll('a[href],script[src],link[href]')){const ref=el.getAttribute('href')||el.getAttribute('src');if(/^(https?:|data:|#)/.test(ref))continue;const target=decodeURIComponent(ref.split(/[?#]/)[0]);assert.ok(fs.existsSync(path.resolve(root,path.dirname(file),target)),`${file}: ${target}`);}
 assert.equal(document.querySelectorAll('nav[aria-label="Główna nawigacja"]').length,1);assert.equal(document.querySelectorAll('#theme-toggle').length,1);
 }
});

test('catalog:pagehide retains the clicked card when the browser has already blurred it',()=>{
 const first=catalog({scrollY:350});type(first,'generator');const card=[...first.document.querySelectorAll('.tool-card')].find(c=>!c.hidden);card.dispatchEvent(new first.Event('click'));first.events.pagehide();
 const saved=JSON.parse(first.store.get('workshop-catalog:tools'));assert.equal(saved.focusHref,card.getAttribute('href'));
 const returned=catalog({storage:Object.fromEntries(first.store)});assert.equal(returned.focus.getAttribute('href'),card.getAttribute('href'));assert.equal(returned.scroll,350);
});


test('catalog: Connect4 and Wheel describe implemented modes accurately',()=>{
 const p=catalog({games:true});const data=p.window.gamesCatalog;
 const connect=data.find(g=>g.slug==='connect4');assert.deepEqual([...connect.modes],['Dwóch graczy']);assert.doesNotMatch(connect.description,/AI/);
 const wheel=data.find(g=>g.slug==='wheel');assert.match(wheel.description,/wylosować/);assert.doesNotMatch(wheel.description,/odgadnij|hasło/);
 assert.match(fs.readFileSync(path.join(root,'gry/gry.html'),'utf8'),/games-data\.js\?v=20261010-games2/);
});

function gamesWithArt(options = {}) {
 const p = catalog({ games: true, ...options, before: ctx => vm.runInContext(fs.readFileSync(path.join(root, 'assets/workshop/game-art.js'), 'utf8'), ctx) });
 return p;
}
test('catalog: every game has bundled cover art and no hot-linked images', () => {
 const ctx = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/workshop/game-art.js'), 'utf8'), ctx);
 const data = { window: {} }; vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/games-data.js'), 'utf8') + ';window.gamesCatalog=gamesCatalog', data);
 for (const game of data.window.gamesCatalog) {
  assert.match(ctx.window.gameArt[game.slug] || '', /^<svg [^>]*viewBox="0 0 160 90"[\s\S]*<\/svg>$/, game.slug);
  assert.doesNotMatch(game.cover || '', /^https?:/, game.slug);
 }
 const p = gamesWithArt();
 const cards = [...p.document.querySelectorAll('.game-card')];
 assert.ok(cards.every(card => card.querySelector('svg.game-art') && !card.querySelector('img')));
});
test('catalog: filter chips narrow games, combine with search and are remembered', () => {
 const p = gamesWithArt();
 const chip = [...p.document.querySelectorAll('.filter-chip')].find(c => c.textContent === 'We dwoje i więcej');
 chip.dispatchEvent(new p.Event('click'));
 const visible = () => [...p.document.querySelectorAll('.game-card')].filter(c => !c.hidden).map(c => c.dataset.slug);
 assert.deepEqual(visible().sort(), ['connect4', 'hardware-quiz', 'pong', 'tic-tac-toe', 'wheel']);
 assert.equal(chip.getAttribute('aria-pressed'), 'true');
 type(p, 'pong'); assert.deepEqual(visible(), ['pong']);
 const saved = JSON.parse(p.store.get('workshop-catalog:games'));
 assert.equal(saved.filter, 'Dwóch graczy|Wspólna gra');
 const again = gamesWithArt({ storage: Object.fromEntries(p.store), query: '?q=' });
 assert.equal([...again.document.querySelectorAll('.filter-chip')].find(c => c.getAttribute('aria-pressed') === 'true').textContent, 'We dwoje i więcej');
});
test('catalog: recently played games appear and bad storage is ignored', () => {
 const p = gamesWithArt({ local: { 'workshop-games:recent': JSON.stringify(['snake', 'missing', '2048']) } });
 const box = p.document.getElementById('recent-games');
 assert.equal(box.hidden, false);
 assert.deepEqual([...box.querySelectorAll('.recent-chip span')].map(s => s.textContent), ['Snake', '2048']);
 for (const local of [{ 'workshop-games:recent': '{oops' }, null]) {
  const q = gamesWithArt({ local, localBlocked: local === null });
  assert.equal(q.document.getElementById('recent-games').hidden, true);
 }
 const r = gamesWithArt({ local: {} });
 const card = [...r.document.querySelectorAll('.game-card')].find(c => c.dataset.slug === 'tetris');
 card.dispatchEvent(new r.Event('click'));
 assert.deepEqual(JSON.parse(r.localStore.get('workshop-games:recent')), ['tetris']);
});
test('catalog: "Losuj grę" opens one of the currently visible games', () => {
 const p = gamesWithArt({ local: {} });
 const chip = [...p.document.querySelectorAll('.filter-chip')].find(c => c.textContent === 'We dwoje i więcej');
 chip.dispatchEvent(new p.Event('click'));
 const clicked = [];
 for (const card of p.document.querySelectorAll('.game-card')) card.addEventListener('click', () => clicked.push(card));
 for (let i = 0; i < 20; i++) p.document.getElementById('random-game').dispatchEvent(new p.Event('click'));
 assert.equal(clicked.length, 20);
 assert.ok(clicked.every(card => !card.hidden), 'only visible games are picked');
 assert.ok(p.document.getElementById('catalog-total').textContent === '25');
});
