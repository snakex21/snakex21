(() => {
  const root = document.documentElement;
  // A defensive guard avoids double binding when a page reuses this entrypoint.
  if (root.hasAttribute('data-shell-ready')) return;
  root.setAttribute('data-shell-ready', '');
  const button = document.getElementById('theme-toggle');
  const validTheme = value => value === 'dark' || value === 'light';
  let theme = 'light';
  try {
    const saved = localStorage.getItem('theme');
    const legacy = validTheme(saved) ? saved : localStorage.getItem('site-theme');
    if (validTheme(legacy)) theme = legacy;
  } catch (_) { /* The whole site still works when storage is unavailable. */ }

  function apply() {
    root.setAttribute('data-theme', theme);
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
  apply();
  if (button) button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    apply();
    try { localStorage.setItem('theme', theme); } catch (_) {}
  });

  // Other tabs and history restores use the same preference without resetting a game.
  if (typeof window !== 'undefined' && typeof window.addEventListener === 'function') {
    window.addEventListener('storage', event => {
      if (event.key !== 'theme' && event.key !== null) return;
      theme = validTheme(event.newValue) ? event.newValue : 'light';
      apply();
    });
    window.addEventListener('pageshow', () => {
      try {
        const saved = localStorage.getItem('theme');
        if (validTheme(saved)) { theme = saved; apply(); }
      } catch (_) {}
    });
  }

  // Let old full-height game layouts account for a wrapping, zoomable header.
  const header = document.querySelector('[data-site-shell]');
  if (header && typeof ResizeObserver === 'function') {
    const measure = () => root.style.setProperty('--site-header-height', `${header.getBoundingClientRect().height}px`);
    measure();
    new ResizeObserver(measure).observe(header);
  }
})();
