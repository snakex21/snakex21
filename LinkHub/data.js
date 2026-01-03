/*
 * =====================================================
 * LINKHUB DATABASE - AI AUTOMATION RULES
 * =====================================================
 * 
 * WAŻNE DLA AI:
 * 1. NIGDY nie usuwaj istniejących linków z LINKHUB_LINKS
 * 2. TYLKO dodawaj nowe linki na POCZĄTEK tablicy
 * 3. Nie modyfikuj istniejących wpisów
 * 4. Możesz dodawać nowe kategorie do LINKHUB_CATEGORIES
 * 5. Kategorie twórz po polsku z emoji
 * 6. Linki które nie przeszły walidacji dodaj do LINKHUB_PENDING
 * =====================================================
 */

// Konfiguracja - AI może zmienić model na żądanie użytkownika
const LINKHUB_CONFIG = {
  "model": "zai-org/GLM-4.7",
  "backup_model": "mistralai/Ministral-8B-Instruct-2410",
  "last_updated": "2026-01-03"
};

const LINKHUB_CATEGORIES = {
  "ai": {
    "name": "🤖 AI",
    "color": "#8b5cf6"
  },
  "gry": {
    "name": "🎮 Gry",
    "color": "#ef4444"
  },
  "programowanie": {
    "name": "💻 Programowanie",
    "color": "#3b82f6"
  },
  "filmy": {
    "name": "🎬 Filmy",
    "color": "#f59e0b"
  },
  "muzyka": {
    "name": "🎵 Muzyka",
    "color": "#ec4899"
  },
  "ebooki": {
    "name": "📚 eBooki",
    "color": "#10b981"
  },
  "komiksy": {
    "name": "💥 Komiksy",
    "color": "#f97316"
  },
  "linux-macos": {
    "name": "🍎 Linux/macOS",
    "color": "#6366f1"
  },
  "privacy": {
    "name": "🛡️ Prywatność",
    "color": "#14b8a6"
  },
  "sport": {
    "name": "⚽ Sport",
    "color": "#22c55e"
  },
  "narzedzia-graficzne": {
    "name": "🎨 Grafika",
    "color": "#a855f7"
  },
  "torrenty": {
    "name": "🏴‍☠️ Torrenty",
    "color": "#64748b"
  },
  "pobieranie": {
    "name": "📥 Pobieranie",
    "color": "#0ea5e9"
  },
  "pozostale": {
    "name": "📦 Pozostałe",
    "color": "#78716c"
  }
};

// Linki oczekujące na ręczną weryfikację (nie przeszły walidacji)
const LINKHUB_PENDING = [];

const LINKHUB_LINKS = [
  {
    "name": "YouTube",
    "url": "https://www.youtube.com",
    "category": "filmy",
    "description": "Enjoy the videos and music you love, upload original content, and share it all with friends, family, and the world on YouTube.",
    "added": "2026-01-03 20:27"
  },
  {
    "name": "Free Sports Streaming | FreeStreams-live1",
    "url": "https://freestreams-live1.pk",
    "category": "sport",
    "description": "Watch free sports streaming anywhere on any device.",
    "added": "2026-01-03 20:10"
  }
];
