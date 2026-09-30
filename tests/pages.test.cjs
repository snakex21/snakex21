const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { parseHTML } = require('linkedom');
const gamePath = 'gry/2048/2048.html';
const todoPath = 'Programy/lista zadan/lista zadan.html';
function loadPage(file, options = {}) {
  const source = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
  const { document, Event } = parseHTML(source);
  // Browsers expose live HTMLCollections; linkedom exposes static collections.
  document.getElementsByClassName = name => new Proxy({}, { get: (_, prop) => {
    const nodes = document.querySelectorAll('.' + name);
    return prop === 'length' ? nodes.length : nodes[prop];
  }});
  const storage = new Map(Object.entries(options.storage || {}));
  const events = {};
  const context = vm.createContext({ document, console, Event,
    window: { addEventListener: (type, cb) => { events[type] = cb; } },
    localStorage: {
      getItem: key => { if(options.blockRead) throw Error('storage unavailable'); return storage.get(key) ?? null; },
      setItem: (key, value) => { if(options.blockWrite) throw Error('quota exceeded'); storage.set(key, value); }
    },
    Date: class extends Date { static now() { return 123456789; } },
    Math: Object.assign(Object.create(Math), { random: () => 0 }),
    setTimeout: () => 1,
  });
  for (const match of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) {
    vm.runInContext(match[1], context, { timeout: 1000 });
  }
  if (events.load) events.load();
  return { document, context, storage, Event, run: js => vm.runInContext(js, context, {timeout: 1000}) };
}
function seedGame(page, rows) {
  page.run('buildGridOverlay(); gameActive = true; score(0)');
  rows.flat().forEach((value, index) => {
    if (!value) return;
    const id = `${Math.floor(index / 4) + 1}${index % 4 + 1}`;
    const cell = page.document.getElementById(id);
    const tile = page.document.createElement('div'); tile.id = 'tile_' + id;
    cell.appendChild(tile); cell.className = 'grid_cell active';
    page.context.colorSet(value, tile);
  });
}
function board(page) { return [...page.document.querySelectorAll('.grid_cell')].map(cell => Number(cell.firstElementChild?.dataset.value || 0)); }
function move(page, keyCode) {
  let prevented = false;
  page.context.directions({keyCode, preventDefault(){ prevented = true; }});
  return prevented;
}
test('2048: an invalid move does not create an extra tile', () => {
  const p = loadPage(gamePath); seedGame(p, [[2,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  move(p, 37); assert.deepEqual(board(p), [2,...Array(15).fill(0)]);
});
test('2048: one 2+2 merge adds four points once', () => {
  const p = loadPage(gamePath); seedGame(p, [[2,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  move(p,37); assert.equal(p.document.getElementById('value').textContent,'4');
  assert.equal(board(p).filter(Boolean).length,2);
});
test('2048: a full board with a vertical merge is not game over', () => {
  const p = loadPage(gamePath); seedGame(p, [[2,4,8,16],[2,8,16,32],[4,16,32,64],[8,32,64,128]]);
  p.run('loose()'); assert.equal(p.run('gameActive'),true);
});
test('2048: a full board without adjacent equal values ends the game', () => {
  const p = loadPage(gamePath); seedGame(p, [[2,4,8,16],[4,8,16,32],[8,16,32,64],[16,32,64,128]]);
  p.run('loose()'); assert.equal(p.run('gameActive'),false);
});
test('2048: a tile merges at most once per move', () => {
  const p = loadPage(gamePath); seedGame(p, [[2,2,4,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  move(p,37); assert.deepEqual(board(p).slice(0,2),[4,4]);
});
test('2048: arrow input suppresses page scrolling', () => {
  const p = loadPage(gamePath); assert.equal(move(p,37),true);
});
test('tasks: malformed JSON does not prevent adding session-only tasks or overwrite stored bytes', () => {
  const p = loadPage(todoPath,{storage:{tasks:'{broken'}});
  p.document.getElementById('task-input').value = 'Test'; p.context.addTask();
  assert.match(p.document.getElementById('task-list').textContent,/Test/);
  assert.equal(p.storage.get('tasks'),'{broken');
});
test('tasks: wrong saved schema does not crash startup', () => {
  for (const tasks of ['{}','[null]','[{"id":1,"text":42,"completed":false}]']) {
    const p = loadPage(todoPath,{storage:{tasks}}); assert.ok(p.document.getElementById('task-list'));
  }
});
test('tasks: same-millisecond additions have distinct IDs and delete independently', () => {
  const p = loadPage(todoPath);
  for(const text of ['First','Second']) { p.document.getElementById('task-input').value = text; p.context.addTask(); }
  const tasks = JSON.parse(p.storage.get('tasks')); assert.notEqual(tasks[0].id,tasks[1].id);
  p.context.deleteTask(tasks[0].id); assert.match(p.document.getElementById('task-list').textContent,/Second/);
});
test('tasks: storage quota errors retain rendered work and report unsaved status', () => {
  const p = loadPage(todoPath,{blockWrite:true});
  p.document.getElementById('task-input').value='Keep me'; p.context.addTask();
  assert.match(p.document.getElementById('task-list').textContent,/Keep me/);
  assert.match(p.document.getElementById('storage-status').textContent,/nie.*zapis|nie.*zapis|sesji/i);
});
test('tasks: blocked storage does not break page initialization', () => {
  const p = loadPage(todoPath,{blockRead:true}); assert.ok(p.document.getElementById('task-list'));
});
function touch(page, type, touches, changedTouches = touches) {
  const event = new page.Event(type); event.touches = touches; event.changedTouches = changedTouches;
  page.document.querySelector('[data-game-root]').dispatchEvent(event);
}
test('2048: swipes move once; tap, cancel and multi-touch do not move', () => {
  const p = loadPage(gamePath); const start = [{clientX:100,clientY:100}];
  seedGame(p, [[0,2,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]);
  const initial=board(p);
  touch(p,'touchstart',start); touch(p,'touchend',[],[{clientX:105,clientY:100}]);
  assert.deepEqual(board(p),initial);
  touch(p,'touchstart',start); touch(p,'touchcancel',[]); touch(p,'touchend',[],[{clientX:20,clientY:100}]);
  assert.deepEqual(board(p),initial);
  touch(p,'touchstart',start); touch(p,'touchstart',[...start,{clientX:110,clientY:110}]);
  touch(p,'touchend',[],[{clientX:20,clientY:100}]); assert.deepEqual(board(p),initial);
  touch(p,'touchstart',start); touch(p,'touchend',[],[{clientX:20,clientY:100}]);
  assert.equal(board(p)[0],2); assert.equal(board(p).filter(Boolean).length,2);
  const moved = board(p); touch(p,'touchend',[],[{clientX:20,clientY:100}]); assert.deepEqual(board(p),moved);
});
test('2048: editing text, modifier shortcuts and unrelated keys do not play', () => {
  const p=loadPage(gamePath); const initial=board(p);
  const input=p.document.createElement('input');
  for(const event of [{keyCode:37,target:input},{keyCode:37,ctrlKey:true},{keyCode:65}]) {
    p.context.directions({...event,preventDefault(){ assert.fail('must not intercept'); }});
    assert.deepEqual(board(p),initial);
  }
});
test('2048: restart resets score and game-over state to two initial tiles', () => {
  const p=loadPage(gamePath); p.run('gameActive=false; score(48)'); p.context.reset();
  assert.equal(p.run('gameActive'),true); assert.equal(p.document.getElementById('value').textContent,'0');
  assert.equal(board(p).filter(Boolean).length,2);
});
test('2048: all directions match independent merge oracle on 160 seeded boards', () => {
  const p=loadPage(gamePath); let random=314159;
  const rng=()=>{random=(Math.imul(random,1664525)+1013904223)>>>0;return random/2**32;};
  for(let trial=0;trial<40;trial++) for(const key of [37,38,39,40]) {
    const initial=Array.from({length:16},()=>{const n=Math.floor(rng()*5); return n?2**n:0;});
    const expected=[...initial]; let points=0;
    for(let line=0;line<4;line++) {
      let indices=Array.from({length:4},(_,i)=>(key===37||key===39)?line*4+i:i*4+line);
      if(key===39||key===40) indices.reverse();
      const values=indices.map(i=>initial[i]).filter(Boolean); const result=[];
      for(let i=0;i<values.length;i++) {
        if(values[i]===values[i+1]) {result.push(values[i]*2);points+=values[i]*2;i++;}
        else result.push(values[i]);
      }
      indices.forEach((idx,i)=>expected[idx]=result[i]||0);
    }
    if(expected.some((v,i)=>v!==initial[i])) expected[expected.indexOf(0)]=2;
    seedGame(p,Array.from({length:4},(_,i)=>initial.slice(i*4,i*4+4))); move(p,key);
    assert.deepEqual(board(p),expected,`trial ${trial}, key ${key}, input ${initial}`);
    assert.equal(Number(p.document.getElementById('value').textContent),points);
  }
});
test('tasks: existing duplicate IDs are repaired without losing task contents', () => {
  const tasks=JSON.stringify([{id:4,text:'One',completed:false},{id:4,text:'Two',completed:true}]);
  const p=loadPage(todoPath,{storage:{tasks}}); p.context.saveTasks();
  const saved=JSON.parse(p.storage.get('tasks')); assert.equal(saved.length,2); assert.notEqual(saved[0].id,saved[1].id);
});
test('tasks: text is literal, completion persists and reload restores it', () => {
  const p=loadPage(todoPath); p.document.getElementById('task-input').value='<img src=x onerror=alert(1)> Żółw';
  p.context.addTask(); const task=JSON.parse(p.storage.get('tasks'))[0]; p.context.toggleTask(task.id);
  assert.equal(p.document.querySelector('#task-list img'),null);
  const fresh=loadPage(todoPath,{storage:Object.fromEntries(p.storage)});
  assert.equal(fresh.document.querySelector('#task-list input').checked,true);
  assert.match(fresh.document.getElementById('task-list').textContent,/Żółw/);
});
test('tasks: empty/whitespace input is ignored, Enter works, composing Enter does not submit', () => {
  const p=loadPage(todoPath); const input=p.document.getElementById('task-input');
  input.value='  '; p.context.addTask(); assert.equal(p.storage.has('tasks'),false);
  input.value='Test'; const composing=new p.Event('keydown'); composing.key='Enter'; composing.isComposing=true;
  input.dispatchEvent(composing); assert.equal(p.storage.has('tasks'),false);
  const enter=new p.Event('keydown'); enter.key='Enter'; input.dispatchEvent(enter);
  assert.equal(JSON.parse(p.storage.get('tasks')).length,1);
});
test('2048: restarting cancels a gesture already in progress', () => {
  const p=loadPage(gamePath); touch(p,'touchstart',[{clientX:100,clientY:100}]);
  p.context.reset(); const fresh=board(p);
  touch(p,'touchend',[],[{clientX:10,clientY:100}]); assert.deepEqual(board(p),fresh);
});
