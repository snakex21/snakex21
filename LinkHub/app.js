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
  const categoryInfo = item => categories[item.category] || {name:item.category || 'Pozostałe',color:'#65716a'};
  function card(item) {
    const info = categoryInfo(item);
    const color = /^#[a-f\d]{3,8}$/i.test(info.color || '') ? info.color : '#65716a';
    return `<a href="${escape(safeUrl(item.url))}" target="_blank" rel="noopener noreferrer" class="${view === 'timeline' ? 'timeline-card' : 'link-card'}"><span class="link-tag" style="color:${color}">${escape(info.name)}</span><div class="link-title">${escape(item.name)}</div><div class="link-desc">${escape(item.description)}</div>${item.added ? `<div class="link-date">${escape(item.added)}</div>` : ''}</a>`;
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
    if (!selected.length) { container.textContent = query ? `Brak wyników dla „${query}”.` : 'Brak linków w tej kategorii.'; return; }
    if (view === 'categories' && category === 'all' && !query) {
      const groups = new Map();
      shown.forEach(item => { if(!groups.has(item.category)) groups.set(item.category,[]); groups.get(item.category).push(item); });
      container.innerHTML = [...groups].map(([key,items]) => `<h2 class="section-header">${escape((categories[key] || {}).name || key)}</h2><div class="link-grid">${items.map(card).join('')}</div>`).join('');
    } else container.innerHTML = view === 'timeline'
      ? `<div class="timeline">${shown.map(item => `<div class="timeline-item">${card(item)}</div>`).join('')}</div>`
      : `<div class="link-grid">${shown.map(card).join('')}</div>`;
  }
  [...new Set(links.map(item => item.category))].forEach(key => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'category-btn'; button.dataset.category = key;
    button.textContent = (categories[key] || {}).name || key; nav.appendChild(button);
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
