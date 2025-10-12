(function () {
  "use strict";

  const escapeHtml = function (value) {
    var safeValue = value == null ? "" : value;
    return String(safeValue)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const escapeAttribute = function (value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  };

  const escapeForSelector = function (value) {
    if (typeof CSS !== "undefined" && typeof CSS.escape === "function") {
      return CSS.escape(String(value == null ? "" : value));
    }
    return String(value == null ? "" : value).replace(/([.*+?^${}()|\[\]\\])/g, "\\$1");
  };

  const gamesCatalog = Array.isArray(window.gamesCatalog) ? window.gamesCatalog : [];
  const difficultyScale = window.gamesDifficultyScale || {};
  const durationScale = window.gamesDurationScale || {};

  const initializeGameLibrary = function () {
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

  const catalog = gamesCatalog.map(function (game) {
    const searchableParts = [];
    searchableParts.push(game.title);
    searchableParts.push(game.description);
    if (Array.isArray(game.genres)) {
      searchableParts.push(game.genres.join(" "));
    }
    if (Array.isArray(game.tags)) {
      searchableParts.push(game.tags.join(" "));
    }
    if (Array.isArray(game.modes)) {
      searchableParts.push(game.modes.join(" "));
    }
    const clone = {};
    for (var key in game) {
      if (Object.prototype.hasOwnProperty.call(game, key)) {
        clone[key] = game[key];
      }
    }
    clone.searchable = searchableParts
      .filter(function (part) {
        return Boolean(part);
      })
      .join(" ")
      .toLowerCase();
    return clone;
  });

  const categorySet = {};
  catalog.forEach(function (game) {
    if (!Array.isArray(game.genres)) return;
    game.genres.forEach(function (genre) {
      categorySet[genre] = true;
    });
  });
  const uniqueCategories = Object.keys(categorySet).sort(function (a, b) {
    return a.localeCompare(b, "pl");
  });

  const durationCounts = catalog.reduce(function (acc, game) {
    const key = game.duration;
    if (!key) return acc;
    if (!acc[key]) {
      acc[key] = 0;
    }
    acc[key] += 1;
    return acc;
  }, {});

  const durationEntries = Object.keys(durationCounts).map(function (key) {
    return [key, durationCounts[key]];
  });

  durationEntries.sort(function (a, b) {
    const keyA = a[0];
    const countA = a[1];
    const keyB = b[0];
    const countB = b[1];
    if (countA === countB) {
      const orderA = durationScale[keyA] && typeof durationScale[keyA].order === "number"
        ? durationScale[keyA].order
        : Number.POSITIVE_INFINITY;
      const orderB = durationScale[keyB] && typeof durationScale[keyB].order === "number"
        ? durationScale[keyB].order
        : Number.POSITIVE_INFINITY;
      return orderA - orderB;
    }
    return countB - countA;
  });

  const mostPopularDuration = durationEntries.length ? durationEntries[0][0] : null;

  const soloCount = catalog.filter(function (game) {
    return Array.isArray(game.modes) && game.modes.indexOf("Solo") !== -1;
  }).length;
  const multiplayerCount = catalog.filter(function (game) {
    if (!Array.isArray(game.modes)) return false;
    return game.modes.some(function (mode) {
      return mode !== "Solo";
    });
  }).length;

  const difficultyTotal = catalog.reduce(function (total, game) {
    const meta = difficultyScale[game.difficulty];
    const weight = meta && typeof meta.weight === "number" ? meta.weight : 0;
    return total + weight;
  }, 0);
  const averageDifficultyScore = difficultyTotal / (catalog.length || 1);

  const difficultyBucket =
    averageDifficultyScore < 1.5
      ? "casual"
      : averageDifficultyScore < 2.5
      ? "classic"
      : "intense";

  if (statsTotalEl) {
    statsTotalEl.textContent = String(catalog.length);
  }
  if (statsSoloEl) {
    statsSoloEl.textContent = String(soloCount);
  }
  if (statsMultiEl) {
    statsMultiEl.textContent = String(multiplayerCount);
  }

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
      if (statsDurationEl) {
        statsDurationEl.textContent = durationMeta.label;
      }
      if (statsDurationNoteEl) {
        statsDurationNoteEl.textContent = durationMeta.note || "";
      }
    }
  }

  if (filtersContainer) {
    const chips = [
      '<button class="btn btn-chip is-active" type="button" data-game-filter="all">Wszystkie</button>'
    ];
    chips.push(
      uniqueCategories
        .map(function (category) {
          return (
            '<button class="btn btn-chip" type="button" data-game-filter="' +
            escapeAttribute(category) +
            '">' +
            escapeHtml(category) +
            "</button>"
          );
        })
        .join("")
    );
    filtersContainer.innerHTML = chips.join("");
  }

  if (featuredContainer) {
    const featuredPool = catalog
      .slice()
      .sort(function () {
        return Math.random() - 0.5;
      })
      .slice(0, 3);
    featuredContainer.innerHTML = featuredPool
      .map(function (game) {
        const difficulty = difficultyScale[game.difficulty];
        const duration = durationScale[game.duration];
        const firstGenre = Array.isArray(game.genres) && game.genres.length ? game.genres[0] : null;
        return (
          '<article class="game-highlight">' +
          '<div class="game-highlight__meta">' +
          (firstGenre ? '<span class="pill pill--muted">' + escapeHtml(firstGenre) + "</span>" : "") +
          (difficulty ? '<span class="pill pill--difficulty">' + escapeHtml(difficulty.label) + "</span>" : "") +
          (duration ? '<span class="pill pill--duration">' + escapeHtml(duration.label) + "</span>" : "") +
          "</div>" +
          '<h3 class="game-highlight__title">' + escapeHtml(game.title) + "</h3>" +
          '<p class="game-highlight__description">' +
          escapeHtml(game.spotlight || game.description) +
          "</p>" +
          '<a class="btn btn-ghost" href="' + escapeAttribute(game.url) + '">Otwórz grę</a>' +
          "</article>"
        );
      })
      .join("");
  }

  if (collectionsContainer) {
    const collections = [
      {
        title: "Solo na szybkie sesje",
        description: "Do 10 minut skupienia – idealne na przerwę.",
        filter: function (game) {
          return game.duration === "quick" && Array.isArray(game.modes) && game.modes.indexOf("Solo") !== -1;
        }
      },
      {
        title: "Granie we dwójkę",
        description: "Tryb kooperacji lub rywalizacji na jednym ekranie.",
        filter: function (game) {
          return Array.isArray(game.modes) && game.modes.some(function (mode) {
            return mode !== "Solo";
          });
        }
      },
      {
        title: "Klasyki retro",
        description: "Piksele, punkty i szybkie tempo lat 80.",
        filter: function (game) {
          return Array.isArray(game.genres) && game.genres.indexOf("Retro") !== -1;
        }
      }
    ];

    collectionsContainer.innerHTML = collections
      .map(function (collection) {
        const picks = catalog.filter(collection.filter).slice(0, 3);
        if (!picks.length) {
          return "";
        }
        const links = picks
          .map(function (game) {
            const firstGenre = Array.isArray(game.genres) && game.genres.length ? game.genres[0] : "";
            return (
              '<li><a href="' +
              escapeAttribute(game.url) +
              '" data-game-collection-link="' +
              escapeAttribute(game.slug) +
              '">' +
              escapeHtml(game.title) +
              "</a><span>" +
              escapeHtml(firstGenre) +
              "</span></li>"
            );
          })
          .join("");
        return (
          '<article class="collection-card">' +
          "<h3>" +
          escapeHtml(collection.title) +
          "</h3>" +
          "<p>" +
          escapeHtml(collection.description) +
          "</p>" +
          '<ul class="collection-card__list">' +
          links +
          "</ul>" +
          "</article>"
        );
      })
      .join("");
  }

  let activeCategory = "all";
  let searchQuery = "";
  let filteredGames = catalog.slice();

  const renderCards = function (items) {
    gameGrid.innerHTML = items
      .map(function (game) {
        const difficulty = difficultyScale[game.difficulty];
        const duration = durationScale[game.duration];
        const firstGenre = Array.isArray(game.genres) && game.genres.length ? game.genres[0] : null;
        const hasModes = Array.isArray(game.modes) && game.modes.length;
        const metaLabels = [
          firstGenre ? '<span class="pill pill--muted">' + escapeHtml(firstGenre) + "</span>" : "",
          hasModes
            ? '<span class="pill pill--mode">' + escapeHtml(game.modes.join(" · ")) + "</span>"
            : ""
        ].join("");
        const tags = (Array.isArray(game.tags) ? game.tags : [])
          .map(function (tag) {
            return '<span class="tag">' + escapeHtml(tag) + "</span>";
          })
          .join("");
        return (
          '<article class="game-card" data-game-card data-game-id="' +
          escapeAttribute(game.slug) +
          '">' +
          '<div class="game-card__media">' +
          '<img src="' +
          escapeAttribute(game.cover) +
          '" alt="' +
          escapeAttribute(game.coverAlt) +
          '" loading="lazy" />' +
          "</div>" +
          '<div class="game-card__body">' +
          '<div class="game-card__meta">' +
          metaLabels +
          "</div>" +
          '<h3 class="game-card__title">' +
          escapeHtml(game.title) +
          "</h3>" +
          '<p class="game-card__description">' +
          escapeHtml(game.description) +
          "</p>" +
          '<dl class="game-card__details">' +
          "<div><dt>Trudność</dt><dd>" +
          (difficulty ? escapeHtml(difficulty.label) : "--") +
          "</dd></div>" +
          "<div><dt>Sesja</dt><dd>" +
          (duration ? escapeHtml(duration.label) : "--") +
          "</dd></div>" +
          "</dl>" +
          '<div class="game-card__tags">' +
          tags +
          "</div>" +
          "</div>" +
          '<div class="game-card__footer">' +
          '<a class="btn btn-primary" href="' +
          escapeAttribute(game.url) +
          '">Graj teraz</a>' +
          "</div>" +
          "</article>"
        );
      })
      .join("");
  };

  const updateActiveCount = function () {
    if (!activeCountEl) return;
    const total = catalog.length;
    if (filteredGames.length === total) {
      activeCountEl.textContent = "Pokazujemy wszystkie " + total + " gier";
    } else {
      activeCountEl.textContent = "Pokazujemy " + filteredGames.length + " z " + total + " gier";
    }
  };

  const applyFilters = function () {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    filteredGames = catalog.filter(function (game) {
      const matchesCategory =
        activeCategory === "all"
          ? true
          : Array.isArray(game.genres) && game.genres.indexOf(activeCategory) !== -1;
      const matchesQuery = !normalizedQuery || game.searchable.indexOf(normalizedQuery) !== -1;
      return matchesCategory && matchesQuery;
    });
    renderCards(filteredGames);
    updateActiveCount();
    if (emptyState) {
      if (filteredGames.length === 0) {
        emptyState.classList.add("is-visible");
      } else {
        emptyState.classList.remove("is-visible");
      }
    }
  };

  const focusRandomGame = function () {
    if (!filteredGames.length) {
      if (randomButton) {
        randomButton.classList.add("shake");
        window.setTimeout(function () {
          randomButton.classList.remove("shake");
        }, 600);
      }
      return;
    }
    const picked = filteredGames[Math.floor(Math.random() * filteredGames.length)];
    const card = gameGrid.querySelector('[data-game-id="' + escapeForSelector(picked.slug) + '"]');
    if (!card) return;
    Array.prototype.forEach.call(gameGrid.querySelectorAll(".game-card"), function (node) {
      node.classList.remove("is-highlighted");
    });
    card.classList.add("is-highlighted");
    if (typeof card.scrollIntoView === "function") {
      try {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      } catch (error) {
        card.scrollIntoView();
      }
    }
    const link = card.querySelector("a");
    if (link && typeof link.focus === "function") {
      try {
        link.focus({ preventScroll: true });
      } catch (error) {
        link.focus();
      }
    }
    window.setTimeout(function () {
      card.classList.remove("is-highlighted");
    }, 2600);
  };

  if (filtersContainer) {
    filtersContainer.addEventListener("click", function (event) {
      const target = event.target;
      if (!(target instanceof HTMLButtonElement)) return;
      const gameFilter = target.getAttribute("data-game-filter");
      if (!gameFilter) return;
      activeCategory = gameFilter;
      Array.prototype.forEach.call(filtersContainer.querySelectorAll("[data-game-filter]"), function (chip) {
        if (chip === target) {
          chip.classList.add("is-active");
        } else {
          chip.classList.remove("is-active");
        }
      });
    applyFilters();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", function (event) {
      searchQuery = event.target.value || "";
      applyFilters();
    });
  }

  if (randomButton) {
    randomButton.addEventListener("click", function () {
      focusRandomGame();
    });
  }

    applyFilters();
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeGameLibrary);
  } else {
    initializeGameLibrary();
  }
})();
