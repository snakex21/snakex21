// Spotify-style Music Player
(() => {
  const basePath = 'utwory/muzyka/';

  // Track library (first 30 tracks from player.js)
  const trackLibrary = [
    {title: 'Bad Romance (AI Cover)', artist: 'Adolf Hitler (AI)', album: 'Memy i covery', file: '(RECREATION) Adolf Hitler -  Bad Romance (Ai Cover).mp3', accent: '#fb7185'},
    {title: 'James Bond Theme', artist: 'Monty Norman', album: '007', file: '007  James Bond  Theme.mp3', accent: '#facc15'},
    {title: 'Gimme! Gimme! Gimme! (A Man After Midnight)', artist: 'ABBA', album: 'Greatest Hits', file: 'ABBA - Gimme! Gimme! Gimme! (A Man After Midnight).mp3', accent: '#f97316'},
    {title: 'The Liberation Of Gracemeria', artist: 'Ace Combat 6 OST', album: 'Ace Combat 6', file: 'Ace Combat 6 OST - The Liberation Of Gracemeria.mp3', accent: '#60a5fa'},
    {title: 'All That She Wants', artist: 'Ace of Base', album: 'Happy Nation', file: 'Ace of Base - All That She Wants (Official Music Video).mp3', accent: '#f472b6'},
    {title: 'Ghost Town', artist: 'Adam Lambert', album: 'The Original High', file: 'Adam Lambert - Ghost Town [Official Music Video].mp3', accent: '#a855f7'},
    {title: 'Barbie Girl (AI Cover)', artist: 'Adolf Hitler (AI)', album: 'Memy i covery', file: 'Adolf Hitler - Barbie Girl [Ai Cover].mp3', accent: '#f97316'},
    {title: 'All Falls Down', artist: 'Alan Walker feat. Noah Cyrus, Digital Farm Animals', album: 'Different World', file: 'Alan Walker - All Falls Down (feat. Noah Cyrus with Digital Farm Animals).mp3', accent: '#38bdf8'},
    {title: 'Alone', artist: 'Alan Walker', album: 'Different World', file: 'Alan Walker - Alone.mp3', accent: '#4c1d95'},
    {title: 'Faded', artist: 'Alan Walker', album: 'Different World', file: 'Alan Walker - Faded.mp3', accent: '#2563eb'},
    {title: 'Sing Me To Sleep', artist: 'Alan Walker', album: 'Different World', file: 'Alan Walker - Sing Me To Sleep.mp3', accent: '#22d3ee'},
    {title: 'Man On The Moon', artist: 'Alan Walker x Benjamin Ingrosso', album: 'World of Walker', file: 'Alan Walker x Benjamin Ingrosso - Man On The Moon (Official Music Video).mp3', accent: '#facc15'},
    {title: 'Lady Gaga (Lyrics)', artist: 'Alejandro', album: 'Single', file: 'Alejandro - Lady Gaga (Lyrics) 🎵.mp3', accent: '#ef4444'},
    {title: 'Mr. Saxobeat', artist: 'Alexandra Stan', album: 'Saxobeats', file: 'Alexandra Stan - Mr. Saxobeat (Official Video).mp3', accent: '#f97316'},
    {title: 'All Star (AI Cover)', artist: 'Dr. Doofenshmirtz', album: 'Parodie', file: 'All Star Doofenshmirtz AI Cover.mp3', accent: '#34d399'},
    {title: 'Please Tell Rosie', artist: 'Alle Farben', album: 'Music Is My Best Friend', file: 'Alle Farben Please Tell Rosie (Lyric Video).mp3', accent: '#14b8a6'},
    {title: 'I Need A Dollar', artist: 'Aloe Blacc', album: 'Good Things', file: 'Aloe Blacc - I Need A Dollar.mp3', accent: '#ea580c'},
    {title: 'El Mismo Sol', artist: 'Alvaro Soler', album: 'Eterno Agosto', file: 'Alvaro Soler - El Mismo Sol.mp3', accent: '#f59e0b'},
    {title: 'La Cintura', artist: 'Alvaro Soler', album: 'Mar de Colores', file: 'Alvaro Soler - La Cintura - Lyrics  Letra.mp3', accent: '#f97316'},
    {title: 'Sofia', artist: 'Alvaro Soler', album: 'Eterno Agosto', file: 'Alvaro Soler - Sofia.mp3', accent: '#fbbf24'},
    {title: 'Best Day Of My Life', artist: 'American Authors', album: 'Oh, What a Life', file: 'American Authors - Best Day Of My Life.mp3', accent: '#22c55e'},
    {title: 'Slow It Down', artist: 'Amy Macdonald', album: 'Life in a Beautiful Light', file: 'Amy Macdonald - Slow It Down (Official Video).mp3', accent: '#ec4899'},
    {title: 'This Is The Life', artist: 'Amy Macdonald', album: 'This Is the Life', file: 'Amy Macdonald - This Is The Life.mp3', accent: '#fb7185'},
    {title: 'Barbie Girl', artist: 'Aqua', album: 'Aquarium', file: 'Aqua - Barbie Girl (Official Music Video).mp3', accent: '#60a5fa'},
    {title: 'The Ketchup Song (Lyrics)', artist: 'Las Ketchup', album: 'Hijas del Tomate', file: 'Aserejé (The Ketchup Song) - Las Ketchup ( letra  lyrics ) [ Spanish Version ].mp3', accent: '#f97316'},
    {title: 'The Ketchup Song (Spanish Version)', artist: 'Las Ketchup', album: 'Hijas del Tomate', file: 'Aserejé (The Ketchup Song) [Spanish Version] - Las Ketchup.mp3', accent: '#fbbf24'},
    {title: 'Take On Me', artist: 'a-ha', album: 'Hunting High and Low', file: 'a-ha - Take On Me (Official Video) [Remastered in 4K].mp3', accent: '#38bdf8'},
    {title: 'Donald Trump Sings All Star', artist: 'Donald Trump AI', album: 'Memy i covery', file: '♪ Donald Trump Sings All Star by Smash Mouth.mp3', accent: '#f59e0b'},
  ];

  // State
  const state = {
    currentIndex: -1,
    isPlaying: false,
    shuffle: false,
    repeat: 'off', // 'off', 'all', 'one'
    volume: 0.7,
    filteredTracks: [...trackLibrary],
  };

  // Elements
  const elements = {
    audio: document.getElementById('audio-player'),
    libraryList: document.getElementById('library-list'),
    librarySearch: document.getElementById('library-search'),
    nowPlaying: document.getElementById('now-playing'),
    playerBar: document.getElementById('player-bar'),

    // Bar elements
    barAlbumArt: document.getElementById('bar-album-art'),
    barTrackTitle: document.getElementById('bar-track-title'),
    barTrackArtist: document.getElementById('bar-track-artist'),
    barPlay: document.getElementById('bar-play'),
    barPrev: document.getElementById('bar-prev'),
    barNext: document.getElementById('bar-next'),
    barShuffle: document.getElementById('bar-shuffle'),
    barRepeat: document.getElementById('bar-repeat'),
    barProgressBar: document.getElementById('bar-progress-bar'),
    barProgressFill: document.getElementById('bar-progress-fill'),
    barCurrentTime: document.getElementById('bar-current-time'),
    barDuration: document.getElementById('bar-duration'),
    barVolumeIcon: document.getElementById('bar-volume-icon'),
    barVolumeSlider: document.getElementById('bar-volume-slider'),
    barVolumeFill: document.getElementById('bar-volume-fill'),
  };

  // Format time
  function formatTime(seconds) {
    if (!isFinite(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Render library
  function renderLibrary(searchQuery = '') {
    const query = searchQuery.toLowerCase();
    state.filteredTracks = trackLibrary.filter(track =>
      track.title.toLowerCase().includes(query) ||
      track.artist.toLowerCase().includes(query) ||
      track.album.toLowerCase().includes(query)
    );

    elements.libraryList.innerHTML = state.filteredTracks.length === 0
      ? '<div style="padding: 2rem; text-align: center; color: var(--text-secondary);">Nie znaleziono utworów</div>'
      : state.filteredTracks.map((track, index) => `
          <div class="library-item ${state.currentIndex === trackLibrary.indexOf(track) ? 'active' : ''}"
               data-index="${trackLibrary.indexOf(track)}">
            <div class="library-item-icon" style="background: ${track.accent || '#1db954'}">🎵</div>
            <div class="library-item-info">
              <div class="library-item-title">${track.title}</div>
              <div class="library-item-artist">${track.artist}</div>
            </div>
          </div>
        `).join('');
  }

  // Load track
  function loadTrack(index, autoplay = false) {
    if (index < 0 || index >= trackLibrary.length) return;

    const track = trackLibrary[index];
    state.currentIndex = index;

    // Update audio source
    elements.audio.src = basePath + track.file;
    if (autoplay) {
      elements.audio.play().catch(err => console.log('Playback prevented:', err));
    }

    // Update now playing view
    elements.nowPlaying.innerHTML = `
      <div class="album-art" style="background: ${track.accent || '#1db954'}">🎵</div>
      <div class="track-info">
        <h2 class="track-title">${track.title}</h2>
        <p class="track-artist">${track.artist}</p>
        <p class="track-album">${track.album}</p>
      </div>
      <div class="player-controls">
        <div class="control-buttons">
          <button class="control-btn" id="main-shuffle" title="Losuj">🔀</button>
          <button class="control-btn" id="main-prev" title="Poprzedni">⏮️</button>
          <button class="control-btn play-btn" id="main-play" title="Odtwórz">▶️</button>
          <button class="control-btn" id="main-next" title="Następny">⏭️</button>
          <button class="control-btn" id="main-repeat" title="Powtarzaj">🔁</button>
        </div>
        <div class="progress-container">
          <div class="progress-bar" id="main-progress-bar">
            <div class="progress-fill" id="main-progress-fill"></div>
          </div>
          <div class="progress-time">
            <span id="main-current-time">0:00</span>
            <span id="main-duration">0:00</span>
          </div>
        </div>
        <div class="volume-control">
          <span class="volume-icon" id="main-volume-icon">🔊</span>
          <div class="volume-slider" id="main-volume-slider">
            <div class="volume-fill" id="main-volume-fill"></div>
          </div>
        </div>
      </div>
    `;

    // Update bar
    elements.barAlbumArt.textContent = '🎵';
    elements.barAlbumArt.style.background = track.accent || '#1db954';
    elements.barTrackTitle.textContent = track.title;
    elements.barTrackArtist.textContent = track.artist;
    elements.playerBar.style.display = 'grid';

    // Re-attach event listeners for main controls
    attachMainControls();
    updateShuffleButton();
    updateRepeatButton();
    updateLibraryHighlight();
  }

  // Play/Pause
  function togglePlay() {
    if (state.currentIndex === -1 && trackLibrary.length > 0) {
      loadTrack(0, true);
      return;
    }

    if (elements.audio.paused) {
      elements.audio.play().catch(err => console.log('Playback prevented:', err));
    } else {
      elements.audio.pause();
    }
  }

  // Next track
  function nextTrack() {
    if (trackLibrary.length === 0) return;

    let nextIndex;
    if (state.shuffle) {
      nextIndex = Math.floor(Math.random() * trackLibrary.length);
    } else {
      nextIndex = (state.currentIndex + 1) % trackLibrary.length;
    }

    loadTrack(nextIndex, true);
  }

  // Previous track
  function prevTrack() {
    if (trackLibrary.length === 0) return;

    // If more than 3 seconds played, restart current track
    if (elements.audio.currentTime > 3) {
      elements.audio.currentTime = 0;
      return;
    }

    let prevIndex;
    if (state.shuffle) {
      prevIndex = Math.floor(Math.random() * trackLibrary.length);
    } else {
      prevIndex = state.currentIndex - 1;
      if (prevIndex < 0) prevIndex = trackLibrary.length - 1;
    }

    loadTrack(prevIndex, true);
  }

  // Toggle shuffle
  function toggleShuffle() {
    state.shuffle = !state.shuffle;
    updateShuffleButton();
  }

  // Toggle repeat
  function toggleRepeat() {
    const modes = ['off', 'all', 'one'];
    const current = modes.indexOf(state.repeat);
    state.repeat = modes[(current + 1) % modes.length];
    updateRepeatButton();
  }

  // Update buttons
  function updateShuffleButton() {
    const btns = [
      document.getElementById('main-shuffle'),
      elements.barShuffle
    ].filter(Boolean);

    btns.forEach(btn => {
      if (state.shuffle) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  function updateRepeatButton() {
    const btns = [
      document.getElementById('main-repeat'),
      elements.barRepeat
    ].filter(Boolean);

    btns.forEach(btn => {
      if (state.repeat !== 'off') {
        btn.classList.add('active');
        btn.textContent = state.repeat === 'one' ? '🔂' : '🔁';
      } else {
        btn.classList.remove('active');
        btn.textContent = '🔁';
      }
    });
  }

  function updateLibraryHighlight() {
    document.querySelectorAll('.library-item').forEach(item => {
      const index = parseInt(item.dataset.index);
      if (index === state.currentIndex) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Update progress
  function updateProgress() {
    const progress = (elements.audio.currentTime / elements.audio.duration) * 100 || 0;

    // Update main progress
    const mainFill = document.getElementById('main-progress-fill');
    if (mainFill) mainFill.style.width = `${progress}%`;

    // Update bar progress
    if (elements.barProgressFill) {
      elements.barProgressFill.style.width = `${progress}%`;
    }

    // Update times
    const currentTime = formatTime(elements.audio.currentTime);
    const duration = formatTime(elements.audio.duration);

    const mainCurrent = document.getElementById('main-current-time');
    const mainDuration = document.getElementById('main-duration');
    if (mainCurrent) mainCurrent.textContent = currentTime;
    if (mainDuration) mainDuration.textContent = duration;

    if (elements.barCurrentTime) elements.barCurrentTime.textContent = currentTime;
    if (elements.barDuration) elements.barDuration.textContent = duration;
  }

  // Seek
  function seek(event, progressBar) {
    const rect = progressBar.getBoundingClientRect();
    const percent = (event.clientX - rect.left) / rect.width;
    elements.audio.currentTime = percent * elements.audio.duration;
  }

  // Volume
  function setVolume(percent) {
    state.volume = Math.max(0, Math.min(1, percent / 100));
    elements.audio.volume = state.volume;

    // Update volume fills
    const mainFill = document.getElementById('main-volume-fill');
    if (mainFill) mainFill.style.width = `${state.volume * 100}%`;
    if (elements.barVolumeFill) {
      elements.barVolumeFill.style.width = `${state.volume * 100}%`;
    }

    // Update icons
    const icon = state.volume === 0 ? '🔇' : state.volume < 0.5 ? '🔉' : '🔊';
    const mainIcon = document.getElementById('main-volume-icon');
    if (mainIcon) mainIcon.textContent = icon;
    if (elements.barVolumeIcon) elements.barVolumeIcon.textContent = icon;
  }

  function handleVolumeClick(event, slider) {
    const rect = slider.getBoundingClientRect();
    const percent = ((event.clientX - rect.left) / rect.width) * 100;
    setVolume(percent);
  }

  // Attach main controls (after track load)
  function attachMainControls() {
    const mainPlay = document.getElementById('main-play');
    const mainPrev = document.getElementById('main-prev');
    const mainNext = document.getElementById('main-next');
    const mainShuffle = document.getElementById('main-shuffle');
    const mainRepeat = document.getElementById('main-repeat');
    const mainProgressBar = document.getElementById('main-progress-bar');
    const mainVolumeIcon = document.getElementById('main-volume-icon');
    const mainVolumeSlider = document.getElementById('main-volume-slider');

    if (mainPlay) mainPlay.addEventListener('click', togglePlay);
    if (mainPrev) mainPrev.addEventListener('click', prevTrack);
    if (mainNext) mainNext.addEventListener('click', nextTrack);
    if (mainShuffle) mainShuffle.addEventListener('click', toggleShuffle);
    if (mainRepeat) mainRepeat.addEventListener('click', toggleRepeat);
    if (mainProgressBar) mainProgressBar.addEventListener('click', (e) => seek(e, mainProgressBar));
    if (mainVolumeIcon) mainVolumeIcon.addEventListener('click', () => {
      setVolume(state.volume === 0 ? 70 : 0);
    });
    if (mainVolumeSlider) mainVolumeSlider.addEventListener('click', (e) => handleVolumeClick(e, mainVolumeSlider));
  }

  // Init
  function init() {
    // Render library
    renderLibrary();

    // Library search
    if (elements.librarySearch) {
      elements.librarySearch.addEventListener('input', (e) => {
        renderLibrary(e.target.value);
      });
    }

    // Library item click
    if (elements.libraryList) {
      elements.libraryList.addEventListener('click', (e) => {
        const item = e.target.closest('.library-item');
        if (!item) return;
        const index = parseInt(item.dataset.index);
        loadTrack(index, true);
      });
    }

    // Bar controls
    if (elements.barPlay) elements.barPlay.addEventListener('click', togglePlay);
    if (elements.barPrev) elements.barPrev.addEventListener('click', prevTrack);
    if (elements.barNext) elements.barNext.addEventListener('click', nextTrack);
    if (elements.barShuffle) elements.barShuffle.addEventListener('click', toggleShuffle);
    if (elements.barRepeat) elements.barRepeat.addEventListener('click', toggleRepeat);
    if (elements.barProgressBar) {
      elements.barProgressBar.addEventListener('click', (e) => seek(e, elements.barProgressBar));
    }
    if (elements.barVolumeIcon) {
      elements.barVolumeIcon.addEventListener('click', () => {
        setVolume(state.volume === 0 ? 70 : 0);
      });
    }
    if (elements.barVolumeSlider) {
      elements.barVolumeSlider.addEventListener('click', (e) => handleVolumeClick(e, elements.barVolumeSlider));
    }

    // Audio events
    elements.audio.addEventListener('timeupdate', updateProgress);
    elements.audio.addEventListener('loadedmetadata', updateProgress);
    elements.audio.addEventListener('play', () => {
      state.isPlaying = true;
      const mainPlay = document.getElementById('main-play');
      if (mainPlay) mainPlay.textContent = '⏸️';
      if (elements.barPlay) elements.barPlay.textContent = '⏸️';
    });
    elements.audio.addEventListener('pause', () => {
      state.isPlaying = false;
      const mainPlay = document.getElementById('main-play');
      if (mainPlay) mainPlay.textContent = '▶️';
      if (elements.barPlay) elements.barPlay.textContent = '▶️';
    });
    elements.audio.addEventListener('ended', () => {
      if (state.repeat === 'one') {
        elements.audio.currentTime = 0;
        elements.audio.play();
      } else if (state.repeat === 'all' || state.currentIndex < trackLibrary.length - 1) {
        nextTrack();
      }
    });

    // Set initial volume
    setVolume(state.volume * 100);

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;

      if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextTrack();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevTrack();
      }
    });
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
