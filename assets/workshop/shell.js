(() => {
  const root = document.documentElement;
  const button = document.getElementById('theme-toggle');
  let theme = 'light';
  try { theme = localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'; } catch (_) {}
  function apply() {
    root.setAttribute('data-theme', theme);
    if (!button) return;
    button.textContent = theme === 'dark' ? '☼' : '◐';
    button.setAttribute('aria-label', theme === 'dark' ? 'Włącz jasny motyw' : 'Włącz ciemny motyw');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
  }
  apply();
  if (button) button.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    apply();
    try { localStorage.setItem('theme', theme); } catch (_) {}
  });
})();
