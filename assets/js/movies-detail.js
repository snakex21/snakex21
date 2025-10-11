const globalScope = typeof window !== "undefined" ? window : globalThis;
const moviesData = globalScope.movieCollectionsData ?? {};
const seriesMeta = globalScope.movieCollectionsMeta ?? {};

const fallbackSeriesId = "TopGun";
const defaultMeta = {
  description: "Starannie wybrana kolekcja filmów przygotowana przez Maxa.",
  mood: "Filmowy wieczór",
  highlight: "Włącz pierwszy tytuł i daj się wciągnąć historii.",
};

const fallbackFormatSeriesName = (id) => {
  return id
    .replace(/_/g, " ")
    .replace(/(\d+)([A-Z])/g, "$1 $2")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2")
    .replace(/(\d+)/g, " $1")
    .replace(/DniTygodni/g, "Dni / Tygodni")
    .replace(/\b(\w)/g, (match) => match.toUpperCase())
    .trim();
};

const formatSeriesName =
  typeof globalScope.formatMovieSeriesName === "function"
    ? globalScope.formatMovieSeriesName
    : fallbackFormatSeriesName;

const formatCountLabel = (count) => {
  if (count === 1) return "1 tytuł";
  if (count % 10 >= 2 && count % 10 <= 4 && (count % 100 < 10 || count % 100 >= 20)) {
    return `${count} tytuły`;
  }
  return `${count} tytułów`;
};

const formatCollectionLabel = (count) => {
  return count === 1 ? "1 kolekcji" : `${count} kolekcjach`;
};

