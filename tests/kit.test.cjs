const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { webcrypto } = require('node:crypto');
const { parseHTML } = require('linkedom');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const kitPages = fs.readdirSync(path.join(root, 'Programy'), { recursive: true })
  .filter(file => file.endsWith('.html'))
  .map(file => 'Programy/' + file.split(path.sep).join('/'))
  .filter(file => /class="[^"]*\bkit-page\b/.test(read(file)));

// Runs kit.js first (as the browser does with deferred scripts in order),
// then every inline script of the page.
function mount(file, options = {}) {
  const source = read(file);
  const { document, Event } = parseHTML(source);
  const storage = new Map(Object.entries(options.storage || {}));
  const listeners = {};
  const window = { addEventListener: (type, cb) => { listeners[type] = cb; }, crypto: webcrypto };
  const context = vm.createContext({
    document, console, Event, window, crypto: webcrypto, Uint32Array, Blob, URL,
    navigator: { clipboard: { writeText: async () => {} } },
    confirm: () => true,
    localStorage: {
      getItem: key => { if (options.blockStorage) throw Error('blocked'); return storage.get(key) ?? null; },
      setItem: (key, value) => { if (options.blockStorage) throw Error('blocked'); storage.set(key, String(value)); },
      removeItem: key => storage.delete(key)
    },
    setTimeout: () => 1, clearTimeout: () => {}
  });
  context.window.Kit = undefined;
  vm.runInContext(read('assets/workshop/kit.js').replace('if (window.Kit) return;', ''), context);
  context.Kit = context.window.Kit;
  for (const match of source.matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInContext(match[1], context, { timeout: 1000 });
  if (listeners.DOMContentLoaded) listeners.DOMContentLoaded();
  return { document, context, storage, Event };
}

test('Kit: every kit page loads kit.css and kit.js from the shared folder', () => {
  assert.ok(kitPages.length >= 4, kitPages.join());
  for (const file of kitPages) {
    const { document } = parseHTML(read(file));
    assert.ok(document.querySelector('link[href^="../../assets/workshop/kit.css"]'), file);
    assert.ok(document.querySelector('script[src^="../../assets/workshop/kit.js"]'), file);
    assert.ok(document.querySelector('.kit-head h1'), file);
  }
});

test('Kit: tool pages no longer redefine the shell palette or old header', () => {
  for (const file of fs.readdirSync(path.join(root, 'Programy'), { recursive: true }).filter(f => f.endsWith('.html'))) {
    const source = read('Programy/' + file.split(path.sep).join('/'));
    const head = source.slice(0, source.indexOf('</head>'));
    assert.doesNotMatch(head, /--card-bg\s*:|\.nav-links\s*\{|#theme-toggle\s*\{/, file);
  }
});

test('Kit: storage helpers survive blocked and corrupt storage', () => {
  const blocked = mount('Programy/_szablon/_szablon.html', { blockStorage: true });
  const store = blocked.context.Kit.store('x');
  assert.equal(store.get('fallback'), 'fallback');
  assert.equal(store.set({ a: 1 }), false);
  const corrupt = mount('Programy/_szablon/_szablon.html', { storage: { x: '{oops' } });
  assert.equal(corrupt.context.Kit.store('x').get(7), 7);
});

test('Kit: randomInt stays within range', () => {
  const { context } = mount('Programy/_szablon/_szablon.html');
  for (let i = 0; i < 2000; i++) {
    const value = context.Kit.randomInt(7);
    assert.ok(Number.isInteger(value) && value >= 0 && value < 7, String(value));
  }
});

test('Password generator: each selected character set is always present', () => {
  const page = mount('Programy/generator hasel/generator hasel.html');
  const range = page.document.getElementById('length-range');
  range.value = '4';
  for (const id of ['uppercase', 'lowercase', 'numbers', 'symbols']) page.document.getElementById(id).checked = true;
  for (let i = 0; i < 200; i++) {
    page.document.getElementById('generate-btn').dispatchEvent(new page.Event('click'));
    const value = page.document.getElementById('password-output').value;
    assert.equal(value.length, 4);
    assert.match(value, /[A-Z]/); assert.match(value, /[a-z]/); assert.match(value, /[0-9]/); assert.match(value, /[^A-Za-z0-9]/);
  }
  for (const id of ['uppercase', 'lowercase', 'numbers', 'symbols']) page.document.getElementById(id).checked = false;
  page.document.getElementById('generate-btn').dispatchEvent(new page.Event('click'));
  assert.equal(page.document.getElementById('password-output').value, '');
  assert.equal(page.document.getElementById('copy-btn').disabled, true);
});

test('Word counter: counts text and restores the saved draft', () => {
  const page = mount('Programy/licznik slow/licznik slow.html', { storage: { wordCounterDraft: JSON.stringify('Ala ma kota.\n\nI psa.') } });
  assert.equal(page.document.getElementById('text-input').value, 'Ala ma kota.\n\nI psa.');
  assert.equal(page.document.getElementById('word-count').textContent, '5');
  assert.equal(page.document.getElementById('para-count').textContent, '2');
  assert.equal(page.document.getElementById('read-time').textContent, '~1 min');
  page.document.getElementById('clear-btn').dispatchEvent(new page.Event('click'));
  assert.equal(page.document.getElementById('word-count').textContent, '0');
  assert.equal(page.storage.has('wordCounterDraft'), false);
});

test('QR generator: explains a missing library instead of throwing', () => {
  const page = mount('Programy/generator qr/generator qr.html');
  const status = page.document.getElementById('qr-status');
  assert.equal(status.hidden, false);
  assert.match(status.textContent, /biblioteki QR/);
  assert.equal(page.document.getElementById('download-btn').disabled, true);
});
