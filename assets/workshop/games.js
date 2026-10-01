(() => {
  const grid = document.getElementById('games-grid');
  for (const game of window.gamesCatalog || []) {
    const card = document.createElement('a');
    card.href = game.url; card.className = 'game-card';
    card.dataset.search = [game.title, game.description, ...(game.genres || []), ...(game.tags || [])].join(' ');
    const cover = document.createElement('div'); cover.className = 'game-cover-wrapper';
    const fallback = document.createElement('span'); fallback.className = 'game-fallback'; fallback.setAttribute('aria-hidden', 'true');
    fallback.textContent = game.title === '2048' ? '2048' : game.title.split(' ').map(word => word[0]).slice(0,2).join('');
    cover.appendChild(fallback);
    // A local text cover remains visible for missing, blocked or empty artwork.
    if (game.cover && game.slug !== 'wojna-er') {
      const image = document.createElement('img'); image.src = game.cover; image.alt = ''; image.loading = 'lazy'; image.className = 'game-cover';
      image.addEventListener('error', () => image.remove()); cover.appendChild(image);
    }
    const info = document.createElement('div'); info.className = 'game-info';
    const title = document.createElement('div'); title.className = 'game-title'; title.textContent = game.title;
    const description = document.createElement('div'); description.className = 'game-description'; description.textContent = game.description;
    const tags = document.createElement('div'); tags.className = 'game-tags';
    for (const mode of game.modes || []) { const tag = document.createElement('span'); tag.className = 'tag'; tag.textContent = mode; tags.appendChild(tag); }
    info.append(title, description, tags); card.append(cover, info); grid.appendChild(card);
  }
})();
