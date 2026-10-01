(() => {
  const input = document.getElementById('home-search-input');
  const results = document.getElementById('home-results');
  const status = document.getElementById('home-search-status');
  const tools = (window.toolsCatalog || []).map(item => ({ ...item, type: 'Narzędzie' }));
  const games = (window.gamesCatalog || []).map(item => ({ ...item, type: 'Gra', url: 'gry/' + item.url }));
  const catalog = [...tools, ...games];
  document.getElementById('index-count').textContent = `${tools.length} narzędzi · ${games.length} gier`;
  const normalize = text => text.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ł/g, 'l').trim();
  function search() {
    const query = normalize(input.value); results.replaceChildren(); results.hidden = !query;
    if (!query) { status.textContent = ''; return; }
    const found = catalog.filter(item => normalize(item.title + ' ' + item.description).includes(query));
    status.textContent = found.length ? `Znaleziono: ${found.length}.` : 'Brak wyników. Spróbuj krótszej nazwy, np. „kolor” lub „2048”.';
    for (const item of found) {
      const link = document.createElement('a'); link.href = item.url;
      const title = document.createElement('span'); title.textContent = item.title;
      const type = document.createElement('small'); type.textContent = item.type;
      link.append(title, type); results.appendChild(link);
    }
  }
  input.addEventListener('input', search);
  input.form.addEventListener('submit', event => { event.preventDefault(); search(); results.querySelector('a')?.focus(); });
  function clock() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
    document.getElementById('date').textContent = now.toLocaleDateString('pl-PL', { day:'numeric', month:'long', year:'numeric' });
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g,' ');
  }
  clock(); setInterval(clock, 30000);
  const weatherForm = document.getElementById('weather-form');
  const cityInput = document.getElementById('weather-city-input');
  const weatherStatus = document.getElementById('weather-status');
  try { cityInput.value = localStorage.getItem('weatherCity') || 'Warszawa'; } catch (_) {}
  let requestId = 0;
  weatherForm.addEventListener('submit', async event => {
    event.preventDefault(); const city = cityInput.value.trim(); if (!city) { cityInput.focus(); return; }
    const id = ++requestId; weatherStatus.textContent = 'Sprawdzam pogodę…';
    const controller = new AbortController(); const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pl&format=json`, {signal:controller.signal});
      if (!geo.ok) throw new Error('network'); const data = await geo.json();
      if (!data.results?.length) { if (id === requestId) weatherStatus.textContent = 'Nie znaleziono miasta. Sprawdź nazwę i spróbuj ponownie.'; return; }
      const place = data.results[0];
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`, {signal:controller.signal});
      if (!response.ok) throw new Error('network'); const weather = await response.json();
      const temperature = weather.current_weather?.temperature; if (typeof temperature !== 'number') throw new Error('data');
      if (id !== requestId) return;
      const text = `${place.name} · ${Math.round(temperature)}°C`;
      document.getElementById('weather-summary').textContent = '· ' + text;
      weatherStatus.textContent = text + ' · dane Open-Meteo';
      try { localStorage.setItem('weatherCity', city); } catch (_) {}
    } catch (_) { if (id === requestId) weatherStatus.textContent = 'Pogoda jest teraz niedostępna. Spróbuj ponownie za chwilę.'; }
    finally { clearTimeout(timeout); }
  });
})();