const computeDominantGenre = (items) => {
  const genreCounts = new Map();
  items.forEach(({ genre }) => {
    if (!genre) return;
    const parts = genre
      .split(/[,&/]/)
      .map((part) => part.trim())
      .filter(Boolean);
    parts.forEach((part) => {
      const key = part.toLowerCase();
      genreCounts.set(key, (genreCounts.get(key) ?? 0) + 1);
    });
  });
  if (!genreCounts.size) return "—";
  const [topGenre] = [...genreCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  return topGenre.replace(/^./, (letter) => letter.toUpperCase());
};

const getSeriesMeta = (id) => {
  const meta = seriesMeta[id];
  if (!meta) return { ...defaultMeta };
  return {
    description: meta.description ?? defaultMeta.description,
    mood: meta.mood ?? defaultMeta.mood,
    highlight: meta.highlight ?? defaultMeta.highlight,
  };
};

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const requestedSeriesId = params.get("series");
  const normalizedRequest = requestedSeriesId?.toLowerCase();
  let seriesId = requestedSeriesId ?? "";
  let isFallback = false;
  let isAllView = false;

  if (!requestedSeriesId) {
    isAllView = true;
    seriesId = "all";
  } else if (normalizedRequest === "all" || normalizedRequest === "wszystkie") {
    isAllView = true;
    seriesId = "all";
  } else if (!moviesData[seriesId]) {
    seriesId = fallbackSeriesId;
    isFallback = true;
  }

  const friendlyName = isAllView ? "Wszystkie filmy Maxa" : formatSeriesName(seriesId);
  const meta = isAllView
    ? {
        description: "Pełna biblioteka filmów ze wszystkich kolekcji Maxa.",
        mood: "Miks gatunków",
        highlight: "Przeglądaj wszystkie kolekcje w jednym miejscu i filtruj po tytułach.",
      }
    : getSeriesMeta(seriesId);
  const movies = isAllView
    ? Object.entries(moviesData).flatMap(([id, items = []]) => {
        const seriesName = formatSeriesName(id);
        return items.map((item) => ({
          ...item,
          seriesId: id,
          seriesName,
        }));
      })
    : (moviesData[seriesId] ?? []).map((movie) => ({
        ...movie,
        seriesId,
        seriesName: friendlyName,
      }));
  const collectionCount = Object.keys(moviesData).length;

  const heroTitle = document.querySelector("[data-series-title]");
  const heroDescription = document.querySelector("[data-series-description]");
  const heroHighlight = document.querySelector("[data-series-highlight]");
  const heroMeta = document.querySelector("[data-series-meta]");
  const heroCount = document.querySelector("[data-series-count]");
  const heroGenre = document.querySelector("[data-series-genre]");
  const heroMood = document.querySelector("[data-series-mood]");
  const primaryLink = document.querySelector("[data-series-primary]");
  const filterInput = document.querySelector("[data-film-filter]");
  const randomButtons = [
    document.querySelector("[data-film-random]"),
    document.querySelector("[data-series-random]")
  ].filter(Boolean);
  const container = document.querySelector("[data-series-container]");
  const emptyState = document.querySelector("[data-film-empty]");
  const sectionTitle = document.querySelector("[data-series-section-title]");
  const sectionDescription = document.querySelector("[data-series-section-description]");
  const suggestionsContainer = document.querySelector("[data-series-suggestions]");

  if (heroTitle) {
    heroTitle.textContent = friendlyName;
  }

  if (heroDescription) {
    if (isFallback) {
      heroDescription.textContent = "Nie znaleźliśmy takiej kolekcji, dlatego proponujemy sprawdzony zestaw Top Gun.";
    } else if (isAllView) {
      heroDescription.textContent = `Przeglądasz ${formatCountLabel(movies.length)} w ${formatCollectionLabel(collectionCount)}. Użyj wyszukiwarki, aby szybko odnaleźć ulubione tytuły.`;
    } else {
      heroDescription.textContent = `${meta.description} Liczba tytułów: ${formatCountLabel(movies.length)}.`;
    }
  }

  if (sectionTitle) {
    sectionTitle.textContent = isAllView ? "Pełny katalog filmów" : `Tytuły z kolekcji ${friendlyName}`;
  }

  if (sectionDescription) {
    sectionDescription.textContent = isAllView
      ? "Cała biblioteka filmów Maxa w jednym miejscu. Filtruj po tytułach, gatunkach lub nazwach kolekcji."
      : 'Kliknij w przycisk „Oglądaj”, aby uruchomić film w nowym oknie. Możesz też filtrować po tytułach i gatunkach.';
  }

  const baseHighlight = isFallback
    ? "Nie znaleziono wskazanej kolekcji. Pokazujemy sprawdzony zestaw Top Gun."
    : meta.highlight;

  const applySeriesMessage = (message) => {
    if (heroHighlight) {
      heroHighlight.textContent = message;
    }
  };

  applySeriesMessage(baseHighlight);

  if (heroMeta) {
    heroMeta.textContent = isAllView
      ? `${formatCountLabel(movies.length)} w ${formatCollectionLabel(collectionCount)}`
      : formatCountLabel(movies.length);
  }

  if (heroCount) {
    heroCount.textContent = String(movies.length);
  }

  if (heroGenre) {
    heroGenre.textContent = computeDominantGenre(movies);
  }

  if (heroMood) {
    heroMood.textContent = meta.mood;
  }

  if (primaryLink) {
    const firstMovie = movies[0];
    if (firstMovie) {
      primaryLink.textContent = `Oglądaj ${firstMovie.title}`;
      primaryLink.setAttribute("href", firstMovie.link);
      primaryLink.setAttribute("target", "_blank");
      primaryLink.setAttribute("rel", "noopener");
    } else {
      primaryLink.textContent = "Wróć do listy";
    }
  }

  document.title = `${friendlyName} – Kolekcja filmowa Max Playground`;

  if (!container) {
    return;
  }

  container.innerHTML = "";

  const applyMovieHighlight = (movie) => {
    const seriesMessage = isAllView && movie.seriesName ? ` z kolekcji ${movie.seriesName}` : "";
    applySeriesMessage(`Włącz ${movie.title} (${movie.year})${seriesMessage} – ${movie.genre}.`);
  };

  const cardEntries = movies.map((movie) => {
    const card = document.createElement("article");
    card.className = "media-card media-card--compact";
    card.dataset.title = movie.title.toLowerCase();
    card.dataset.tags = (movie.genre ?? "").toLowerCase();
    card.dataset.series = (movie.seriesName ?? "").toLowerCase();
    card.setAttribute("data-film-card", "");
    card.innerHTML = `
      <figure class="media-card__poster media-card__poster--compact">
        <img src="${movie.image}" alt="Plakat filmu ${movie.title}" loading="lazy">
      </figure>
      <div class="media-card__body">
        <h3>${movie.title}</h3>
        <div class="media-card__meta">
          <span>${movie.year}</span>
          <span>${movie.genre}</span>
        </div>
        ${isAllView ? `<div class="media-card__tags"><span>${movie.seriesName}</span></div>` : ""}
        <a class="btn btn-primary" href="${movie.link}" target="_blank" rel="noopener">Oglądaj</a>
      </div>
    `;
    card.addEventListener("mouseenter", () => applyMovieHighlight(movie));
    card.addEventListener("focusin", () => applyMovieHighlight(movie));
    container.appendChild(card);
    return { card, movie };
  });

  const filterMovies = () => {
    const query = filterInput?.value.trim().toLowerCase() ?? "";
    let visibleCount = 0;
    cardEntries.forEach(({ card }) => {
      const haystack = `${card.dataset.title ?? ""} ${card.dataset.tags ?? ""} ${card.dataset.series ?? ""}`;
      const isVisible = haystack.includes(query);
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) {
        visibleCount += 1;
      }
    });
    const hasResults = visibleCount > 0;
    emptyState?.classList.toggle("is-visible", !hasResults);
    if (!hasResults) {
      applySeriesMessage("Brak wyników dla tego filtra. Spróbuj innego gatunku lub tytułu.");
    } else if (!query) {
      applySeriesMessage(baseHighlight);
    }
  };

  filterInput?.addEventListener("input", filterMovies);

  const pickRandomFilm = () => {
    const visibleEntries = cardEntries.filter(({ card }) => !card.classList.contains("is-hidden"));
    if (!visibleEntries.length) {
      randomButtons.forEach((button) => button?.classList.add("shake"));
      window.setTimeout(() => randomButtons.forEach((button) => button?.classList.remove("shake")), 600);
      return;
    }
    const { card, movie } = visibleEntries[Math.floor(Math.random() * visibleEntries.length)];
    card.classList.add("is-highlighted");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    applyMovieHighlight(movie);
    const link = card.querySelector("a");
    link?.focus({ preventScroll: true });
    window.setTimeout(() => card.classList.remove("is-highlighted"), 2600);
  };

  randomButtons.forEach((button) => {
    button?.addEventListener("click", pickRandomFilm);
  });

  const renderSuggestions = () => {
    if (!suggestionsContainer) return;
    if (isAllView) {
      const suggestionsSection = suggestionsContainer.closest("section");
      suggestionsSection?.classList.add("is-hidden");
      return;
    }
    suggestionsContainer.innerHTML = "";
    const availableSeries = Object.keys(moviesData).filter((id) => id !== seriesId);
    availableSeries.sort(() => Math.random() - 0.5);
    availableSeries.slice(0, 3).forEach((id) => {
      const items = moviesData[id];
      if (!items?.length) return;
      const suggestionMeta = getSeriesMeta(id);
      const suggestionName = formatSeriesName(id);
      const card = document.createElement("article");
      card.className = "media-card media-card--mini";
      card.innerHTML = `
        <figure class="media-card__poster media-card__poster--mini">
          <img src="${items[0].image}" alt="Plakat kolekcji ${suggestionName}" loading="lazy">
        </figure>
        <div class="media-card__body">
          <h3>${suggestionName}</h3>
          <p>${suggestionMeta.description}</p>
          <a class="btn btn-secondary" href="movies.html?series=${encodeURIComponent(id)}">Zobacz kolekcję</a>
        </div>
      `;
      suggestionsContainer.appendChild(card);
    });
  };

  renderSuggestions();
  filterMovies();

  if (cardEntries.length && !isFallback) {
    applyMovieHighlight(cardEntries[0].movie);
  }
});
