const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const { parseHTML } = require('linkedom');

const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

function storage(initial = {}, blocked = false) {
  const map = new Map(Object.entries(initial));
  const api = {
    get length() { return map.size; },
    key: i => [...map.keys()][i] ?? null,
    getItem(key) { if (blocked) throw Error('blocked'); return map.has(key) ? map.get(key) : null; },
    setItem(key, value) { if (blocked) throw Error('blocked'); map.set(key, String(value)); },
    removeItem(key) { map.delete(key); },
    clear() { map.clear(); }
  };
  return { map, api };
}

// Mounts a page with shell.js (and optionally its inline scripts) at a URL.
function mount(file, { local = {}, dark = false, href, inline = false, blocked = false } = {}) {
  const { document, Event } = parseHTML(read(file));
  const store = storage(local, blocked);
  const handlers = {};
  const window = {
    addEventListener(type, fn) { (handlers[type] ||= []).push(fn); },
    dispatchEvent(event) { for (const fn of handlers[event.type] || []) fn(event); },
    matchMedia: () => ({ matches: dark, addEventListener() {} })
  };
  const location = new URL(href || `https://snakex21.github.io/snakex21/${encodeURI(file)}`);
  const downloads = [];
  const context = vm.createContext({ document, window, Event, URL, location, localStorage: store.api, console,
    confirm: () => true, JSON, Blob });
  vm.runInContext(read('assets/workshop/shell.js'), context);
  if (inline) {
    context.window.Kit = { toast() {}, download: (name, content) => downloads.push({ name, content }) };
    context.Kit = context.window.Kit;
    for (const m of read(file).matchAll(/<script>([\s\S]*?)<\/script>/g)) vm.runInContext(m[1], context);
  }
  return { document, Event, store, handlers, window, downloads, context };
}

test('Shell: palette and system theme are applied from storage', () => {
  const ocean = mount('index.html', { local: { palette: 'ocean', theme: 'light' } });
  assert.equal(ocean.document.documentElement.getAttribute('data-palette'), 'ocean');
  const bad = mount('index.html', { local: { palette: '<script>' } });
  assert.equal(bad.document.documentElement.hasAttribute('data-palette'), false);
  const system = mount('index.html', { local: { theme: 'light', themeAuto: '1' }, dark: true });
  assert.equal(system.document.documentElement.getAttribute('data-theme'), 'dark');
  // The toggle leaves system mode and stores an explicit choice.
  system.document.getElementById('theme-toggle').dispatchEvent(new system.Event('click'));
  assert.equal(system.store.map.get('theme'), 'light');
  assert.equal(system.store.map.has('themeAuto'), false);
});

test('Shell: every page gets a settings link that resolves to ustawienia.html', () => {
  for (const file of ['index.html', 'Programy/json/json.html', 'gry/tetris/tetris.html', 'LinkHub/index.html']) {
    const page = mount(file);
    const link = page.document.querySelector('.settings-link');
    assert.ok(link, file);
    const target = new URL(link.getAttribute('href'), `https://x.test/a/${file}`);
    assert.equal(target.pathname, '/a/ustawienia.html', file);
    assert.equal(link.nextElementSibling.id, 'theme-toggle', file);
  }
  assert.ok(fs.existsSync(path.join(root, 'ustawienia.html')));
});

test('Shell: opening a tool or game records it for the home page', () => {
  const tool = mount('Programy/generator hasel/generator hasel.html', { local: { 'workshop:recent': '[{"path":"gry/tetris/tetris.html","title":"Tetris","kind":"game"}]' } });
  const list = JSON.parse(tool.store.map.get('workshop:recent'));
  assert.deepEqual(list[0], { path: 'Programy/generator hasel/generator hasel.html', title: 'Generator haseł', kind: 'tool' });
  assert.equal(list[1].path, 'gry/tetris/tetris.html');
  const catalogue = mount('gry/gry.html');
  assert.equal(catalogue.store.map.has('workshop:recent'), false);
  const blocked = mount('gry/tetris/tetris.html', { blocked: true });
  assert.ok(blocked.document.querySelector('.settings-link'));
});

test('Home: recent tools and games are listed, unsafe entries ignored', () => {
  const { document } = parseHTML(read('index.html'));
  const store = storage({ 'workshop:recent': JSON.stringify([
    { path: 'gry/tetris/tetris.html', title: 'Tetris', kind: 'game' },
    { path: 'javascript:alert(1)', title: 'x' },
    { path: 'Programy/json/json.html', title: 'Formatter JSON', kind: 'tool' }
  ]) });
  const context = vm.createContext({ document, console, window: {}, localStorage: store.api, setInterval() {}, setTimeout() {}, clearTimeout() {}, fetch() { throw Error('no'); }, AbortController, URL });
  vm.runInContext(read('assets/workshop/home.js'), context);
  const links = [...document.querySelectorAll('#recent-grid a')];
  assert.deepEqual(links.map(a => a.getAttribute('href')), ['gry/tetris/tetris.html', 'Programy/json/json.html']);
  assert.equal(document.getElementById('home-recent').hidden, false);
});

test('Settings: theme, palette, export, import and clear', async () => {
  const page = mount('ustawienia.html', { inline: true, local: { theme: 'light', todo: '[1]' } });
  const tab = mode => page.document.querySelector(`[data-mode="${mode}"]`);
  assert.equal(tab('light').getAttribute('aria-checked'), 'true');
  tab('dark').dispatchEvent(new page.Event('click'));
  assert.equal(page.store.map.get('theme'), 'dark');
  assert.equal(page.document.documentElement.getAttribute('data-theme'), 'dark');
  tab('system').dispatchEvent(new page.Event('click'));
  assert.equal(page.store.map.get('themeAuto'), '1');

  const sliwka = page.document.querySelector('input[name="palette"][value="sliwka"]');
  sliwka.checked = true; sliwka.dispatchEvent(new page.Event('change'));
  assert.equal(page.document.documentElement.getAttribute('data-palette'), 'sliwka');

  page.document.getElementById('export-data').dispatchEvent(new page.Event('click'));
  const exported = JSON.parse(page.downloads[0].content);
  assert.equal(exported.format, 'snakex21-hub');
  assert.equal(exported.data.todo, '[1]');
  assert.equal(exported.data.palette, 'sliwka');

  page.document.getElementById('clear-data').dispatchEvent(new page.Event('click'));
  assert.equal(page.store.map.size, 0);
  assert.equal(page.document.documentElement.hasAttribute('data-palette'), false);

  // The import handler is async (file.text()), so wait a tick after each change.
  const input = page.document.getElementById('import-file');
  await new Promise(resolve => {
    Object.defineProperty(input, 'files', { configurable: true, value: [{ text: async () => JSON.stringify(exported) }] });
    input.dispatchEvent(new page.Event('change'));
    setTimeout(resolve, 20);
  });
  assert.equal(page.store.map.get('todo'), '[1]');
  assert.equal(page.document.documentElement.getAttribute('data-palette'), 'sliwka');
  await new Promise(resolve => {
    Object.defineProperty(input, 'files', { configurable: true, value: [{ text: async () => '{"format":"other","data":{"x":"1"}}' }] });
    input.dispatchEvent(new page.Event('change'));
    setTimeout(resolve, 20);
  });
  assert.equal(page.store.map.has('x'), false);
});
