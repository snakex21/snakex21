const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');
const root = path.join(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');

// Synthetic-DOM and deterministic-network checks, not browser visual QA.
function loadHome(options = {}) {
  const { document, Event } = parseHTML(read('index.html'));
  const weather = document.getElementById('weather-form');
  let submit;
  weather.addEventListener = (type, handler) => { if (type === 'submit') submit = handler; };
  const storage = new Map(Object.entries(options.storage || {}));
  const timers = new Map();
  let nextTimer = 1;
  const context = vm.createContext({
    document, console, URL, URLSearchParams, AbortController,
    window: {},
    localStorage: {
      getItem(key) { if (options.blockStorage) throw Error('disabled'); return storage.get(key) ?? null; },
      setItem(key, value) { if (options.blockStorage) throw Error('disabled'); storage.set(key, value); }
    },
    fetch: options.fetch || (() => { throw Error('Unexpected network request'); }),
    setInterval() {},
    setTimeout(callback) { const id = nextTimer++; timers.set(id, callback); return id; },
    clearTimeout(id) { timers.delete(id); }
  });
  for (const file of ['assets/workshop/shell.js', 'assets/workshop/home.js']) {
    vm.runInContext(read(file), context, { timeout: 1000 });
  }
  return {
    document, Event, storage, timers, context,
    submit(city) { document.getElementById('weather-city-input').value = city; return submit({ preventDefault() {} }); },
    status: () => document.getElementById('weather-status').textContent,
    summary: () => document.getElementById('weather-city').textContent + ' · ' + document.getElementById('weather-temp').textContent
  };
}
const ok = value => ({ ok: true, json: async () => value });
const geo = name => ({ results: [{ name, latitude: 52, longitude: 21 }] });
const forecast = temperature => ({ current_weather: { temperature } });
const deferred = () => { let resolve, reject; const promise = new Promise((a, b) => { resolve = a; reject = b; }); return { promise, resolve, reject }; };

test('Workshop: every local hub link, stylesheet and script resolves to a file', () => {
  for (const file of ['index.html', 'Programy/programy.html', 'gry/gry.html', 'filmy/filmy glowna.html', 'zmiany.html']) {
    const { document } = parseHTML(read(file));
    for (const node of document.querySelectorAll('a[href],link[href],script[src],img[src]')) {
      const value = node.getAttribute('href') || node.getAttribute('src');
      if (/^(?:[a-z]+:|#|\/\/)/i.test(value)) continue;
      const target = path.resolve(root, path.dirname(file), decodeURIComponent(value.split(/[?#]/)[0]));
      assert.ok(fs.existsSync(target), `${file}: missing ${value}`);
    }
    assert.ok(document.querySelector('.skip-link'));
    assert.ok(document.getElementById('main-content'));
    assert.equal(document.querySelectorAll('#theme-toggle').length, 1);
  }
});

test('Hub: the quiet home has clock, weather, offline quotes and six category destinations', () => {
  const p = loadHome();
  assert.equal(p.document.querySelectorAll('.category-grid a').length, 6);
  for (const id of ['time', 'date', 'timezone']) assert.ok(p.document.getElementById(id).textContent);
  assert.equal(p.document.querySelector('.hero'), null);
  assert.equal(p.document.getElementById('home-search-input'), null);
  assert.equal(p.document.querySelector('.project-grid'), null);
  const quote = p.document.getElementById('quote-text');
  const first = quote.textContent;
  p.document.getElementById('quote-refresh').dispatchEvent(new p.Event('click'));
  assert.notEqual(quote.textContent, first);
  assert.match(p.document.getElementById('quote-author').textContent, /Kochanowski/);
});

test('Workshop: tool data still matches all tool catalogue destinations', () => {
  const p = loadHome();
  vm.runInContext(read('assets/workshop/tools-data.js'), p.context);
  const { document: tools } = parseHTML(read('Programy/programy.html'));
  assert.deepEqual([...p.context.window.toolsCatalog].map(item => item.url).sort(),
    [...tools.querySelectorAll('.tool-card')].map(card => 'Programy/' + card.getAttribute('href')).sort());
});

test('Workshop: unavailable storage does not break the home or theme toggling', () => {
  const p = loadHome({ blockStorage: true });
  const button = p.document.getElementById('theme-toggle');
  button.dispatchEvent(new p.Event('click'));
  assert.equal(p.document.documentElement.getAttribute('data-theme'), 'dark');
  assert.equal(button.getAttribute('aria-pressed'), 'true');
  assert.match(button.getAttribute('aria-label'), /jasny/);
  button.dispatchEvent(new p.Event('click'));
  assert.equal(p.document.documentElement.getAttribute('data-theme'), 'light');
  assert.equal(button.getAttribute('aria-pressed'), 'false');
});

test('Workshop: first-visit weather is opt-in, encodes the city, saves success and clears its timeout', async () => {
  const calls = [];
  const p = loadHome({ fetch: async (url, options) => {
    calls.push({ url, options });
    return calls.length === 1 ? ok(geo('Łódź')) : ok(forecast(17.6));
  }});
  assert.equal(calls.length, 0);
  await p.submit(' Łódź & okolice ');
  assert.match(calls[0].url, /name=%C5%81%C3%B3d%C5%BA%20%26%20okolice&/);
  assert.equal(calls[0].options.signal, calls[1].options.signal);
  assert.match(p.summary(), /Łódź · 18°C/);
  assert.equal(p.storage.get('weatherCity'), 'Łódź & okolice');
  assert.equal(p.timers.size, 0);
});

test('Workshop: missing city, HTTP failure and invalid forecast remain retryable without overwriting storage', async () => {
  for (const responses of [
    [ok({ results: [] })],
    [{ ok: false }],
    [ok(geo('Warszawa')), { ok: false }],
    [ok(geo('Warszawa')), ok({})]
  ]) {
    const p = loadHome({ fetch: async () => responses.shift() });
    p.storage.set('weatherCity', 'Kraków');
    await p.submit('Test');
    assert.match(p.status(), /Nie znaleziono miasta|niedostępna/);
    assert.equal(p.storage.get('weatherCity'), 'Kraków');
    assert.equal(p.timers.size, 0);
  }
});

test('Workshop: an old weather success cannot overwrite a newer result or stored city', async () => {
  const old = deferred();
  let oldStarted = false;
  const p = loadHome({ fetch: async url => {
    if (url.includes('name=Old')) return ok(geo('Old'));
    if (url.includes('name=New')) return ok(geo('New'));
    if (!oldStarted) { oldStarted = true; return old.promise; }
    return ok(forecast(23));
  }});
  const first = p.submit('Old');
  while (!oldStarted) await Promise.resolve();
  await p.submit('New');
  old.resolve(ok(forecast(-10)));
  await first;
  assert.match(p.summary(), /New · 23°C/);
  assert.match(p.status(), /New · 23°C/);
  assert.equal(p.storage.get('weatherCity'), 'New');
  assert.equal(p.timers.size, 0);
});

test('Workshop: an old weather failure cannot replace a newer success', async () => {
  const old = deferred();
  let calls = 0;
  const p = loadHome({ fetch: async () => {
    calls++;
    if (calls === 1) return old.promise;
    return calls === 2 ? ok(geo('New')) : ok(forecast(12));
  }});
  const first = p.submit('Old');
  await p.submit('New');
  old.reject(Error('Network failed'));
  await first;
  assert.match(p.status(), /New · 12°C/);
  assert.equal(p.storage.get('weatherCity'), 'New');
  assert.equal(p.timers.size, 0);
});

test('Workshop: weather timeout aborts the request and permits a clean retry', async () => {
  let calls = 0;
  const p = loadHome({ fetch: async (url, { signal }) => {
    calls++;
    if (calls === 1) return new Promise((resolve, reject) => signal.addEventListener('abort', () => reject(Error('Aborted'))));
    return calls === 2 ? ok(geo('Warszawa')) : ok(forecast(5));
  }});
  const first = p.submit('Test');
  [...p.timers.values()][0]();
  await first;
  assert.match(p.status(), /niedostępna/);
  assert.equal(p.timers.size, 0);
  await p.submit('Warszawa');
  assert.match(p.status(), /Warszawa · 5°C/);
  assert.equal(p.timers.size, 0);
});

const flush = async () => { for (let i = 0; i < 12; i++) await Promise.resolve(); };
test('Hub: the existing weatherCity key survives reload and automatically loads that city', async () => {
  const calls = [];
  const p = loadHome({ storage: { weatherCity: 'Łódź', weatherAuto: 'true', theme: 'dark' }, fetch: async url => {
    calls.push(url);
    return calls.length === 1 ? ok(geo('Łódź')) : ok({ current_weather: { temperature: 16, weathercode: 3 } });
  }});
  await flush();
  assert.match(calls[0], /name=%C5%81%C3%B3d%C5%BA&/);
  assert.equal(calls.length, 2);
  assert.equal(p.document.getElementById('weather-city-input').value, 'Łódź');
  assert.match(p.summary(), /Łódź · 16°C/);
  assert.equal(p.document.getElementById('weather-desc').textContent, 'Pochmurno');
  assert.equal(p.storage.get('weatherCity'), 'Łódź');
  assert.equal(p.storage.get('weatherAuto'), 'true'); // No destructive migration.
  assert.equal(p.document.documentElement.getAttribute('data-theme'), 'dark');
});
test('Hub: failed startup weather keeps the remembered city and can be retried', async () => {
  let calls = 0;
  const p = loadHome({ storage: { weatherCity: 'Kraków' }, fetch: async () => {
    calls++;
    if (calls === 1) throw Error('offline');
    return calls === 2 ? ok(geo('Kraków')) : ok(forecast(7));
  }});
  await flush();
  assert.match(p.status(), /niedostępna/);
  assert.equal(p.storage.get('weatherCity'), 'Kraków');
  await p.submit('Kraków');
  assert.match(p.summary(), /Kraków · 7°C/);
});
test('Hub: successful weather still works when persistent storage is unavailable', async () => {
  let calls = 0;
  const p = loadHome({ blockStorage: true, fetch: async () => ++calls === 1 ? ok(geo('Warszawa')) : ok(forecast(11)) });
  await p.submit('Warszawa');
  assert.match(p.summary(), /Warszawa · 11°C/);
  assert.match(p.status(), /tylko na czas tej wizyty/);
});
test('Hub: invalid numeric weather cannot produce NaN or Infinity in the widget', async () => {
  for (const temperature of [NaN, Infinity, '10']) {
    let calls = 0;
    const p = loadHome({ fetch: async () => ++calls === 1 ? ok(geo('Warszawa')) : ok(forecast(temperature)) });
    await p.submit('Warszawa');
    assert.match(p.status(), /niedostępna/);
    assert.equal(p.document.getElementById('weather-temp').textContent, '--°C');
  }
});
