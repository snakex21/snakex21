(() => {
  const grid = document.getElementById('games-grid');
  const art = window.gameArt || {};
  const recentKey = 'workshop-games:recent';
  for (const game of window.gamesCatalog || []) {
    const card = document.createElement('a');
    card.href = game.url; card.className = 'game-card';
    card.dataset.slug = game.slug;
    card.dataset.search = [game.title, game.description, ...(game.genres || []), ...(game.tags || [])].join(' ');
    // Filter chips match on modes and genres (see catalog.js).
    card.dataset.filters = [...(game.modes || []), ...(game.genres || [])].join('|');
    const cover = document.createElement('div'); cover.className = 'game-cover-wrapper';
    const fallback = document.createElement('span'); fallback.className = 'game-fallback'; fallback.setAttribute('aria-hidden', 'true');
    const titleWords = game.title.split('(')[0].match(/[\p{L}\p{N}]+/gu) || [];
    fallback.textContent = game.title === '2048' ? '2048' : titleWords.slice(0, 2).map(word => word[0]).join('').toLocaleUpperCase('pl');
    cover.appendChild(fallback);
    // Bundled SVG art first; a local image is the next choice; the text cover stays underneath either.
    if (art[game.slug]) {
      cover.insertAdjacentHTML('beforeend', art[game.slug]);
      cover.lastElementChild.setAttribute('class', 'game-art');
    } else if (game.cover && game.slug !== 'wojna-er') {
      const image = document.createElement('img'); image.src = game.cover; image.alt = ''; image.loading = 'lazy'; image.className = 'game-cover';
      image.addEventListener('error', () => image.remove()); cover.appendChild(image);
    }
    const info = document.createElement('div'); info.className = 'game-info';
    const title = document.createElement('div'); title.className = 'game-title'; title.textContent = game.title;
    const description = document.createElement('div'); description.className = 'game-description'; description.textContent = game.description;
    const tags = document.createElement('div'); tags.className = 'game-tags';
    for (const label of [...(game.modes || []), ...(game.genres || []).slice(0, 1)]) {
      const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = label; tags.appendChild(tag);
    }
    const play = document.createElement('span'); play.className = 'game-play'; play.setAttribute('aria-hidden', 'true'); play.textContent = 'Graj ▶';
    cover.appendChild(play);
    info.append(title, description, tags); card.append(cover, info); grid.appendChild(card);
    card.addEventListener('click', () => {
      try {
        const list = JSON.parse(localStorage.getItem(recentKey) || '[]');
        const next = [game.slug, ...(Array.isArray(list) ? list : []).filter(slug => slug !== game.slug)].slice(0, 4);
        localStorage.setItem(recentKey, JSON.stringify(next));
      } catch (_) { /* Recent games are a convenience only. */ }
    });
  }

  // "Losuj grę" opens a random game among those the current search/filter shows.
  const randomButton = document.getElementById('random-game');
  if (randomButton) randomButton.addEventListener('click', () => {
    const visible = [...grid.querySelectorAll('.game-card')].filter(card => !card.hidden);
    if (visible.length) visible[Math.floor(Math.random() * visible.length)].click();
  });

  // "Ostatnio grane": up to four shortcuts to games opened from this browser.
  const recentBox = document.getElementById('recent-games');
  if (!recentBox) return;
  let recent = [];
  try { const value = JSON.parse(localStorage.getItem(recentKey) || '[]'); if (Array.isArray(value)) recent = value; } catch (_) {}
  const bySlug = new Map((window.gamesCatalog || []).map(game => [game.slug, game]));
  const list = recentBox.querySelector('.recent-list');
  for (const slug of recent) {
    const game = bySlug.get(slug);
    if (!game) continue;
    const link = document.createElement('a');
    link.className = 'recent-chip'; link.href = game.url;
    if (art[slug]) { link.insertAdjacentHTML('beforeend', art[slug]); link.lastElementChild.setAttribute('class', 'recent-art'); }
    const label = document.createElement('span'); label.textContent = game.title; link.appendChild(label);
    list.appendChild(link);
  }
  recentBox.hidden = list.children.length === 0;
})();
