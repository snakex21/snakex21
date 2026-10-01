const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const pages = fs.readdirSync(root, { recursive: true })
  .filter(file => file.endsWith('.html') && !file.startsWith('node_modules/'));
const destinations = ['index.html', 'Programy/programy.html', 'gry/gry.html',
  'LinkHub/index.html', 'muzyka/muzyka.html', 'filmy/filmy glowna.html'];
const shellSource = read('assets/workshop/shell.js');

function mount(file = 'index.html', options = {}) {
  const { document, Event } = parseHTML(read(file));
  const values = new Map(Object.entries(options.storage || {}));
  const handlers = {};
  const context = vm.createContext({ document, window: { addEventListener(type, fn) {
    (handlers[type] ||= []).push(fn);
  } }, localStorage: {
    getItem(key) { if (options.blocked) throw Error('blocked'); return values.get(key) ?? null; },
    setItem(key, value) { if (options.blocked) throw Error('blocked'); values.set(key, value); }
  } });
  vm.runInContext(shellSource, context);
  return { document, Event, values, handlers, context,
    click() { document.getElementById('theme-toggle').dispatchEvent(new Event('click')); } };
}
function localFile(file, ref) {
  // Resolving under a GitHub Pages project prefix must not escape that project.
  const url = new URL(ref, `https://example.test/snakex21/${file}`);
  assert.ok(url.pathname.startsWith('/snakex21/'), `${file}: project-relative URL ${ref}`);
  return path.join(root, decodeURIComponent(url.pathname.slice('/snakex21/'.length)));
}

test('Site shell: every HTML entry has the same six accessible, project-relative destinations', () => {
  assert.ok(pages.length >= 77, 'Inventory includes nested tools, games and LinkHub pages');
  for (const file of pages) {
    const { document } = parseHTML(read(file));
    assert.equal(document.querySelectorAll('[data-site-shell]').length, 1, file);
    const nav = document.querySelector('nav[aria-label="Główna nawigacja"]');
    assert.ok(nav, file);
    const links = [...nav.querySelectorAll('.site-links a')];
    assert.equal(links.length, destinations.length, file);
    assert.deepEqual(links.map(a => path.relative(root, localFile(file, a.getAttribute('href')))), destinations, file);
    links.forEach(a => {
      assert.ok(fs.existsSync(localFile(file, a.getAttribute('href'))), file);
      assert.ok(a.textContent.trim(), file);
      assert.equal(a.getAttribute('hidden'), null, file);
    });
    const current = links.filter(a => a.hasAttribute('aria-current'));
    assert.equal(current.length, file === 'zmiany.html' ? 0 : 1, file);
    assert.equal(document.querySelectorAll('#theme-toggle').length, 1, file);
    assert.equal(document.getElementById('theme-toggle').getAttribute('type'), 'button', file);
    assert.equal(document.querySelectorAll('script[src$="assets/workshop/shell.js"]').length, 1, file);
    assert.equal(document.querySelectorAll('link[href$="assets/workshop/shell.css"]').length, 1, file);
    assert.equal(document.querySelectorAll('link[rel="icon"]').length, 1, file);
  }
});

test('Site shell: skip links reach focusable content and nested pages have catalogue return routes', () => {
  for (const file of pages) {
    const { document } = parseHTML(read(file));
    const skip = document.querySelector('.skip-link');
    assert.ok(skip, file);
    const target = document.getElementById(skip.getAttribute('href').slice(1));
    assert.ok(target, file);
    assert.equal(target.getAttribute('tabindex'), '-1', file);
    if (/^(gry|Programy)\/[^/]+\//.test(file)) {
      const back = document.querySelector('.site-context a');
      assert.ok(back, file);
      assert.equal(path.relative(root, localFile(file, back.getAttribute('href'))),
        file.startsWith('gry/') ? 'gry/gry.html' : 'Programy/programy.html', file);
    }
  }
});

