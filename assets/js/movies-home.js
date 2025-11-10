const globalScope = typeof window !== "undefined" ? window : globalThis;
const movieMeta = globalScope.movieCollectionsMeta ?? {};
const movieData = globalScope.movieCollectionsData ?? {};

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

const defaultDescription = "Starannie wybrana kolekcja filmów przygotowana przez Maxa.";
const defaultHighlight = "Włącz pierwszy tytuł i daj się wciągnąć historii.";
const defaultMood = "Filmowy wieczór";

const filmCollections = Object.entries(movieMeta).map(([id, meta]) => {
  const collectionData = movieData[id] ?? [];
  return {
    id,
    title: meta.title ?? formatSeriesName(id),
    description: meta.description ?? defaultDescription,
    tags: Array.isArray(meta.tags) ? meta.tags : [],
    cover: meta.cover ?? collectionData[0]?.image ?? "",
    mood: meta.mood ?? defaultMood,
    highlight: meta.highlight ?? defaultHighlight,
    order: meta.order ?? Number.POSITIVE_INFINITY,
  };
});

const sortedCollections = filmCollections
  .filter((collection, index, array) => array.findIndex((item) => item.id === collection.id) === index)
  .sort((a, b) => {
    const orderDiff = (a.order ?? Infinity) - (b.order ?? Infinity);
    if (orderDiff !== 0) return orderDiff;
    return (a.title ?? "").localeCompare(b.title ?? "", "pl", { sensitivity: "base" });
  });

document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector("[data-film-grid]");
  if (!grid) return;

  const searchInput = document.querySelector("[data-film-search]");
  const emptyState = document.querySelector("[data-film-empty]");
  const randomButton = document.querySelector("[data-film-random]");
  const highlightText = document.querySelector("[data-film-highlight]");
  const heroLink = document.querySelector("[data-film-hero-link]");
  const collectionCountEl = document.querySelector("[data-film-collection-count]");
  const spotlightTitleEl = document.querySelector("[data-film-spotlight-title]");
  const spotlightTagsEl = document.querySelector("[data-film-spotlight-tags]");

  const applySpotlight = (collection) => {
    if (!collection) return;
    highlightText && (highlightText.textContent = collection.highlight);
    if (heroLink) {
      heroLink.textContent = `Otwórz „${collection.title}”`;
      heroLink.setAttribute("href", `movies.html?series=${encodeURIComponent(collection.id)}`);
    }
    spotlightTitleEl && (spotlightTitleEl.textContent = collection.title);
    spotlightTagsEl && (spotlightTagsEl.textContent = collection.tags.join(" • "));
  };

  const cardElements = sortedCollections.map((collection) => {
    const article = document.createElement("article");
    article.className = "media-card";
    article.dataset.title = (collection.title ?? "").toLowerCase();
    article.dataset.tags = collection.tags.join(" ").toLowerCase();
    article.dataset.id = collection.id;
    article.setAttribute("data-film-card", "");
    article.innerHTML = `
      <figure class="media-card__poster">
        <img src="${collection.cover}" alt="Plakat kolekcji ${collection.title}">
      </figure>
      <div class="media-card__body">
        <span class="badge">${collection.mood}</span>
        <h3>${collection.title}</h3>
        <p>${collection.description}</p>
        <div class="media-card__tags">
          ${collection.tags.map((tag) => `<span>${tag}</span>`).join("")}
        </div>
        <a class="btn btn-secondary" href="movies.html?series=${encodeURIComponent(collection.id)}">Przejdź do kolekcji</a>
      </div>
    `;
    article.addEventListener("mouseenter", () => applySpotlight(collection));
    article.addEventListener("focusin", () => applySpotlight(collection));
    grid.appendChild(article);
    return article;
  });

  const filterCards = () => {
    const query = searchInput?.value.trim().toLowerCase() ?? "";
    let visibleCount = 0;
    cardElements.forEach((card) => {
      const haystack = `${card.dataset.title ?? ""} ${card.dataset.tags ?? ""}`;
      const isVisible = haystack.includes(query);
      card.classList.toggle("is-hidden", !isVisible);
      if (isVisible) visibleCount += 1;
    });
    emptyState?.classList.toggle("is-visible", visibleCount === 0);
  };

  const pickRandomCard = () => {
    const visibleCards = cardElements.filter((card) => !card.classList.contains("is-hidden"));
    if (!visibleCards.length) {
      randomButton?.classList.add("shake");
      window.setTimeout(() => randomButton?.classList.remove("shake"), 600);
      return;
    }
    const picked = visibleCards[Math.floor(Math.random() * visibleCards.length)];
    const pickedId = picked.dataset.id;
    const collection = sortedCollections.find((item) => item.id === pickedId);
    if (collection) {
      applySpotlight(collection);
    }
    picked.classList.add("is-highlighted");
    picked.scrollIntoView({ behavior: "smooth", block: "center" });
    const link = picked.querySelector("a");
    link?.focus({ preventScroll: true });
    window.setTimeout(() => picked.classList.remove("is-highlighted"), 2600);
  };

  searchInput?.addEventListener("input", () => {
    filterCards();
  });

  randomButton?.addEventListener("click", () => {
    pickRandomCard();
  });

  collectionCountEl && (collectionCountEl.textContent = String(sortedCollections.length));

  const initialSpotlight =
    sortedCollections.length > 0
      ? sortedCollections[Math.floor(Math.random() * sortedCollections.length)]
      : null;
  applySpotlight(initialSpotlight);
  filterCards();
});
