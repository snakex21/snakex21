(() => {
  const programs = Array.isArray(window.programsLibrary) ? window.programsLibrary : [];
  const rootPath = document.body.getAttribute("data-root") ?? "";

  const resolveUrl = (url) => {
    if (!url) return "#";
    if (/^https?:/i.test(url)) {
      return url;
    }
    const normalizedRoot = rootPath.endsWith("/") || rootPath === "" ? rootPath : `${rootPath}/`;
    const composed = `${normalizedRoot}${url}`;
    return composed.replace(/([^:]\/)\/+/g, "$1");
  };

  const formatDate = (input) => {
    if (!input) {
      return "Na bieżąco";
    }
    const parsed = new Date(input);
    if (Number.isNaN(parsed.getTime())) {
      return input;
    }
    return new Intl.DateTimeFormat("pl-PL", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    }).format(parsed);
  };

  const countEl = document.querySelector("[data-program-count]");
  const categoryCountEl = document.querySelector("[data-program-category-count]");
  const lastUpdateEl = document.querySelector("[data-program-last-update]");
  const filtersContainer = document.querySelector("[data-program-filters]");
  const programsGrid = document.querySelector("[data-programs-grid]");
  const searchInput = document.querySelector("[data-program-search]");
  const emptyState = document.querySelector("[data-program-empty]");
  const highlightCard = document.querySelector("[data-program-highlight]");
  const highlightTitle = highlightCard?.querySelector("[data-program-highlight-title]");
  const highlightDescription = highlightCard?.querySelector("[data-program-highlight-description]");
  const highlightMeta = highlightCard?.querySelector("[data-program-highlight-meta]");
  const highlightFeatures = highlightCard?.querySelector("[data-program-highlight-features]");
  const highlightTags = highlightCard?.querySelector("[data-program-highlight-tags]");
  const highlightLink = highlightCard?.querySelector("[data-program-highlight-link]");
  const randomButtons = document.querySelectorAll("[data-program-random]");

  if (!programsGrid) {
    return;
  }

  const categoryMap = new Map();
  let lastUpdatedValue = null;

  programs.forEach((program) => {
    if (program.categoryId && program.categoryName) {
      categoryMap.set(program.categoryId, program.categoryName);
    }
    if (program.updated) {
      const currentDate = new Date(program.updated);
      if (!Number.isNaN(currentDate.getTime())) {
        if (!lastUpdatedValue || currentDate > lastUpdatedValue) {
          lastUpdatedValue = currentDate;
        }
      }
    }
  });

  countEl && (countEl.textContent = programs.length.toString());
  categoryCountEl && (categoryCountEl.textContent = categoryMap.size.toString());
  lastUpdateEl && (lastUpdateEl.textContent = formatDate(lastUpdatedValue?.toISOString() ?? null));

  let activeCategory = "all";
  let activeQuery = "";

  const renderFilters = () => {
    if (!filtersContainer) return;
    filtersContainer.innerHTML = "";

    const createButton = (label, value, isActive = false) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `btn btn-chip${isActive ? " is-active" : ""}`;
      button.dataset.programFilter = value;
      button.textContent = label;
      button.addEventListener("click", () => {
        activeCategory = value;
        renderFilters();
        renderPrograms();
      });
      return button;
    };

    filtersContainer.appendChild(createButton("Wszystkie", "all", activeCategory === "all"));
    categoryMap.forEach((name, id) => {
      filtersContainer.appendChild(createButton(name, id, activeCategory === id));
    });
  };

  const createTag = (label) => {
    const tag = document.createElement("span");
    tag.className = "tag tag--program";
    tag.textContent = label;
    return tag;
  };

  const buildProgramCard = (program) => {
    const article = document.createElement("article");
    article.className = "program-card";
    article.dataset.category = program.categoryId ?? "";

    if (program.image) {
      const media = document.createElement("div");
      media.className = "program-card__media";
      const img = document.createElement("img");
      img.src = program.image;
      img.alt = program.title;
      img.loading = "lazy";
      media.appendChild(img);
      article.appendChild(media);
    }

    const body = document.createElement("div");
    body.className = "program-card__body";
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = program.categoryName ?? "Program";
    body.appendChild(badge);

    const title = document.createElement("h3");
    title.textContent = program.title;
    body.appendChild(title);

    if (program.description) {
      const description = document.createElement("p");
      description.textContent = program.description;
      body.appendChild(description);
    }

    if (Array.isArray(program.features) && program.features.length) {
      const featureList = document.createElement("ul");
      featureList.className = "program-card__features";
      program.features.forEach((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        featureList.appendChild(item);
      });
      body.appendChild(featureList);
    }

    article.appendChild(body);

    const footer = document.createElement("div");
    footer.className = "program-card__footer";

    if (Array.isArray(program.tags) && program.tags.length) {
      const tagList = document.createElement("div");
      tagList.className = "program-card__tags";
      program.tags.forEach((tagLabel) => {
        tagList.appendChild(createTag(tagLabel));
      });
      footer.appendChild(tagList);
    }

    const action = document.createElement("a");
    action.className = "btn btn-primary";
    action.href = resolveUrl(program.url);
    action.textContent = program.cta ?? "Uruchom";
    action.setAttribute("aria-label", `Uruchom narzędzie ${program.title}`);
    footer.appendChild(action);

    article.appendChild(footer);
    return article;
  };

  const getProgramKeywords = (program) => {
    const fields = [program.title, program.description, program.categoryName];
    if (Array.isArray(program.features)) {
      fields.push(...program.features);
    }
    if (Array.isArray(program.tags)) {
      fields.push(...program.tags);
    }
    return fields
      .filter(Boolean)
      .map((value) => value.toString().toLowerCase())
      .join(" ");
  };

  const renderPrograms = () => {
    const normalizedQuery = activeQuery.trim().toLowerCase();
    const filtered = programs.filter((program) => {
      const matchesCategory = activeCategory === "all" || program.categoryId === activeCategory;
      if (!matchesCategory) return false;
      if (!normalizedQuery) return true;
      return getProgramKeywords(program).includes(normalizedQuery);
    });

    programsGrid.innerHTML = "";
    if (!filtered.length) {
      emptyState?.removeAttribute("hidden");
      programsGrid.setAttribute("data-has-items", "false");
      return;
    }

    emptyState?.setAttribute("hidden", "true");
    programsGrid.setAttribute("data-has-items", "true");
    filtered.forEach((program) => {
      programsGrid.appendChild(buildProgramCard(program));
    });
  };

  const pickRandomProgram = () => {
    if (!programs.length) return null;
    const index = Math.floor(Math.random() * programs.length);
    return programs[index];
  };

  const applyHighlight = (program) => {
    if (!program || !highlightCard) return;
    highlightTitle && (highlightTitle.textContent = program.title);
    highlightDescription && (highlightDescription.textContent = program.description);
    if (highlightMeta) {
      const parts = [program.categoryName, program.meta].filter(Boolean);
      highlightMeta.textContent = parts.join(" • ") || "Polecane narzędzie";
    }
    if (highlightTags) {
      const tags = Array.isArray(program.tags) ? program.tags.join(" • ") : "";
      highlightTags.textContent = tags || "Nowa inspiracja";
    }
    if (highlightFeatures) {
      highlightFeatures.innerHTML = "";
      if (Array.isArray(program.features) && program.features.length) {
        program.features.slice(0, 4).forEach((feature) => {
          const item = document.createElement("li");
          item.textContent = feature;
          highlightFeatures.appendChild(item);
        });
      }
    }
    if (highlightLink) {
      highlightLink.textContent = program.cta ?? "Uruchom narzędzie";
      highlightLink.setAttribute("href", resolveUrl(program.url));
    }
  };

  renderFilters();
  renderPrograms();
  applyHighlight(programs[0]);

  searchInput?.addEventListener("input", (event) => {
    const target = event.target;
    if (target instanceof HTMLInputElement) {
      activeQuery = target.value;
      renderPrograms();
    }
  });

  randomButtons.forEach((button) => {
    const action = button.getAttribute("data-program-random");
    if (action === "open") {
      button.addEventListener("click", () => {
        const program = pickRandomProgram();
        if (!program) return;
        window.location.href = resolveUrl(program.url);
      });
    } else {
      button.addEventListener("click", () => {
        const program = pickRandomProgram();
        if (!program) return;
        applyHighlight(program);
        highlightCard?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  });
})();