test('Site shell: every page restores and toggles the shared theme without its application script', () => {
  for (const file of pages) {
    const page = mount(file, { storage: { theme: 'dark' } });
    assert.equal(page.document.documentElement.getAttribute('data-theme'), 'dark', file);
    const button = page.document.getElementById('theme-toggle');
    assert.equal(button.getAttribute('aria-pressed'), 'true', file);
    page.click();
    assert.equal(page.values.get('theme'), 'light', file);
    assert.match(button.getAttribute('aria-label'), /ciemny/, file);
    assert.equal(page.document.body.classList.contains('theme-dark'), false, file);
    page.click();
    assert.equal(page.values.get('theme'), 'dark', file);
    assert.match(button.getAttribute('aria-label'), /jasny/, file);
  }
});

test('Site shell: blocked storage, malformed preference, legacy preference and duplicate loads are safe', () => {
  for (const options of [{ blocked: true }, { storage: { theme: 'broken' } },
    { storage: { theme: 'light', 'site-theme': 'dark' } }]) {
    const page = mount('Programy/json/json.html', options);
    vm.runInContext(shellSource, page.context);
    page.click();
    assert.equal(page.document.documentElement.getAttribute('data-theme'), 'dark');
    page.click();
    assert.equal(page.document.documentElement.getAttribute('data-theme'), 'light');
    assert.equal(page.handlers.storage.length, 1);
  }
  const legacy = mount('gry/kolkos/kolkos.html', { storage: { 'site-theme': 'dark' } });
  assert.equal(legacy.document.body.classList.contains('theme-dark'), true);
  legacy.click();
  assert.equal(legacy.values.get('theme'), 'light');
});

test('Site shell: cross-tab changes and history restores synchronize labels as well as colors', () => {
  const page = mount('LinkHub/settings.html');
  page.document.body.setAttribute('data-theme', 'dark');
  page.handlers.storage[0]({ key: 'theme', newValue: 'dark' });
  assert.equal(page.document.body.hasAttribute('data-theme'), false);
  assert.equal(page.document.getElementById('theme-toggle').getAttribute('aria-pressed'), 'true');
  page.handlers.storage[0]({ key: 'weatherCity', newValue: 'Warszawa' });
  assert.equal(page.document.documentElement.getAttribute('data-theme'), 'dark');
  page.handlers.storage[0]({ key: 'theme', newValue: null });
  assert.equal(page.document.documentElement.getAttribute('data-theme'), 'light');
  page.values.set('theme', 'dark');
  page.handlers.pageshow[0]();
  assert.equal(page.document.documentElement.getAttribute('data-theme'), 'dark');
});

