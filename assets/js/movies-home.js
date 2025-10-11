const filmCollections = [
  {
    id: "TopGun",
    title: "Top Gun",
    description: "Lotniczy duet Mavericka i Roostera serwuje mieszankę nostalgii oraz adrenaliny, idealną na start maratonu.",
    tags: ["akcja", "lotnictwo", "klasyk"],
    cover: "https://filman.cc/public/static/poster/big/30091.jpg",
    mood: "Poczuj prędkość",
    highlight: "Top Gun przypomina, że wśród chmur wciąż czeka najlepsza przygoda.",
  },
  {
    id: "SzybcyIWściekli",
    title: "Szybcy i Wściekli",
    description: "Seria pełna pościgów i rodzinnych więzi. Idealna, gdy masz ochotę na przerywnik w rytmie nitro.",
    tags: ["akcja", "samochody", "rodzina"],
    cover: "https://filman.cc/public/static/poster/big/29.jpg",
    mood: "Nitro time",
    highlight: "Rodzina Toretto zawsze znajdzie sposób na noc z oktanami.",
  },
  {
    id: "JohnWick",
    title: "John Wick",
    description: "Elegancka zemsta i perfekcyjne sceny walki. Seria, która nie zwalnia tempa ani na sekundę.",
    tags: ["akcja", "neo-noir", "thriller"],
    cover: "https://filman.cc/public/static/poster/big/56.jpg",
    mood: "Stylowa akcja",
    highlight: "Przygotuj kawę – Baba Jaga wraca do gry z potrójną siłą.",
  },
  {
    id: "Taxi",
    title: "Taxi",
    description: "Francuska komedia akcji pełna absurdalnych zwrotów i szalonych kursów ulicami Marsylii.",
    tags: ["komedia", "akcja", "retro"],
    cover: "https://fwcdn.pl/fpo/07/27/727/6900934.3.jpg",
    mood: "Wesoły drift",
    highlight: "Taxi zapewni Ci śmiech i zawrotne tempo w drodze po popcorn.",
  },
  {
    id: "GodzinySzczytu",
    title: "Godziny szczytu",
    description: "Kultowy duet Jackie Chana i Chrisa Tuckera. Lekka komedia kryminalna z fantastycznymi choreografiami.",
    tags: ["komedia", "buddy cop", "akcja"],
    cover: "https://fwcdn.pl/fpo/00/59/59/6922212.3.jpg",
    mood: "Buddy cop",
    highlight: "Lee i Carter dowodzą, że najlepsze żarty powstają pod presją czasu.",
  },
  {
    id: "ZabójczaBroń",
    title: "Zabójcza broń",
    description: "Seria, która zdefiniowała kino policyjnych duetów. Nostalgiczna podróż do lat 80.",
    tags: ["klasyk", "buddy cop", "akcja"],
    cover: "https://fwcdn.pl/fpo/13/08/1308/7059259.3.jpg",
    mood: "Klasyka gatunku",
    highlight: "Riggs i Murtaugh przekonują, że na dobrą akcję nigdy nie jest się zbyt starym.",
  },
  {
    id: "JasFasola",
    title: "Jaś Fasola",
    description: "Lekka brytyjska komedia, która rozkręci każdy rodzinny wieczór i zagwarantuje salwy śmiechu.",
    tags: ["komedia", "rodzina", "nostalgia"],
    cover: "https://assets.upflix.pl/media/plakat/1997/bean__300_427.jpg",
    mood: "Rodzinny śmiech",
    highlight: "Mr. Bean udowadnia, że slapstick nigdy nie wychodzi z mody.",
  },
  {
    id: "ZielonaMila",
    title: "Zielona Mila",
    description: "Emocjonalna opowieść Stephena Kinga. Idealna na spokojny wieczór w refleksyjnym nastroju.",
    tags: ["dramat", "klasyk", "emocje"],
    cover: "https://fwcdn.pl/fpo/08/62/862/7517878.3.jpg",
    mood: "Spokojny dramat",
    highlight: "Zielona mila przypomni, jak głęboko potrafi poruszyć filmowa historia.",
  },
  {
    id: "OjciecChrzestny",
    title: "Ojciec chrzestny",
    description: "Gangsterska saga rodziny Corleone. Kino absolutnie obowiązkowe dla każdego kinomana.",
    tags: ["dramat", "gangsterski", "klasyk"],
    cover: "https://fwcdn.pl/fpo/10/89/1089/7196615.3.jpg",
    mood: "Kultowa saga",
    highlight: "Złóż wizytę rodzinie Corleone i przygotuj się na mocne dialogi.",
  },
  {
    id: "BękartyWojny",
    title: "Bękarty wojny",
    description: "Tarantino w pełnej krasie – nieszablonowa historia z absurdalnym poczuciem humoru.",
    tags: ["wojenny", "tarantino", "czarny humor"],
    cover: "https://fwcdn.pl/fpo/77/47/137747/7276639.3.jpg",
    mood: "Filmowe eksperymenty",
    highlight: "Inglourious Basterds to mieszanka kina wojennego i teatralnego stylu Tarantino.",
  },
  {
    id: "Reacher",
    title: "Reacher",
    description: "Serialowa adaptacja książek Lee Childa. Każdy odcinek to nowe śledztwo i solidna dawka akcji.",
    tags: ["serial", "kryminał", "akcja"],
    cover: "https://fwcdn.pl/fpo/59/87/875987/7986413.3.jpg",
    mood: "Śledczy klimat",
    highlight: "Jack Reacher odwiedza kolejne miasteczka i zostawia po sobie porządek.",
  },
  {
    id: "TowerHeistZemstaCieciów",
    title: "Tower Heist",
    description: "Szajka sprytnych pracowników planuje największy skok w historii luksusowego apartamentowca.",
    tags: ["komedia", "akcja", "napad"],
    cover: "https://fwcdn.pl/fpo/82/07/288207/7401836.3.jpg",
    mood: "Skok stulecia",
    highlight: "Tower Heist rozkręci każdą domówkę błyskotliwym humorem.",
  },
  {
    id: "HotShots",
    title: "Hot Shots",
    description: "Parodia kina akcji z kultowymi gagami i absurdalnym humorem wprost z lat 90.",
    tags: ["parodia", "komedia", "akcja"],
    cover: "https://filman.cc/public/static/poster/big/7780.jpg",
    mood: "Totalny odlot",
    highlight: "Hot Shots zadba o to, by podczas seansu śmiech nie ustawał ani na chwilę.",
  }
];

