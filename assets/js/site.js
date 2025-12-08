const highlightEntries = [
  {
    title: "Nowa kolekcja gier",
    description:
      "Sprawdź bibliotekę pełną klasyków i autorskich mini-gier. Każdy tytuł działa od razu w przeglądarce i ma krótki opis mechaniki.",
    meta: "10 gier gotowych do gry",
    cta: "Przejdź do biblioteki",
    url: "gry/gry.html",
    short: "Biblioteka gier właśnie zyskała świeży wygląd."
  },
  {
    title: "Zestaw narzędzi kreatywnych",
    description:
      "Generatory kolorów, czcionek i emoji pomagają szybciej eksperymentować z pomysłami. Idealne, gdy tworzysz własne projekty.",
    meta: "3 interaktywne programy",
    cta: "Otwórz programy",
    url: "Programy/programy.html",
    short: "Wypróbuj generatory i stwórz coś nowego."
  },
  {
    title: "Wieczór filmowy?",
    description:
      "Stwórz swój własny repertuar. Dodawaj ulubione trailery i odkrywaj inspiracje na kolejną sesję filmową.",
    meta: "Polecane playlisty i zwiastuny",
    cta: "Przeglądaj filmy",
    url: "filmy/filmy glowna.html",
    short: "Zainspiruj się gotowymi playlistami filmowymi."
  },
  {
    title: "Strefa muzyczna",
    description:
      "Włącz muzykę dopasowaną do Twojego nastroju. Od chilloutu po energiczne playlisty – wszystko w jednym miejscu.",
    meta: "Playlista tematyczna tygodnia",
    cta: "Wejdź do strefy muzyki",
    url: "muzyka/muzyka.html",
    short: "Odkryj świeże brzmienia prosto z centrum muzyki."
  }
];

const nameDayCalendar = {
  "01-01": ["Mieczysław", "Mieszko", "Maria"],
  "02-14": ["Walenty", "Lila"],
  "03-08": ["Beata", "Jan", "Wincenty"],
  "04-23": ["Wojciech", "Jerzy"],
  "05-26": ["Filip", "Paulina"],
  "06-24": ["Jan", "Danuta"],
  "07-13": ["Irma", "Małgorzata"],
  "08-15": ["Maria", "Napoleon"],
  "09-29": ["Michał", "Gabriela"],
  "10-04": ["Franciszek", "Rozalia"],
  "11-30": ["Andrzej", "Justyna"],
  "12-06": ["Mikołaj", "Juta"]
};

