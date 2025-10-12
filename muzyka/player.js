(() => {
  const basePath = 'utwory/muzyka/';
  const favoritesStorageKey = 'mx_music_favorites_v2';

  const trackLibrary = [
    {
      title: 'Gimme! Gimme! Gimme! (A Man After Midnight)',
      artist: 'ABBA',
      album: 'Greatest Hits',
      file: 'ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3',
      accent: '#f97316'
    },
    {
      title: 'The Liberation Of Gracemeria',
      artist: 'Ace Combat 6 OST',
      album: 'Ace Combat 6',
      file: 'Ace Combat 6 OST - The Liberation Of Gracemeria.mp3',
      accent: '#60a5fa'
    },
    {
      title: 'All That She Wants',
      artist: 'Ace of Base',
      album: 'Happy Nation',
      file: 'Ace of Base - All That She Wants (Official Music Video).mp3',
      accent: '#f472b6'
    },
    {
      title: 'Ghost Town',
      artist: 'Adam Lambert',
      album: 'The Original High',
      file: 'Adam Lambert - Ghost Town [Official Music Video].mp3',
      accent: '#a855f7'
    },
    {
      title: 'All Falls Down',
      artist: 'Alan Walker feat. Noah Cyrus, Digital Farm Animals',
      album: 'Different World',
      file: 'Alan Walker - All Falls Down (feat. Noah Cyrus with Digital Farm Animals).mp3',
      accent: '#38bdf8'
    },
    {
      title: 'Alone',
      artist: 'Alan Walker',
      album: 'Different World',
      file: 'Alan Walker - Alone.mp3',
      accent: '#4c1d95'
    },
    {
      title: 'Faded',
      artist: 'Alan Walker',
      album: 'Different World',
      file: 'Alan Walker - Faded.mp3',
      accent: '#2563eb'
    },
    {
      title: 'Sing Me To Sleep',
      artist: 'Alan Walker',
      album: 'Different World',
      file: 'Alan Walker - Sing Me To Sleep.mp3',
      accent: '#22d3ee'
    },
    {
      title: 'Man On The Moon',
      artist: 'Alan Walker x Benjamin Ingrosso',
      album: 'World of Walker',
      file: 'Alan Walker x Benjamin Ingrosso - Man On The Moon (Official Music Video).mp3',
      accent: '#facc15'
    },
    {
      title: 'Lady Gaga (Lyrics)',
      artist: 'Alejandro',
      album: 'Single',
      file: 'Alejandro - Lady Gaga (Lyrics) 🎵.mp3',
      accent: '#ef4444'
    },
    {
      title: 'Mr. Saxobeat',
      artist: 'Alexandra Stan',
      album: 'Saxobeats',
      file: 'Alexandra Stan - Mr. Saxobeat (Official Video).mp3',
      accent: '#f97316'
    },
    {
      title: 'Please Tell Rosie',
      artist: 'Alle Farben',
      album: 'Music Is My Best Friend',
      file: 'Alle Farben Please Tell Rosie (Lyric Video).mp3',
      accent: '#14b8a6'
    },
    {
      title: 'I Need A Dollar',
      artist: 'Aloe Blacc',
      album: 'Good Things',
      file: 'Aloe Blacc - I Need A Dollar.mp3',
      accent: '#ea580c'
    },
    {
      title: 'El Mismo Sol',
      artist: 'Alvaro Soler',
      album: 'Eterno Agosto',
      file: 'Alvaro Soler - El Mismo Sol.mp3',
      accent: '#f59e0b'
    },
    {
      title: 'La Cintura',
      artist: 'Alvaro Soler',
      album: 'Mar de Colores',
      file: 'Alvaro Soler - La Cintura - Lyrics  Letra.mp3',
      accent: '#f97316'
    },
    {
      title: 'Sofia',
      artist: 'Alvaro Soler',
      album: 'Eterno Agosto',
      file: 'Alvaro Soler - Sofia.mp3',
      accent: '#fbbf24'
    },
    {
      title: 'Best Day Of My Life',
      artist: 'American Authors',
      album: 'Oh, What a Life',
      file: 'American Authors - Best Day Of My Life.mp3',
      accent: '#22c55e'
    },
    {
      title: 'Slow It Down',
      artist: 'Amy Macdonald',
      album: 'Life in a Beautiful Light',
      file: 'Amy Macdonald - Slow It Down (Official Video).mp3',
      accent: '#ec4899'
    },
    {
      title: 'This Is The Life',
      artist: 'Amy Macdonald',
      album: 'This Is the Life',
      file: 'Amy Macdonald - This Is The Life.mp3',
      accent: '#fb7185'
    },
    {
      title: 'Barbie Girl',
      artist: 'Aqua',
      album: 'Aquarium',
      file: 'Aqua - Barbie Girl (Official Music Video).mp3',
      accent: '#60a5fa'
    },
    {
      title: 'The Ketchup Song (Aserejé)',
      artist: 'Las Ketchup',
      album: 'Hijas del Tomate',
      file: 'Aserejé (The Ketchup Song) [Spanish Version] - Las Ketchup.mp3',
      accent: '#f97316'
    },
    {
      title: 'Take On Me',
      artist: 'a-ha',
      album: 'Hunting High and Low',
      file: 'a-ha - Take On Me (Official Video) [Remastered in 4K].mp3',
      accent: '#38bdf8'
    },
    {
      title: 'James Bond Theme',
      artist: 'Monty Norman',
      album: '007',
      file: '007  James Bond  Theme.mp3',
      accent: '#facc15'
    },
    {
      title: 'OPPA GODDAMN STYLE',
      artist: 'PSYTP',
      album: 'Parodie',
      file: '[PSYTP] OPPA GODDAMN STYLE.mp3',
      accent: '#22d3ee'
    },
    {
      title: 'Donald Trump Sings All Star',
      artist: 'Donald Trump AI',
      album: 'Memiczna Kolekcja',
      file: '♪ Donald Trump Sings All Star by Smash Mouth.mp3',
      accent: '#f59e0b'
    },
    {
      title: 'Shape of You (Parodia)',
      artist: 'Janusz Korwin-Mikke',
      album: 'Parodie',
      file: '♪ Janusz Korwin-Mikke - Shape of You (Ed Sheeran Parodia).mp3',
      accent: '#fb7185'
    }
  ];

  if (!trackLibrary.length) {
    return;
  }

  const state = {
    currentIndex: 0,
    shuffle: false,
    loop: 'off',
    isPlaying: false,
    queueOrder: trackLibrary.map((_, index) => index),
    favorites: new Set(),
    previousVolume: 0.8
  };

  const audio = new Audio();
  audio.preload = 'metadata';
  audio.volume = state.previousVolume;

  const elements = {
    heroTrackCount: document.getElementById('track-count'),
    heroShuffleStatus: document.getElementById('autoplay-status'),
    heroLoopStatus: document.getElementById('loop-status'),
    heroLastPlayed: document.getElementById('last-played'),
    cover: document.querySelector('[data-cover]'),
    barCover: document.querySelector('[data-bar-cover]'),
    title: document.querySelector('[data-title]'),
    artist: document.querySelector('[data-artist]'),
    album: document.querySelector('[data-album]'),
    barTitle: document.querySelector('[data-bar-title]'),
    barArtist: document.querySelector('[data-bar-artist]'),
    progressControls: document.querySelectorAll('[data-progress]'),
    currentTimeDisplays: document.querySelectorAll('[data-current-time]'),
    durationDisplays: document.querySelectorAll('[data-duration]'),
    playButtons: document.querySelectorAll('[data-action="play"]'),
    shuffleButtons: document.querySelectorAll('[data-action="shuffle"]'),
    prevButtons: document.querySelectorAll('[data-action="prev"]'),
    nextButtons: document.querySelectorAll('[data-action="next"]'),
    loopButtons: document.querySelectorAll('[data-action="loop"]'),
    randomButtons: document.querySelectorAll('[data-action="random"]'),
    likeButtons: document.querySelectorAll('[data-action="like"]'),
    muteButtons: document.querySelectorAll('[data-action="mute"]'),
    volumeControls: document.querySelectorAll('[data-volume]'),
    queueElement: document.querySelector('[data-queue]'),
    queueEmpty: document.querySelector('[data-empty]'),
    queueCount: document.querySelector('[data-queue-count]'),
    queueSearch: document.querySelector('[data-search]'),
    clearSearch: document.querySelector('[data-action="clear-search"]'),
    libraryGrid: document.querySelector('[data-library-grid]'),
    libraryEmpty: document.querySelector('[data-library-empty]'),
    librarySearch: document.querySelector('[data-library-search]'),
    loopIndicator: document.querySelector('[data-loop-indicator]'),
    libraryDrawer: document.querySelector('[data-library-drawer]'),
    libraryDrawerPanel: document.querySelector('[data-library-drawer-panel]'),
    libraryDrawerList: document.querySelector('[data-library-drawer-list]'),
    libraryDrawerSearch: document.querySelector('[data-library-drawer-search]'),
    libraryDrawerEmpty: document.querySelector('[data-library-drawer-empty]'),
    openLibraryButtons: document.querySelectorAll('[data-action="open-library"]'),
    closeLibraryButtons: document.querySelectorAll('[data-action="close-library"]')
  };

  let isDrawerOpen = false;
  let lastFocusedElement = null;

  function hexToRgb(hex) {
    const cleaned = hex.replace('#', '');
    const bigint = parseInt(cleaned, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255
    };
  }

  function rgbToHex({ r, g, b }) {
    return '#'
      + [r, g, b]
        .map((value) => {
          const v = Math.max(0, Math.min(255, Math.round(value)));
          return v.toString(16).padStart(2, '0');
        })
        .join('');
  }

  function mixColors(colorA, colorB, weight) {
    const a = hexToRgb(colorA);
    const b = hexToRgb(colorB);
    return rgbToHex({
      r: a.r + (b.r - a.r) * weight,
      g: a.g + (b.g - a.g) * weight,
      b: a.b + (b.b - a.b) * weight
    });
  }

  function formatTime(seconds) {
    if (!Number.isFinite(seconds) || seconds < 0) {
      return '0:00';
    }
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  }

  function matchesFilter(track, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return true;
    }
    return (
      track.title.toLowerCase().includes(normalized)
      || track.artist.toLowerCase().includes(normalized)
      || (track.album && track.album.toLowerCase().includes(normalized))
    );
  }

  function formatCount(count) {
    if (count === 1) {
      return '1 utwór';
    }
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) {
      return `${count} utwory`;
    }
    return `${count} utworów`;
  }

  function loadFavorites() {
    try {
      const stored = JSON.parse(localStorage.getItem(favoritesStorageKey) || '[]');
      if (Array.isArray(stored)) {
        stored.forEach((index) => {
          if (Number.isInteger(index) && trackLibrary[index]) {
            state.favorites.add(index);
          }
        });
      }
    } catch (error) {
      console.warn('Nie udało się wczytać ulubionych utworów', error);
    }
  }

  function saveFavorites() {
    const payload = Array.from(state.favorites.values());
    localStorage.setItem(favoritesStorageKey, JSON.stringify(payload));
  }

  function updateHero() {
    if (elements.heroTrackCount) {
      elements.heroTrackCount.textContent = trackLibrary.length.toString();
    }
    if (elements.heroShuffleStatus) {
      elements.heroShuffleStatus.textContent = state.shuffle ? 'Losowo włączone' : 'Losowo wyłączone';
    }
    if (elements.heroLoopStatus) {
      const label = state.loop === 'all' ? 'Powtarzanie listy' : state.loop === 'one' ? 'Powtarzanie utworu' : 'Brak';
      elements.heroLoopStatus.textContent = label;
    }
  }

  function updateLoopIndicator() {
    const label = state.loop === 'all' ? 'Powtarzanie listy' : state.loop === 'one' ? 'Powtarzanie utworu' : 'Brak powtarzania';
    if (elements.loopIndicator) {
      elements.loopIndicator.textContent = `Tryb: ${label.toLowerCase()}`;
    }
    if (elements.heroLoopStatus) {
      elements.heroLoopStatus.textContent = state.loop === 'off' ? 'Brak' : label;
    }
    elements.loopButtons.forEach((button) => {
      button.classList.toggle('is-active', state.loop !== 'off');
      button.setAttribute('aria-pressed', state.loop !== 'off');
      button.textContent = state.loop === 'one' ? '🔂' : '🔁';
      button.setAttribute(
        'aria-label',
        state.loop === 'off' ? 'Włącz powtarzanie listy' : state.loop === 'all' ? 'Powtórz tylko bieżący utwór' : 'Wyłącz powtarzanie'
      );
    });
  }

  function updateShuffleIndicator() {
    const label = state.shuffle ? 'Losowo włączone' : 'Losowo wyłączone';
    if (elements.heroShuffleStatus) {
      elements.heroShuffleStatus.textContent = label;
    }
    elements.shuffleButtons.forEach((button) => {
      button.classList.toggle('is-active', state.shuffle);
      button.setAttribute('aria-pressed', String(state.shuffle));
    });
  }

  function applyAccent(track) {
    const accent = track.accent || '#6366f1';
    const accentLight = mixColors(accent, '#ffffff', 0.35);
    const accentDark = mixColors(accent, '#0f172a', 0.55);
    const gradient = `linear-gradient(145deg, ${accent}, ${accentLight} 45%, ${accentDark} 100%)`;
    if (elements.cover) {
      elements.cover.style.setProperty('--cover-background', gradient);
      elements.cover.dataset.initial = track.title.charAt(0).toUpperCase();
      elements.cover.dataset.hasImage = 'false';
      elements.cover.style.removeProperty('background-image');
      if (track.cover) {
        const url = track.cover;
        elements.cover.style.setProperty('--cover-background', `url('${url}') center/cover no-repeat`);
        elements.cover.dataset.hasImage = 'true';
      }
    }

    if (elements.barCover) {
      const barGradient = `linear-gradient(135deg, ${accent}, ${accentDark})`;
      elements.barCover.style.setProperty('--bar-background', barGradient);
      elements.barCover.dataset.initial = track.title.charAt(0).toUpperCase();
      elements.barCover.dataset.hasImage = 'false';
      elements.barCover.style.removeProperty('background-image');
      if (track.cover) {
        const url = track.cover;
        elements.barCover.style.setProperty('--bar-background', `url('${url}') center/cover no-repeat`);
        elements.barCover.dataset.hasImage = 'true';
      }
    }
  }

  function updateLikeButtons() {
    const isFavorite = state.favorites.has(state.currentIndex);
    elements.likeButtons.forEach((button) => {
      button.classList.toggle('is-active', isFavorite);
      button.setAttribute('aria-pressed', String(isFavorite));
      if (button.hasAttribute('data-bar-like')) {
        button.textContent = isFavorite ? '♥' : '♡';
      } else if (button.classList.contains('tag-btn')) {
        button.textContent = isFavorite ? '★ Ulubiony' : '♡ Ulubiony';
      }
    });
  }

  function highlightQueue() {
    if (!elements.queueElement) {
      return;
    }
    elements.queueElement.querySelectorAll('.queue-item').forEach((item) => {
      const index = Number(item.dataset.trackIndex);
      item.classList.toggle('is-active', index === state.currentIndex);
    });
  }

  function highlightDrawer() {
    if (!elements.libraryDrawerList) {
      return;
    }
    elements.libraryDrawerList.querySelectorAll('.drawer-track').forEach((row) => {
      const index = Number(row.dataset.trackIndex);
      const track = trackLibrary[index];
      if (!track) {
        return;
      }
      const isActive = index === state.currentIndex;
      const isFavorite = state.favorites.has(index);
      row.classList.toggle('is-active', isActive);
      row.classList.toggle('is-favorite', isFavorite);
      const favoriteButton = row.querySelector('.drawer-track__favorite');
      if (favoriteButton) {
        favoriteButton.textContent = isFavorite ? '♥' : '♡';
        favoriteButton.setAttribute('aria-pressed', String(isFavorite));
        favoriteButton.setAttribute(
          'aria-label',
          isFavorite ? `Usuń ${track.title} z ulubionych` : `Dodaj ${track.title} do ulubionych`
        );
      }
    });
  }

  function highlightLibrary() {
    if (!elements.libraryGrid) {
      highlightDrawer();
      return;
    }
    const isFavorite = (index) => state.favorites.has(index);
    elements.libraryGrid.querySelectorAll('.library-card').forEach((card) => {
      const index = Number(card.dataset.trackIndex);
      card.classList.toggle('is-active', index === state.currentIndex);
      card.classList.toggle('is-favorite', isFavorite(index));
    });
    highlightDrawer();
  }

  function buildQueue(filter = '') {
    if (!elements.queueElement) {
      return;
    }
    const normalized = filter.trim().toLowerCase();
    let indices = trackLibrary.map((_, index) => index);
    if (normalized) {
      indices = indices.filter((index) => matchesFilter(trackLibrary[index], normalized));
      if (!indices.includes(state.currentIndex)) {
        indices.unshift(state.currentIndex);
      }
    }
    indices = Array.from(new Set(indices));
    state.queueOrder = indices;

    elements.queueElement.innerHTML = '';
    indices.forEach((index) => {
      const track = trackLibrary[index];
      const item = document.createElement('li');
      item.className = 'queue-item';
      item.dataset.trackIndex = String(index);
      item.tabIndex = 0;
      item.setAttribute('role', 'option');
      if (normalized && !matchesFilter(track, normalized)) {
        item.classList.add('is-muted');
      }
      const title = document.createElement('span');
      title.className = 'queue-track';
      title.textContent = track.title;
      const artist = document.createElement('span');
      artist.className = 'queue-artist';
      artist.textContent = track.artist;
      item.append(title, artist);
      elements.queueElement.append(item);
    });

    const hasResults = indices.length > 0;
    if (elements.queueEmpty) {
      elements.queueEmpty.hidden = hasResults;
    }
    if (elements.queueCount) {
      elements.queueCount.textContent = formatCount(indices.length);
    }
    highlightQueue();
  }

  function buildLibrary(filter = '') {
    if (!elements.libraryGrid) {
      return;
    }
    const normalized = filter.trim().toLowerCase();
    const cards = trackLibrary
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => matchesFilter(track, normalized));

    elements.libraryGrid.innerHTML = '';

    cards.forEach(({ track, index }) => {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'library-card';
      card.dataset.trackIndex = String(index);
      const accent = track.accent || '#6366f1';
      const accentLight = mixColors(accent, '#ffffff', 0.2);
      const accentDark = mixColors(accent, '#0f172a', 0.55);
      card.style.setProperty('--library-background', `linear-gradient(155deg, ${accent}, ${accentLight} 48%, ${accentDark} 100%)`);
      card.style.setProperty('--library-border', mixColors(accent, '#ffffff', 0.25));

      const badge = document.createElement('span');
      badge.className = 'library-badge';
      badge.textContent = track.album || 'Single';

      const title = document.createElement('h4');
      title.textContent = track.title;

      const artist = document.createElement('span');
      artist.textContent = track.artist;

      card.append(badge, title, artist);
      elements.libraryGrid.append(card);
    });

    const hasResults = cards.length > 0;
    if (elements.libraryEmpty) {
      elements.libraryEmpty.hidden = hasResults;
    }
    highlightLibrary();
  }

  function buildLibraryDrawer(filter = '') {
    if (!elements.libraryDrawerList) {
      return;
    }
    const normalized = filter.trim().toLowerCase();
    const tracks = trackLibrary
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => matchesFilter(track, normalized));

    elements.libraryDrawerList.innerHTML = '';

    tracks.forEach(({ track, index }) => {
      const item = document.createElement('li');
      item.className = 'drawer-track';
      item.dataset.trackIndex = String(index);

      const mainButton = document.createElement('button');
      mainButton.type = 'button';
      mainButton.className = 'drawer-track__main';
      mainButton.dataset.drawerAction = 'play';
      mainButton.setAttribute('aria-label', `Odtwórz ${track.title} – ${track.artist}`);

      const number = document.createElement('span');
      number.className = 'drawer-track__number';
      number.textContent = String(index + 1).padStart(2, '0');

      const meta = document.createElement('div');
      meta.className = 'drawer-track__meta';

      const title = document.createElement('span');
      title.className = 'drawer-track__title';
      title.textContent = track.title;

      const subtitle = document.createElement('span');
      subtitle.className = 'drawer-track__subtitle';
      subtitle.textContent = track.album ? `${track.artist} • ${track.album}` : track.artist;

      meta.append(title, subtitle);
      mainButton.append(number, meta);

      const favoriteButton = document.createElement('button');
      favoriteButton.type = 'button';
      favoriteButton.className = 'drawer-track__favorite';
      favoriteButton.dataset.drawerAction = 'favorite';
      favoriteButton.setAttribute('aria-pressed', 'false');
      favoriteButton.setAttribute('aria-label', `Dodaj ${track.title} do ulubionych`);
      favoriteButton.textContent = '♡';

      item.append(mainButton, favoriteButton);
      elements.libraryDrawerList.append(item);
    });

    const hasResults = tracks.length > 0;
    if (elements.libraryDrawerEmpty) {
      elements.libraryDrawerEmpty.hidden = hasResults;
    }
    highlightDrawer();
  }

  function openLibraryDrawer() {
    if (!elements.libraryDrawer) {
      return;
    }
    if (!elements.libraryDrawer.classList.contains('is-open')) {
      lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    const currentFilter = elements.libraryDrawerSearch ? elements.libraryDrawerSearch.value : '';
    buildLibraryDrawer(currentFilter);
    elements.libraryDrawer.classList.add('is-open');
    elements.libraryDrawer.setAttribute('aria-hidden', 'false');
    document.body.classList.add('drawer-open');
    isDrawerOpen = true;
    if (elements.libraryDrawerSearch) {
      const focusTarget = elements.libraryDrawerSearch;
      if (typeof window !== 'undefined' && window.requestAnimationFrame) {
        window.requestAnimationFrame(() => {
          focusTarget.focus();
        });
      } else {
        focusTarget.focus();
      }
    }
  }

  function closeLibraryDrawer(options = {}) {
    if (!elements.libraryDrawer) {
      return;
    }
    if (!elements.libraryDrawer.classList.contains('is-open')) {
      return;
    }
    elements.libraryDrawer.classList.remove('is-open');
    elements.libraryDrawer.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('drawer-open');
    isDrawerOpen = false;
    const { restoreFocus = true } = options;
    if (restoreFocus && lastFocusedElement) {
      lastFocusedElement.focus();
    }
    lastFocusedElement = null;
  }

  function handleDocumentKeydown(event) {
    if (event.key === 'Escape' && isDrawerOpen) {
      event.preventDefault();
      closeLibraryDrawer();
    }
  }

  function syncProgressDisplays() {
    const duration = audio.duration;
    const current = audio.currentTime;
    const value = duration ? Math.min(1000, Math.max(0, Math.floor((current / duration) * 1000))) : 0;
    elements.progressControls.forEach((input) => {
      if (document.activeElement !== input) {
        input.value = String(value);
      }
    });
    elements.currentTimeDisplays.forEach((display) => {
      display.textContent = formatTime(current);
    });
    elements.durationDisplays.forEach((display) => {
      display.textContent = formatTime(duration);
    });
  }

  function setVolume(value) {
    const clamped = Math.min(100, Math.max(0, Number(value)));
    const level = clamped / 100;
    audio.volume = level;
    if (clamped > 0) {
      state.previousVolume = level;
    }
    elements.volumeControls.forEach((slider) => {
      slider.value = String(clamped);
    });
    elements.muteButtons.forEach((button) => {
      button.textContent = audio.volume === 0 ? '🔇' : '🔊';
    });
  }

  function toggleMute() {
    if (audio.volume === 0) {
      const restored = state.previousVolume > 0 ? state.previousVolume : 0.5;
      setVolume(restored * 100);
    } else {
      if (audio.volume > 0) {
        state.previousVolume = audio.volume;
      }
      setVolume(0);
    }
  }

  function play() {
    audio.play().catch((error) => {
      console.warn('Problem z odtworzeniem audio', error);
    });
  }

  function pause() {
    audio.pause();
  }

  function togglePlay() {
    if (audio.paused) {
      play();
    } else {
      pause();
    }
  }

  function getQueueIndices() {
    return state.queueOrder.length ? state.queueOrder : trackLibrary.map((_, index) => index);
  }

  function getNextIndex() {
    const order = getQueueIndices();
    if (!order.length) {
      return state.currentIndex;
    }
    if (state.shuffle) {
      if (order.length === 1) {
        return order[0];
      }
      let next;
      do {
        next = order[Math.floor(Math.random() * order.length)];
      } while (next === state.currentIndex);
      return next;
    }
    const position = order.indexOf(state.currentIndex);
    if (position === -1) {
      return order[0];
    }
    if (position + 1 < order.length) {
      return order[position + 1];
    }
    return state.loop === 'all' ? order[0] : null;
  }

  function getPreviousIndex() {
    const order = getQueueIndices();
    if (!order.length) {
      return state.currentIndex;
    }
    const position = order.indexOf(state.currentIndex);
    if (position > 0) {
      return order[position - 1];
    }
    if (state.loop !== 'off') {
      return order[order.length - 1];
    }
    return null;
  }

  function updateTitle(track) {
    if (elements.title) {
      elements.title.textContent = track.title;
    }
    if (elements.artist) {
      elements.artist.textContent = track.artist;
    }
    if (elements.album) {
      elements.album.textContent = track.album ? `${track.album} • ${track.artist}` : track.artist;
    }
    if (elements.barTitle) {
      elements.barTitle.textContent = track.title;
    }
    if (elements.barArtist) {
      elements.barArtist.textContent = track.artist;
    }
    if (elements.heroLastPlayed) {
      elements.heroLastPlayed.textContent = track.title;
    }
    document.title = `${track.title} – Max Playground`;
  }

  function loadTrack(index, options = {}) {
    const track = trackLibrary[index];
    if (!track) {
      return;
    }
    state.currentIndex = index;
    const source = `${basePath}${track.file}`;
    const wasPlaying = options.autoplay ?? state.isPlaying;
    audio.src = source;
    audio.currentTime = options.startTime || 0;
    applyAccent(track);
    updateTitle(track);
    highlightQueue();
    highlightLibrary();
    updateLikeButtons();
    if (wasPlaying) {
      play();
    } else {
      pause();
      syncProgressDisplays();
    }
  }

  function nextTrack(manual = false) {
    const nextIndex = getNextIndex();
    if (nextIndex === null || nextIndex === undefined) {
      pause();
      audio.currentTime = 0;
      syncProgressDisplays();
      return;
    }
    loadTrack(nextIndex, { autoplay: true });
    if (manual && elements.queueSearch && elements.queueSearch.value.trim()) {
      buildQueue(elements.queueSearch.value);
    }
  }

  function previousTrack() {
    if (audio.currentTime > 3) {
      audio.currentTime = 0;
      syncProgressDisplays();
      return;
    }
    const prevIndex = getPreviousIndex();
    if (prevIndex === null || prevIndex === undefined) {
      audio.currentTime = 0;
      syncProgressDisplays();
      return;
    }
    loadTrack(prevIndex, { autoplay: true });
  }

  function toggleShuffle() {
    state.shuffle = !state.shuffle;
    updateShuffleIndicator();
  }

  function cycleLoopMode() {
    state.loop = state.loop === 'off' ? 'all' : state.loop === 'all' ? 'one' : 'off';
    updateLoopIndicator();
  }

  function toggleFavorite(target = state.currentIndex) {
    let index = target;
    if (typeof target === 'object') {
      index = state.currentIndex;
    }
    const parsed = Number(index);
    if (!Number.isInteger(parsed) || !trackLibrary[parsed]) {
      return;
    }
    if (state.favorites.has(parsed)) {
      state.favorites.delete(parsed);
    } else {
      state.favorites.add(parsed);
    }
    if (parsed === state.currentIndex) {
      updateLikeButtons();
    }
    highlightLibrary();
    highlightDrawer();
    saveFavorites();
  }

  function playRandomTrack() {
    const pool = trackLibrary.map((_, index) => index);
    if (!pool.length) {
      return;
    }
    let candidate = pool[Math.floor(Math.random() * pool.length)];
    if (pool.length > 1) {
      while (candidate === state.currentIndex) {
        candidate = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    loadTrack(candidate, { autoplay: true });
  }

  function attachEventListeners() {
    elements.playButtons.forEach((button) => button.addEventListener('click', togglePlay));
    elements.prevButtons.forEach((button) => button.addEventListener('click', previousTrack));
    elements.nextButtons.forEach((button) => button.addEventListener('click', () => nextTrack(true)));
    elements.shuffleButtons.forEach((button) => button.addEventListener('click', () => {
      toggleShuffle();
      updateHero();
    }));
    elements.loopButtons.forEach((button) => button.addEventListener('click', () => {
      cycleLoopMode();
      updateHero();
    }));
    elements.randomButtons.forEach((button) => button?.addEventListener('click', playRandomTrack));
    elements.likeButtons.forEach((button) => button.addEventListener('click', toggleFavorite));
    elements.muteButtons.forEach((button) => button.addEventListener('click', toggleMute));
    elements.volumeControls.forEach((slider) => slider.addEventListener('input', (event) => setVolume(event.target.value)));
    elements.progressControls.forEach((slider) =>
      slider.addEventListener('input', (event) => {
        if (!Number.isFinite(audio.duration) || audio.duration === 0) {
          return;
        }
        const percent = Number(event.target.value) / 1000;
        audio.currentTime = percent * audio.duration;
        syncProgressDisplays();
      })
    );
    if (elements.queueElement) {
      elements.queueElement.addEventListener('click', (event) => {
        const item = event.target.closest('.queue-item');
        if (!item) {
          return;
        }
        const index = Number(item.dataset.trackIndex);
        loadTrack(index, { autoplay: true });
      });
      elements.queueElement.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          const item = event.target.closest('.queue-item');
          if (item) {
            event.preventDefault();
            const index = Number(item.dataset.trackIndex);
            loadTrack(index, { autoplay: true });
          }
        }
      });
    }
    if (elements.libraryGrid) {
      elements.libraryGrid.addEventListener('click', (event) => {
        const card = event.target.closest('.library-card');
        if (!card) {
          return;
        }
        const index = Number(card.dataset.trackIndex);
        loadTrack(index, { autoplay: true });
      });
    }
    if (elements.queueSearch) {
      elements.queueSearch.addEventListener('input', (event) => {
        buildQueue(event.target.value);
      });
    }
    if (elements.clearSearch) {
      elements.clearSearch.addEventListener('click', () => {
        if (elements.queueSearch) {
          elements.queueSearch.value = '';
        }
        buildQueue('');
      });
    }
    if (elements.librarySearch) {
      elements.librarySearch.addEventListener('input', (event) => {
        buildLibrary(event.target.value);
      });
    }
    if (elements.openLibraryButtons?.length) {
      elements.openLibraryButtons.forEach((button) =>
        button.addEventListener('click', () => {
          const currentFilter = elements.libraryDrawerSearch ? elements.libraryDrawerSearch.value : '';
          buildLibraryDrawer(currentFilter);
          openLibraryDrawer();
        })
      );
    }
    if (elements.closeLibraryButtons?.length) {
      elements.closeLibraryButtons.forEach((button) => button.addEventListener('click', () => closeLibraryDrawer()));
    }
    if (elements.libraryDrawer) {
      elements.libraryDrawer.addEventListener('click', (event) => {
        const action = event.target.dataset.action;
        if (action === 'close-library') {
          closeLibraryDrawer();
        }
      });
    }
    if (elements.libraryDrawerSearch) {
      elements.libraryDrawerSearch.addEventListener('input', (event) => {
        buildLibraryDrawer(event.target.value);
      });
    }
    if (elements.libraryDrawerList) {
      elements.libraryDrawerList.addEventListener('click', (event) => {
        const control = event.target.closest('[data-drawer-action]');
        if (!control) {
          return;
        }
        const row = control.closest('.drawer-track');
        if (!row) {
          return;
        }
        const index = Number(row.dataset.trackIndex);
        if (!Number.isInteger(index) || !trackLibrary[index]) {
          return;
        }
        const action = control.dataset.drawerAction;
        if (action === 'play') {
          loadTrack(index, { autoplay: true });
          const shouldClose =
            typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 768px)').matches;
          if (shouldClose) {
            closeLibraryDrawer({ restoreFocus: false });
          }
        } else if (action === 'favorite') {
          event.preventDefault();
          toggleFavorite(index);
        }
      });
    }
    document.addEventListener('keydown', handleDocumentKeydown);
  }

  function handleAudioEvents() {
    audio.addEventListener('play', () => {
      state.isPlaying = true;
      elements.playButtons.forEach((button) => {
        button.textContent = '⏸';
        button.setAttribute('aria-label', 'Wstrzymaj odtwarzanie');
      });
    });
    audio.addEventListener('pause', () => {
      state.isPlaying = false;
      elements.playButtons.forEach((button) => {
        button.textContent = '▶';
        button.setAttribute('aria-label', 'Wznów odtwarzanie');
      });
    });
    audio.addEventListener('timeupdate', syncProgressDisplays);
    audio.addEventListener('loadedmetadata', syncProgressDisplays);
    audio.addEventListener('ended', () => {
      if (state.loop === 'one') {
        audio.currentTime = 0;
        play();
        return;
      }
      nextTrack();
    });
  }

  function initialise() {
    loadFavorites();
    updateHero();
    updateShuffleIndicator();
    updateLoopIndicator();
    buildQueue('');
    buildLibrary('');
    buildLibraryDrawer('');
    attachEventListeners();
    handleAudioEvents();
    if (elements.volumeControls.length) {
      setVolume(state.previousVolume * 100);
    }
    loadTrack(state.currentIndex, { autoplay: false });
    syncProgressDisplays();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialise, { once: true });
  } else {
    initialise();
  }
})();