const uniqueCollections = filmCollections.filter(
  (collection, index, array) => array.findIndex((item) => item.id === collection.id) === index
);

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
    highlightText && (highlightText.textContent = collection.highlight);
    if (heroLink) {
      heroLink.textContent = `Otwórz „${collection.title}”`;
      heroLink.setAttribute("href", `movies.html?series=${encodeURIComponent(collection.id)}`);
    }
    spotlightTitleEl && (spotlightTitleEl.textContent = collection.title);
    spotlightTagsEl && (spotlightTagsEl.textContent = collection.tags.join(" • "));
  };

  const cardElements = uniqueCollections.map((collection) => {
    const article = document.createElement("article");
    article.className = "media-card";
    article.dataset.title = collection.title.toLowerCase();
    article.dataset.tags = collection.tags.join(" ").toLowerCase();
    article.dataset.id = collection.id;
    article.setAttribute("data-film-card", "");
    article.innerHTML = `
      <figure class="media-card__poster">
        <img src="${collection.cover}" alt="Plakat kolekcji ${collection.title}" loading="lazy">
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
    cardElements.forEach((card, index) => {
      const collection = uniqueCollections[index];
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
    const collection = uniqueCollections.find((item) => item.id === pickedId);
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

  collectionCountEl && (collectionCountEl.textContent = String(uniqueCollections.length));

  const initialSpotlight = uniqueCollections[Math.floor(Math.random() * uniqueCollections.length)];
  applySpotlight(initialSpotlight);
  filterCards();
});
