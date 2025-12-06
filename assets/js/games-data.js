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
    slug: "tic-tac-toe",
    title: "Kółko i krzyżyk",
    description:
      "Wybierz tryb: zagraj przeciwko AI lub ze znajomym przy jednym ekranie. Rywalizuj w klasycznym pojedynku X kontra O!",
    cover: "kolkokrzyrzykc/kókokrzyżyk.JPG",
    coverAlt: "Plansza 3x3 w grze kółko i krzyżyk z zaznaczonymi symbolami",
    url: "kolkokrzyrzykc/kolkokrzyzykc.html",
    genres: ["Logiczna", "Klasyk"],
    modes: ["Solo", "Dwóch graczy"],
    tags: ["vs AI", "2 graczy", "Szybkie rundy"],
    difficulty: "casual",
    duration: "quick",
    spotlight:
      "Dwa tryby w jednym: trenuj przeciwko AI lub rywalizuj ze znajomym. Historia partii i licznik zwycięstw dodają smaczku!"
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
  },
  {
    slug: "typing-test",
    title: "Tester Szybkości Pisania",
    description:
      "Sprawdź jak szybko piszesz na klawiaturze. 60-sekundowy test na czas z polskimi słowami. Trenuj celność i prędkość (WPM).",
    cover: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Klawiatura mechaniczna z podświetleniem RGB",
    url: "typing/typing.html",
    genres: ["Edukacyjne", "Zręcznościowe"],
    modes: ["Solo"],
    tags: ["WPM", "Pisanie", "Trening"],
    difficulty: "classic",
    duration: "quick",
    spotlight:
      "Zmierz się z czasem i popraw swoje umiejętności pisania. Czy uda Ci się pobić swój rekord WPM?"
  },
  {
    slug: "minesweeper",
    title: "Saper",
    description:
      "Absolutny klasyk biurowy w nowoczesnym, neonowym wydaniu. Odkrywaj pola, oznaczaj miny flagami i nie daj się wysadzić.",
    cover: "https://images.unsplash.com/photo-1580234567406-03c233856108?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Siatka pól w grze Saper",
    url: "saper/saper.html",
    genres: ["Logiczna", "Klasyk"],
    modes: ["Solo"],
    tags: ["Myślenie", "Relaks", "Retro"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Wymaga myślenia, ale dziwnie relaksuje. Idealny sposób na 'produktywną' przerwę."
  },
  {
    slug: "arkanoid",
    title: "Arkanoid",
    description:
      "Dynamiczna gra zręcznościowa. Odbijaj piłeczkę, niszcz kolorowe cegły i łap wypadające bonusy.",
    cover: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Neonowe elementy gry zręcznościowej",
    url: "arkanoid/arkanoid.html",
    genres: ["Arcade", "Retro"],
    modes: ["Solo"],
    tags: ["Refleks", "Bonusy", "Cegiełki"],
    difficulty: "classic",
    duration: "quick",
    spotlight:
      "Powrót do lat 80. Z każdym poziomem tempo rośnie, a bonusy (laser, powiększenie) zmieniają zasady gry."
  },
  {
    slug: "flappy-bird",
    title: "Flappy Bird (Klon)",
    description:
      "Proste zasady, nieskończona irytacja. Klikaj, aby utrzymać ptaka w powietrzu i omijać przeszkody.",
    cover: "https://images.unsplash.com/photo-1454789476662-bdd71606334f?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Ptak lecący przez niebo",
    url: "flappy/flappy.html",
    genres: ["Zręcznościowa", "Indie"],
    modes: ["Solo"],
    tags: ["Refleks", "High Score", "Wyzwanie"],
    difficulty: "intense",
    duration: "quick",
    spotlight:
      "Tylko 'jeszcze jedna próba'. Sprawdź swój refleks i cierpliwość w tej kultowej zręcznościówce."
  },
  {
    slug: "snake",
    title: "Snake",
    description:
      "Nieśmiertelny Wąż powraca. Zbieraj punkty, rośnij w siłę i unikaj zderzenia z własnym ogonem lub ścianą.",
    cover: "https://images.unsplash.com/photo-1533422902779-aff35862e462?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Zielony wąż w stylu retro",
    url: "snakex21/snake.html",
    genres: ["Retro", "Zręcznościowa"],
    modes: ["Solo"],
    tags: ["Nokia 3310", "Klasyk", "Refleks"],
    difficulty: "casual",
    duration: "quick",
    spotlight:
      "Gra, którą zna każdy. Prosta, wciągająca i idealna, by zabić kilka minut czasu."
  },
  {
    slug: "hacker-tycoon",
    title: "Hacker Tycoon",
    description:
      "Zostań hakerem w tej grze typu Idle Clicker. Klikaj, aby zarabiać bity, kupuj serwery i automatyzuj swój dochód.",
    cover: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Kod binarny na ekranie monitora - klimat hakerski",
    url: "clicker/clicker.html",
    genres: ["Symulacja", "Idle"],
    modes: ["Solo"],
    tags: ["Klikacz", "Ulepszenia", "Tycoon"],
    difficulty: "casual",
    duration: "long",
    spotlight:
      "Zatrudniaj boty i rozbudowuj serwerownię. Gra gra się sama, nawet gdy na nią nie patrzysz!"
  },
  {
    slug: "sudoku",
    title: "Sudoku",
    description:
      "Japońska łamigłówka liczbowa. Wypełnij planszę 9x9 tak, aby cyfry nie powtarzały się w wierszach, kolumnach i kwadratach.",
    cover: "https://images.unsplash.com/photo-1629814249159-e48020163346?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Wypełniona plansza Sudoku na papierze",
    url: "sudoku/sudoku.html",
    genres: ["Logiczna", "Puzzle"],
    modes: ["Solo"],
    tags: ["Liczenie", "Mózg", "Spokój"],
    difficulty: "classic",
    duration: "medium",
    spotlight:
      "Trening dla szarych komórek. Idealne wyciszenie przy logicznym wyzwaniu."
  },
  {
    slug: "solitaire",
    title: "Pasjans (Solitaire)",
    description: "Absolutny klasyk. Układaj karty w odpowiedniej kolejności i kolorach. Idealny czasoumilacz w nowoczesnym wydaniu.",
    cover: "https://images.unsplash.com/photo-1593085512500-bfd179324512?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Karty do gry na ciemnym stole",
    url: "pasjans/pasjans.html",
    genres: ["Karciana", "Logiczna"],
    modes: ["Solo"],
    tags: ["Klasyk", "Cierpliwość", "Karty"],
    difficulty: "classic",
    duration: "medium",
    spotlight: "Wersja Klondike, którą wszyscy znają. Czy uda Ci się ułożyć pasjansa?"
  },
  {
    slug: "wordle",
    title: "Wordle (Słowotok)",
    description: "Masz 6 prób, aby zgadnąć 5-literowe słowo. Zielony kolor oznacza trafienie, żółty - złą pozycję.",
    cover: "https://images.unsplash.com/photo-1632213702844-1e0615781374?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Kafelki z literami w grze słownej",
    url: "wordle/wordle.html",
    genres: ["Słowna", "Logiczna"],
    modes: ["Solo"],
    tags: ["Słownik", "Myślenie", "Hit"],
    difficulty: "classic",
    duration: "quick",
    spotlight: "Codzienne wyzwanie dla Twojego słownictwa. Wciąga jak bagno!"
  },
  {
    slug: "connect4",
    title: "Czwórki (Connect 4)",
    description: "Strategiczna gra dla dwóch osób (lub przeciwko AI). Wrzuć żeton i ułóż 4 w jednej linii, zanim zrobi to przeciwnik.",
    cover: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Plansza do gry w czwórki",
    url: "connect4/connect4.html",
    genres: ["Strategia", "Logiczna"],
    modes: ["Solo", "Dwóch graczy"],
    tags: ["Rywalizacja", "Myślenie"],
    difficulty: "classic",
    duration: "quick",
    spotlight: "Bardziej zaawansowane 'Kółko i Krzyżyk'. Grawitacja zmienia wszystko."
  },
  {
    slug: "dino-run",
    title: "Dino Run",
    description: "Klon słynnej gry z brakiem internetu. Skacz T-Rexem nad kaktusami i biegnij w nieskończoność.",
    cover: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Pikselowy dinozaur",
    url: "dino/dino.html",
    genres: ["Arcade", "Runner"],
    modes: ["Solo"],
    tags: ["Refleks", "Endless", "Chrome"],
    difficulty: "intense",
    duration: "quick",
    spotlight: "Proste sterowanie, rosnące tempo. Jak daleko dobiegniesz?"
  },
  {
    slug: "tower-stack",
    title: "Tower Stack",
    description: "Buduj najwyższą wieżę z klocków. Klikaj precyzyjnie, bo każdy błąd zmniejsza podstawę wieży.",
    cover: "https://images.unsplash.com/photo-1476082549609-dd234850755a?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Wysoka wieża w chmurach",
    url: "tower/tower.html",
    genres: ["Arcade", "Zręcznościowa"],
    modes: ["Solo"],
    tags: ["Precyzja", "Timing", "Rekord"],
    difficulty: "classic",
    duration: "quick",
    spotlight: "Niesamowicie satysfakcjonująca, gdy wpadniesz w rytm."
  },
  {
    slug: "simon-says",
    title: "Simon Says",
    description: "Trenuj pamięć. Powtarzaj coraz dłuższe sekwencje kolorów i dźwięków, które dyktuje komputer.",
    cover: "https://images.unsplash.com/photo-1555680202-c86f0e12f086?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Kolorowe przyciski",
    url: "simon/simon.html",
    genres: ["Pamięć", "Muzyczna"],
    modes: ["Solo"],
    tags: ["Mózg", "Kolory", "Audio"],
    difficulty: "classic",
    duration: "medium",
    spotlight: "Zaczyna się niewinnie, kończy na panicznym zapamiętywaniu 15 ruchów."
  },
  {
    slug: "z-type",
    title: "Z-Type (Spadające Słowa)",
    description: "Kosmiczna strzelanka sterowana klawiaturą. Wpisuj spadające słowa, aby je zniszczyć, zanim dotrą do Ciebie.",
    cover: "https://images.unsplash.com/photo-1587829741301-dc798b91add1?auto=format&fit=crop&w=800&q=80",
    coverAlt: "Klawiatura w akcji",
    url: "ztype/ztype.html",
    genres: ["Pisanie", "Arcade"],
    modes: ["Solo"],
    tags: ["Szybkie pisanie", "WPM", "Akcja"],
    difficulty: "intense",
    duration: "medium",
    spotlight: "Najlepszy sposób na naukę szybkiego pisania poprzez eksterminację kosmitów."
  }
];

window.gamesDifficultyScale = difficultyScale;
window.gamesDurationScale = durationScale;
window.gamesCatalog = gamesCatalog;