test('Site shell: no duplicate inline theme owners and every local script/stylesheet exists', () => {
  for (const file of pages) {
    const { document } = parseHTML(read(file));
    for (const script of document.querySelectorAll('script:not([src])')) {
      assert.doesNotThrow(() => new vm.Script(script.textContent, { filename: file }), file);
      assert.doesNotMatch(script.textContent, /localStorage\.(?:get|set)Item\(['"](?:theme|site-theme)['"]/, file);
    }
    for (const item of document.querySelectorAll('script[src],link[href]')) {
      const ref = item.getAttribute('src') || item.getAttribute('href');
      if (/^(\w+:|\/\/|#)/.test(ref)) continue;
      assert.ok(fs.existsSync(localFile(file, ref)), `${file}: ${ref}`);
    }
  }
  assert.doesNotMatch(read('assets/js/site.js'), /localStorage\.(?:get|set)Item\(['"](?:theme|site-theme)['"]/);
});

test('Site shell: LinkHub subpages retain all management routes and the pending count hook', () => {
  for (const file of pages.filter(file => file.startsWith('LinkHub/'))) {
    const { document } = parseHTML(read(file));
    const subnav = document.querySelector('nav[aria-label="LinkHub"]');
    assert.deepEqual([...subnav.querySelectorAll('a')].map(a => a.getAttribute('href')),
      ['index.html', 'add.html', 'pending.html', 'scan.html', 'settings.html']);
    assert.equal(subnav.querySelectorAll('[aria-current="page"]').length, 1);
  }
  const { document } = parseHTML(read('LinkHub/index.html'));
  assert.equal(document.querySelectorAll('#pending-badge').length, 1);
});

test('Site shell: moved editor toolbars preserve every editing action and music controls have names', () => {
  const { document: markdown } = parseHTML(read('Programy/markdown/markdown.html'));
  assert.equal(markdown.querySelectorAll('.shell-tool-toolbar [data-action]').length, 13);
  const { document: mindmap } = parseHTML(read('Programy/mindmap/mindmap.html'));
  for (const id of ['btn-add', 'btn-connect', 'btn-clear', 'btn-save', 'btn-load', 'btn-export']) {
    assert.ok(mindmap.querySelector(`.shell-tool-toolbar #${id}`), id);
  }
  const { document: music } = parseHTML(read('muzyka/muzyka.html'));
  for (const button of music.querySelectorAll('button[title]')) {
    assert.ok(button.getAttribute('aria-label'), button.id || button.textContent);
  }
  assert.ok(music.getElementById('library-search').getAttribute('aria-label'));
  assert.match(read('muzyka/muzyka.html'), /setAttribute\('aria-label', 'Wstrzymaj'\)/);
});

test('Site shell: catalogue initials exclude parenthetical subtitles and punctuation', () => {
  const { document } = parseHTML('<html><body><div id="games-grid"></div></body></html>');
  const titles = ['Pong (AI)', 'Wąż (Snake)', 'Clicker (idle)', 'ZType (typing)', 'Wojna Er', '2048'];
  vm.runInNewContext(read('assets/workshop/games.js'), { document, window: {
    gamesCatalog: titles.map(title => ({ title, url: 'game.html', description: '' }))
  } });
  assert.deepEqual([...document.querySelectorAll('.game-fallback')].map(item => item.textContent),
    ['P', 'W', 'C', 'Z', 'WE', '2048']);
});

test('Site shell: charts and converter still draw after removing their former theme variable', () => {
  for (const file of ['Programy/wykresy/wykresy.html', 'Programy/konwerter/konwerter.html']) {
    const page = mount(file, { storage: { theme: 'dark' } });
    let paintCalls = 0;
    const paint = new Proxy({}, { get(target, key) {
      if (!(key in target)) target[key] = () => { paintCalls++; };
      return target[key];
    } });
    page.document.querySelectorAll('canvas').forEach(canvas => {
      canvas.getContext = () => paint;
      canvas.getBoundingClientRect = () => ({ width: 600, height: 300 });
    });
    page.document.querySelectorAll('select').forEach(select => {
      select.selectedIndex = 0;
      Object.defineProperty(select, 'value', { get() { return select.options[select.selectedIndex]?.value || ''; }, set(value) { select.selectedIndex = [...select.options].findIndex(option => option.value === value); } });
    });
    page.context.alert = () => {};
    page.context.Option = function (text, value) { const option = page.document.createElement('option'); option.textContent = text; option.value = value; return option; };
    page.document.querySelectorAll('select').forEach(select => { select.add = option => select.appendChild(option); });
    page.context.window.devicePixelRatio = 1;
    page.context.fetch = async () => ({ json: async () => ({}) });
    for (const script of page.document.querySelectorAll('script:not([src])')) {
      vm.runInContext(script.textContent, page.context);
    }
    for (const theme of ['light', 'dark']) {
      page.document.documentElement.setAttribute('data-theme', theme);
      if (file.includes('wykresy/')) vm.runInContext('generateChart()', page.context);
      else vm.runInContext("drawChart('usd')", page.context);
    }
    assert.ok(paintCalls > 0, file);
  }
});

test('Site shell: accent-filled tool buttons use a readable label in both themes', () => {
  for (const file of pages.filter(file => file.startsWith('Programy/'))) {
    const { document } = parseHTML(read(file));
    for (const style of document.querySelectorAll('style')) {
      for (const rule of style.textContent.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
        if (/background(?:-color)?:\s*var\(--accent\)/.test(rule[2])) {
          assert.doesNotMatch(rule[2], /(?<![-\w])color:\s*(?:white|#fff(?:fff)?)\s*;/i, `${file}: ${rule[1]}`);
        }
      }
    }
  }
  const luminance = hex => {
    const rgb = hex.match(/\w\w/g).map(value => parseInt(value, 16) / 255)
      .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
  };
  const css = read('assets/workshop/shell.css');
  for (const colors of [['21654d','f6f5ef'],['b8d58e','17231e']]) {
    colors.forEach(color => assert.ok(css.includes(`#${color}`)));
    const [low, high] = colors.map(luminance).sort((a,b) => a-b);
    assert.ok((high + 0.05) / (low + 0.05) >= 4.5);
  }
});
