const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
const root = path.join(__dirname, '..');
// Loads a page like a browser: classic scripts in order, then deferred ones; local <script src> files (game scripts,
// the Wordle dictionary, the shared GryKit layer) run, other shared site assets stay out. Timers and rAF are manual.
function load(file, options = {}) {
  const source = fs.readFileSync(path.join(root, file), 'utf8');
  const { document, Event, HTMLElement } = parseHTML(source);
  Object.defineProperty(HTMLElement.prototype, 'innerText', {get(){return this.textContent;},set(v){this.textContent=String(v);}, configurable:true});
  const timers = new Map(), frames = new Map(), alerts = [], events = {}, storage = new Map(Object.entries(options.storage || {}));
  let next=1, now=1000, seed=123;
  const random = () => {seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296;};
  const canvasContext = new Proxy({}, {get:(_,k)=>k==='measureText'?s=>({width:String(s).length*8}):/^create.*Gradient$/.test(k)?()=>({addColorStop(){}}):()=>{},set:()=>true});
  const prepare = el => {
    if (el.tagName === 'CANVAS') { el.getContext = () => canvasContext; el.width ||= Number(el.getAttribute('width') || 300); el.height ||= Number(el.getAttribute('height') || 150); }
    el.getBoundingClientRect = () => ({left:0,top:0,width:400,height:400,right:400,bottom:400,x:0,y:0});
    el.focus = () => {}; el.scrollIntoView = () => {}; el.setPointerCapture = () => {};
    el.animate = () => ({onfinish:null,cancel(){},finished:Promise.resolve()});
    return el;
  };
  for (const el of document.querySelectorAll('*')) prepare(el);
  const create = document.createElement.bind(document);
  document.createElement = (...args) => prepare(create(...args));
  const computed = () => ({position:'static',display:'block',zoom:'1',paddingLeft:'0',paddingRight:'0',paddingBottom:'0',marginTop:'0',marginBottom:'0',fontFamily:'Inter, sans-serif',getPropertyValue:()=>''});
  const matchMedia = () => ({matches:false,addEventListener(){},removeEventListener(){},addListener(){},removeListener(){}});
  const location = new URL('https://example.test/' + file + (options.query || ''));
  location.replace = url => { location.replaced = String(url); };
  const window = {addEventListener(type,cb){(events[type] ||= []).push(cb);},removeEventListener(){},innerWidth:800,innerHeight:800,scrollY:0,devicePixelRatio:1,matchMedia,getComputedStyle:computed,scrollTo(){}};
  window.parent = window;
  if(!options.noAudio) window.AudioContext=class {currentTime=0;state='running';destination={};sampleRate=8000;resume(){return Promise.resolve();}createOscillator(){return {frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},start(){},stop(){}};}createGain(){return {gain:{value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},linearRampToValueAtTime(){}},connect(){}};}createBuffer(){return {getChannelData:()=>[]};}createBufferSource(){return {connect(){},start(){},stop(){}};}createBiquadFilter(){return {frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){}};}};
  const localStorage = {getItem(k){if(options.blockStorage)throw Error('blocked');return storage.get(k)??null;},setItem(k,v){if(options.blockStorage)throw Error('blocked');storage.set(k,String(v));},removeItem(k){if(options.blockStorage)throw Error('blocked');storage.delete(k);}};
  const context=vm.createContext({document,window,Event,HTMLElement,console,location,URL,URLSearchParams,navigator:{userAgent:'Test',vendor:''},
    Math:Object.assign(Object.create(Math),{random}),getComputedStyle:computed,matchMedia,innerWidth:800,innerHeight:800,scrollY:0,devicePixelRatio:1,
    Date:class extends Date {static now(){return now;}},performance:{now:()=>now},
    localStorage,alert:s=>alerts.push(s),confirm:()=>true,
    setTimeout(cb,ms=0){const id=next++;timers.set(id,{cb,ms,repeat:false});return id;},clearTimeout:id=>timers.delete(id),
    setInterval(cb,ms=0){const id=next++;timers.set(id,{cb,ms,repeat:true});return id;},clearInterval:id=>timers.delete(id),
    requestAnimationFrame(cb){const id=next++;frames.set(id,cb);return id;},cancelAnimationFrame:id=>frames.delete(id)});
  for (const k of ['setTimeout','clearTimeout','setInterval','clearInterval','requestAnimationFrame','cancelAnimationFrame','localStorage','location','navigator','performance']) window[k]=context[k];
  const run=js=>vm.runInContext(js,context,{timeout:5000});
  const scripts=[...document.querySelectorAll('script')];
  for(const node of [...scripts.filter(n=>!n.hasAttribute('defer')),...scripts.filter(n=>n.hasAttribute('defer'))]){
    const src=node.getAttribute('src');
    if(!src){if(node.textContent.trim())run(node.textContent);continue;}
    const clean=src.split(/[?#]/)[0];
    if(/assets\/gry-kit\/gry-kit\.js$/.test(clean)){run(fs.readFileSync(path.resolve(root,path.dirname(file),clean),'utf8'));context.GryKit=window.GryKit;}
    else if(!clean.startsWith('../../')&&!/^https?:/.test(clean))run(fs.readFileSync(path.resolve(root,path.dirname(file),clean),'utf8'));
  }
  return {document,Event,run,context,timers,frames,alerts,events,storage,location,
    get kit(){return context.GryKit;},
    tick(ms){now+=ms;for(const [id,t] of [...timers])if(t.ms===ms&&timers.has(id)){if(!t.repeat)timers.delete(id);t.cb();}},
    frame(ms=16){now+=ms;const cbs=[...frames.values()];frames.clear();for(const cb of cbs)cb(now);},
    flush(limit=2000){for(let i=0;i<limit&&(timers.size||frames.size);i++){if(frames.size)this.frame();else{const [id,t]=[...timers].sort((a,b)=>a[1].ms-b[1].ms)[0];now+=t.ms;if(!t.repeat)timers.delete(id);t.cb();}}},
    click(selector){const el=typeof selector==='string'?document.querySelector(selector):selector;el.dispatchEvent(new Event('click',{bubbles:true}));},
    advance(ms){now+=ms;for(const [id,t] of [...timers])if(t.ms<=ms&&timers.has(id)){if(!t.repeat)timers.delete(id);t.cb();}},
    key(key,extra={}){const e=new Event('keydown',{bubbles:true,cancelable:true});Object.assign(e,{key,...extra});const stop=e.stopImmediatePropagation;e.stopImmediatePropagation=function(){e.stopped=true;return stop.call(this);};document.dispatchEvent(e);if(!e.stopped)for(const cb of events.keydown||[])cb(e);return e;},
    start(mode){context.GryKit.start(mode);}
  };
}
const boardPaths={simon:'gry/simon/simon.html',saper:'gry/saper/saper.html',chess:'gry/chess/chess.html',connect4:'gry/connect4/connect4.html',wordle:'gry/wordle/wordle.html',sudoku:'gry/sudoku/sudoku.html',pasjans:'gry/pasjans/pasjans.html',memory:'gry/gra zapamietywanie/gra zapamietywanie.html',ttt:'gry/kolkokrzyrzykc/kolkokrzyzykc.html',kolkos:'gry/kolkos/kolkos.html',hangman:'gry/wisielec/wisielec.html',quiz:'gry/quiz/quiz.html',wheel:'gry/kolo_fortuny/kolo_fortuny.html'};
const game=(name,options)=>load(boardPaths[name],options);
const $=(p,sel)=>p.document.querySelector(sel);
const $$=(p,sel)=>[...p.document.querySelectorAll(sel)];
const text=(p,sel)=>$(p,sel).textContent;
const overlay=p=>$(p,'.gk-overlay');
const clickPrimary=p=>p.click('.gk-overlay .kit-btn.primary');
const ms=(p,delay)=>[...p.timers.values()].filter(t=>t.ms===delay).length;

/* ---------- Simon ---------- */
const litPad=p=>['0','1','2','3'].map(id=>p.document.getElementById(id)).find(el=>el.classList.contains('lit'));
test('Simon: repeated start leaves one playback timer and no stale next round',()=>{
  const p=game('simon');
  p.key('1');assert.equal(p.timers.size,0,'menu keys do not play');
  clickPrimary(p);p.start();
  assert.equal(p.kit.state,'playing');assert.equal(overlay(p).hidden,true);
  assert.equal(p.timers.size,1);
  p.tick(800);const pad=litPad(p);assert.ok(pad);p.tick(200);
  assert.equal(text(p,'#msg'),'Twoja kolej');
  p.click(pad);assert.equal(text(p,'#score'),'1');
  p.start();p.tick(1000);
  assert.equal(text(p,'#score'),'1','stale nextRound from the previous game must not fire');
});
test('Simon: silent devices can start and play; record shows without storage',()=>{
  const p=load(boardPaths.simon,{noAudio:true,blockStorage:true});
  p.start();p.tick(800);const pad=litPad(p);p.tick(200);
  assert.equal(text(p,'#msg'),'Twoja kolej');
  p.click(pad);assert.equal(text(p,'#best'),'1');
});

/* ---------- Saper ---------- */
const cells=p=>$$(p,'#grid .cell');
const rightClick=(p,el)=>el.dispatchEvent(new p.Event('contextmenu',{bubbles:true,cancelable:true}));
test('Saper: all eight neighbors are counted at every edge',()=>{
  const p=game('saper');
  for(let bomb=0;bomb<100;bomb++){
    p.start('easy');
    const squares=cells(p);assert.equal(squares.length,100);
    squares.forEach((s,i)=>s.dataset.type=i===bomb?'bomb':'valid');
    p.click(squares[Math.floor(bomb/10)<5?99:0]);
    for(let i=0;i<100;i++)if(i!==bomb){
      const expected=+(Math.abs(i%10-bomb%10)<=1&&Math.abs(Math.floor(i/10)-Math.floor(bomb/10))<=1);
      assert.equal(Number(squares[i].dataset.n),expected,`bomb ${bomb}, cell ${i}`);
    }
    assert.equal(squares[bomb].dataset.type,'bomb');
  }
});
test('Saper: flag at the limit can still be removed',()=>{
  const p=game('saper');p.start('easy');const squares=cells(p);
  for(let i=0;i<10;i++)rightClick(p,squares[i]);
  assert.equal(text(p,'#bomb-count'),'0');
  rightClick(p,squares[10]);assert.equal(squares[10].classList.contains('flag'),false);
  rightClick(p,squares[0]);assert.equal(squares[0].classList.contains('flag'),false);
  assert.equal(text(p,'#bomb-count'),'1');
});
test('Saper: pause freezes the clock; restart clears the old cascade and resets the timer',()=>{
  const p=game('saper');p.start('easy');
  p.click(cells(p)[55]);
  for(let i=0;i<8;i++)p.tick(250);
  assert.equal(text(p,'#timer'),'0:02');
  p.key('Escape');assert.equal(p.kit.state,'paused');
  for(let i=0;i<20;i++)p.tick(250);
  p.key('Escape');assert.equal(p.kit.state,'playing');p.tick(250);
  assert.equal(text(p,'#timer'),'0:02');
  const bomb=cells(p).find(s=>s.dataset.type==='bomb'&&!s.classList.contains('flag'));
  p.click(bomb);assert.equal(p.kit.state,'over');assert.ok(p.timers.size>2,'mine cascade is scheduled');
  p.click('#reset-btn');
  assert.equal(p.kit.state,'playing');assert.equal(text(p,'#timer'),'0:00');
  p.flush();
  assert.equal($$(p,'#grid .revealed').length,0);assert.equal($$(p,'#grid .boom').length,0);
  assert.equal(text(p,'#timer'),'0:00');
});
test('Saper: revealing every safe cell wins without flags and saves the time record',()=>{
  const p=game('saper');p.start('easy');
  p.click(cells(p)[0]);p.tick(250);
  for(const s of cells(p))if(s.dataset.type==='valid'&&!s.classList.contains('revealed'))p.click(s);
  assert.equal(p.kit.state,'over');
  assert.match(text(p,'#saper-status'),/Wygrana/);
  assert.ok(p.storage.get('gry:saper:best:easy'));
});
test('Saper: first revealed mine is relocated with mine count preserved; touch flag mode toggles',()=>{
  const p=game('saper');p.start('easy');
  const bomb=cells(p).find(s=>s.dataset.type==='bomb');p.click(bomb);
  assert.equal(p.kit.state,'playing');assert.equal(bomb.classList.contains('revealed'),true);
  assert.equal(cells(p).filter(s=>s.dataset.type==='bomb').length,10);
  p.start('easy');p.click('#flag-mode');
  p.click(cells(p)[0]);assert.equal(text(p,'#bomb-count'),'9');assert.equal(cells(p)[0].classList.contains('flag'),true);
  p.click(cells(p)[0]);assert.equal(text(p,'#bomb-count'),'10');
  assert.equal($(p,'#flag-mode').getAttribute('aria-pressed'),'true');
});

/* ---------- Szachy ---------- */
test('Chess: reset cancels pending AI and mode change needs no global event',()=>{
  const p=game('chess');
  p.run('handleSquareClick(6,0)');assert.equal(p.run('selectedPiece'),null,'board ignores clicks under the start screen');
  p.start('ai');p.run('handleSquareClick(6,0);handleSquareClick(4,0)');
  assert.equal(p.run('currentPlayer'),'black');assert.equal(ms(p,500),1);
  p.run('resetGame()');
  const before=p.run('JSON.stringify(board)');p.tick(500);
  assert.equal(p.run('JSON.stringify(board)'),before);
  assert.doesNotThrow(()=>p.run("setMode('pvp')"));
});
test('Chess: repeated reset as black schedules just one opening AI move',()=>{
  const p=game('chess');p.start('ai');
  p.run("playerColor='black';resetGame();resetGame();resetGame()");
  assert.equal(ms(p,500),1);p.tick(500);
  assert.equal(p.run('currentPlayer'),'black');
  assert.equal(p.run('board.flat().filter(Boolean).length'),32);
});
test('Chess: promotion locks board input until a piece is chosen',()=>{
  const p=game('chess');p.start('pvp');
  p.run("pendingPromotion={row:0,col:0,color:'white'};handleSquareClick(6,0)");
  assert.equal(p.run('selectedPiece'),null);
  p.run('pendingPromotion=null;handleSquareClick(6,0)');
  assert.deepEqual(JSON.parse(p.run('JSON.stringify(selectedPiece)')),{row:6,col:0});
});
test('Chess: pawn attacks, castling and king captures use legal constraints',()=>{const p=game('chess');p.run("board.forEach(row=>row.fill(null));board[7][4]={type:'king',color:'white',hasMoved:false};board[7][7]={type:'rook',color:'white',hasMoved:false};board[0][4]={type:'king',color:'black',hasMoved:false};board[6][4]={type:'pawn',color:'black',hasMoved:true}");assert.equal(p.run("isSquareUnderAttack(7,5,'black')"),true);assert.equal(p.run("isSquareUnderAttack(7,4,'black')"),false);assert.equal(p.run('isValidMove(7,4,7,6)'),false);p.run("board[6][4]=null;board[6][0]={type:'rook',color:'white',hasMoved:false};board[0][0]={type:'king',color:'black',hasMoved:false}");assert.equal(p.run('isValidMove(6,0,0,0)'),false);});
test('Chess: a basic legal human and AI move preserve 32 pieces',()=>{
  const p=game('chess');clickPrimary(p);
  assert.equal(p.kit.mode,'ai');
  p.run('handleSquareClick(6,4);handleSquareClick(4,4)');
  assert.equal(p.run('currentPlayer'),'black');p.tick(500);
  assert.equal(p.run('currentPlayer'),'white');
  assert.equal(p.run('board.flat().filter(Boolean).length'),32);
  assert.equal($$(p,'#chess-board .last-move').length,2);
});
test('Chess: a pinned rook cannot expose its king; normal castling moves both pieces',()=>{const p=game('chess');p.start('pvp');p.run("board.forEach(row=>row.fill(null));board[7][4]={type:'king',color:'white',symbol:pieces.white.king,hasMoved:false};board[6][4]={type:'rook',color:'white',symbol:pieces.white.rook,hasMoved:false};board[0][4]={type:'rook',color:'black',symbol:pieces.black.rook,hasMoved:false};board[0][0]={type:'king',color:'black',symbol:pieces.black.king,hasMoved:false}");assert.equal(p.run('isValidMove(6,4,6,3)'),false);p.run("board[0][4]=null;board[6][4]=null;board[7][7]={type:'rook',color:'white',symbol:pieces.white.rook,hasMoved:false};handleSquareClick(7,4);handleSquareClick(7,6)");assert.equal(p.run('board[7][6].type'),'king');assert.equal(p.run('board[7][5].type'),'rook');});

/* ---------- Czwórki ---------- */
const tokens=p=>$$(p,'#board .slot.red, #board .slot.yellow').length;
test('Connect4: a full draw ends the round and restart clears it',()=>{
  const p=game('connect4');
  p.run('dropToken(0)');assert.equal(tokens(p),0,'no drops under the start screen');
  p.start();
  p.run('board=Array.from({length:7},(_,c)=>Array.from({length:6},(_,r)=>((Math.floor(c/2)+r)%2)+1));board[6][5]=0;currentPlayer=1;dropToken(6)');
  assert.equal(p.run('gameOver'),true);assert.equal(p.kit.state,'over');
  assert.match(text(p,'.status'),/Remis/);
  p.start();p.flush();
  assert.equal(p.run('gameOver'),false);assert.equal(p.run('board.flat().filter(Boolean).length'),0);
  assert.equal(tokens(p),0);assert.equal(p.kit.state,'playing');
});
test('Connect4: legal horizontal win freezes turns and full columns reject drops',()=>{
  const p=game('connect4');p.start();
  p.run('[0,0,1,1,2,2,3].forEach(dropToken)');
  assert.equal(p.run('gameOver'),true);assert.match(text(p,'.status'),/Czerwone/);
  p.flush();assert.equal($$(p,'#board .slot.win').length,4);
  const before=p.run('JSON.stringify(board)');p.run('dropToken(4)');
  assert.equal(p.run('JSON.stringify(board)'),before);
  p.start();p.run('for(let i=0;i<7;i++)dropToken(0)');
  assert.equal(p.run('board[0].filter(Boolean).length'),6);
  assert.equal($$(p,'#board .slot.win').length,0);
});

/* ---------- Pasjans ---------- */
test('Solitaire: new deal clears selected waste card before a move',()=>{
  const p=game('pasjans');p.start();
  p.run("drawCard();selected={type:'waste',index:0,cardIndex:0};initGame()");
  assert.equal(p.run('selected'),null);
  assert.doesNotThrow(()=>p.run('attemptMoveToPile(0);attemptMoveToFoundation(0)'));
});
test('Solitaire: deals preserve 52 cards and valid foundation moves flip newly exposed card',()=>{const p=game('pasjans');p.start();assert.equal(p.run('stock.length+piles.flat().length'),52);p.run("piles[0]=[{...createCard('♣','2'),faceUp:false},{...createCard('♥','A'),faceUp:true}];selected={type:'pile',index:0,cardIndex:1};attemptMoveToFoundation(0)");assert.equal(p.run('foundations[0][0].value'),'A');assert.equal(p.run('piles[0][0].faceUp'),true);});
test('Solitaire: a foundation top card can return to a legal tableau pile',()=>{
  const p=game('pasjans');
  p.run('drawCard()');assert.equal(p.run('waste.length'),0,'stock is inert under the start screen');
  p.start();
  p.run("foundations[0]=[{...createCard('♥','A'),faceUp:true}];piles[0]=[{...createCard('♣','2'),faceUp:true}];clickFoundation(0);attemptMoveToPile(0)");
  assert.equal(p.run('foundations[0].length'),0);assert.equal(p.run('piles[0][1].value'),'A');
});
test('Solitaire: pause freezes the clock',()=>{
  const p=game('pasjans');p.start();
  for(let i=0;i<8;i++)p.tick(250);
  assert.equal(text(p,'#time'),'0:02');
  p.key('Escape');assert.equal(p.kit.state,'paused');
  for(let i=0;i<40;i++)p.tick(250);
  p.key('p');assert.equal(p.kit.state,'playing');p.tick(250);
  assert.equal(text(p,'#time'),'0:02');
});

/* ---------- Memory ---------- */
test('Memory: preview blocks guesses; reset cancels old mismatch callback',()=>{
  const p=game('memory');p.start();
  const cards=$$(p,'[data-card]');p.click(cards[0]);
  assert.equal(text(p,'[data-memory-moves]'),'0');assert.equal(ms(p,1800),1);
  p.tick(1800);p.click(cards[0]);
  const different=cards.find(c=>c.dataset.color!==cards[0].dataset.color);p.click(different);
  assert.equal(text(p,'[data-memory-moves]'),'1');
  p.click('[data-memory-reset]');p.tick(1800);
  p.click(cards[0]);p.tick(300);p.tick(900);
  assert.equal(cards[0].classList.contains('hidden'),false);
});
test('Memory: malformed saved result or blocked storage does not crash startup',()=>{
  assert.doesNotThrow(()=>load(boardPaths.memory,{storage:{'memory-best-score':'{}'}}));
  assert.doesNotThrow(()=>load(boardPaths.memory,{blockStorage:true}));
});
test('Memory: matching all nine pairs stops the clock, reports 100% accuracy and saves the time',()=>{
  const p=game('memory');p.start();p.tick(1800);
  const cards=$$(p,'[data-card]');p.click(cards[0]);
  for(let i=0;i<9;i++)p.tick(250);const colors=[...new Set(cards.map(c=>c.dataset.color))];
  for(const color of colors)for(const card of cards.filter(c=>c.dataset.color===color))p.click(card);
  assert.equal(text(p,'[data-memory-accuracy]'),'100%');
  assert.equal(p.kit.state,'over');
  const time=text(p,'[data-memory-time]');for(let i=0;i<20;i++)p.tick(250);
  assert.equal(text(p,'[data-memory-time]'),time);
  assert.equal(p.storage.get('gry:memory:best'),'2');
});

/* ---------- Kółko i krzyżyk (+ dawne kolkos) ---------- */
const marks=p=>$$(p,'#board .cell.filled').length;
test('Tic-tac-toe: restarting while AI thinks cannot place a stale move',()=>{
  const p=game('ttt');clickPrimary(p);assert.equal(p.kit.mode,'ai');
  p.click('#board .cell');assert.equal(marks(p),1);
  p.click('#new-round');p.advance(700);
  assert.equal(marks(p),0);
});
test('Tic-tac-toe: hard AI never loses from any human reply',()=>{
  const p=game('ttt');p.click('[data-level="hard"]');clickPrimary(p);
  const paths=[[]];let completed=0;
  while(paths.length){
    // Leftover end-screen/effect timers of finished rounds only slow the search down.
    const moves=paths.pop();p.timers.clear();p.click('#new-round');
    for(const i of moves){p.click($$(p,'#board .cell')[i]);p.advance(700);}
    const cellsNow=$$(p,'#board .cell');
    if(p.kit.state==='over'){assert.equal(text(p,'#score-a'),'0');completed++;continue;}
    for(let i=0;i<9;i++)if(!cellsNow[i].classList.contains('filled'))paths.push([...moves,i]);
  }
  assert.ok(completed>100);
});
test('Legacy Kolkos: redirect keeps the query and hash and opens the AI mode',()=>{
  const p=load(boardPaths.kolkos,{query:'?theme=dark&tryb=2p#plansza'});
  assert.equal(p.location.replaced,'../kolkokrzyrzykc/kolkokrzyzykc.html?theme=dark&tryb=ai#plansza');
  assert.match($(p,'meta[http-equiv="refresh"]').getAttribute('content'),/kolkokrzyzykc\.html\?tryb=ai$/);
});
test('Tic-tac-toe ?tryb=ai (old Kolkos): AI timer cancels on restart and human cannot play its turn',()=>{
  const p=load(boardPaths.ttt,{query:'?tryb=ai'});
  assert.equal(p.kit.state,'playing');assert.equal(p.kit.mode,'ai');
  const cellsNow=$$(p,'#board .cell');
  p.click(cellsNow[0]);p.click(cellsNow[1]);assert.equal(marks(p),1);
  p.click('#new-round');p.advance(700);assert.equal(marks(p),0);
  assert.equal(load(boardPaths.ttt,{query:'?tryb=2p'}).kit.mode,'2p');
});

/* ---------- Wisielec ---------- */
test('Hangman: game over freezes keyboard guesses and score',()=>{
  const p=game('hangman');
  p.key('E');assert.equal($$(p,'[data-hangman-keyboard] button:disabled').length,0,'no guesses under the start screen');
  clickPrimary(p);
  for(const letter of 'ABCDEFGHIJKLMNOPQRSTUVWXYZĄĆĘŁŃÓŚŹŻ')p.key(letter);
  assert.equal(p.kit.state,'over');
  assert.ok(+text(p,'[data-hangman-tries]')>=0);
  const wins=text(p,'[data-hangman-wins]');p.key('Z');
  assert.equal(text(p,'[data-hangman-wins]'),wins);
  assert.equal($$(p,'[data-hangman-keyboard] button:not([disabled])').length,0);
});

/* ---------- Quiz ---------- */
const quizSource=fs.readFileSync(path.join(root,'gry/quiz/script.js'),'utf8');
const QUESTIONS=new Function('return '+quizSource.match(/const QUESTIONS = (\[[\s\S]*?\n    \]);/)[1])();
const correctButton=p=>{const q=QUESTIONS.find(x=>x.question===text(p,'#quiz-question'));return $$(p,'#quiz-answers button').find(b=>b.querySelector('.txt').textContent===q.answers[q.correct]);};
test('Quiz: play.html redirects to quiz.html with query and hash',()=>{
  const p=load('gry/quiz/play.html',{query:'?tryb=timed#x'});
  assert.equal(p.location.replaced,'quiz.html?tryb=timed#x');
});
test('Quiz: many-question mode starts once and can finish/restart; record shows without storage',()=>{
  const p=load(boardPaths.quiz,{blockStorage:true});clickPrimary(p);
  assert.equal(text(p,'#quiz-counter'),'Pytanie 1 z 10');assert.equal($$(p,'#quiz-steps i').length,10);
  for(let i=0;i<10;i++){p.click(correctButton(p));p.click('#quiz-next');}
  assert.equal(p.kit.state,'over');assert.match(overlay(p).textContent,/10 z 10/);
  assert.equal(text(p,'#quiz-best'),'10');
  clickPrimary(p);
  assert.equal(p.kit.state,'playing');assert.equal(text(p,'#quiz-counter'),'Pytanie 1 z 10');assert.equal(text(p,'#quiz-score-stat'),'0');
});
test('Quiz: duplicate answer cannot increase score or advance twice',()=>{
  const p=load(boardPaths.quiz);clickPrimary(p);
  const right=correctButton(p);p.click(right);p.click(right);p.key('1');
  assert.equal(text(p,'#quiz-score-stat'),'1');assert.equal(text(p,'#quiz-progress-stat'),'1/10');
  p.key('Enter');p.key('Enter');
  assert.equal(text(p,'#quiz-progress-stat'),'2/10');
  p.click('#quiz-menu');p.key('1');
  assert.equal(p.kit.state,'menu');assert.equal($$(p,'#quiz-answers button:not([disabled])').length,0);
});
test('Quiz: pause freezes the timed-mode clock',()=>{
  const p=load(boardPaths.quiz);p.click($$(p,'.gk-overlay .gk-modes button')[2]);
  assert.equal(p.kit.mode,'timed');
  for(let i=0;i<25;i++)p.frame(100);
  assert.equal(text(p,'#quiz-timer'),'⏱ 13 s');
  p.key('Escape');assert.equal(p.kit.state,'paused');
  for(let i=0;i<100;i++)p.frame(100);
  p.key('Escape');p.frame(100);p.frame(100);
  assert.equal(text(p,'#quiz-timer'),'⏱ 13 s');
});

/* ---------- Koło fortuny ---------- */
const addName=(p,name)=>{$(p,'.joiner').value=name;$(p,'.wheel-form').dispatchEvent(new p.Event('submit',{cancelable:true}));};
const spinToEnd=p=>{for(let i=0;i<1000&&p.frames.size;i++)p.frame(16);};
test('Wheel: play.html redirects to kolo_fortuny.html with query and hash',()=>{
  const p=load('gry/kolo_fortuny/play.html',{query:'?a=1#b'});
  assert.equal(p.location.replaced,'kolo_fortuny.html?a=1#b');
});
test('Wheel: starts without CDN, ignores empty spins and reset waits for the spin to end',()=>{
  const p=load(boardPaths.wheel);spinToEnd(p);
  p.click('.spin-trigger');assert.equal(p.frames.size,0);
  const evil='<img src=x onerror=alert(1)>';addName(p,evil);
  assert.equal($(p,'.participants li .name').textContent,evil);assert.equal($(p,'.participants img'),null);
  p.click('.spin-trigger');p.click('.spin-trigger');assert.equal(p.frames.size,1);
  p.click('.reset');assert.equal($$(p,'.participants li').length,1);
  spinToEnd(p);p.flush();
  p.click('.reset');clickPrimary(p);
  assert.equal($$(p,'.participants li').length,0);assert.equal(text(p,'#wheel-count'),'0');assert.equal(p.frames.size,0);
});
test('Wheel: a completed spin picks an existing participant and permits another round',()=>{
  const p=load(boardPaths.wheel);
  for(const name of ['Ala','Ola','Ela'])addName(p,name);
  p.click('.spin-trigger');spinToEnd(p);
  assert.match(text(p,'.winner'),/^Wylosowano: (Ala|Ola|Ela)$/);
  assert.equal(p.frames.size,0);assert.equal($(p,'.spin-trigger').disabled,false);assert.equal(text(p,'#spin-count'),'1');
  p.tick(160);p.tick(450);
  assert.match(overlay(p).textContent,/Wylosowano: (Ala|Ola|Ela)/);
  clickPrimary(p);assert.equal(p.frames.size,1);assert.equal(overlay(p).hidden,true);
});

/* ---------- Wordle ---------- */
const wordle=secret=>{const p=game('wordle');p.run(`window.WORDLE_SLOWA.hasla.splice(0,Infinity,'${secret}')`);p.start();return p;};
const guess=(p,word)=>{for(const ch of word)p.key(ch);p.key('Enter');p.flush();};
const rowTiles=(p,r)=>[...$$(p,'#board .row')[r].children];
test('Wordle: repeated-letter feedback consumes each secret letter once',()=>{
  const p=wordle('BIURO');guess(p,'OKOŁO');
  const row=rowTiles(p,0);
  assert.deepEqual(row.map(t=>['correct','present','absent'].find(c=>t.classList.contains(c))),['absent','absent','absent','absent','correct']);
  assert.ok($(p,'#keyboard [data-key="O"]').classList.contains('correct'));
  assert.ok($(p,'#keyboard [data-key="Ł"]').classList.contains('absent'));
});
test('Wordle: restart clears delayed results and six rows, while shortcuts do not type',()=>{
  const p=wordle('BIURO');for(const ch of 'ALARM')p.key(ch);p.key('Enter');p.tick(0);
  p.click('#new-game');p.flush();
  assert.equal($$(p,'#board .tile').length,30);
  assert.equal($$(p,'#board .tile.flip, #board .tile.correct, #board .tile.present, #board .tile.absent, #board .tile.filled').length,0);
  assert.equal($$(p,'#keyboard .correct, #keyboard .present, #keyboard .absent').length,0);
  p.key('a',{ctrlKey:true});assert.equal($$(p,'#board .tile.filled').length,0);
  p.key('a');assert.equal($$(p,'#board .tile.filled').length,1);
  assert.equal(p.key('Backspace').defaultPrevented,true);assert.equal($$(p,'#board .tile.filled').length,0);
});
test('Wordle: sixth failed guess ends safely and all on-screen keys are buttons',()=>{
  const p=wordle('BIURO');
  for(const word of ['ALARM','BEKON','BETON','BIDON','BIGOS','ALBUM'])guess(p,word);
  assert.equal(p.kit.state,'over');assert.equal(text(p,'#st-played'),'1');assert.equal(text(p,'#st-streak'),'0');
  assert.doesNotThrow(()=>{p.key('A');p.key('Backspace');p.click('#keyboard .key.big');});
  assert.equal($$(p,'#board .tile.filled').length,30);
  p.key('Enter');assert.equal(p.kit.state,'playing','Enter on the end screen starts the next word');
  assert.equal($$(p,'#board .tile.filled').length,0);
  const keys=$$(p,'#keyboard .key');assert.equal(keys.length,37);assert.ok(keys.every(k=>k.tagName==='BUTTON'));
});

/* ---------- Sudoku ---------- */
test('Sudoku: seeded puzzles have one solution and input rejects non-digits/zero',()=>{const p=game('sudoku');for(let i=0;i<4;i++){p.run('newGame()');assert.equal(p.run("countSolutions([...document.querySelectorAll('.cell')].map(c=>Number(c.value)||0),2)"),1);assert.equal(p.run("solution.every(Boolean)"),true);}const editable=[...p.document.querySelectorAll('.cell')].find(c=>!c.readOnly);editable.value='0e-72';editable.dispatchEvent(new p.Event('input',{bubbles:true}));assert.equal(editable.value,'7');});
test('Sudoku: complete solution succeeds, record shows without storage and new game does not duplicate cells',()=>{
  const p=game('sudoku',{blockStorage:true});p.start('easy');
  for(let i=0;i<8;i++)p.tick(250);
  p.run("document.querySelectorAll('.cell').forEach((c,i)=>c.value=solution[i]);check()");
  assert.equal(p.kit.state,'over');assert.match(text(p,'#status'),/Rozwiązane/);
  assert.equal(text(p,'#best'),'0:02');
  p.run('newGame();newGame()');assert.equal($$(p,'.cell').length,81);
});
