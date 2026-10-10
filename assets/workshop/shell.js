(() => {
  const root = document.documentElement;
  // A defensive guard avoids double binding when a page reuses this entrypoint.
  if (root.hasAttribute('data-shell-ready')) return;
  root.setAttribute('data-shell-ready', '');
  const button = document.getElementById('theme-toggle');
  const validTheme = value => value === 'dark' || value === 'light';
  // Accent palettes defined in shell.css; "las" (green) is the default.
  const palettes = ['las', 'ocean', 'sliwka', 'grafit'];
  const read = key => { try { return localStorage.getItem(key); } catch (_) { return null; } };
  const write = (key, value) => {
    try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, value); } catch (_) {}
  };
  const systemDark = () => {
    try { return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches; }
    catch (_) { return false; }
  };

  let theme = 'light';
  let auto = false;
  let palette = 'las';
  function load() {
    const saved = read('theme');
    const legacy = validTheme(saved) ? saved : read('site-theme');
    theme = validTheme(legacy) ? legacy : 'light';
    // "Systemowy" in Settings follows the device until the toggle picks a side.
    auto = read('themeAuto') === '1';
    if (auto) theme = systemDark() ? 'dark' : 'light';
    const savedPalette = read('palette');
    palette = palettes.includes(savedPalette) ? savedPalette : 'las';
  }

  function apply() {
    root.setAttribute('data-theme', theme);
    if (palette === 'las') root.removeAttribute('data-palette'); else root.setAttribute('data-palette', palette);
    // Three legacy game layouts still use this class for their own surfaces.
    if (document.body) {
      document.body.removeAttribute('data-theme');
      document.body.classList.toggle('theme-dark', theme === 'dark');
    }
    if (!button) return;
    button.textContent = theme === 'dark' ? '☼' : '◐';
    button.setAttribute('aria-label', theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.setAttribute('title', button.getAttribute('aria-label'));
  }
  load();
  apply();
  if (button) button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    auto = false;
    apply();
    write('theme', theme);
    write('themeAuto', null);
  });

  // Other tabs, the Settings page and history restores share the preference
  // without resetting a game.
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('storage', event => {
      if (event.key === 'theme') {
        theme = validTheme(event.newValue) ? event.newValue : 'light';
        if (!auto) { apply(); return; }
      }
      if (event.key !== null && !['theme', 'themeAuto', 'palette'].includes(event.key)) return;
      if (event.key === null) { theme = 'light'; auto = false; palette = 'las'; }
      load();
      apply();
    });
    window.addEventListener('pageshow', () => { load(); apply(); });
    window.addEventListener('shell:prefs', () => { load(); apply(); });
    try {
      const query = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)');
      if (query && query.addEventListener) query.addEventListener('change', () => { if (auto) { load(); apply(); } });
    } catch (_) {}
  }

  // The site root, from this script's own (relative) address.
  const shellScript = document.querySelector('script[src*="assets/workshop/shell.js"]');
  const prefix = shellScript ? shellScript.getAttribute('src').replace(/assets\/workshop\/shell\.js.*$/, '') : null;

  // Settings shortcut next to the theme button, on every page.
  if (button && prefix !== null && !document.querySelector('.settings-link')) {
    const link = document.createElement('a');
    link.className = 'settings-link';
    link.href = prefix + 'ustawienia.html';
    link.setAttribute('aria-label', 'Ustawienia');
    link.setAttribute('title', 'Ustawienia');
    link.textContent = '⚙';
    if (/(^|\/)ustawienia\.html$/.test((typeof location !== 'undefined' && location.pathname) || '')) link.setAttribute('aria-current', 'page');
    button.parentNode.insertBefore(link, button);
  }

  // Remember the last tools and games opened from this browser for the home page.
  try {
    if (prefix !== null && typeof location !== 'undefined' && typeof URL === 'function') {
      const base = new URL(prefix, location.href).pathname;
      const here = decodeURIComponent(location.pathname);
      const rel = here.startsWith(decodeURIComponent(base)) ? here.slice(decodeURIComponent(base).length) : '';
      const match = /^(Programy|gry)\/(?!_)[^/]+\/[^/]+\.html$/.exec(rel);
      if (match) {
        const title = (document.querySelector('main h1, h1') || {}).textContent || document.title.replace(/\s*-\s*Hub$/, '');
        const entry = { path: rel, title: title.replace(/\s+/g, ' ').replace(/^[^\p{L}\p{N}]+/u, '').trim().slice(0, 60), kind: match[1] === 'gry' ? 'game' : 'tool' };
        let list = JSON.parse(read('workshop:recent') || '[]');
        if (!Array.isArray(list)) list = [];
        list = [entry, ...list.filter(item => item && item.path !== rel)].slice(0, 8);
        write('workshop:recent', JSON.stringify(list));
      }
    }
  } catch (_) { /* Recent items are a convenience only. */ }

  // Let old full-height game layouts account for a wrapping, zoomable header.
  const header = document.querySelector('[data-site-shell]');
  if (header && typeof ResizeObserver === 'function') {
    const measure = () => root.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
    measure();
    new ResizeObserver(measure).observe(header);
  }
})();
