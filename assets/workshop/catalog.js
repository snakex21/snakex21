(() => {
  const input = document.getElementById('search-input');
  const clear = document.getElementById('search-clear');
  const cards = [...document.querySelectorAll('.tool-card, .game-card')];
  const counter = document.getElementById('results-counter');
  const empty = document.getElementById('no-results');
  const isTools = document.body.classList.contains('tools-page');
  const key = 'workshop-catalog:' + (isTools ? 'tools' : 'games');
  const total = document.getElementById('catalog-total');
  if (total) total.textContent = cards.length;
  const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').trim();
  let saved = {};
  try { const value = JSON.parse(sessionStorage.getItem(key)); if (value && typeof value === 'object') saved = value; } catch (_) {}
  const params = new URLSearchParams(location.search);
  input.value = params.has('q') ? params.get('q') : typeof saved.query === 'string' ? saved.query : '';
  // Optional filter chips (games page): a chip's data-filter lists values joined by "|",
  // and a card matches when any of them is among its data-filters.
  const chips = [...document.querySelectorAll('.filter-chip[data-filter]')];
  let filter = typeof saved.filter === 'string' && chips.some(chip => chip.dataset.filter === saved.filter) ? saved.filter : '';
  function matchesFilter(card) {
    if (!filter) return true;
    const own = (card.dataset.filters || '').split('|');
    return filter.split('|').some(value => own.includes(value));
  }
  function search() {
    const query = normalize(input.value); let count = 0;
    for (const chip of chips) chip.setAttribute('aria-pressed', String(chip.dataset.filter === filter));
    for (const card of cards) { card.hidden = !matchesFilter(card) || !normalize(card.dataset.search || card.textContent).includes(query); if (!card.hidden) count++; }
    clear.hidden = !input.value; empty.hidden = count !== 0;
    counter.textContent = `Wyświetlono ${count} z ${cards.length} ${isTools ? 'narzędzi' : 'gier'}`;
  }
  let lastFocusedHref = typeof saved.focusHref === 'string' ? saved.focusHref : '';
  function save(resume = false, focusHref = '') {
    try { sessionStorage.setItem(key, JSON.stringify({ query: input.value, filter, scroll: window.scrollY, resume, focusHref })); } catch (_) {}
  }
  function change() {
    search(); saved = {}; lastFocusedHref = '';
    const url = new URL(location.href); if (input.value) url.searchParams.set('q', input.value); else url.searchParams.delete('q');
    try { history.replaceState(null, '', url); } catch (_) {}
    save();
  }
  input.addEventListener('input', change);
  for (const chip of chips) chip.addEventListener('click', () => { filter = chip.dataset.filter; change(); });
  clear.addEventListener('click', () => { input.value = ''; change(); input.focus(); });
  // Enter moves keyboard focus to results without unexpectedly opening a tool.
  input.addEventListener('keydown', event => {
    if (event.key === 'Enter' && !event.isComposing) { event.preventDefault(); const first = cards.find(card => !card.hidden); if (first) first.focus(); }
  });
  for (const card of cards) card.addEventListener('click', () => {
    lastFocusedHref = card.getAttribute('href');
    save(true, lastFocusedHref);
  });
  window.addEventListener('pagehide', () => {
    const active = document.activeElement;
    save(true, cards.includes(active) ? active.getAttribute('href') : lastFocusedHref);
  });
  search();
  // Explicit catalog links and Back both restore the query and prior list position.
  // A different query supplied by the homepage must start at the top instead.
  if (saved.resume && saved.query === input.value && (saved.filter || '') === filter && Number.isFinite(saved.scroll) && saved.scroll >= 0) {
    requestAnimationFrame(() => {
      const target = cards.find(card => card.getAttribute('href') === saved.focusHref && !card.hidden);
      if (target) target.focus({ preventScroll: true });
      window.scrollTo(0, saved.scroll);
    });
  }
})();
