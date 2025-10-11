import { gamesCatalog, difficultyScale, durationScale } from "./games-data.js";

const escapeHtml = (value = "") =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const escapeAttribute = (value = "") => escapeHtml(value).replace(/`/g, "&#96;");

const escapeForSelector = (value) => {
  if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
    return CSS.escape(String(value ?? ""));
  }
  return String(value ?? "").replace(/([.*+?^${}()|\[\]\\])/g, "\\$1");
};

document.addEventListener("DOMContentLoaded", () => {
  const gameGrid = document.querySelector("[data-game-grid]");
  if (!gameGrid) return;

  const searchInput = document.querySelector("[data-game-search-input]");
  const randomButton = document.querySelector("[data-random-game]");
  const emptyState = document.querySelector("[data-empty-state]");
  const filtersContainer = document.querySelector("[data-game-filters]");
  const featuredContainer = document.querySelector("[data-game-featured]");
  const collectionsContainer = document.querySelector("[data-game-collections]");
  const activeCountEl = document.querySelector("[data-game-active-count]");
  const statsTotalEl = document.querySelector("[data-games-count]");
  const statsSoloEl = document.querySelector("[data-games-solo]");
  const statsMultiEl = document.querySelector("[data-games-multi]");
  const statsDifficultyEl = document.querySelector("[data-games-difficulty]");
  const statsDifficultyNoteEl = document.querySelector("[data-games-difficulty-note]");
  const statsDurationEl = document.querySelector("[data-games-duration]");
  const statsDurationNoteEl = document.querySelector("[data-games-duration-note]");

  const catalog = gamesCatalog.map((game) => ({
    ...game,
    searchable: [
      game.title,
      game.description,
      ...(game.genres ?? []),
      ...(game.tags ?? []),
      ...(game.modes ?? [])
    ]
      .join(" ")
      .toLowerCase()
  }));

  const uniqueCategories = Array.from(
    new Set(
      catalog.flatMap((game) => game.genres ?? [])
    )
  ).sort((a, b) => a.localeCompare(b, "pl"));

  const durationCounts = catalog.reduce((acc, game) => {
    const key = game.duration;
    if (!key) return acc;
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});

  const mostPopularDuration = Object.entries(durationCounts).sort((a, b) => {
    const [keyA, countA] = a;
    const [keyB, countB] = b;
    if (countA === countB) {
      const orderA = durationScale[keyA]?.order ?? Number.POSITIVE_INFINITY;
      const orderB = durationScale[keyB]?.order ?? Number.POSITIVE_INFINITY;
      return orderA - orderB;
    }
    return countB - countA;
  })[0]?.[0];

  const soloCount = catalog.filter((game) => (game.modes ?? []).includes("Solo")).length;
  const multiplayerCount = catalog.filter((game) =>
    (game.modes ?? []).some((mode) => mode !== "Solo")
  ).length;

  const averageDifficultyScore =
    catalog.reduce(
      (total, game) => total + (difficultyScale[game.difficulty]?.weight ?? 0),
      0
    ) / (catalog.length || 1);

  const difficultyBucket =
    averageDifficultyScore < 1.5
      ? "casual"
      : averageDifficultyScore < 2.5
      ? "classic"
      : "intense";

  statsTotalEl && (statsTotalEl.textContent = String(catalog.length));
  statsSoloEl && (statsSoloEl.textContent = String(soloCount));
  statsMultiEl && (statsMultiEl.textContent = String(multiplayerCount));

  const difficultyMeta = difficultyScale[difficultyBucket];
  if (statsDifficultyEl && difficultyMeta) {
    statsDifficultyEl.textContent = difficultyMeta.label;
    if (statsDifficultyNoteEl) {
      statsDifficultyNoteEl.textContent = difficultyMeta.description;
    }
  }

  if (mostPopularDuration) {
    const durationMeta = durationScale[mostPopularDuration];
    if (durationMeta) {
      statsDurationEl && (statsDurationEl.textContent = durationMeta.label);
      statsDurationNoteEl && (statsDurationNoteEl.textContent = durationMeta.note ?? "");
    }
  }

  if (filtersContainer) {
    const chips = [
      '<button class="btn btn-chip is-active" type="button" data-game-filter="all">Wszystkie</button>',
      ...uniqueCategories.map(
        (category) =>
          `<button class="btn btn-chip" type="button" data-game-filter="${escapeAttribute(category)}">${escapeHtml(category)}</button>`
      )
    ];
    filtersContainer.innerHTML = chips.join("");
  }

  if (featuredContainer) {
    const featuredPool = catalog.slice().sort(() => Math.random() - 0.5).slice(0, 3);
    featuredContainer.innerHTML = featuredPool
      .map((game) => {
        const difficulty = difficultyScale[game.difficulty];
        const duration = durationScale[game.duration];
        return `
          <article class="game-highlight">
            <div class="game-highlight__meta">
              ${game.genres?.[0] ? `<span class="pill pill--muted">${escapeHtml(game.genres[0])}</span>` : ""}
              ${difficulty ? `<span class="pill pill--difficulty">${escapeHtml(difficulty.label)}</span>` : ""}
              ${duration ? `<span class="pill pill--duration">${escapeHtml(duration.label)}</span>` : ""}
            </div>
            <h3 class="game-highlight__title">${escapeHtml(game.title)}</h3>
            <p class="game-highlight__description">${escapeHtml(game.spotlight ?? game.description)}</p>
            <a class="btn btn-ghost" href="${escapeAttribute(game.url)}">Otwórz grę</a>
          </article>
        `;
      })
      .join("");
  }

  if (collectionsContainer) {
    const collections = [
      {
        title: "Solo na szybkie sesje",
        description: "Do 10 minut skupienia – idealne na przerwę.",
        filter: (game) => game.duration === "quick" && (game.modes ?? []).includes("Solo")
      },
      {
        title: "Granie we dwójkę",
        description: "Tryb kooperacji lub rywalizacji na jednym ekranie.",
        filter: (game) => (game.modes ?? []).some((mode) => mode !== "Solo")
      },
      {
        title: "Klasyki retro",
        description: "Piksele, punkty i szybkie tempo lat 80.",
        filter: (game) => (game.genres ?? []).includes("Retro")
      }
    ];

    collectionsContainer.innerHTML = collections
      .map((collection) => {
        const picks = catalog.filter(collection.filter).slice(0, 3);
        if (!picks.length) {
          return "";
        }
        const links = picks
          .map(
            (game) =>
              `<li><a href="${escapeAttribute(game.url)}" data-game-collection-link="${escapeAttribute(
                game.slug
              )}">${escapeHtml(game.title)}</a><span>${escapeHtml(
                game.genres?.[0] ?? ""
              )}</span></li>`
          )
          .join("");
        return `
          <article class="collection-card">
            <h3>${escapeHtml(collection.title)}</h3>
            <p>${escapeHtml(collection.description)}</p>
            <ul class="collection-card__list">
              ${links}
            </ul>
          </article>
        `;
      })
      .join("");
  }

  let activeCategory = "all";
  let searchQuery = "";
  let filteredGames = catalog.slice();

  const renderCards = (items) => {
    gameGrid.innerHTML = items
      .map((game) => {
        const difficulty = difficultyScale[game.difficulty];
        const duration = durationScale[game.duration];
        const metaLabels = [
          game.genres?.[0] ? `<span class="pill pill--muted">${escapeHtml(game.genres[0])}</span>` : "",
          game.modes?.length
            ? `<span class="pill pill--mode">${escapeHtml(game.modes.join(" · "))}</span>`
            : ""
        ].join("");
        const tags = (game.tags ?? [])
          .map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`)
          .join("");
        return `
          <article class="game-card" data-game-card data-game-id="${escapeAttribute(game.slug)}">
            <div class="game-card__media">
              <img src="${escapeAttribute(game.cover)}" alt="${escapeAttribute(game.coverAlt)}" loading="lazy" />
            </div>
            <div class="game-card__body">
              <div class="game-card__meta">${metaLabels}</div>
              <h3 class="game-card__title">${escapeHtml(game.title)}</h3>
              <p class="game-card__description">${escapeHtml(game.description)}</p>
              <dl class="game-card__details">
                <div>
                  <dt>Trudność</dt>
                  <dd>${difficulty ? escapeHtml(difficulty.label) : "--"}</dd>
                </div>
                <div>
                  <dt>Sesja</dt>
                  <dd>${duration ? escapeHtml(duration.label) : "--"}</dd>
                </div>
              </dl>
              <div class="game-card__tags">${tags}</div>
            </div>
            <div class="game-card__footer">
              <a class="btn btn-primary" href="${escapeAttribute(game.url)}">Graj teraz</a>
            </div>
          </article>
        `;
      })
      .join("");
  };

  const updateActiveCount = () => {
    if (!activeCountEl) return;
    const total = catalog.length;
    if (filteredGames.length === total) {
      activeCountEl.textContent = `Pokazujemy wszystkie ${total} gier`;
    } else {
      activeCountEl.textContent = `Pokazujemy ${filteredGames.length} z ${total} gier`;
    }
  };

  const applyFilters = () => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    filteredGames = catalog.filter((game) => {
      const matchesCategory =
        activeCategory === "all" ? true : (game.genres ?? []).includes(activeCategory);
      const matchesQuery = !normalizedQuery || game.searchable.includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
    renderCards(filteredGames);
    updateActiveCount();
    emptyState?.classList.toggle("is-visible", filteredGames.length === 0);
  };

  const focusRandomGame = () => {
    if (!filteredGames.length) {
      randomButton?.classList.add("shake");
      window.setTimeout(() => randomButton?.classList.remove("shake"), 600);
      return;
    }
    const picked = filteredGames[Math.floor(Math.random() * filteredGames.length)];
    const card = gameGrid.querySelector(`[data-game-id="${escapeForSelector(picked.slug)}"]`);
    if (!card) return;
    gameGrid.querySelectorAll(".game-card").forEach((node) => node.classList.remove("is-highlighted"));
    card.classList.add("is-highlighted");
    card.scrollIntoView({ behavior: "smooth", block: "center" });
    const link = card.querySelector("a");
    if (link instanceof HTMLAnchorElement) {
      link.focus({ preventScroll: true });
    }
    window.setTimeout(() => card.classList.remove("is-highlighted"), 2600);
  };

  filtersContainer?.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLButtonElement)) return;
    const { gameFilter } = target.dataset;
    if (!gameFilter) return;
    activeCategory = gameFilter;
    filtersContainer
      .querySelectorAll("[data-game-filter]")
      .forEach((chip) => chip.classList.toggle("is-active", chip === target));
    applyFilters();
  });

  searchInput?.addEventListener("input", (event) => {
    searchQuery = event.target.value;
    applyFilters();
  });

  randomButton?.addEventListener("click", () => {
    focusRandomGame();
  });

  applyFilters();
});