document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.querySelector("[data-theme-toggle]");
  const navToggle = document.querySelector("[data-nav-toggle]");
  const navMenu = document.querySelector("[data-nav-menu]");
  const dropdownButtons = document.querySelectorAll("[data-dropdown-toggle]");
  const clockTimeEl = document.querySelector("[data-clock-time]");
  const clockDateEl = document.querySelector("[data-clock-date]");
  const heroHighlightText = document.querySelector("[data-hero-highlight]");
  const highlightTitleEl = document.querySelector("[data-highlight-title]");
  const highlightDescriptionEl = document.querySelector("[data-highlight-description]");
  const highlightMetaEl = document.querySelector("[data-highlight-meta]");
  const highlightLinkEl = document.querySelector("[data-highlight-link]");
  const highlightRefresh = document.querySelector("[data-highlight-refresh]");
  const nameDayEl = document.querySelector("[data-name-day]");

  /* Theme handling */
  const storedTheme = localStorage.getItem("site-theme");
  if (storedTheme === "dark") {
    body.classList.add("theme-dark");
  }

  const updateThemeToggleLabel = () => {
    if (!themeToggle) return;
    const isDark = body.classList.contains("theme-dark");
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeToggle.innerHTML = isDark ? "☀️ Jasny motyw" : "🌙 Tryb nocny";
  };

  themeToggle?.addEventListener("click", () => {
    body.classList.toggle("theme-dark");
    const isDark = body.classList.contains("theme-dark");
    localStorage.setItem("site-theme", isDark ? "dark" : "light");
    updateThemeToggleLabel();
  });

  updateThemeToggleLabel();

  /* Navigation toggles */
  navToggle?.addEventListener("click", () => {
    if (!navMenu) return;
    const isOpen = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navMenu?.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLAnchorElement) {
      navMenu.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
      dropdownButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        button.closest(".nav-item--dropdown")?.classList.remove("is-open");
      });
    }
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const parent = button.closest(".nav-item--dropdown");
      if (!parent) return;
      const isOpen = parent.classList.toggle("is-open");
      button.setAttribute("aria-expanded", String(isOpen));
      dropdownButtons.forEach((other) => {
        if (other === button) return;
        const otherParent = other.closest(".nav-item--dropdown");
        otherParent?.classList.remove("is-open");
        other.setAttribute("aria-expanded", "false");
      });
    });
  });

  document.addEventListener("click", (event) => {
    if (!(event.target instanceof Element)) return;
    const isNavInteraction = event.target.closest(".main-nav");
    if (!isNavInteraction) {
      dropdownButtons.forEach((button) => {
        button.setAttribute("aria-expanded", "false");
        button.closest(".nav-item--dropdown")?.classList.remove("is-open");
      });
      navMenu?.classList.remove("is-open");
      navToggle?.setAttribute("aria-expanded", "false");
    }
  });

  /* Clock */
  const formatNumber = (value) => value.toString().padStart(2, "0");

  const updateClock = () => {
    const now = new Date();
    if (clockTimeEl) {
      const hours = formatNumber(now.getHours());
      const minutes = formatNumber(now.getMinutes());
      const seconds = formatNumber(now.getSeconds());
      clockTimeEl.textContent = `${hours}:${minutes}:${seconds}`;
    }
    if (clockDateEl) {
      const formattedDate = new Intl.DateTimeFormat("pl-PL", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }).format(now);
      clockDateEl.textContent = formattedDate;
    }
  };

  updateClock();
  setInterval(updateClock, 1000);

  /* Name day */
  if (nameDayEl) {
    const now = new Date();
    const key = `${formatNumber(now.getMonth() + 1)}-${formatNumber(now.getDate())}`;
    const names = nameDayCalendar[key];
    const label = names
      ? names.join(", ")
      : "Dzisiaj świętują wszyscy bohaterowie Maxowej społeczności!";
    nameDayEl.innerHTML = `<strong>Dzisiejsze imieniny:</strong> ${label}`;
  }

  /* Highlight cards */
  let activeHighlightIndex = Math.floor(Math.random() * highlightEntries.length);

  const applyHighlight = (index) => {
    const entry = highlightEntries[index];
    highlightTitleEl && (highlightTitleEl.textContent = entry.title);
    highlightDescriptionEl && (highlightDescriptionEl.textContent = entry.description);
    highlightMetaEl && (highlightMetaEl.textContent = entry.meta);
    if (highlightLinkEl) {
      highlightLinkEl.textContent = entry.cta;
      highlightLinkEl.setAttribute("href", entry.url);
    }
    heroHighlightText && (heroHighlightText.textContent = entry.short);
  };

  applyHighlight(activeHighlightIndex);

  highlightRefresh?.addEventListener("click", () => {
    let nextIndex = Math.floor(Math.random() * highlightEntries.length);
    if (highlightEntries.length > 1) {
      while (nextIndex === activeHighlightIndex) {
        nextIndex = Math.floor(Math.random() * highlightEntries.length);
      }
    }
    activeHighlightIndex = nextIndex;
    applyHighlight(activeHighlightIndex);
  });

  /* Game instructions layout */
  const instructionLayouts = document.querySelectorAll("[data-instructions-layout]");

  instructionLayouts.forEach((layout) => {
    const toggle = layout.querySelector("[data-instructions-toggle]");
    const panel = layout.querySelector("[data-instructions-panel]");
    if (!toggle || !panel) return;

    const closedLabel = toggle.getAttribute("data-open-label") || toggle.textContent || "Pokaż instrukcje";
    const openLabel = toggle.getAttribute("data-close-label") || "Ukryj instrukcje";

    const applyState = (isOpen) => {
      layout.setAttribute("data-instructions-open", isOpen ? "true" : "false");
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.textContent = isOpen ? openLabel : closedLabel;
      if (isOpen) {
        panel.removeAttribute("hidden");
        if (typeof panel.scrollTop === "number") {
          panel.scrollTop = 0;
        }
      } else {
        panel.setAttribute("hidden", "");
      }
    };

    applyState(false);

    toggle.addEventListener("click", () => {
      const shouldOpen = layout.getAttribute("data-instructions-open") !== "true";
      applyState(shouldOpen);
      if (shouldOpen) {
        window.requestAnimationFrame(() => {
          if (typeof panel.focus === "function") {
            try {
              panel.focus({ preventScroll: true });
            } catch (error) {
              panel.focus();
            }
          }
        });
      }
    });

    panel.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        applyState(false);
        toggle.focus();
      }
    });
  });

});
