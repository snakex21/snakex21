/* Motyw pulpitu dla gier i narzędzi otwieranych w oknach nowej strony (pulpitu).
 *
 * Pulpit przekazuje motyw na dwa sposoby:
 *   - w adresie ramki: ?theme=win95&variant=light (zapas, działa też przy otwarciu strony bezpośrednio),
 *   - wiadomością postMessage od okna nadrzędnego: { type: 'pulpit:theme', theme: 'win7', variant: 'light' }
 *     (przy wczytaniu ramki i przy każdej zmianie motywu, bez przeładowania gry).
 * Bez motywu skrypt nic nie robi i nie dociąga arkusza – zwykłe wejście na stronę wygląda jak dotąd.
 *
 * Z motywem: na <html> trafiają data-pulpit-theme (np. "win95") i data-pulpit-family (classic, bevel, xp, glass,
 * flat), a pulpit-theme.css (ładowany obok tego pliku) zmienia tokeny --shell-* i wygląd ogólnych kontrolek.
 * Atrybut data-theme należy do shell.js (jasny / ciemny), więc go nie zajmujemy – tylko wymuszamy jasny lub ciemny
 * wariant strony zgodny z motywem pulpitu, dopóki motyw jest aktywny (bez zmiany zapisanych ustawień strony). */
(function () {
  var root = document.documentElement;
  if (root.hasAttribute('data-pulpit-ready')) return;
  root.setAttribute('data-pulpit-ready', '');

  var FAMILY = {
    win1: 'classic', win2: 'classic', win31: 'classic',
    win95: 'bevel', win2000: 'bevel',
    winxp: 'xp',
    winvista: 'glass', win7: 'glass',
    win8: 'flat', win81: 'flat', win11: 'flat'
  };
  var KEY = 'pulpit-theme';
  var embedded = false;
  try { embedded = window.parent !== window; } catch (e) { embedded = true; }
  var script = document.currentScript;
  var cssHref = script && script.src ? script.src.replace(/\.js(\?[^#]*)?(#.*)?$/, '.css$1') : '';
  var current = null;   // { theme, variant }
  var observer = null;

  function valid(theme) { return typeof theme === 'string' && Object.prototype.hasOwnProperty.call(FAMILY, theme); }

  function loadCss() {
    if (!cssHref || document.getElementById('pulpit-theme-css')) return;
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.id = 'pulpit-theme-css';
    link.href = cssHref;
    (document.head || root).appendChild(link);
  }

  /* shell.js ustawia data-theme (light / dark) i klasę body.theme-dark według ustawień strony;
     przy aktywnym motywie pulpitu poprawiamy je na wariant motywu (zapisane ustawienia zostają bez zmian). */
  function enforceScheme() {
    if (!current) return;
    var want = current.variant === 'dark' ? 'dark' : 'light';
    if (root.getAttribute('data-theme') !== want) root.setAttribute('data-theme', want);
    if (document.body) document.body.classList.toggle('theme-dark', want === 'dark');
  }

  function apply(theme, variant) {
    if (!valid(theme)) return;
    // Ciemny wariant ma tylko Windows 11 (jak w themes.json pulpitu); pozostałe motywy są jasne.
    current = { theme: theme, variant: variant === 'dark' && theme === 'win11' ? 'dark' : 'light' };
    loadCss();
    root.setAttribute('data-pulpit-theme', theme);
    root.setAttribute('data-pulpit-family', FAMILY[theme]);
    root.setAttribute('data-pulpit-variant', current.variant);
    enforceScheme();
    if (!observer && typeof MutationObserver === 'function') {
      observer = new MutationObserver(enforceScheme);
      observer.observe(root, { attributes: true, attributeFilter: ['data-theme'] });
    }
    if (embedded) { try { sessionStorage.setItem(KEY, JSON.stringify(current)); } catch (e) {} }
  }

  // 1) adres strony
  var params = null;
  try { params = new URLSearchParams(location.search); } catch (e) {}
  if (params && valid(params.get('theme'))) apply(params.get('theme'), params.get('variant'));
  // 2) ostatni motyw w tej ramce (np. po przejściu na inną stronę starej witryny wewnątrz okna)
  else if (embedded) {
    try {
      var saved = JSON.parse(sessionStorage.getItem(KEY) || 'null');
      if (saved && valid(saved.theme)) apply(saved.theme, saved.variant);
    } catch (e) {}
  }

  // 3) wiadomości od pulpitu (tylko od bezpośredniego okna nadrzędnego)
  if (embedded) {
    window.addEventListener('message', function (e) {
      var d = e.data;
      if (e.source !== window.parent || !d || d.type !== 'pulpit:theme') return;
      apply(d.theme, d.variant);
    });
    var ask = function () { try { window.parent.postMessage({ type: 'pulpit:theme-request' }, '*'); } catch (e) {} };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ask); else ask();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', enforceScheme);
})();
