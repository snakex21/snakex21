/* One state for category, history and search; render a bounded page at a time. */
(() => {
  const container = document.getElementById('links-container');
  const input = document.getElementById('search-input');
  const stats = document.getElementById('search-stats');
  const nav = document.getElementById('category-nav');
  const more = document.getElementById('links-more');
  if (!container || !input || !stats || !nav || !more) return;
  if (typeof LINKHUB_LINKS === 'undefined') {
    container.textContent = 'Nie udało się wczytać linków. Odśwież stronę, aby spróbować ponownie.';
    return;
  }
  const links = LINKHUB_LINKS;
  const categories = typeof LINKHUB_CATEGORIES === 'undefined' ? {} : LINKHUB_CATEGORIES;
  let view = 'categories', category = 'all', query = '', limit = 60;
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const safeUrl = value => {
    try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? url.href : '#'; }
    catch (_) { return '#'; }
  };
  // Category names in data.js start with an emoji; the UI shows plain words so chips and headings stay calm.
  const plain = name => String(name ?? '').replace(/^[\p{Extended_Pictographic}\uFE0F\u200D\s]+/u, '') || String(name ?? '');
  const categoryName = key => plain((categories[key] || {}).name || key || 'Pozostałe');
  const host = value => { try { return new URL(value).hostname.replace(/^www\./, ''); } catch (_) { return ''; } };
  const counts = links.reduce((map, item) => map.set(item.category, (map.get(item.category) || 0) + 1), new Map());
  function card(item, showTag = true) {
    const site = host(safeUrl(item.url));
    const meta = (site ? `<span class="link-host">${escape(site)}</span>` : '') + (item.added ? `<span class="link-date">${escape(item.added)}</span>` : '');
    return `<a href="${escape(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" class="${view === 'timeline' ? 'timeline-card' : 'link-card'}">${showTag ? `<span class="link-tag">${escape(categoryName(item.category))}</span>` : ''}<div class="link-title">${escape(item.name)}</div>${item.description ? `<div class="link-desc">${escape(item.description)}</div>` : ''}${meta ? `<div class="link-meta">${meta}</div>` : ''}</a>`;
  }
  function render() {
    let selected = links.filter(item => (category === 'all' || item.category === category) &&
      `${item.name || ''} ${item.url || ''} ${item.description || ''}`.toLocaleLowerCase('pl').includes(query));
    if (view === 'timeline') selected = [...selected].sort((a,b) => String(b.added || '').localeCompare(String(a.added || '')));
    const shown = selected.slice(0,limit);
    stats.textContent = `Wyświetlono ${shown.length} z ${selected.length} pasujących linków · cała baza: ${links.length}`;
    more.hidden = shown.length >= selected.length;
    more.textContent = `Pokaż kolejne ${Math.min(60, selected.length - shown.length)}`;
    // Category filters remain visible in both views, so history never hides an active filter.
    nav.hidden = false;
    document.querySelectorAll('.view-tab').forEach(button => {
      const active = button.dataset.view === view;
      button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active));
    });
    nav.querySelectorAll('.category-btn').forEach(button => {
      const active = button.dataset.category === category;
      button.classList.toggle('active',active); button.setAttribute('aria-pressed',String(active));
    });
    if (!selected.length) { container.innerHTML = `<p class="lh-empty">${escape(query ? `Brak wyników dla „${query}”. Spróbuj innego słowa albo wybierz „Wszystkie”.` : 'Brak linków w tej kategorii.')}</p>`; return; }
    if (view === 'categories' && category === 'all' && !query) {
      const groups = new Map();
      shown.forEach(item => { if(!groups.has(item.category)) groups.set(item.category,[]); groups.get(item.category).push(item); });
      container.innerHTML = [...groups].map(([key,items]) => `<h2 class="section-header"><span>${escape(categoryName(key))}</span><button type="button" data-jump="${escape(key)}">Pokaż wszystkie (${counts.get(key) || items.length})</button></h2><div class="link-grid">${items.map(item => card(item, false)).join('')}</div>`).join('');
    } else container.innerHTML = view === 'timeline'
      ? `<div class="timeline">${shown.map(item => `<div class="timeline-item">${card(item)}</div>`).join('')}</div>`
      : `<div class="link-grid">${shown.map(item => card(item, category === 'all')).join('')}</div>`;
  }
  [...new Set(links.map(item => item.category))].forEach(key => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'category-btn'; button.dataset.category = key;
    button.textContent = categoryName(key);
    const count = document.createElement('span'); count.className = 'count'; count.textContent = String(counts.get(key) || 0);
    button.appendChild(count); nav.appendChild(button);
  });
  // "Pokaż wszystkie" in a section heading selects that category.
  container.addEventListener('click', event => {
    const jump = event.target.closest?.('[data-jump]');
    if (!jump) return;
    category = jump.dataset.jump; limit = 60; render();
    nav.querySelector('.category-btn.active')?.scrollIntoView?.({block:'nearest',inline:'nearest'});
  });
  nav.querySelectorAll('.category-btn').forEach(button => button.addEventListener('click', () => {category=button.dataset.category;limit=60;render();}));
  document.querySelectorAll('.view-tab').forEach(button => button.addEventListener('click', () => {view=button.dataset.view;limit=60;render();}));
  input.addEventListener('input', () => {query=input.value.trim().toLocaleLowerCase('pl');limit=60;render();});
  more.addEventListener('click', () => {
    const previousCount = container.querySelectorAll('a').length;
    limit += 60; render();
    // Move into the newly revealed results, including when the final button disappears.
    container.querySelectorAll('a')[previousCount]?.focus?.();
  });
  const badge=document.getElementById('pending-badge');
  if(badge && typeof LINKHUB_PENDING !== 'undefined' && LINKHUB_PENDING.length) {badge.textContent=String(LINKHUB_PENDING.length);badge.style.display='inline';}
  render();
})();
