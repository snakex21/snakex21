(() => {
  function clock() {
    const now = new Date();
    document.getElementById('time').textContent = now.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    document.getElementById('date').textContent = now.toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' });
    document.getElementById('timezone').textContent = Intl.DateTimeFormat().resolvedOptions().timeZone.replace(/_/g, ' ');
  }
  clock(); setInterval(clock, 1000);

  // Public-domain Polish quotations work offline, without a third-party request.
  const quotes = [
    ['Miej serce i patrzaj w serce!', 'Adam Mickiewicz · „Romantyczność”'],
    ['Gościu, siądź pod mym liściem, a odpoczni sobie!', 'Jan Kochanowski · „Na lipę”'],
    ['Nie porzucaj nadzieje, Jakoć się kolwiek dzieje.', 'Jan Kochanowski · „Pieśń IX”']
  ];
  let quoteIndex = 0;
  function showQuote() {
    document.getElementById('quote-text').textContent = `„${quotes[quoteIndex][0]}”`;
    document.getElementById('quote-author').textContent = quotes[quoteIndex][1];
  }
  showQuote();
  document.getElementById('quote-refresh').addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % quotes.length;
    showQuote();
  });

  const weatherForm = document.getElementById('weather-form');
  const cityInput = document.getElementById('weather-city-input');
  const weatherStatus = document.getElementById('weather-status');
  const refresh = document.getElementById('weather-refresh');
  let savedCity = '';
  try { savedCity = (localStorage.getItem('weatherCity') || '').trim(); } catch (_) {}
  cityInput.value = savedCity || 'Warszawa';
  document.getElementById('weather-city').textContent = cityInput.value;
  let requestId = 0;
  let activeController;
  const descriptions = { 0:'Bezchmurnie', 1:'Przeważnie bezchmurnie', 2:'Częściowe zachmurzenie', 3:'Pochmurno', 45:'Mgła', 48:'Mgła osadzająca szadź', 51:'Mżawka', 53:'Mżawka', 55:'Mżawka', 56:'Marznąca mżawka', 57:'Marznąca mżawka', 61:'Deszcz', 63:'Deszcz', 65:'Deszcz', 66:'Marznący deszcz', 67:'Marznący deszcz', 71:'Śnieg', 73:'Śnieg', 75:'Śnieg', 77:'Ziarna śnieżne', 80:'Przelotny deszcz', 81:'Przelotny deszcz', 82:'Przelotny deszcz', 85:'Przelotny śnieg', 86:'Przelotny śnieg', 95:'Burza', 96:'Burza z gradem', 99:'Burza z gradem' };
  async function fetchWeather(city, save = false) {
    city = city.trim();
    if (!city) { cityInput.focus(); return; }
    const id = ++requestId;
    activeController?.abort();
    const controller = new AbortController(); activeController = controller;
    weatherStatus.textContent = `Sprawdzam pogodę: ${city}…`;
    const timeout = setTimeout(() => controller.abort(), 10000);
    try {
      const geo = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=pl&format=json`, { signal:controller.signal });
      if (!geo.ok) throw new Error('network'); const data = await geo.json();
      if (!data.results?.length) { if (id === requestId) weatherStatus.textContent = 'Nie znaleziono miasta. Sprawdź nazwę i spróbuj ponownie.'; return; }
      const place = data.results[0];
      if (!Number.isFinite(place.latitude) || !Number.isFinite(place.longitude)) throw new Error('data');
      const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current_weather=true`, { signal:controller.signal });
      if (!response.ok) throw new Error('network'); const weather = await response.json();
      const temperature = weather.current_weather?.temperature;
      if (!Number.isFinite(temperature)) throw new Error('data');
      if (id !== requestId) return;
      document.getElementById('weather-temp').textContent = `${Math.round(temperature)}°C`;
      document.getElementById('weather-city').textContent = place.name;
      document.getElementById('weather-desc').textContent = descriptions[weather.current_weather.weathercode] || 'Aktualna temperatura';
      weatherStatus.textContent = `${place.name} · ${Math.round(temperature)}°C · dane Open-Meteo`;
      refresh.textContent = 'Odśwież pogodę';
      if (save) {
        savedCity = city;
        try { localStorage.setItem('weatherCity', city); }
        catch (_) { weatherStatus.textContent += '. Miasto jest zapisane tylko na czas tej wizyty.'; }
      }
    } catch (_) {
      if (id === requestId) weatherStatus.textContent = `Pogoda dla „${city}” jest teraz niedostępna. Spróbuj ponownie za chwilę.`;
    } finally { clearTimeout(timeout); }
  }
  weatherForm.addEventListener('submit', event => { event.preventDefault(); return fetchWeather(cityInput.value, true); });
  refresh.addEventListener('click', () => fetchWeather(savedCity || cityInput.value, true));
  // Keep the original weatherCity storage key. No geolocation or new permission prompt.
  if (savedCity) fetchWeather(savedCity);
})();
