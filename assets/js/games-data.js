const difficultyScale = {
  casual: { label: "Łatwa", weight: 1, description: "Lekki relaks, zero presji." },
  classic: { label: "Średnia", weight: 2, description: "Klasyczne tempo i równy poziom wyzwań." },
  intense: { label: "Trudna", weight: 3, description: "Solidna próba dla najbardziej wytrwałych." }
};

const durationScale = {
  quick: {
    label: "Szybka (5–10 min)",
    order: 1,
    note: "Idealne na błyskawiczną przerwę w ciągu dnia."
  },
  medium: {
    label: "Standardowa (10–20 min)",
    order: 2,
    note: "Świetne na krótką sesję po lekcjach lub pracy."
  },
  long: {
    label: "Dłuższa sesja (20+ min)",
    order: 3,
    note: "Zarezerwuj wieczór i rozsiądź się wygodnie."
  }
};

const gamesCatalog = [
  {
    slug: "memory",
    title: "Gra na zapamiętywanie",
    description:
      "Zapamiętuj coraz dłuższe sekwencje symboli i testuj swoją pamięć w tempie, które możesz stopniować jednym kliknięciem.",
    cover: "gra zapamietywanie/zdjęcie gry na zapamiętywanie.JPG",
    coverAlt: "Plansza z kolorowymi symbolami w grze na zapamiętywanie",
    url: "gra zapamietywanie/gra zapamietywanie.html",
    genres: ["Logiczna", "Pamięć"],
    modes: ["Solo"],
    tags: ["Pamięć", "Ćwiczenia mózgu", "Spokojne tempo"],
    difficulty: "casual",
    duration: "quick",
    spotlight:
      "Świetne na krótką przerwę – po każdej serii możesz zwiększyć poziom i obserwować, jak rośnie Twój wynik."
  },
  {
    slug: "2048",
    title: "2048",
    description:
      "Przesuwaj kafelki i łącz liczby, aby osiągnąć magiczną wartość 2048. Prosta mechanika, ale wciąga na dłużej niż myślisz!",
    cover: "2048/2048.JPG",
    coverAlt: "Plansza gry 2048 z kafelkami o różnych wartościach",
    url: "2048/2048.html",
    genres: ["Logiczna", "Puzzle"],
    modes: ["Solo"],
    tags: ["Rekord punktowy", "Klasyk"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Idealne wyzwanie dla fanów logicznych łamigłówek – im lepiej planujesz, tym dłużej utrzymasz ciąg zwycięstw."
  },
  {
    slug: "chess",
    title: "Szachy",
    description:
      "Rozegraj partię z komputerem i doszlifuj strategię openings, końcówek oraz taktyki. Każdy ruch ma znaczenie.",
    cover: "https://zegaryszachowe.pl/userdata/public/gfx/9560/Szachy-Turniejowe-4.jpg",
    coverAlt: "Zbliżenie na figury szachowe ustawione na drewnianej planszy",
    url: "chess/chess.html",
    genres: ["Strategia", "Klasyk"],
    modes: ["Solo"],
    tags: ["Strategia", "Turniejowy klimat"],
    difficulty: "intense",
    duration: "long",
    spotlight:
      "Zatrzymaj czas na dłuższą partię – idealne, gdy masz ochotę na spokojną, ale wymagającą rozgrywkę."
  },
  {
    slug: "hangman",
    title: "Wisielec",
    description:
      "Odgadnij ukryte słowo, zanim bohater trafi na szubienicę. Szybkie rundy w klimacie rodzinnej zgadywanki.",
    cover: "https://play-lh.googleusercontent.com/j3fSpmOuYo8M43ZldLXybNIEc6B9xQ25jy_OlIqx0loPB_lomyQlkXdwBFhYWi7-GA=w240-h480-rw",
    coverAlt: "Ekran startowy kolorowej gry Wisielec",
    url: "wisielec/wisielec.html",
    genres: ["Słowne", "Rodzinne"],
    modes: ["Solo"],
    tags: ["Szybkie tury", "Słownictwo"],
    difficulty: "casual",
    duration: "quick",
    spotlight:
      "Dobra rozgrzewka na początek sesji – kilka rund i już czujesz klimat rywalizacji."
  },
  {
    slug: "tetris",
    title: "Tetris",
    description:
      "Układaj spadające klocki i czyszcz linie, zanim plansza zapełni się po brzegi. Absolutny klasyk retro w najlepszym wydaniu.",
    cover: "tetris/tetris.JPG",
    coverAlt: "Zrzut ekranu z gry Tetris w dynamicznym momencie",
    url: "tetris/tetris.html",
    genres: ["Retro", "Puzzle"],
    modes: ["Solo"],
    tags: ["Refleks", "Klimat arcade"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Świetna opcja, gdy szukasz rytmicznej, angażującej zabawy – tempo rośnie wraz z Twoim wynikiem."
  },
  {
    slug: "space-invaders",
    title: "Space Invaders",
    description:
      "Broń Ziemię przed falami kosmicznych najeźdźców. Zbieraj punkty i utrzymuj statek w jednym kawałku jak najdłużej.",
    cover: "https://i.ytimg.com/vi/D1jZaIPeD5w/maxresdefault.jpg",
    coverAlt: "Statek kosmiczny walczący z falą przeciwników w Space Invaders",
    url: "spaceinvaders/spaceinvaders.html",
    genres: ["Retro", "Arcade"],
    modes: ["Solo"],
    tags: ["Zręcznościowa klasyka", "Punkty"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Kultowa gra, która błyskawicznie podnosi poziom adrenaliny – liczy się refleks i precyzyjne strzały."
  },
  {
    slug: "pong",
    title: "Pong",
    description:
      "Kultowa gra arcade w dwóch trybach: zagraj solo przeciwko AI lub we dwóch przeciwko sobie. Odbijaj piłkę i zdobywaj punkty!",
    cover: "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Klasyczna gra Pong z paletkami i piłką",
    url: "pong/pong.html",
    genres: ["Arcade", "Retro"],
    modes: ["Solo", "Dwóch graczy"],
    tags: ["vs AI", "Rywalizacja", "Refleks"],
    difficulty: "casual",
    duration: "quick",
    spotlight:
      "Wybierz tryb: zagraj sam przeciwko AI lub we dwóch na jednej klawiaturze. Klasyka w najczystszej postaci!"
  },
  {
    slug: "tic-tac-toe-ai",
    title: "Kółko i krzyżyk (vs AI)",
    description:
      "Wybierz poziom trudności i sprawdź, czy zdołasz przechytrzyć komputer. Każda runda trwa chwilę, ale statystyki pamiętają każdy wynik.",
    cover: "kolkokrzyrzykc/kókokrzyżyk.JPG",
    coverAlt: "Plansza 3x3 w grze kółko i krzyżyk z zaznaczonymi symbolami",
    url: "kolkos/kolkos.html",
    genres: ["Logiczna", "Klasyk"],
    modes: ["Solo"],
    tags: ["Sztuczna inteligencja", "Szybkie rundy"],
    difficulty: "classic",
    duration: "quick",
    spotlight:
      "Dwie strategie komputerowe do wyboru – zacznij jako X albo oddaj pierwszy ruch AI i ucz się na jego zagraniach."
  },
  {
    slug: "tic-tac-toe",
    title: "Kółko i krzyżyk (2 graczy)",
    description:
      "Stańcie naprzeciw siebie przy jednym ekranie i rywalizujcie w klasycznym pojedynku X kontra O. Prowadź tablicę wyników i rewanżuj się do woli!",
    cover: "kolkokrzyrzykc/kókokrzyżyk.JPG",
    coverAlt: "Plansza 3x3 w grze kółko i krzyżyk z zaznaczonymi symbolami",
    url: "kolkokrzyrzykc/kolkokrzyzykc.html",
    genres: ["Logiczna", "Klasyk"],
    modes: ["Dwóch graczy"],
    tags: ["Hot seat", "Rywalizacja"],
    difficulty: "casual",
    duration: "quick",
    spotlight:
      "Świetne, gdy szukasz szybkiej rundy ze znajomym – historia partii i licznik zwycięstw dodają smaczku każdej dogrywce."
  },
  {
    slug: "wheel",
    title: "Koło fortuny",
    description:
      "Zakręć kołem, odgadnij hasło i zgarnij tytuł mistrza zgadywanek. Świetny format na wspólne domowe spotkania.",
    cover: "",
    coverAlt: "Koło fortuny",
    url: "kolo_fortuny/kolo_fortuny.html",
    genres: ["Quiz", "Rodzinne"],
    modes: ["Wspólna gra"],
    tags: ["Losowość", "Zabawa w grupie"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Bardzo imprezowy klimat – najlepiej sprawdza się, gdy zasiądziecie do ekranu w kilka osób."
  },
  {
    slug: "hardware-quiz",
    title: "Quiz o podzespołach",
    description:
      "Sprawdź swoją wiedzę o sprzęcie komputerowym. Losowe pytania i szybkie odpowiedzi pokazują, gdzie masz braki.",
    cover: "quiz/CEIk9kuTURBXy9jNmFjZDg1MS1jM2JjLTQ2M2EtOTE2Zi1hOWVmMjRjNTUxNzIuanBlZ5DeAAGhMAU.webp",
    coverAlt: "Pytania testowe na ekranie quizu o podzespołach komputerowych",
    url: "quiz/quiz.html",
    genres: ["Quiz", "Edukacyjne"],
    modes: ["Solo", "Wspólna gra"],
    tags: ["Sprawdź wiedzę", "Technologia"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Dobry sposób na szybkie sprawdzenie wiedzy – idealny przed kolejnym zakupem lub testem z hardware'u."
  }
];

window.gamesDifficultyScale = difficultyScale;
window.gamesDurationScale = durationScale;
window.gamesCatalog = gamesCatalog;
