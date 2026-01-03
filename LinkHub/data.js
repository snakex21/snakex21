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
  "backup_model": "zai-org/GLM-4.7",
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
const LINKHUB_PENDING = [
  {
    "url": "https://1337x.to",
    "reason": "403",
    "attempted": "2026-01-03 21:53"
  }
];

const LINKHUB_LINKS = [
  {
    "name": "Free Sports Streaming | FreeStreams-live1",
    "url": "https://freestreams-live1.pk",
    "category": "sport",
    "description": "Watch free sports streaming anywhere on any device.",
    "added": "2026-01-03 20:10"
  },
  {
    "name": "YouTube",
    "url": "https://www.youtube.com/?gl=PL&hl=pl",
    "category": "filmy",
    "description": "W YouTube możesz cieszyć się filmami i muzyką, które lubisz.",
    "added": "2026-01-03 20:00"
  },
  {
    "name": "5000best.com",
    "url": "http://5000best.com/books/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adb.arcadeitalia.net",
    "url": "http://adb.arcadeitalia.net/default.php?lang=en",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animesub.info",
    "url": "http://animesub.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arcadecontrols.com",
    "url": "http://arcadecontrols.com/arcade.htm",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "artscene.textfiles.com",
    "url": "http://artscene.textfiles.com/music/midi/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bdrgames.nl",
    "url": "http://bdrgames.nl/lcdgames/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cemu.info",
    "url": "http://cemu.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "codehaus.wohlsoft.ru",
    "url": "http://codehaus.wohlsoft.ru/index.php",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cue.tools",
    "url": "http://cue.tools/wiki/CUETools",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dege.freeweb.hu",
    "url": "http://dege.freeweb.hu/dgVoodoo2/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doradrop.com",
    "url": "http://doradrop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "enbdev.com",
    "url": "http://enbdev.com",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "english.grimoar.cz",
    "url": "http://english.grimoar.cz/?Loc=key&Lng=2",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "erewhon.superkuh.com",
    "url": "http://erewhon.superkuh.com/library/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "farter.cn",
    "url": "http://farter.cn/tetr.js/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "footybite.cc",
    "url": "http://footybite.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.rojadirecta.es",
    "url": "http://forum.rojadirecta.es/forumdisplay.php?15-VOD-Full-events-(eventos-completos)",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huhu.to",
    "url": "http://huhu.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hydrogen-music.org",
    "url": "http://hydrogen-music.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iapsop.com",
    "url": "http://iapsop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kool.to",
    "url": "http://kool.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "liminal-archives.wikidot.com",
    "url": "http://liminal-archives.wikidot.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lostmyspace.com",
    "url": "http://lostmyspace.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "loveascii.com",
    "url": "http://loveascii.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mainstream.ghan.nl",
    "url": "http://mainstream.ghan.nl/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mrgamingstreams.org",
    "url": "http://mrgamingstreams.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oha.to",
    "url": "http://oha.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onhockey.tv",
    "url": "http://onhockey.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radicalscatters.unl.edu",
    "url": "http://radicalscatters.unl.edu/indices.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redump.org",
    "url": "http://redump.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rpc-wiki.net",
    "url": "http://rpc-wiki.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "runtimeterror.com",
    "url": "http://runtimeterror.com/tools/fullscreenizer/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rustorka.com",
    "url": "http://rustorka.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "slither.io",
    "url": "http://slither.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smwstuff.net",
    "url": "http://smwstuff.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sortyourmusic.playlistmachinery.com",
    "url": "http://sortyourmusic.playlistmachinery.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spectro.enpts.com",
    "url": "http://spectro.enpts.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stage48.net",
    "url": "http://stage48.net/wiki/index.php/Main_Page",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamworkshop.download",
    "url": "http://steamworkshop.download/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sync.coconono.org",
    "url": "http://sync.coconono.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "targum.info",
    "url": "http://targum.info/targumic-texts/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textbookgo.com",
    "url": "http://textbookgo.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textfiles.com",
    "url": "http://textfiles.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vavoo.to",
    "url": "http://vavoo.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.720pstream.me",
    "url": "http://www.720pstream.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anydecentmusic.com",
    "url": "http://www.anydecentmusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.asotarchive.org",
    "url": "http://www.asotarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.buddhism-dict.net",
    "url": "http://www.buddhism-dict.net/ddb/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cadenza.org",
    "url": "http://www.cadenza.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chillouts.com",
    "url": "http://www.chillouts.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cindyvallar.com",
    "url": "http://www.cindyvallar.com/pirates.html",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dimeadozen.org",
    "url": "http://www.dimeadozen.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.effectgames.com",
    "url": "http://www.effectgames.com/demos/canvascycle/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eldritchdark.com",
    "url": "http://www.eldritchdark.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flashbynight.com",
    "url": "http://www.flashbynight.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeintertv.com",
    "url": "http://www.freeintertv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freemedicaljournals.com",
    "url": "http://www.freemedicaljournals.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gnosis.org",
    "url": "http://www.gnosis.org/library.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gnumeric.org",
    "url": "http://www.gnumeric.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hexar.io",
    "url": "http://www.hexar.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hiddenbible.com",
    "url": "http://www.hiddenbible.com/enoch/online.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.identifont.com",
    "url": "http://www.identifont.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mixtapetorrent.com",
    "url": "http://www.mixtapetorrent.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pracdev.org",
    "url": "http://www.pracdev.org/channel99/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.proasm.com",
    "url": "http://www.proasm.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radiofeeds.co.uk",
    "url": "http://www.radiofeeds.co.uk/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.roysac.com",
    "url": "http://www.roysac.com/sitemap.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rpgamers.net",
    "url": "http://www.rpgamers.net/radio/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.speedsports.me",
    "url": "http://www.speedsports.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thetradersden.org",
    "url": "http://www.thetradersden.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "0-range.github.io",
    "url": "https://0-range.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "0x40.mon.im",
    "url": "https://0x40.mon.im/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "0xacab.org",
    "url": "https://0xacab.org/jvoisin/mat2",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "0xerr0r.github.io",
    "url": "https://0xerr0r.github.io/blocky/latest/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1001albumsgenerator.com",
    "url": "https://1001albumsgenerator.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "10fastfingers.com",
    "url": "https://10fastfingers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "123anime.info",
    "url": "https://123anime.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "123wrestling.com",
    "url": "https://123wrestling.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "16bit.pl",
    "url": "https://16bit.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "16-bits.org",
    "url": "https://16-bits.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "16colo.rs",
    "url": "https://16colo.rs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "18kami.com",
    "url": "https://18kami.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1cc.kr.eu.org",
    "url": "https://1cc.kr.eu.org/1cc/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1cloudfile.com",
    "url": "https://1cloudfile.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1ddl.org",
    "url": "https://1ddl.org/category/tv-shows/tv-sport",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1fichier.com",
    "url": "https://1fichier.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1max.top",
    "url": "https://1max.top/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "1stream.eu",
    "url": "https://1stream.eu/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "2012books.lardbucket.org",
    "url": "https://2012books.lardbucket.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "29a.ch",
    "url": "https://29a.ch/timestretch/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "2fa.directory",
    "url": "https://2fa.directory/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "2fas.com",
    "url": "https://2fas.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "365.ilysm.nl",
    "url": "https://365.ilysm.nl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "3dsdb.com",
    "url": "https://3dsdb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "3dsroms.org",
    "url": "https://3dsroms.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "3dtext2gif.com",
    "url": "https://3dtext2gif.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "3hentai.net",
    "url": "https://3hentai.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "3ost.ru",
    "url": "https://3ost.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "420.moe",
    "url": "https://420.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "473999.net",
    "url": "https://473999.net/pulse",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "4chansearch.com",
    "url": "https://4chansearch.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "4pda.to",
    "url": "https://4pda.to/forum/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "4rchive.org",
    "url": "https://4rchive.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "4stats.io",
    "url": "https://4stats.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "505e06b2.github.io",
    "url": "https://505e06b2.github.io/Image-to-Braille/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "64dd.org",
    "url": "https://64dd.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "720pier.ru",
    "url": "https://720pier.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "720pstream.nu",
    "url": "https://720pstream.nu/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "7tv.app",
    "url": "https://7tv.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "84000.co",
    "url": "https://84000.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "8beats.co",
    "url": "https://8beats.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "8muses.com",
    "url": "https://8muses.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "9hentai.to",
    "url": "https://9hentai.to/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "abandonwaregames.net",
    "url": "https://abandonwaregames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "abc.sourceforge.net",
    "url": "https://abc.sourceforge.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "abcnews.go.com",
    "url": "https://abcnews.go.com/Live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "abdownloadmanager.com",
    "url": "https://abdownloadmanager.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "abooklike.foo",
    "url": "https://abooklike.foo/escape",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "abrahamjuliot.github.io",
    "url": "https://abrahamjuliot.github.io/creepjs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "academicjournals.org",
    "url": "https://academicjournals.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "academictorrents.com",
    "url": "https://academictorrents.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "accelareader.com",
    "url": "https://accelareader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "acestream.org",
    "url": "https://acestream.org/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "acestreamid.com",
    "url": "https://acestreamid.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "acestreamsearch.net",
    "url": "https://acestreamsearch.net/en/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aceztrims.pages.dev",
    "url": "https://aceztrims.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "acid-play.com",
    "url": "https://acid-play.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "across-multiverse.com",
    "url": "https://across-multiverse.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adamgradzki.com",
    "url": "https://adamgradzki.com/keyzen-mab/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adamstrange.itch.io",
    "url": "https://adamstrange.itch.io/fontsprite",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adaway.org",
    "url": "https://adaway.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adblockplus.org",
    "url": "https://adblockplus.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/librezam/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/multiselect-for-youtube/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/popupblockerall/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/print-friendly-pdf/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/purpleadblock/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/remove-youtube-shorts/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/temporary-containers/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/video-resumer/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "addons.mozilla.org",
    "url": "https://addons.mozilla.org/en-US/firefox/addon/worldwide-radio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adguard.com",
    "url": "https://adguard.com/en/adguard-android/overview.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adguard.com",
    "url": "https://adguard.com/en/adguard-home/overview.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adguard.com",
    "url": "https://adguard.com/en/adguard-ios/overview.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adguard-dns.io",
    "url": "https://adguard-dns.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adguardteam.github.io",
    "url": "https://adguardteam.github.io/AnonymousRedirect/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adnauseam.io",
    "url": "https://adnauseam.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "adp.library.ucsb.edu",
    "url": "https://adp.library.ucsb.edu/index.php",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "advancemame.sourceforge.io",
    "url": "https://advancemame.sourceforge.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "affine.pro",
    "url": "https://affine.pro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "afterplay.io",
    "url": "https://afterplay.io/play/recently-played",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "agar.io",
    "url": "https://agar.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "agfy.co",
    "url": "https://agfy.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aggrocrab.itch.io",
    "url": "https://aggrocrab.itch.io/partyengine",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ai.wr.do",
    "url": "https://ai.wr.do/chat",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aiassistantbot.pages.dev",
    "url": "https://aiassistantbot.pages.dev/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aibenchmarks.net",
    "url": "https://aibenchmarks.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aider.chat",
    "url": "https://aider.chat/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aider.chat",
    "url": "https://aider.chat/docs/leaderboards/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aidungeon.com",
    "url": "https://aidungeon.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aielo.co",
    "url": "https://aielo.co/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aigallery.app",
    "url": "https://aigallery.app/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aimath.org",
    "url": "https://aimath.org/textbooks/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "airexplorer.net",
    "url": "https://airexplorer.net/en/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "airsonic.github.io",
    "url": "https://airsonic.github.io/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "airtable.com",
    "url": "https://airtable.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "airvpn.org",
    "url": "https://airvpn.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aistudio.google.com",
    "url": "https://aistudio.google.com/app/prompts/new_chat",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aistudio.google.com",
    "url": "https://aistudio.google.com/generate-image",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aistudio.google.com",
    "url": "https://aistudio.google.com/generate-speech",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aistudio.google.com",
    "url": "https://aistudio.google.com/generate-video",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aiva.ai",
    "url": "https://aiva.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ajsports.ch",
    "url": "https://ajsports.ch/AJ-Sports-TV.html",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "akirabox.com",
    "url": "https://akirabox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alamminsalo.github.io",
    "url": "https://alamminsalo.github.io/orion/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "albumart.digital",
    "url": "https://albumart.digital/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alephone.lhowon.org",
    "url": "https://alephone.lhowon.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alienflix.net",
    "url": "https://alienflix.net/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alirezakj.com",
    "url": "https://alirezakj.com/bsc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allbooksworld.com",
    "url": "https://allbooksworld.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allchemy.io",
    "url": "https://allchemy.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allfreebooks.org",
    "url": "https://allfreebooks.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allmanga.to",
    "url": "https://allmanga.to/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allmanga.to",
    "url": "https://allmanga.to/manga",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allporncomic.com",
    "url": "https://allporncomic.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allreplays.com",
    "url": "https://allreplays.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allwaysync.com",
    "url": "https://allwaysync.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "allwrestling24.com",
    "url": "https://allwrestling24.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alphabetizer.flap.tv",
    "url": "https://alphabetizer.flap.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alphascans.org",
    "url": "https://alphascans.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "altctrls.info",
    "url": "https://altctrls.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alternativestomee6.com",
    "url": "https://alternativestomee6.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alterportal.net",
    "url": "https://alterportal.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "alula.github.io",
    "url": "https://alula.github.io/SpaceCadetPinball",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ambicular.com",
    "url": "https://ambicular.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ambieapp.com",
    "url": "https://ambieapp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ambientsleepingpill.com",
    "url": "https://ambientsleepingpill.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ambiph.one",
    "url": "https://ambiph.one/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "amnezia.org",
    "url": "https://amnezia.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "amp3.cc",
    "url": "https://amp3.cc/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "amp4.cc",
    "url": "https://amp4.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ampache.org",
    "url": "https://ampache.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "an1.com",
    "url": "https://an1.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anadius.github.io",
    "url": "https://anadius.github.io/gd-efc/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anadius.su",
    "url": "https://anadius.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anarcho-copy.org",
    "url": "https://anarcho-copy.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "andkon.com",
    "url": "https://andkon.com/arcade/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "andreasbm.github.io",
    "url": "https://andreasbm.github.io/when-to-post-on-reddit/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anidb.net",
    "url": "https://anidb.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anify.to",
    "url": "https://anify.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anihq.to",
    "url": "https://anihq.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anilist.co",
    "url": "https://anilist.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animal-crossing-radio.com",
    "url": "https://animal-crossing-radio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anime.nexus",
    "url": "https://anime.nexus/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anime.uniquestream.net",
    "url": "https://anime.uniquestream.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anime7.download",
    "url": "https://anime7.download/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animedesu.pl",
    "url": "https://animedesu.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animehub.ac",
    "url": "https://animehub.ac/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animekai.to",
    "url": "https://animekai.to/home",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animekhor.org",
    "url": "https://animekhor.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animenosub.to",
    "url": "https://animenosub.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anime-odcinki.pl",
    "url": "https://anime-odcinki.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animeonsen.xyz",
    "url": "https://animeonsen.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animepahe.ru",
    "url": "https://animepahe.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anime-skip.com",
    "url": "https://anime-skip.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animethemes.moe",
    "url": "https://animethemes.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animetosho.org",
    "url": "https://animetosho.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animexin.dev",
    "url": "https://animexin.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "animeyy.com",
    "url": "https://animeyy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aninow.tv",
    "url": "https://aninow.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aniplaylist.com",
    "url": "https://aniplaylist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anixl.to",
    "url": "https://anixl.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aniyomi.org",
    "url": "https://aniyomi.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anizone.to",
    "url": "https://anizone.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ankergames.net",
    "url": "https://ankergames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "annas-archive.es",
    "url": "https://annas-archive.es/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "annas-archive.is",
    "url": "https://annas-archive.is/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "annas-archive.li",
    "url": "https://annas-archive.li/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "annas-archive.org",
    "url": "https://annas-archive.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "annas-archive.org",
    "url": "https://annas-archive.org/view",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "annas-archive.se",
    "url": "https://annas-archive.se/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anoboye.com",
    "url": "https://anoboye.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anontransfer.com",
    "url": "https://anontransfer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anonyig.com",
    "url": "https://anonyig.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anonymousplanet.org",
    "url": "https://anonymousplanet.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anvaka.github.io",
    "url": "https://anvaka.github.io/map-of-reddit",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anyconv.com",
    "url": "https://anyconv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anyflip.com",
    "url": "https://anyflip.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anymex.vercel.app",
    "url": "https://anymex.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anytexteditor.com",
    "url": "https://anytexteditor.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anythingllm.com",
    "url": "https://anythingllm.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anytxt.net",
    "url": "https://anytxt.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anytype.io",
    "url": "https://anytype.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anyvoicelab.com",
    "url": "https://anyvoicelab.com/long-form-text-to-speech-converter/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "anyvoicelab.com",
    "url": "https://anyvoicelab.com/voice-cloning/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aphrodite.pygmalion.chat",
    "url": "https://aphrodite.pygmalion.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apkcombo.com",
    "url": "https://apkcombo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apkpure.com",
    "url": "https://apkpure.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.artificialstudio.ai",
    "url": "https://app.artificialstudio.ai/tools",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.buffstream.io",
    "url": "https://app.buffstream.io/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.dimensions.ai",
    "url": "https://app.dimensions.ai/discover/publication",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.inkforall.com",
    "url": "https://app.inkforall.com/tools",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.lizardbyte.dev",
    "url": "https://app.lizardbyte.dev/Sunshine/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.remade.ai",
    "url": "https://app.remade.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.vnote.fun",
    "url": "https://app.vnote.fun/en_us/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.wyvern.chat",
    "url": "https://app.wyvern.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app.zenflowchart.com",
    "url": "https://app.zenflowchart.com/zen-sounds",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "appaudiobooks.com",
    "url": "https://appaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "appdb.winehq.org",
    "url": "https://appdb.winehq.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "appflowy.com",
    "url": "https://appflowy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "app-lgwebos.pluto.tv",
    "url": "https://app-lgwebos.pluto.tv/live-tv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "applio.org",
    "url": "https://applio.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "appnetica.com",
    "url": "https://appnetica.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.apple.com",
    "url": "https://apps.apple.com/app/fbreader-epub-and-fb2-reader/id1067172178",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.apple.com",
    "url": "https://apps.apple.com/app/piascore-hd/id406141702",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.gnome.org",
    "url": "https://apps.gnome.org/Evince/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.microsoft.com",
    "url": "https://apps.microsoft.com/detail/9n26s50ln705",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.microsoft.com",
    "url": "https://apps.microsoft.com/detail/9nc73mjwhsww?rtc=1&hl=en-us&gl=US",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.microsoft.com",
    "url": "https://apps.microsoft.com/detail/9p08t4jltqnk",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.microsoft.com",
    "url": "https://apps.microsoft.com/detail/9pdzvj34ztxg",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apps.microsoft.com",
    "url": "https://apps.microsoft.com/detail/9wzdncrdpqsx",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "apt.izzysoft.de",
    "url": "https://apt.izzysoft.de/fdroid/index/apk/com.github.whitescent.engine",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aqross.app",
    "url": "https://aqross.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aquamanga.com",
    "url": "https://aquamanga.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arbital.com",
    "url": "https://arbital.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arcade.photonstorm.com",
    "url": "https://arcade.photonstorm.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arcadespot.com",
    "url": "https://arcadespot.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archipelago.gg",
    "url": "https://archipelago.gg/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archiv.pw",
    "url": "https://archiv.pw/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.4plebs.org",
    "url": "https://archive.4plebs.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.dappermink.me",
    "url": "https://archive.dappermink.me/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.leftove.rs",
    "url": "https://archive.leftove.rs/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/amiga_magazines",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/apple_magazines",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/archiveteam-geocities-midi-collection-2009",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/audio",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/audio?&sort=-downloads&page=1",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/audio_bookspoetry",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/classicpcgames",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/commodore_magazines",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/computermagazines",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/consolelivingroom",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/ConstanceA.JonesJamesD.RyanEncyclopediaOfHinduism/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/EdwardA.IronsEncyclopediaOfBuddhismEncyclopediaOfWorldReligions/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/magazines",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/score-perfect-professional-lite-5.1/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/software",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/SuperMarioCrossoverOffline",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/texts",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/wadarchive",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archive.org",
    "url": "https://archive.org/details/youtubeannotations",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archived.moe",
    "url": "https://archived.moe/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archiveofourown.org",
    "url": "https://archiveofourown.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archiverse.pretendo.network",
    "url": "https://archiverse.pretendo.network/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archives.gov",
    "url": "https://archives.gov/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "archives.parliament.uk",
    "url": "https://archives.parliament.uk/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arctic-shift.photon-reddit.com",
    "url": "https://arctic-shift.photon-reddit.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "areena.yle.fi",
    "url": "https://areena.yle.fi/tv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ares-emu.net",
    "url": "https://ares-emu.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aresluna.org",
    "url": "https://aresluna.org/gamepad-tester/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aria2.github.io",
    "url": "https://aria2.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ariamaestosa.github.io",
    "url": "https://ariamaestosa.github.io/ariamaestosa/docs/index.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ariang.mayswind.net",
    "url": "https://ariang.mayswind.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arkenfox.github.io",
    "url": "https://arkenfox.github.io/TZP/tzp.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "armorgames.com",
    "url": "https://armorgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "artgenie.pages.dev",
    "url": "https://artgenie.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "artificialanalysis.ai",
    "url": "https://artificialanalysis.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "artistgrid.cx",
    "url": "https://artistgrid.cx/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "artwork.thekvt.eu.org",
    "url": "https://artwork.thekvt.eu.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arxiv.org",
    "url": "https://arxiv.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arxivxplorer.com",
    "url": "https://arxivxplorer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "arx-libertatis.org",
    "url": "https://arx-libertatis.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "asb2m10.github.io",
    "url": "https://asb2m10.github.io/dexed/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ascendara.app",
    "url": "https://ascendara.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ascii.alienmelon.com",
    "url": "https://ascii.alienmelon.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ascii.co.uk",
    "url": "https://ascii.co.uk/art",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ascii.today",
    "url": "https://ascii.today/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "askconcierge.ai",
    "url": "https://askconcierge.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "askyourpdf.com",
    "url": "https://askyourpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "asmhentai.com",
    "url": "https://asmhentai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "assistant.google.com",
    "url": "https://assistant.google.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "atariage.com",
    "url": "https://atariage.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "atopgames.com",
    "url": "https://atopgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "attractmode.org",
    "url": "https://attractmode.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audacious-media-player.org",
    "url": "https://audacious-media-player.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audioalter.com",
    "url": "https://audioalter.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audioaz.com",
    "url": "https://audioaz.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiobookbay.lu",
    "url": "https://audiobookbay.lu/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiobookcovers.com",
    "url": "https://audiobookcovers.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiobooks4soul.com",
    "url": "https://audiobooks4soul.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiobooksbee.com",
    "url": "https://audiobooksbee.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiobookshelf.org",
    "url": "https://audiobookshelf.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiobooktreasure.com",
    "url": "https://audiobooktreasure.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiomack.com",
    "url": "https://audiomack.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiomarx.mixa.site",
    "url": "https://audiomarx.mixa.site/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiomass.co",
    "url": "https://audiomass.co/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audionautix.com",
    "url": "https://audionautix.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiophile.fm",
    "url": "https://audiophile.fm/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiorelay.net",
    "url": "https://audiorelay.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiotag.info",
    "url": "https://audiotag.info/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiotools.in",
    "url": "https://audiotools.in/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiotoolset.com",
    "url": "https://audiotoolset.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audioz.download",
    "url": "https://audioz.download/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audius.co",
    "url": "https://audius.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "audiveris.github.io",
    "url": "https://audiveris.github.io/audiveris/_pages/handbook/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "augmentedsteam.com",
    "url": "https://augmentedsteam.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aurelius.ink",
    "url": "https://aurelius.ink",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "aurysystem.github.io",
    "url": "https://aurysystem.github.io/goldbox/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "authenticator.cc",
    "url": "https://authenticator.cc/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "authme.levminer.com",
    "url": "https://authme.levminer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "authors.library.caltech.edu",
    "url": "https://authors.library.caltech.edu/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "authorstash.com",
    "url": "https://authorstash.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "auto.creavite.co",
    "url": "https://auto.creavite.co/icons",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "avalonlibrary.net",
    "url": "https://avalonlibrary.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "avark.agency",
    "url": "https://avark.agency/typeterms/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "avoidthehack.com",
    "url": "https://avoidthehack.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "awbw.amarriner.com",
    "url": "https://awbw.amarriner.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "awesome.ipfs.tech",
    "url": "https://awesome.ipfs.tech/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "awesome-privacy.xyz",
    "url": "https://awesome-privacy.xyz/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "azmp3.cc",
    "url": "https://azmp3.cc/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "b3log.org",
    "url": "https://b3log.org/siyuan/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "backlog.rip",
    "url": "https://backlog.rip/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "backuppc.github.io",
    "url": "https://backuppc.github.io/backuppc/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bakabt.me",
    "url": "https://bakabt.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "baked.live",
    "url": "https://baked.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bandcamp.com",
    "url": "https://bandcamp.com/discover/free-music",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bandcampmp3.org",
    "url": "https://bandcampmp3.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "base64.guru",
    "url": "https://base64.guru/tools/repair",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "basedbin.fly.dev",
    "url": "https://basedbin.fly.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "baserow.io",
    "url": "https://baserow.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "basicpitch.spotify.com",
    "url": "https://basicpitch.spotify.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "basketballreplays.net",
    "url": "https://basketballreplays.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "basketballstreams.net",
    "url": "https://basketballstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "basketball-video.com",
    "url": "https://basketball-video.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bassblog.pro",
    "url": "https://bassblog.pro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "batname.vercel.app",
    "url": "https://batname.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bato.to",
    "url": "https://bato.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "batocera.org",
    "url": "https://batocera.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bcdownloader.com",
    "url": "https://bcdownloader.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bdeditor.dev",
    "url": "https://bdeditor.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bearblog.dev",
    "url": "https://bearblog.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beatmachine.branchpanic.me",
    "url": "https://beatmachine.branchpanic.me/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beautifulwebtype.com",
    "url": "https://beautifulwebtype.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bedroomproducersblog.com",
    "url": "https://bedroomproducersblog.com/free-vst-plugins/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beech.watch",
    "url": "https://beech.watch/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beeftext.org",
    "url": "https://beeftext.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beepb00p.xyz",
    "url": "https://beepb00p.xyz/annotating.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beets.io",
    "url": "https://beets.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "befonts.com",
    "url": "https://befonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beforeiplay.com",
    "url": "https://beforeiplay.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beleave.virock.org",
    "url": "https://beleave.virock.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bemuse.ninja",
    "url": "https://bemuse.ninja/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "berty.tech",
    "url": "https://berty.tech/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bestfile.io",
    "url": "https://bestfile.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beta.4wall.ai",
    "url": "https://beta.4wall.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "beta.novelist.app",
    "url": "https://beta.novelist.app",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "betrayal.io",
    "url": "https://betrayal.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "better-default-discord.netlify.app",
    "url": "https://better-default-discord.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "betterdiscord.app",
    "url": "https://betterdiscord.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "betterdiscord.app",
    "url": "https://betterdiscord.app/themes",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "betterttv.com",
    "url": "https://betterttv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "better-xcloud.github.io",
    "url": "https://better-xcloud.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bgb.bircd.org",
    "url": "https://bgb.bircd.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bibisco.com",
    "url": "https://bibisco.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bibliotekapiosenki.pl",
    "url": "https://bibliotekapiosenki.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bigaudiobooks.com",
    "url": "https://bigaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bigpictures.xyz",
    "url": "https://bigpictures.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "binaural-audio.slite.page",
    "url": "https://binaural-audio.slite.page/p/i38zsD7728/Binaural-Audio",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bintv.fun",
    "url": "https://bintv.fun/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "biology.com.pk",
    "url": "https://biology.com.pk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "birdfont.org",
    "url": "https://birdfont.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "birds-are-nice.me",
    "url": "https://birds-are-nice.me/software/minuimus.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bitmidi.com",
    "url": "https://bitmidi.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bitwarden.com",
    "url": "https://bitwarden.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bizhawk.org",
    "url": "https://bizhawk.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "blackboxrepack.com",
    "url": "https://blackboxrepack.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "blacktorrent.ru",
    "url": "https://blacktorrent.ru/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "blank.page",
    "url": "https://blank.page/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "blip.net",
    "url": "https://blip.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "blokada.org",
    "url": "https://blokada.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bloob.io",
    "url": "https://bloob.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bloxd.io",
    "url": "https://bloxd.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bobdule999.wixsite.com",
    "url": "https://bobdule999.wixsite.com/bob-dule-factory-2",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "b-ok.asia",
    "url": "https://b-ok.asia/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "b-ok.cc",
    "url": "https://b-ok.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "b-ok.global",
    "url": "https://b-ok.global/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "boldtextgenerator.org",
    "url": "https://boldtextgenerator.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bolt.new",
    "url": "https://bolt.new/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "book4you.org",
    "url": "https://book4you.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookaudiobooks.com",
    "url": "https://bookaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookfi.net",
    "url": "https://bookfi.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookfinder.com",
    "url": "https://bookfinder.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookhype.com",
    "url": "https://bookhype.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookletlibrary.org",
    "url": "https://bookletlibrary.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookmarkeddit.com",
    "url": "https://bookmarkeddit.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookmarks.reviews",
    "url": "https://bookmarks.reviews/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookradio.vercel.app",
    "url": "https://bookradio.vercel.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "booksc.eu",
    "url": "https://booksc.eu/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "booksc.org",
    "url": "https://booksc.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "books-pdf.blogspot.com",
    "url": "https://books-pdf.blogspot.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "books-search.typesense.org",
    "url": "https://books-search.typesense.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookstash.io",
    "url": "https://bookstash.io/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bookzz.org",
    "url": "https://bookzz.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "boomy.com",
    "url": "https://boomy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bowfile.com",
    "url": "https://bowfile.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "boxing-100.com",
    "url": "https://boxing-100.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "boxingfight.cc",
    "url": "https://boxingfight.cc/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "boxingstreams100.com",
    "url": "https://boxingstreams100.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "boxradio.net",
    "url": "https://boxradio.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bpa.st",
    "url": "https://bpa.st/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "brave.com",
    "url": "https://brave.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "brave.com",
    "url": "https://brave.com/download/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "breachdirectory.org",
    "url": "https://breachdirectory.org",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "breezepdf.com",
    "url": "https://breezepdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "briano.dev",
    "url": "https://briano.dev/UWPHook/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "briarproject.org",
    "url": "https://briarproject.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "brill.com",
    "url": "https://brill.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "browsercraft.com",
    "url": "https://browsercraft.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "browserleaks.com",
    "url": "https://browserleaks.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "browserpad.org",
    "url": "https://browserpad.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bsky.app",
    "url": "https://bsky.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bt.etree.org",
    "url": "https://bt.etree.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bubbl.us",
    "url": "https://bubbl.us/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "buffstreams.app",
    "url": "https://buffstreams.app/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "build.nvidia.com",
    "url": "https://build.nvidia.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bungee.parabolaresearch.com",
    "url": "https://bungee.parabolaresearch.com/bungee-web-demo",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "butterchurnviz.com",
    "url": "https://butterchurnviz.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "butterfly.linwood.dev",
    "url": "https://butterfly.linwood.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "buzzheavier.com",
    "url": "https://buzzheavier.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "buzzin.live",
    "url": "https://buzzin.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bygosh.com",
    "url": "https://bygosh.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bythefireplace.com",
    "url": "https://bythefireplace.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "byuu.org",
    "url": "https://byuu.org/bsnes",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "byxatab.com",
    "url": "https://byxatab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "byzantinemilitary.blogspot.com",
    "url": "https://byzantinemilitary.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "bztsrc.gitlab.io",
    "url": "https://bztsrc.gitlab.io/usbimager/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "c64online.com",
    "url": "https://c64online.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cabernetwork.github.io",
    "url": "https://cabernetwork.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cah4e3.shedevr.org.ru",
    "url": "https://cah4e3.shedevr.org.ru/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "calameo.com",
    "url": "https://calameo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "calibre-ebook.com",
    "url": "https://calibre-ebook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "calligra.org",
    "url": "https://calligra.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "calyx.net",
    "url": "https://calyx.net/vpn",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "canna-power.to",
    "url": "https://canna-power.to",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cantorion.org",
    "url": "https://cantorion.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "capacities.io",
    "url": "https://capacities.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "captown.capcom.com",
    "url": "https://captown.capcom.com/en/retro_games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "card-forge.github.io",
    "url": "https://card-forge.github.io/forge/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cardinal.kx.studio",
    "url": "https://cardinal.kx.studio/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cardsmith.co",
    "url": "https://cardsmith.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "catalogue.smods.ru",
    "url": "https://catalogue.smods.ru",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "catalogue.smods.ru",
    "url": "https://catalogue.smods.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "catbox.moe",
    "url": "https://catbox.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "caveras.net",
    "url": "https://caveras.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ccmixter.org",
    "url": "https://ccmixter.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ccrma.stanford.edu",
    "url": "https://ccrma.stanford.edu/~tzfeng/webchuck-ide/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cdaudiobook.com",
    "url": "https://cdaudiobook.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "celt.ucc.ie",
    "url": "https://celt.ucc.ie/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cemu.cfw.guide",
    "url": "https://cemu.cfw.guide/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "censorbib.nymity.ch",
    "url": "https://censorbib.nymity.ch/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "censordex.fr.to",
    "url": "https://censordex.fr.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cfbstreams.net",
    "url": "https://cfbstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "challonge.com",
    "url": "https://challonge.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "champagne.pages.dev",
    "url": "https://champagne.pages.dev/docs/getting-started/gaming-emulation",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "character.ai",
    "url": "https://character.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "charm.li",
    "url": "https://charm.li/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "charts.spotify.com",
    "url": "https://charts.spotify.com/home",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.deepseek.com",
    "url": "https://chat.deepseek.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.gradient.network",
    "url": "https://chat.gradient.network/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.minimax.io",
    "url": "https://chat.minimax.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.mistral.ai",
    "url": "https://chat.mistral.ai",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.publicai.co",
    "url": "https://chat.publicai.co/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.qwen.ai",
    "url": "https://chat.qwen.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.together.ai",
    "url": "https://chat.together.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chat.z.ai",
    "url": "https://chat.z.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chatbotui.com",
    "url": "https://chatbotui.com",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chatgpt.com",
    "url": "https://chatgpt.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chatgptevo.com",
    "url": "https://chatgptevo.com/widescreen/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chatguessr.com",
    "url": "https://chatguessr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chatreplay.stream",
    "url": "https://chatreplay.stream/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chatterino.com",
    "url": "https://chatterino.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chauthanh.info",
    "url": "https://chauthanh.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cheatermad.com",
    "url": "https://cheatermad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cheatsquad.gg",
    "url": "https://cheatsquad.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chemistry.com.pk",
    "url": "https://chemistry.com.pk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chiaki.site",
    "url": "https://chiaki.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "childrenslibrary.org",
    "url": "https://childrenslibrary.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chillhop.com",
    "url": "https://chillhop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chiptune.app",
    "url": "https://chiptune.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "choptop84.github.io",
    "url": "https://choptop84.github.io/abyssbox-app/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chordly.co.uk",
    "url": "https://chordly.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chowdsp.com",
    "url": "https://chowdsp.com/products.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chpic.su",
    "url": "https://chpic.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chroma.zone",
    "url": "https://chroma.zone/chromafiler/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chrome.google.com",
    "url": "https://chrome.google.com/webstore/detail/hover-zoom%2B/pccckmaobkjjboncdfnnofkonhgpceea",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chrome.google.com",
    "url": "https://chrome.google.com/webstore/detail/save-all-resources/abpdnfjocnmdomablahdcfnoggeeiedb",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/charcoal-dark-mode-for-me/aaekanoannlhnajolbijaoflfhikcgng",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/esuit-photos-downloader-f/adighedbfmnpjcjlloooichmbjdefane",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/find-on-reddit/jbcdpeekakanklckgooknpbonojhjncm",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/gpgbiinpmelaihndlegbgfkmnpofgfei",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/kill-fbclid/jlmdkcaiejonohbmkgickmkgbpceokmn",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/shazam-find-song-names-fr/mmioliijnhnoblpgimnlajmefafdfilb",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chromewebstore.google.com",
    "url": "https://chromewebstore.google.com/detail/social-tools/llbdoljkknpjgfcnbnoiehjcgancpjmd",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chroniclingamerica.loc.gov",
    "url": "https://chroniclingamerica.loc.gov/newspapers/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chub.ai",
    "url": "https://chub.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "chunisama.github.io",
    "url": "https://chunisama.github.io/Identifying-Music-Genres/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cinemaos.live",
    "url": "https://cinemaos.live/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cirrusretro.com",
    "url": "https://cirrusretro.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "citizen-dj.labs.loc.gov",
    "url": "https://citizen-dj.labs.loc.gov/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "citizenfreak.com",
    "url": "https://citizenfreak.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "citra-emu.org",
    "url": "https://citra-emu.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "citrus-search.com",
    "url": "https://citrus-search.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "civitai.com",
    "url": "https://civitai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cjdgrevival.com",
    "url": "https://cjdgrevival.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cksub.org",
    "url": "https://cksub.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "claraiscute.github.io",
    "url": "https://claraiscute.github.io/Guides/jdownloader2-guide/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "classic.minecraft.net",
    "url": "https://classic.minecraft.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "classicalmusiconly.com",
    "url": "https://classicalmusiconly.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "classic-literature.co.uk",
    "url": "https://classic-literature.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "classicreload.com",
    "url": "https://classicreload.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "classics.nascar.com",
    "url": "https://classics.nascar.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "claude.ai",
    "url": "https://claude.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cleanbrowsing.org",
    "url": "https://cleanbrowsing.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "clickclean.online",
    "url": "https://clickclean.online/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "clicknupload.click",
    "url": "https://clicknupload.click",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "click-relax.com",
    "url": "https://click-relax.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cline.bot",
    "url": "https://cline.bot/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "clip.fish",
    "url": "https://clip.fish/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "clonehero.net",
    "url": "https://clonehero.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "clonezilla.org",
    "url": "https://clonezilla.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cmacked.com",
    "url": "https://cmacked.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cnvmp3.com",
    "url": "https://cnvmp3.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cobalt.tools",
    "url": "https://cobalt.tools/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "codeberg.org",
    "url": "https://codeberg.org/AllPurposeMat/Disblock-Origin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "codeberg.org",
    "url": "https://codeberg.org/proxigram/proxigram",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "codeofaninja.com",
    "url": "https://codeofaninja.com/tools/find-instagram-user-id/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coderadio.freecodecamp.org",
    "url": "https://coderadio.freecodecamp.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coderprog.com",
    "url": "https://coderprog.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "codeshare.io",
    "url": "https://codeshare.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coggle.it",
    "url": "https://coggle.it/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "colab.research.google.com",
    "url": "https://colab.research.google.com/github/biplobsd/OneClickRun/blob/master/OneClickRun.ipynb",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "colab.research.google.com",
    "url": "https://colab.research.google.com/github/NaJeongMo/Colaboratory-Notebook-for-Ultimate-Vocal-Remover/blob/main/Vocal%20Remover%205_arch.ipynb",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "collectionchamber.blogspot.com",
    "url": "https://collectionchamber.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "columns.app",
    "url": "https://columns.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "combot.org",
    "url": "https://combot.org/top/telegram/groups",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "comick.io",
    "url": "https://comick.io/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "comic-walker.com",
    "url": "https://comic-walker.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "community.pcgamingwiki.com",
    "url": "https://community.pcgamingwiki.com/files/file/1754-widescreen-fixer-v34-r737/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "community-notes-leaderboard.com",
    "url": "https://community-notes-leaderboard.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "comparisontabl.es",
    "url": "https://comparisontabl.es/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "computer.tldraw.com",
    "url": "https://computer.tldraw.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "consensus.app",
    "url": "https://consensus.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "console.upstage.ai",
    "url": "https://console.upstage.ai/playground/chat",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "context.reverso.net",
    "url": "https://context.reverso.net/translation/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "continue.dev",
    "url": "https://continue.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "controld.com",
    "url": "https://controld.com/free-dns",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "convert2mp3.cc",
    "url": "https://convert2mp3.cc/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "convertcase.net",
    "url": "https://convertcase.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "convertio.co",
    "url": "https://convertio.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cookieplmonster.github.io",
    "url": "https://cookieplmonster.github.io/mods/index/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coolfont.org",
    "url": "https://coolfont.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coolsymbol.com",
    "url": "https://coolsymbol.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cooltext.com",
    "url": "https://cooltext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "copilot.microsoft.com",
    "url": "https://copilot.microsoft.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "copychar.cc",
    "url": "https://copychar.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "core.ac.uk",
    "url": "https://core.ac.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coreradio.online",
    "url": "https://coreradio.online/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coreradio.online",
    "url": "https://coreradio.online/listen",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "countdown.tv",
    "url": "https://countdown.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coursefolder.org",
    "url": "https://coursefolder.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coursejoiner.com",
    "url": "https://coursejoiner.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coursesbag.com",
    "url": "https://coursesbag.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coursetime.net",
    "url": "https://coursetime.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "covers.musichoarders.xyz",
    "url": "https://covers.musichoarders.xyz",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coverview.vercel.app",
    "url": "https://coverview.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coveryourtracks.eff.org",
    "url": "https://coveryourtracks.eff.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "coweggs.itch.io",
    "url": "https://coweggs.itch.io/slope-plus",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cpgrepacks.site",
    "url": "https://cpgrepacks.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crackedgamez.com",
    "url": "https://crackedgamez.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cracksteamunlock.com",
    "url": "https://cracksteamunlock.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crackstreams.blog",
    "url": "https://crackstreams.blog/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crackstreams.io",
    "url": "https://crackstreams.io/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crackwatch.com",
    "url": "https://crackwatch.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "craig.chat",
    "url": "https://craig.chat/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crichd.at",
    "url": "https://crichd.at/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crichd.com.co",
    "url": "https://crichd.com.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crichd.to",
    "url": "https://crichd.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cricketstreams.me",
    "url": "https://cricketstreams.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crickfree.org",
    "url": "https://crickfree.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crimsonfansubs.com",
    "url": "https://crimsonfansubs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "crocdb.net",
    "url": "https://crocdb.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cryptgeon.org",
    "url": "https://cryptgeon.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cryptii.com",
    "url": "https://cryptii.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cryptomator.org",
    "url": "https://cryptomator.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cryptostorm.is",
    "url": "https://cryptostorm.is/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cryptpad.fr",
    "url": "https://cryptpad.fr/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=10&t=111520",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=10&t=95461",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=14&t=138413&p=3000090",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=20&t=134707&hilit=unsteam",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=29&t=103709",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=29&t=105551",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cs.rin.ru",
    "url": "https://cs.rin.ru/forum/viewtopic.php?f=29&t=131328",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "csdb.dk",
    "url": "https://csdb.dk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse/publicurl?cx=011394183039475424659:5bfyqg89ers",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:cbjowp5sdqg",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:cwbbza56vhd",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:ibmyuhh72io",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:ohobg3wvr_w",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:pobnsujblyx",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:s9ddesylrm8",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006516753008110874046:v75cyb4ci55",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=006976128084956795641:ad1xj14zfap",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=20c2a3e5f702049aa",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=32d85b41e2feacd3f",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=744926a50bd7eb010",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=82154ebab193e493d",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cse.google.com",
    "url": "https://cse.google.com/cse?cx=f47f68e49301a07ac",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cubari.moe",
    "url": "https://cubari.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cubiktv.com",
    "url": "https://cubiktv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cubox.cc",
    "url": "https://cubox.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cuckoo.cert.ee",
    "url": "https://cuckoo.cert.ee/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cultofthepartyparrot.com",
    "url": "https://cultofthepartyparrot.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cxbx-reloaded.co.uk",
    "url": "https://cxbx-reloaded.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cyber.kenharris.io",
    "url": "https://cyber.kenharris.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cyberduck.io",
    "url": "https://cyberduck.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cyberfile.me",
    "url": "https://cyberfile.me/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cybertype.app",
    "url": "https://cybertype.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cyclingstreams.com",
    "url": "https://cyclingstreams.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cylinders.library.ucsb.edu",
    "url": "https://cylinders.library.ucsb.edu/index.php",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cytoid.io",
    "url": "https://cytoid.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cytu.be",
    "url": "https://cytu.be/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dab.yeet.su",
    "url": "https://dab.yeet.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dabmusic.xyz",
    "url": "https://dabmusic.xyz/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "daddylive.sx",
    "url": "https://daddylive.sx/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "daddylivestream.com",
    "url": "https://daddylivestream.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "daddylivestream.com",
    "url": "https://daddylivestream.com/24-7-channels.php",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "daddyny.com",
    "url": "https://daddyny.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "daftpunk.cafe",
    "url": "https://daftpunk.cafe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dan.valeena.dev",
    "url": "https://dan.valeena.dev/guides/music-discovery/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dan.valeena.dev",
    "url": "https://dan.valeena.dev/guides/music-streaming/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dan.valeena.dev",
    "url": "https://dan.valeena.dev/guides/sport-calendars/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dan.valeena.dev",
    "url": "https://dan.valeena.dev/guides/sports-calendar",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dan-ball.jp",
    "url": "https://dan-ball.jp/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "danbooru.donmai.us",
    "url": "https://danbooru.donmai.us/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dance-music.org",
    "url": "https://dance-music.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dangerzone.rocks",
    "url": "https://dangerzone.rocks/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "darkreader.org",
    "url": "https://darkreader.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "darthsternie.net",
    "url": "https://darthsternie.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dartstreams.net",
    "url": "https://dartstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "datacatalog.worldbank.org",
    "url": "https://datacatalog.worldbank.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "datanodes.to",
    "url": "https://datanodes.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "datashare.icij.org",
    "url": "https://datashare.icij.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "datavaults.co",
    "url": "https://datavaults.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "datomatic.no-intro.org",
    "url": "https://datomatic.no-intro.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "datpiff.com",
    "url": "https://datpiff.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dats.site",
    "url": "https://dats.site/home.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "davidarroyo1234.github.io",
    "url": "https://davidarroyo1234.github.io/InstagramUnfollowers/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dbkpop.com",
    "url": "https://dbkpop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dd12streams.com",
    "url": "https://dd12streams.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ddinstagram.com",
    "url": "https://ddinstagram.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ddownload.com",
    "url": "https://ddownload.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ddpn08.github.io",
    "url": "https://ddpn08.github.io/Radiata/en/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deadbeef.sourceforge.io",
    "url": "https://deadbeef.sourceforge.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dearrow.ajay.app",
    "url": "https://dearrow.ajay.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deathbyai.gg",
    "url": "https://deathbyai.gg/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "decentraleyes.org",
    "url": "https://decentraleyes.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "decodeunicode.org",
    "url": "https://decodeunicode.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "decomps.samidy.com",
    "url": "https://decomps.samidy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deeeep.io",
    "url": "https://deeeep.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deepcut.live",
    "url": "https://deepcut.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deepnight.net",
    "url": "https://deepnight.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deezmate.com",
    "url": "https://deezmate.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "defensivecomputingchecklist.com",
    "url": "https://defensivecomputingchecklist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "delicious-fruit.com",
    "url": "https://delicious-fruit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deltaemulator.com",
    "url": "https://deltaemulator.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "delusionz.xyz",
    "url": "https://delusionz.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "demo.emulatorjs.org",
    "url": "https://demo.emulatorjs.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dencode.com",
    "url": "https://dencode.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "denigma.app",
    "url": "https://denigma.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "deremilitari.org",
    "url": "https://deremilitari.org/articles/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "descargargame.com",
    "url": "https://descargargame.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "descent.live",
    "url": "https://descent.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "desiupload.co",
    "url": "https://desiupload.co/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "desklamp.io",
    "url": "https://desklamp.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "desmume.org",
    "url": "https://desmume.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dessalines.github.io",
    "url": "https://dessalines.github.io/essays",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "desuarchive.org",
    "url": "https://desuarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "desu-online.pl",
    "url": "https://desu-online.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "detexify.kirelabs.org",
    "url": "https://detexify.kirelabs.org/classify.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "developer.valvesoftware.com",
    "url": "https://developer.valvesoftware.com/wiki/SteamCMD",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "developerstree.github.io",
    "url": "https://developerstree.github.io/permadelete/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "devilutionx.com",
    "url": "https://devilutionx.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "devv.ai",
    "url": "https://devv.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dht.chylex.com",
    "url": "https://dht.chylex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "diariumapp.com",
    "url": "https://diariumapp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "diasporafoundation.org",
    "url": "https://diasporafoundation.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dictation.io",
    "url": "https://dictation.io/speech",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "diffusionbee.com",
    "url": "https://diffusionbee.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digi.vatlib.it",
    "url": "https://digi.vatlib.it/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digilibraries.com",
    "url": "https://digilibraries.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digimezzo.github.io",
    "url": "https://digimezzo.github.io/site/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digipdf.app",
    "url": "https://digipdf.app/?lang=en_US",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digitalarchive.wilsoncenter.org",
    "url": "https://digitalarchive.wilsoncenter.org/collections",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digital-defense.io",
    "url": "https://digital-defense.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "digitaldreamdoor.com",
    "url": "https://digitaldreamdoor.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "diglib.library.vanderbilt.edu",
    "url": "https://diglib.library.vanderbilt.edu/ama-browse.pl",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dineshsolanki.github.io",
    "url": "https://dineshsolanki.github.io/FoliCon/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dinoswords.gg",
    "url": "https://dinoswords.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dir.xiph.org",
    "url": "https://dir.xiph.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "direct.gdrive.vip",
    "url": "https://direct.gdrive.vip/en/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "directory.shoutcast.com",
    "url": "https://directory.shoutcast.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "disboxapp.github.io",
    "url": "https://disboxapp.github.io/web/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discohook.app",
    "url": "https://discohook.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/2JDHx6kcXB",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/2r4pj67gCv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/7pcAbZzpXj",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/8796Fs9tZm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/lmarena",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/p3aJ7rJGrz",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/TTFE8Jfz7G",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/unstablediffusion",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/invite/wearechecking",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.com",
    "url": "https://discord.com/servers",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/5AMPdpckjH",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/APfesEBjjn",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/ASZjqrjWYf",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/BCtqVn5JKR",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/DFWCaTGyBT",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/dZWwhUy",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/fMU4hpDjPg",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/j9EfEm4AMW",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/kQUQkuwSaT",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/m6z3ra8ssh",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/manga",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/mSyFJz9",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/rhythia",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/streamed",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/xcdfVwgEx3",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/xe3Fys8Upy",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/YhQPSSMps2",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/zbxWcejadm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/ZKwTUbdbmc",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.gg",
    "url": "https://discord.gg/zZ6szdKQu6",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.id",
    "url": "https://discord.id/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.nfp.is",
    "url": "https://discord.nfp.is/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord.ripped.guide",
    "url": "https://discord.ripped.guide/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord-avatar-maker.app",
    "url": "https://discord-avatar-maker.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord-decorations.vercel.app",
    "url": "https://discord-decorations.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discord-linux.com",
    "url": "https://discord-linux.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discordpreviews.com",
    "url": "https://discordpreviews.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discords.com",
    "url": "https://discords.com/emoji-list",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discordtemplates.me",
    "url": "https://discordtemplates.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "discoverpoetry.com",
    "url": "https://discoverpoetry.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "disgradient.netlify.app",
    "url": "https://disgradient.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "disk.yandex.com",
    "url": "https://disk.yandex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "displaymagician.littlebitbig.com",
    "url": "https://displaymagician.littlebitbig.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "disroot.org",
    "url": "https://disroot.org/en/services/email",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "distro.tv",
    "url": "https://distro.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "diva.sfsu.edu",
    "url": "https://diva.sfsu.edu/collections/sfbatv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "djvu.sourceforge.net",
    "url": "https://djvu.sourceforge.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dl.acm.org",
    "url": "https://dl.acm.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dlhd.click",
    "url": "https://dlhd.click/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dlhd.sx",
    "url": "https://dlhd.sx/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dmde.com",
    "url": "https://dmde.com/download.html",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dngrep.github.io",
    "url": "https://dngrep.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dnmx.cc",
    "url": "https://dnmx.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dns.watch",
    "url": "https://dns.watch/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dnscrypt.info",
    "url": "https://dnscrypt.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doaj.org",
    "url": "https://doaj.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doc.lagout.org",
    "url": "https://doc.lagout.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docchi.pl",
    "url": "https://docchi.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docfetcher.sourceforge.io",
    "url": "https://docfetcher.sourceforge.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docling-project.github.io",
    "url": "https://docling-project.github.io/docling/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docmost.com",
    "url": "https://docmost.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.ayugram.one",
    "url": "https://docs.ayugram.one/downloads/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.clearurls.xyz",
    "url": "https://docs.clearurls.xyz",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.cwtch.im",
    "url": "https://docs.cwtch.im",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.fileverse.io",
    "url": "https://docs.fileverse.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.gitlab.com",
    "url": "https://docs.gitlab.com/user/snippets/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/document/d/1gdjNab-CtVS97jH2diPPP5tCrpBeof9-qPIRRB9-BrU/edit",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/document/d/1W0jhfqJI2ueJ2FNseR4YAFpNfsUM-_FlREHbpNGmC2o",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/document/d/1yBWlk-yEgpSoEh3c9oLhz_kbLtUGqbqzOpCtJsvQgjI/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/document/d/1ZwWs8JOrlkrrqiHwkQSwc4_NM85Zbzc9t9ifQ1rHZgM/mobilebasic",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/d/18GHPEBJzDbICmMStPVkNWA_hQHiWmLcqUdEJA1b4MJM/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/d/1Dy64rbMzx5xqTLPsbTKhpUKQS0mvjns2nIS9BWvOCTU/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/d/1irg60f9qsZOkhp0cwOU7Cy4rJQeyusEUzTNQzhoTYTU/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/d/1kdnHLt673EjoAJisOal2uIpcmVS2Defbgk1ntWRLY3E/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/d/1pUGVAARMBadmNqQW6cPKhSaT-uYDgQlRBnlQ9TMDXTI/edit#gid=730346323",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/d/e/2PACX-1vRkUFBfVVqv5Tr2aZS4apFNpTJ-ys6VqeQxgsAI1v7cH5putIgchYWJAVGHuu0lWGmdD2DU7Vb1o7XH/pubhtml",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.google.com",
    "url": "https://docs.google.com/spreadsheets/u/0/d/1QEvWoGa10BctJ1yqDgZl3IoY8bhB3AwbHzgCHjJ5neI/htmlview",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.iyear.me",
    "url": "https://docs.iyear.me/tdl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.joinpeertube.org",
    "url": "https://docs.joinpeertube.org/use/third-party-application",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.nefarius.at",
    "url": "https://docs.nefarius.at/projects/DsHidMini/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.nefarius.at",
    "url": "https://docs.nefarius.at/projects/HidHide/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.paperless-ngx.com",
    "url": "https://docs.paperless-ngx.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.searxng.org",
    "url": "https://docs.searxng.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.sillytavern.app",
    "url": "https://docs.sillytavern.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.titaniumnetwork.org",
    "url": "https://docs.titaniumnetwork.org/proxies/scramjet/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.wispy.qzz.io",
    "url": "https://docs.wispy.qzz.io/lg-tv-homebrew/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docs.wispy.qzz.io",
    "url": "https://docs.wispy.qzz.io/vpn-binding/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docspell.org",
    "url": "https://docspell.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "docupub.com",
    "url": "https://docupub.com/pdfconvert/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dodi-repacks.site",
    "url": "https://dodi-repacks.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doku.pub",
    "url": "https://doku.pub/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dollchan.net",
    "url": "https://dollchan.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dolphin-emu.org",
    "url": "https://dolphin-emu.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dolphin-emu.org",
    "url": "https://dolphin-emu.org/compat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dolphiniOS.oatmealdome.me",
    "url": "https://dolphiniOS.oatmealdome.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doodrive.com",
    "url": "https://doodrive.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dos.zczc.cz",
    "url": "https://dos.zczc.cz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dos.zone",
    "url": "https://dos.zone/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dosdeck.com",
    "url": "https://dosdeck.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dosgames.com",
    "url": "https://dosgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dotepub.com",
    "url": "https://dotepub.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doubledouble.top",
    "url": "https://doubledouble.top/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "doujinstyle.com",
    "url": "https://doujinstyle.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "downloadfreecourse.com",
    "url": "https://downloadfreecourse.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "downloadmusicschool.com",
    "url": "https://downloadmusicschool.com/bandcamp/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "downloads.khinsider.com",
    "url": "https://downloads.khinsider.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "downloadsound.cloud",
    "url": "https://downloadsound.cloud/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "downmagaz.net",
    "url": "https://downmagaz.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dp.la",
    "url": "https://dp.la/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dpaste.com",
    "url": "https://dpaste.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dpaste.org",
    "url": "https://dpaste.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dpdf.com",
    "url": "https://dpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dr.loudness-war.info",
    "url": "https://dr.loudness-war.info/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drakescans.com",
    "url": "https://drakescans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "draquet.github.io",
    "url": "https://draquet.github.io/PolyGlot/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "draw.audio",
    "url": "https://draw.audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drawbattle.io",
    "url": "https://drawbattle.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drawbeats.com",
    "url": "https://drawbeats.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dreamily.ai",
    "url": "https://dreamily.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dreamina.capcut.com",
    "url": "https://dreamina.capcut.com/ai-tool/home",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dreamsavior.net",
    "url": "https://dreamsavior.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drive.google.com",
    "url": "https://drive.google.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drivenlisten.com",
    "url": "https://drivenlisten.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "driverename.iblogbox.com",
    "url": "https://driverename.iblogbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "driveuploader.com",
    "url": "https://driveuploader.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drop.download",
    "url": "https://drop.download/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dropmb.com",
    "url": "https://dropmb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dropmefiles.com",
    "url": "https://dropmefiles.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drop-watch.ghost.io",
    "url": "https://drop-watch.ghost.io/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drumbit.app",
    "url": "https://drumbit.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "drummy.io",
    "url": "https://drummy.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ds.daidr.me",
    "url": "https://ds.daidr.me/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dsc.gg",
    "url": "https://dsc.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ds-fusion.github.io",
    "url": "https://ds-fusion.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "duck.ai",
    "url": "https://duck.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "duckduckgo.com",
    "url": "https://duckduckgo.com/app",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dumpor.io",
    "url": "https://dumpor.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "dupeguru.voltaicideas.net",
    "url": "https://dupeguru.voltaicideas.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "duplicateword.com",
    "url": "https://duplicateword.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "duplicity.gitlab.io",
    "url": "https://duplicity.gitlab.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eaglercraft.com",
    "url": "https://eaglercraft.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "earth.fm",
    "url": "https://earth.fm/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "easydiffusion.github.io",
    "url": "https://easydiffusion.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "easylist.to",
    "url": "https://easylist.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "easyupload.io",
    "url": "https://easyupload.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebook777.com",
    "url": "https://ebook777.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebookbb.in",
    "url": "https://ebookbb.in/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebook-hunter.org",
    "url": "https://ebook-hunter.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebooklobby.com",
    "url": "https://ebooklobby.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebook-mecca.com",
    "url": "https://ebook-mecca.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebookoz.net",
    "url": "https://ebookoz.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebookpdf.com",
    "url": "https://ebookpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebooks.i2p",
    "url": "https://ebooks.i2p/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebooksinfo.com",
    "url": "https://ebooksinfo.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebooks-it.org",
    "url": "https://ebooks-it.org",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ebooksyard.com",
    "url": "https://ebooksyard.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eclipseemu.me",
    "url": "https://eclipseemu.me/play/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "edit-document.com",
    "url": "https://edit-document.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "editor.audio",
    "url": "https://editor.audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "egdata.app",
    "url": "https://egdata.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "e-hentai.org",
    "url": "https://e-hentai.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ehmorris.com",
    "url": "https://ehmorris.com/lander/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "einsteinpapers.press.princeton.edu",
    "url": "https://einsteinpapers.press.princeton.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ekb.scinito.ai",
    "url": "https://ekb.scinito.ai/ai/chat",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "elamigos.site",
    "url": "https://elamigos.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "elenemigos.com",
    "url": "https://elenemigos.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "elevenlabs.io",
    "url": "https://elevenlabs.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "elicit.com",
    "url": "https://elicit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ellipsus.com",
    "url": "https://ellipsus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eltorr.com",
    "url": "https://eltorr.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emanates.deepjyoti30.dev",
    "url": "https://emanates.deepjyoti30.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "embed.discord.website",
    "url": "https://embed.discord.website/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "embedez.com",
    "url": "https://embedez.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "embeds.video",
    "url": "https://embeds.video/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emcosoftware.com",
    "url": "https://emcosoftware.com/unlock-it/download",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emn178.github.io",
    "url": "https://emn178.github.io/online-tools/index.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emojicombos.com",
    "url": "https://emojicombos.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emojidb.org",
    "url": "https://emojidb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emojipedia.org",
    "url": "https://emojipedia.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emojirequest.com",
    "url": "https://emojirequest.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emotes.io",
    "url": "https://emotes.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emudeck.com",
    "url": "https://emudeck.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/index.php/Computer_specs",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/index.php/Multi-system_emulators",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/index.php/Netplay",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/index.php/ROM_%26_ISO_Sites",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/index.php/ROM_%26_ISO_Sites#BitTorrent",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulation.gametechwiki.com",
    "url": "https://emulation.gametechwiki.com/index.php/ROM_managers",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emulationstation.org",
    "url": "https://emulationstation.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "emupedia.net",
    "url": "https://emupedia.net/beta/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.app",
    "url": "https://en.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.booksee.org",
    "url": "https://en.booksee.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.kiosko.net",
    "url": "https://en.kiosko.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.metal-tracker.com",
    "url": "https://en.metal-tracker.com/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.textdrom.com",
    "url": "https://en.textdrom.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.wikibooks.org",
    "url": "https://en.wikibooks.org/wiki/Downloading_Files_from_IRC/XDCC_Bot_Guide",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.wikipedia.org",
    "url": "https://en.wikipedia.org/wiki/Comparison_of_music_streaming_services",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.wikipedia.org",
    "url": "https://en.wikipedia.org/wiki/List_of_text_editors",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.wikipedia.org",
    "url": "https://en.wikipedia.org/wiki/Wikipedia:IRC/Tutorial",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.wikiquote.org",
    "url": "https://en.wikiquote.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en.wikisource.org",
    "url": "https://en.wikisource.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en12.sportplus.live",
    "url": "https://en12.sportplus.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "en2.freemp3.tube",
    "url": "https://en2.freemp3.tube/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "encode.su",
    "url": "https://encode.su/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "encoding-converter.netlify.app",
    "url": "https://encoding-converter.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "encryptedlist.xyz",
    "url": "https://encryptedlist.xyz/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "enfont.javierarce.com",
    "url": "https://enfont.javierarce.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "enhanced.townofsilenthill.com",
    "url": "https://enhanced.townofsilenthill.com/SH2/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ente.io",
    "url": "https://ente.io/auth/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "entropymine.com",
    "url": "https://entropymine.com/deark/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "epdf.pub",
    "url": "https://epdf.pub/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "epdf.tips",
    "url": "https://epdf.tips/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "epicroms.net",
    "url": "https://epicroms.net/roms/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "episodehive.com",
    "url": "https://episodehive.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "epsil.github.io",
    "url": "https://epsil.github.io/spotgen",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "epub-reader.online",
    "url": "https://epub-reader.online/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eqbench.com",
    "url": "https://eqbench.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eraser.heidi.ie",
    "url": "https://eraser.heidi.ie/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eric.ed.gov",
    "url": "https://eric.ed.gov/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "erickutcher.github.io",
    "url": "https://erickutcher.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ericrosenbaum.github.io",
    "url": "https://ericrosenbaum.github.io/MK-1/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ernie.baidu.com",
    "url": "https://ernie.baidu.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "errozero.co.uk",
    "url": "https://errozero.co.uk/acid-machine/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "es.isthereanydeal.com",
    "url": "https://es.isthereanydeal.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "es-de.org",
    "url": "https://es-de.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "esotericarchives.com",
    "url": "https://esotericarchives.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "esp32.nontonx.com",
    "url": "https://esp32.nontonx.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "e-sword.net",
    "url": "https://e-sword.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "etc.usf.edu",
    "url": "https://etc.usf.edu/lit2go/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ethercalc.net",
    "url": "https://ethercalc.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "etherpad.org",
    "url": "https://etherpad.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "etreedb.org",
    "url": "https://etreedb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "etternaonline.com",
    "url": "https://etternaonline.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "evalplus.github.io",
    "url": "https://evalplus.github.io/leaderboard.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "everynoise.com",
    "url": "https://everynoise.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "everything2.com",
    "url": "https://everything2.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "everythingmoe.com",
    "url": "https://everythingmoe.com/?section=game",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "evpo.net",
    "url": "https://evpo.net/encryptpad/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exaile.org",
    "url": "https://exaile.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exceljet.net",
    "url": "https://exceljet.net/formulas",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "excelmacromastery.com",
    "url": "https://excelmacromastery.com/vba-articles/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "excel-practice-online.com",
    "url": "https://excel-practice-online.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exhentai.org",
    "url": "https://exhentai.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "explore.openaire.eu",
    "url": "https://explore.openaire.eu/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "explorerplusplus.com",
    "url": "https://explorerplusplus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exportcomments.com",
    "url": "https://exportcomments.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exportify.app",
    "url": "https://exportify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exptv.org",
    "url": "https://exptv.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "exystence.net",
    "url": "https://exystence.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "eylenburg.github.io",
    "url": "https://eylenburg.github.io/cloud_comparison.htm",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ezconv.com",
    "url": "https://ezconv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ezhevika.blogspot.com",
    "url": "https://ezhevika.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ezmp3.cc",
    "url": "https://ezmp3.cc/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ezstems.com",
    "url": "https://ezstems.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "f1-dash.com",
    "url": "https://f1-dash.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "f1fullraces.com",
    "url": "https://f1fullraces.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "f1tv.formula1.com",
    "url": "https://f1tv.formula1.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "f95zone.to",
    "url": "https://f95zone.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "facebookcontainer.com",
    "url": "https://facebookcontainer.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fadr.com",
    "url": "https://fadr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fakeyou.com",
    "url": "https://fakeyou.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fakinthefunk.net",
    "url": "https://fakinthefunk.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "famistudio.org",
    "url": "https://famistudio.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fancy-text.net",
    "url": "https://fancy-text.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fancytextdecorator.com",
    "url": "https://fancytextdecorator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fanfox.net",
    "url": "https://fanfox.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fantasyanime.com",
    "url": "https://fantasyanime.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "farside.link",
    "url": "https://farside.link/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fast.com",
    "url": "https://fast.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fast3dtext.com",
    "url": "https://fast3dtext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fastdl.app",
    "url": "https://fastdl.app/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fastedit.frozenassassine.de",
    "url": "https://fastedit.frozenassassine.de/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fastest.eaglercraft.win",
    "url": "https://fastest.eaglercraft.win/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fastforward.team",
    "url": "https://fastforward.team/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fastwan.fastvideo.org",
    "url": "https://fastwan.fastvideo.org/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fb.zone",
    "url": "https://fb.zone/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fbalpha.github.io",
    "url": "https://fbalpha.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fcast.org",
    "url": "https://fcast.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fceux.com",
    "url": "https://fceux.com/web/home.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fcpic.nesbbs.com",
    "url": "https://fcpic.nesbbs.com/index_en.html",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fearlessrevolution.com",
    "url": "https://fearlessrevolution.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fed.brid.gy",
    "url": "https://fed.brid.gy/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fedi.tips",
    "url": "https://fedi.tips/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fedidb.org",
    "url": "https://fedidb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fedi-search.com",
    "url": "https://fedi-search.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fediverse.observer",
    "url": "https://fediverse.observer/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fediverse.party",
    "url": "https://fediverse.party/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fedra.publications.europa.eu",
    "url": "https://fedra.publications.europa.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "femurdesign.com",
    "url": "https://femurdesign.com/theremin/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fex.net",
    "url": "https://fex.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ffhacktics.com",
    "url": "https://ffhacktics.com/smf/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ffmpeg.org",
    "url": "https://ffmpeg.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fichub.net",
    "url": "https://fichub.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fiction.live",
    "url": "https://fiction.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fictionlab.ai",
    "url": "https://fictionlab.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "file.kiwi",
    "url": "https://file.kiwi/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "file.pizza",
    "url": "https://file.pizza/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filebin.net",
    "url": "https://filebin.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "file-converter.io",
    "url": "https://file-converter.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filecxx.com",
    "url": "https://filecxx.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fileditch.com",
    "url": "https://fileditch.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "file-examples.com",
    "url": "https://file-examples.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fileforums.com",
    "url": "https://fileforums.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filego.app",
    "url": "https://filego.app/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fileinfo.com",
    "url": "https://fileinfo.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filelu.com",
    "url": "https://filelu.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filemirage.com",
    "url": "https://filemirage.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filen.io",
    "url": "https://filen.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fileport.io",
    "url": "https://fileport.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fileq.net",
    "url": "https://fileq.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "files.community",
    "url": "https://files.community/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fileshredder.org",
    "url": "https://fileshredder.org/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filespayouts.com",
    "url": "https://filespayouts.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filetransfer.io",
    "url": "https://filetransfer.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filext.com",
    "url": "https://filext.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filezilla-project.org",
    "url": "https://filezilla-project.org/download.php?show_all=1",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filmex.to",
    "url": "https://filmex.to/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "filterlists.com",
    "url": "https://filterlists.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "findaudiobook.app",
    "url": "https://findaudiobook.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "findflac.com",
    "url": "https://findflac.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "findmusicbylyrics.com",
    "url": "https://findmusicbylyrics.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "firebog.net",
    "url": "https://firebog.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "firstpersontetris.com",
    "url": "https://firstpersontetris.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fish.audio",
    "url": "https://fish.audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fitgirl-repacks.site",
    "url": "https://fitgirl-repacks.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fivebooks.com",
    "url": "https://fivebooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flacattack.net",
    "url": "https://flacattack.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flamescans.org",
    "url": "https://flamescans.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flappybird.io",
    "url": "https://flappybird.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flasharch.com",
    "url": "https://flasharch.com/en",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flashmuseum.org",
    "url": "https://flashmuseum.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flashpointarchive.org",
    "url": "https://flashpointarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flaviocopes.com",
    "url": "https://flaviocopes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flibusta.is",
    "url": "https://flibusta.is/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flickermini.pages.dev",
    "url": "https://flickermini.pages.dev/radiostations",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flingtrainer.com",
    "url": "https://flingtrainer.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fliphtml5.com",
    "url": "https://fliphtml5.com/exploring",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flixer.su",
    "url": "https://flixer.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "floooh.github.io",
    "url": "https://floooh.github.io/tiny8bit/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flotes.app",
    "url": "https://flotes.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flowgpt.com",
    "url": "https://flowgpt.com",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fluentsearch.net",
    "url": "https://fluentsearch.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fluxyrepacks.xyz",
    "url": "https://fluxyrepacks.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "flvto.biz",
    "url": "https://flvto.biz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fmbot.xyz",
    "url": "https://fmbot.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fokus-website.netlify.app",
    "url": "https://fokus-website.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "followerwonk.com",
    "url": "https://followerwonk.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontba.se",
    "url": "https://fontba.se/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontdrop.info",
    "url": "https://fontdrop.info/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontesk.com",
    "url": "https://fontesk.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontface.ninja",
    "url": "https://fontface.ninja/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontforge.org",
    "url": "https://fontforge.org/en-US/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontgenerator.cc",
    "url": "https://fontgenerator.cc/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontgenerator.cool",
    "url": "https://fontgenerator.cool/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontinterceptor.mschfmag.com",
    "url": "https://fontinterceptor.mschfmag.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontjoy.com",
    "url": "https://fontjoy.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontlot.com",
    "url": "https://fontlot.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontmaker.io",
    "url": "https://fontmaker.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontmeme.com",
    "url": "https://fontmeme.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fonts.adobe.com",
    "url": "https://fonts.adobe.com/fonts/vs/upload",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fonts.bunny.net",
    "url": "https://fonts.bunny.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fonts.google.com",
    "url": "https://fonts.google.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fonts.ninja",
    "url": "https://fonts.ninja/tools",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fonts2u.com",
    "url": "https://fonts2u.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontsfree.net",
    "url": "https://fontsfree.net",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontshare.com",
    "url": "https://fontshare.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontshub.pro",
    "url": "https://fontshub.pro/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontsly.com",
    "url": "https://fontsly.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontsource.org",
    "url": "https://fontsource.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fontstruct.com",
    "url": "https://fontstruct.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "foony.com",
    "url": "https://foony.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "footballia.eu",
    "url": "https://footballia.eu/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "footballia.net",
    "url": "https://footballia.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "football-video.com",
    "url": "https://football-video.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "footreplays.com",
    "url": "https://footreplays.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "footybite.cc",
    "url": "https://footybite.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "footyfull.com",
    "url": "https://footyfull.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forcoder.net",
    "url": "https://forcoder.net/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forkread.com",
    "url": "https://forkread.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "formito.com",
    "url": "https://formito.com/tools/logo",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.mobilism.me",
    "url": "https://forum.mobilism.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.mobilism.org",
    "url": "https://forum.mobilism.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.mobilism.org",
    "url": "https://forum.mobilism.org/viewforum.php?f=123",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.mobilism.org",
    "url": "https://forum.mobilism.org/viewforum.php?f=124",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.redump.org",
    "url": "https://forum.redump.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forum.torrminatorr.com",
    "url": "https://forum.torrminatorr.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "forums.sonicretro.org",
    "url": "https://forums.sonicretro.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fr.wikisource.org",
    "url": "https://fr.wikisource.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fragments.e2b.dev",
    "url": "https://fragments.e2b.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "framacalc.org",
    "url": "https://framacalc.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fraps.com",
    "url": "https://fraps.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fredericbriolet.com",
    "url": "https://fredericbriolet.com/avg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freebandcampdownload.com",
    "url": "https://freebandcampdownload.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freebannedbooks.org",
    "url": "https://freebannedbooks.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freebookcentre.net",
    "url": "https://freebookcentre.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freecommander.com",
    "url": "https://freecommander.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freecomputerbooks.com",
    "url": "https://freecomputerbooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freecoursenet.com",
    "url": "https://freecoursenet.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freecoursesdownload.net",
    "url": "https://freecoursesdownload.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freecoursesite.com",
    "url": "https://freecoursesite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "free-ebook-download-links.blogspot.com",
    "url": "https://free-ebook-download-links.blogspot.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "free-ebooks-download.org",
    "url": "https://free-ebooks-download.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freeeducationweb.com",
    "url": "https://freeeducationweb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freefilesync.org",
    "url": "https://freefilesync.org/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freefontsdownload.net",
    "url": "https://freefontsdownload.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freefontsfamily.org",
    "url": "https://freefontsfamily.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freefullpdf.com",
    "url": "https://freefullpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freegames.org",
    "url": "https://freegames.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freegogpcgames.com",
    "url": "https://freegogpcgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freelistenonline.com",
    "url": "https://freelistenonline.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freemagazines.top",
    "url": "https://freemagazines.top/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freemagazinespdf.com",
    "url": "https://freemagazinespdf.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freemind.sourceforge.net",
    "url": "https://freemind.sourceforge.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freepass.ai",
    "url": "https://freepass.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freepcgamestorrents.com",
    "url": "https://freepcgamestorrents.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freepdfbook.com",
    "url": "https://freepdfbook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freeplrdownloads.com",
    "url": "https://freeplrdownloads.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freesocks.org",
    "url": "https://freesocks.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freesound.org",
    "url": "https://freesound.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freestreams-live.my",
    "url": "https://freestreams-live.my/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freestreams-live.su",
    "url": "https://freestreams-live.su",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freestuffbot.xyz",
    "url": "https://freestuffbot.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freetts.com",
    "url": "https://freetts.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freetubeapp.io",
    "url": "https://freetubeapp.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "freetvz.com",
    "url": "https://freetvz.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "friendi.ca",
    "url": "https://friendi.ca",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "friture.org",
    "url": "https://friture.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "frixysubs.pl",
    "url": "https://frixysubs.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "frogiesarca.de",
    "url": "https://frogiesarca.de/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fromsmash.com",
    "url": "https://fromsmash.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fsh.zone",
    "url": "https://fsh.zone/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fstv.online",
    "url": "https://fstv.online/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fstv.space",
    "url": "https://fstv.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fsymbols.com",
    "url": "https://fsymbols.com/generators/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fulleventos-deportes.blogspot.com",
    "url": "https://fulleventos-deportes.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fullfights.net",
    "url": "https://fullfights.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fullgamez.net",
    "url": "https://fullgamez.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fulllengthaudiobooks.net",
    "url": "https://fulllengthaudiobooks.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fullmatch.info",
    "url": "https://fullmatch.info/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fullmatchsports.cc",
    "url": "https://fullmatchsports.cc/?tab=fullmatch",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fullraces.com",
    "url": "https://fullraces.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fultonhistory.com",
    "url": "https://fultonhistory.com/Fulton.html",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "fumetsu.pl",
    "url": "https://fumetsu.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "funcube.space",
    "url": "https://funcube.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "funkwhale.audio",
    "url": "https://funkwhale.audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "g4u.to",
    "url": "https://g4u.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "galaxyaudiobook.com",
    "url": "https://galaxyaudiobook.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "galaxyofgames.neocities.org",
    "url": "https://galaxyofgames.neocities.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gam.onl",
    "url": "https://gam.onl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamdie.com",
    "url": "https://gamdie.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamebanana.com",
    "url": "https://gamebanana.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamebounty.world",
    "url": "https://gamebounty.world/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamecopyworld.com",
    "url": "https://gamecopyworld.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamefront.com",
    "url": "https://gamefront.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "game-game.com",
    "url": "https://game-game.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamejolt.com",
    "url": "https://gamejolt.com/games?price=free",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gameofbombs.com",
    "url": "https://gameofbombs.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gameost.net",
    "url": "https://gameost.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamepadla.com",
    "url": "https://gamepadla.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamepcfull.com",
    "url": "https://gamepcfull.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "games4theworld.org",
    "url": "https://games4theworld.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "games4u.org",
    "url": "https://games4u.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamesdrive.net",
    "url": "https://gamesdrive.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "game-siphon.vercel.app",
    "url": "https://game-siphon.vercel.app/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamesnostalgia.com",
    "url": "https://gamesnostalgia.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamespack.net",
    "url": "https://gamespack.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamesrepacks.com",
    "url": "https://gamesrepacks.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamestatus.info",
    "url": "https://gamestatus.info/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamevau.lt",
    "url": "https://gamevau.lt/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gamezdl.cc",
    "url": "https://gamezdl.cc/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gandalf.lakera.ai",
    "url": "https://gandalf.lakera.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gangster.su",
    "url": "https://gangster.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gartic.io",
    "url": "https://gartic.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "garticphone.com",
    "url": "https://garticphone.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gazellegames.net",
    "url": "https://gazellegames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gb.hlorenzi.com",
    "url": "https://gb.hlorenzi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gb64.com",
    "url": "https://gb64.com/index.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gbatemp.net",
    "url": "https://gbatemp.net/threads/jnustool-nusgrabber-and-cdecrypt-combined.413179/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gchq.github.io",
    "url": "https://gchq.github.io/CyberChef/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gdurl.com",
    "url": "https://gdurl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gearbox.crunchprank.net",
    "url": "https://gearbox.crunchprank.net/twitch/filter.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gekri.com",
    "url": "https://gekri.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gelbooru.com",
    "url": "https://gelbooru.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gemini.google.com",
    "url": "https://gemini.google.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "generative.fm",
    "url": "https://generative.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "genius.com",
    "url": "https://genius.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getadblock.com",
    "url": "https://getadblock.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getaegis.app",
    "url": "https://getaegis.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getchirrapp.com",
    "url": "https://getchirrapp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getdaytrends.com",
    "url": "https://getdaytrends.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getfoxyproxy.org",
    "url": "https://getfoxyproxy.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getfreecourses.co",
    "url": "https://getfreecourses.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getfreegames.net",
    "url": "https://getfreegames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getfreemagazines.com",
    "url": "https://getfreemagazines.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getfreepdfs.com",
    "url": "https://getfreepdfs.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "geti2p.net",
    "url": "https://geti2p.net/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getleon.ai",
    "url": "https://getleon.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getmicropad.com",
    "url": "https://getmicropad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getmusicbee.com",
    "url": "https://getmusicbee.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getoutline.org",
    "url": "https://getoutline.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getpocket.com",
    "url": "https://getpocket.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getrockmusic.net",
    "url": "https://getrockmusic.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getsentinel.io",
    "url": "https://getsentinel.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getsession.org",
    "url": "https://getsession.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getsurge.io",
    "url": "https://getsurge.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getwacup.com",
    "url": "https://getwacup.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "getwhisky.app",
    "url": "https://getwhisky.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gg.deals",
    "url": "https://gg.deals/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ghostarchive.org",
    "url": "https://ghostarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ghostbin.co",
    "url": "https://ghostbin.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ghosttext.fregante.com",
    "url": "https://ghosttext.fregante.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gidd.io",
    "url": "https://gidd.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gigafile.nu",
    "url": "https://gigafile.nu/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gist.github.com",
    "url": "https://gist.github.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gist.github.com",
    "url": "https://gist.github.com/ave9858/a2153957afb053f7d0e7ffdd6c3dcb89",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/0auBSQ/OpenTaiko",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/0xeb/TheBigPromptLibrary",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/10ten-me/10ten-ja-reader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/1History/1History",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/2dust/v2rayN",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/4as/ChatGPT-DeMod",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/4gray/iptvnator",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/9001/copyparty/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aahnik/tgcf",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aandrew-me/tgpt",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aandrew-me/ytDownloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/acidicoala/Koalageddon/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/acidicoala/ScreamAPI",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/adam-p/markdown-here",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AdamSalma/Lurka",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AdBlocker-Ultimate/AdBlocker-Ultimate-for-Browsers",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AdguardTeam/AdguardBrowserExtension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AdguardTeam/AdGuardExtra",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AdguardTeam/AdguardFilters",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AdguardTeam/PopupBlocker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/adieyal/sd-dynamic-prompts",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aecreations/clippings",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aforensics/HiddenVM",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/agersant/polaris",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aghorler/WebRTC-Leak-Prevent",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AhmedKamal/awesome-Islam",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/airsonic-advanced/airsonic-advanced",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ajayyy/DeArrow",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/akhilrex/podgrab",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aleksey-saenko/MusicRecognizer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alexadam/save-as-ebook",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AlexanderPro/WindowTextExtractor",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alexballas/go2tv",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alexbol99/youtube-auto-hd",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alexmercerind/audire",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alfem/telegram-download-daemon/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/allstarschh/Firefox-Extension-BuiltWith",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alvr-org/ALVR",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/alyssaxuu/flowy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/amitbl/blocktube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anadius/cream-api",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anadius/steam-auto-crack",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anansi-project/marvin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Anarios/youtube-refined",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anchore/grype",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/andrew-ld/smart-tv-telegram",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Androz2091/instaddict",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AndyFul/ConfigureDefender",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Animeboynz/Anime-Web-Extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anime-skip/player",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/aniskip/aniskip-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anonymousException/renpy-translator",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/anthonyec/powerlet",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AntiMicroX/antimicroX",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/antonycourtney/tad",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/antosubash/AbemaTVChromeExtension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/apankrat/nullboard",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AprilSylph/Filtering-Plus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AprilSylph/Outbox-for-Tumblr",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AprilSylph/Palettes-for-Tumblr",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AprilSylph/XKit-Rewritten",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/arcusmaximus/YTSubConverter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ArdenButterfield/Maim",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/arkenfox/user.js",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/atom0s/Steamless",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/AUTOMATIC1111/stable-diffusion-webui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/axcore/tartube/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ayn2op/discordo",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ayoisaiah/f2",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ayoy/fontedit",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/babluboy/bookworm",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/badaix/snapcast",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/badmojr/1Hosts",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bailey27/cppcryptfs",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Baiyuetribe/paper2gui/blob/main/README_en.md",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/BaldissaraMatheus/Tasks.md",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bambanah/deemix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/basti564/Oculess",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/BayernMuller/vibra",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bcpierce00/unison",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/beeradmoore/dlss-swapper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bee-san/pyWhat",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Belphemur/CBZManager",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Benricheson101/anti-phishing-bot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/besuper/TwitchNoSub",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bijij/ViewImage",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/billmei/every-chatgpt-gui",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Bl4Cc4t/GoodTwitter2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/blackcandy-org/blackcandy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Blinue/Magpie",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/BlueAmulet/GreenLuma-2024-Manager",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bogachenko/fuckfuckadblock",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bol-van/zapret",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bonukai/MediaTracker",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bookdash/bookdash-android-app",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Bottles-Devs/Bottles",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Bowen7/regex-vis",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/BreezeWhite/oemer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/brian-girko/save-as-mhtml",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/BrisklyDev/brisk",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/brookhong/Surfingkeys",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/brunolemos/youtube-autolike",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/btpf/Alexandria",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/buckket/twtxt",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/bunnykek/Fetcher",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CanvasBlocker/CanvasBlocker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CarlosEsco/Neko",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CarrotRub/Fit-Launcher/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/caseychu/spotify-backup",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ccomeaux/BoardGameRadar",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/cebtenzzre/tumblr-utils",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/celenityy/Phoenix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/celzero/rethink-app",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/censortracker/censortracker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/character-map-uwp/Character-Map-UWP",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CharlotteCross1998/awesome-game-decompilations",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/cheahjs/free-llm-api-resources",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CherryHQ/cherry-studio",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/chidiwilliams/buzz",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Chris-Bitler/twitch-filtered-chat",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Cimbali/CleanLinks",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Ciphey/Ciphey",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/claustromaniac/httpz",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ClearlyClaire/old-twitter-layout",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ClearURLs/Addon",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/cliqz-oss/browser-core",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CloudflareHackers/GDriveWebAppPublic",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/cmcaine/tridactyl",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/cnovel/PodcastBulkDownloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/code-charity/youtube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Codectory/AutoActions",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/codemasterv/xbarchive",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Codeusa/Borderless-Gaming",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CodeXBotz/File-Sharing-Bot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Cog-Creators/Red-DiscordBot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/colinurbs/FramePack-Studio",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/comfyanonymous/ComfyUI",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Cookie-AutoDelete/Cookie-AutoDelete",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/crackededed/Xtra",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/crocodilestick/Calibre-Web-Automated",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/CroissantDuNord/discord-adblock",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/cvzi/Letterboxd-userscript",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dail8859/NotepadNext",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/danburzo/percollate",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/DandelionSprout/adfilt/blob/master/LegitimateURLShortener.txt",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dani-garcia/vaultwarden",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/daniiii5/Public-Guide",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/DannyBen/FlicFlac",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dariubs/GoBooks",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/darktohka/clean-flash-builds/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dderevjanik/github-vscode-icons",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/deadmau5v/Koalageddon2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Deep-ai-inc/ch.at",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Denellyne/PCXSense",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Depressurizer/Depressurizer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/DerekTurtleRoe/awesome-emulators",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/derrod/legendary",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dessant/buster",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dessant/copy-text-link",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dessant/search-by-image",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dessant/view-image",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dessant/web-archives",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/destroyerpro/Crunchyroll-Plus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Detanup01/gbe_fork",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Developer-Y/cs-video-courses",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dhrumilp15/haystackfs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/diamondburned/dissent",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/differentrain/Delapp",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Digitalone1/mpv-acestream",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dimdenGD/OldTweetDeck",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dimdenGD/OldTwitter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Discord-Client-Encyclopedia-Management/Discord3rdparties",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Discord-Custom-Covers/usrbg",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Discord-Datamining/Discord-Datamining",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/DJDoubleD/QobuzDownloaderX-MOD",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/djyt/cannonball",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dkaslovsky/thread-safe",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dmunozv04/iSponsorBlockTV",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dogbutcat/gclone",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/doma-itachi/Youtube-shorts-block",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/DomHeadroom/MassYoutubeUnsubscriber",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dooit-org/dooit",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/doublecmd/doublecmd",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/doukutsu-rs/doukutsu-rs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dpradov/keynote-nf",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dralletje/Bookmark-All-Tabs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Drewol/unnamed-sdvx-clone",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/drunohazarb/4chan-captcha-solver",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dsymbol/yt-dlp-gui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dualcolumn/dualcolumn-web-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dukhevych/rym-lastfm-stats",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dullage/flatnotes",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dyc3/steamguard-cli",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dylanpdx/BetterTwitFix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Dzierzan/OpenSA",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/dzirbel/kotify",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ebertti/awesome-telegram",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ebkr/r2modmanPlus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/EbookFoundation/free-programming-books",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/egbertbouman/youtube-comment-downloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/einaregilsson/Redirector",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/eiz/SynchronousAudioRouter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/elder-plinius/L1B3RT4S",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/elliotwaite/thumbnail-rating-bar-for-youtube",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/enzo1982/freac",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/eramdam/BetterTweetDeck",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ErrorFlynn/ytdlp-interface",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/escapewindow/Smart-HTTPS",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/esmBot/esmBot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/EvHaus/youtube-hide-watched",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Exaphis/mutube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Exefer/ns-emu-mod-downloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/exislow/tidal-dl-ng",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FailedShack/USBHelperInstaller/releases",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/faldez/tanoshi",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fangfufu/httpdirfs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fcapano/User-Agent-Switcher",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/features/copilot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fgl27/SmartTwitchTV",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fhanau/Efficient-Compression-Tool",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Fiddlekins/SpookyX",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/filebrowser/filebrowser/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FilipePS/Traduzir-paginas-web",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FiloSottile/age",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FiltersHeroes/PolishAnnoyanceFilters",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/finalburnneo/FBNeo",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fingerprint-suite/browser-fingerprinting",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FireCubeStudios/DarkSky",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fishttp/awesome-bluesky",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fiso64/slsk-batchdl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Five-Prayers/five-prayers-android",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FlareSolverr/FlareSolverr",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/floccusaddon/floccus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/flyinghead/flycast",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/flyingrub/scdl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fmhy/FMHY/wiki/FMHY%E2%80%90Notes.md#sport7",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fmhy/FMHYFilterlist",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FontManager/font-manager",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FooIbar/EhViewer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/foooomio/space-pirate",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Forkgram/tdesktop",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FoxxMD/multi-scrobbler",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FQrabbit/SSTap-Rule",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/freaktechnik/justwatch-buttons",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fredolx/open-tv",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/freeplane/freeplane",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Free-TV/IPTV",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/freshe/poddl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/FriendsOfGalaxy/galaxy-integration-steam",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/friuns2/BlackFriday-GPTs-Prompts",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/frou/yt2pod",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/fsantini/KoboCloud",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gabelluardo/anime-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/garungorp/MouseInjectorDolphinDuck",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gchq/CyberChef",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Generator/Awesome-Android-TV-FOSS-Apps",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Geomitron/Bridge",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ggerganov/llama.cpp",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/g-gundam/4chan-ghostpostmixer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/giantpinkrobots/varia",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gibbed/SteamAchievementManager",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gignac-cha/subtitle-for-netflix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gildas-lormeau/SingleFileZ",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gitmylo/audio-webui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/glomatico/gamdl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/glomatico/votify",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/glotlabs/gdrive",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gogetta69/TMDB-To-VOD-Playlist",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/google/magika",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/GoogleChrome/lighthouse",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gorhill/uBlock",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gorhill/uBlock-for-firefox-legacy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gorhill/uBO-Extra",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/gorhill/uMatrix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/go-shiori/shiori-web-ext",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/HACKER097/wisdom-tree/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hagezi/dns-blocklists",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/HamletDuFromage/4chan-mass-reply",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hanydd/BilibiliSponsorBlock",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hasanbeder/M3Unator",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/henrypp/simplewall",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/heyLu/numblr",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hiddify/tiarap",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hkalexling/Mango",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/honestbleeps/Reddit-Enhancement-Suite",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hoshsadiq/adblock-nocoin-list",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hstsethi/awesome-j2me",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hugo9655/awesome-spotify-stats",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hwding/pdf-unstamper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Hypfer/Free-TV",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Hyphenopoly/Hyphenopoly",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/hypothesis/browser-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iamadamdev/bypass-paywalls-chrome",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iamadamdev/extensions",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iamcryptoki/snowden-archive",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iampueroo/rComments",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/IAmStoxe/wirehole",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iBicha/playlet",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Ibit-to/google-unlocked",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/IBreakGames/PrimeHunterHack",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iheanyi/bandcamp-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/immersive-translate/immersive-translate",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ImprovedTube/ImprovedTube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/inbasic/bulk-media-downloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/insilmaril/vym",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ipcjs/bilibili-helper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/iptv-org/awesome-iptv",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/IridiumIO/CompactGUI",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Isayso/PlaylistEditorTV",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ishwi/Chuu",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/itsmartashub/GPThemes",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ItzCrazyKns/Perplexica",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ivandokov/phockup",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/j0be/PowerDeleteSuite",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/JamesCJ60/Universal-x86-Tuning-Utility",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jarredou/Music-Source-Separation-Training-Colab-Inference",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jarredou/MVSEP-MDX23-Colab_v2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jasonppy/VoiceCraft",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jbmagination/Tweaks-for-Twitter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jeb5/YouTube-Subscriptions-RSS",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jeffvli/feishin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jhiesey/pdfjs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jhspetersson/fselect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/JimmXinu/FanFicFare",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/joe-damore/yt-geotag-remover",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/joeycastillo/The-Open-Book",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/JohnFactotum/foliate",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/johnfactotum/foliate-js",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/jpd002/Play-",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/juanfont/headscale",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/JuanitoFatas/side-by-side",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Jugran/lyrics-in-terminal",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/julian-klode/dns66",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/justin025/onthespot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Justineo/github-hovercard",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/juzzlin/Heimer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/k4l3b/TraktRoller",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/k4zmu2a/SpaceCadetPinball",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KaladinDMP/AGBrowser",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KamalDGRT/TickTick-Extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kamranahmedse/githunt",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KartKrewDev/RingRacers",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kawaiiDango/pano-scrobbler",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Kekun/primehack",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/keraf/NoCoin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Kesomannen/gale/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kesselborn/offline-first",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Kethsar/ytarchive",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KevinParnell/OneeChan",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kieraneglin/pinchflat",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KieronQuinn/AmbientMusicMod",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Kiuryy/Bookmark_Sidebar",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kkapsner/CanvasBlocker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kodjodevf/mangayomi",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kodxana/OpenAudible",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Komet/MediaElch",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/komikku-app/komikku",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KraXen72/shira",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/krlvm/PowerTunnel",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KRTirtho/spotube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/KurtBestor/Hitomi-Downloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/kwaschny/unwanted-twitch",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/l0gicx/ai-model-bypass?tab=readme-ov-file#-chatgpt",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lawrencehook/youtube-autoclose-ads",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LelouchFR/better-crunchyroll",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/leovoel/BeautifulDiscord",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Leseratte10/acsm-calibre-plugin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/libredirect/libredirect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/libreom/predirect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LibreScore/dl-librescore",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LiCybora/NanoDefenderFirefox",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lightpohl/podcast-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lindylex/Scroll_To_Top",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/linexjlin/GPTs",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/linuxmint/warpinator",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lllyasviel/Fooocus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lllyasviel/stable-diffusion-webui-forge",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LNReader/lnreader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LordOfMice/hidusbf",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LostRuins/koboldcpp",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LouisShark/chatgpt_system_prompt",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lucaseverini/Firefox-History-Merger",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/luciopaiva/witchcraft",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lulzsun/RePlays",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lumaslim/Spacewar",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/LunarPSD/NvidiaOverclocking/blob/main/Nvidia%20Overclocking.md",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lusakasa/saka-key",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/lydell/LinkHints",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/M2Team/NanaZip",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/magic-wormhole/magic-wormhole",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/magnetikonline/docker-acestream-server",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/maharmstone/btrfs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mahdi-y/Spotify2YoutubeMusic",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mahseema/awesome-ai-tools",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MajkiIT/polish-ads-filter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/makaroni4/focused_youtube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MALSync/MALSync",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/maltfield/awesome-lemmy-instances",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MarcoLucidi01/ytcast",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Martchus/tageditor",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/martijnvanbrummelen/nwipe",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/masonicGIT/pacman",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/matthuisman/gdrivedl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/m-bain/whisperX",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mbnuqw/sidebery",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mchangrh/sb.js",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mdn/webextension-examples",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mdn/webextensions-examples",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mdn/webextensions-examples/tree/master/emoji-substitution",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mdn/webextensions-examples/tree/master/quicknote",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/meeb/tubesync",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mendel5/alternative-front-ends",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/menukaonline/goindex-extended",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mezotv/discord-badges",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MFEK/glif",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mhogomchungu/media-downloader/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MHSanaei/3x-ui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/michealespinola/reddit.wikidownloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/michelpereira/awesome-open-source-games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/microsoft/cascadia-code",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/microsoft/PowerToys",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mikeyaworski/Twitch-Chat-Emotes",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mikf/gallery-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mmvanheusden/SteamDepotDownloaderGUI",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MobileFirstLLC/social-media-hacker-list",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MochiDiffusion/MochiDiffusion",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/modmail-dev/modmail",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ModOrganizer2/modorganizer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/MoonWalker440/Music-Megathread/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/morkt/GARbro/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Mottie/GitHub-userscripts",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mozilla/contain-facebook",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mozilla/notes",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mozilla/side-view",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mozilla/voice-web",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Mozilla-Ocho/llamafile",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mps-youtube/yewtube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mrcoles/full-page-screen-capture-chrome-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/M-Reimer/no-google-analytics",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mrpond/BlockTheSpot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mrusse/Slsk-Upload-Stats-Tracker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/multi-swe-bench/multi-swe-bench",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/musically-ut/lovely-forks",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Music-and-Culture-Technology-Lab/omnizart",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/mxpv/podsync",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Mygod/VPNHotspot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/n4ze3m/page-assist",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/nabilanavab/ilovepdf",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/namazso/OpenHashTab",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/namidaco/namida",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/nathom/streamrip",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/NBlood/NBlood",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ncmpcpp/ncmpcpp",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/neonbjb/tortoise-tts",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Nerixyz/ttv-tools",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/netease-youdao/EmotiVoice",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/NickvisionApps/Parabolic",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/NicolaeNMV/BehindTheOverlay",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/nikrolls/uBlock-Edge",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/nilaoda/N_m3u8DL-RE",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/NineWorlds/serenity-android",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/nocodb/nocodb",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/noDRM/DeDRM_tools",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/noembryo/KoHighlights",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/NopeCHA/NopeCHA",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/nopperl/load-reddit-images-directly",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/noriah/catnip",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Nukem9/dlssg-to-fsr3",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/oae/kaizoku",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ocrmypdf/OCRmyPDF",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OctoLinker/OctoLinker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OhMyGuus/I-Still-Dont-Care-About-Cookies",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/oliver-moran/mind-map",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/oobabooga/text-generation-webui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/o-oconnell/mp4grep",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/openai/whisper",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OpenInterpreter/open-interpreter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OpenListTeam/OpenList",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/opennox/opennox",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OpenSignLabs/OpenSign",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/openstyles/stylus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/openstyles/stylus/wiki/Usercss",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/optiscaler/OptiScaler",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OrfiTeam/OrpheusDL",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/OsciiArt/DeepAA",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ossu/computer-science",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Overimagine1/pepe-server-archive",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ovity/octotree",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/owncloud/bookmarks",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/pablouser1/ProxiTok",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Paliverse/DualSenseX",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/papis/papis",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/papra-hq/papra",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ParisNeo/lollms-webui",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ParniDEO/alternative-front-ends-unofficial",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/PartialVolume/shredos.x86_64",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ParticleCore/Iridium",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/patientx/ComfyUI-Zluda",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Pauan/tab-organizer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/pdfarranger/pdfarranger",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/peek-dev/peek",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/peterhanania/discord-package",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/peterpt/IPTV-CHECK",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/philc/vimium",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/PhilipK/BoilR",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/pietervanheijningen/clickbait-remover-for-youtube",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/piroor/treestyletab",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Pitu/Kitsu-Enhancer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/pixeltris/TwitchAdSolutions",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/plateaukao/einkbro",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/PleaseDontKillMe/Sessionic",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/pmqs/Fix-OneDrive-Zip",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/poochinski/libgen-calibre-store-plugin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Poolitzer/TwitchNoSub",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/PortableApps/Toucan",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/powturbo/TurboBench",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/p-ranav/saveddit",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/prathercc/discrub-ext",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/PredatH0r/ChanSort",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/punesemu/puNES",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/pwltr/twitch-previews",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/qarmin/czkawka",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/qarmin/szyszka",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/qdm12/gluetun",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/quodlibet/quodlibet/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/QwenLM/qwen-code",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/radek-sprta/awesome-game-remakes",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Radiicall/jellyfin-rpc",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Rafiuth/Soggfy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/rahiel/archiveror",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/raitonoberu/sptlrx",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ranisalt/netflix-1080p",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/RareDevs/Rare",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/reek/anti-adblock-killer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/reisxd/TizenBrew",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/reisxd/TizenTube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/reisxd/TizenTubeCobalt",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Revadike/epicgames-freebies-claimer",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/rikai/rikai-kun",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/rkwyu/scribd-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Robbendebiene/Copy-On-Select",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Robbendebiene/Gesturefy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Rob--W/crxviewer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/RockinChaos/Shiru",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Rosalie241/RMG/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/rramiachraf/dumb",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ruffle-rs/ruffle-android",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/rugk/offline-qr-code",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/RVC-Boss/GPT-SoVITS",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/RVC-Project/Retrieval-based-Voice-Conversion-WebUI",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/S0und/S0undTV",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SadeghHayeri/GreenTunnel",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Sak32009/GetDLCInfoFromSteamDB",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Sak32009/SteamAutoCracker",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/salarcode/SmartProxy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sandreas/tone",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/saucenaopls/Purple-adblock",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/saucettv/WorkerHelper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/saxamaphone69/ss21",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sblask-webextensions/webextension-skip-redirect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/schmaldeo/DS4Windows",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/schollz/croc",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/schomery/popup-blocker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sdushantha/ff-pdf/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sdushantha/kunst",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/seldszar/gumbo",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sentriz/gonic",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SerCeMan/fontogen",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/setvisible/ArrowDL/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sezanzeb/input-remapper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ShadowBlip/OpenGamepadUI",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sharkdp/fd",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/shiiion/dolphin/wiki/Performance-Guide",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/shivaprsd/doqment",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/shokoanime",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/shrimqy/Sefirah",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/simon987/sist2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SimonBrazell/privacy-redirect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Simounet/lilo-plus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sindresorhus/awesome-chatgpt",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sindresorhus/refined-github",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/slackhq/nebula",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/slowlydev/f1-dash",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/slskd/slskd",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Solidet-com/steam-currency-converter",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SourMesen/Mesen2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/soxoj/socid-extractor",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/spacebarchat/spacebarchat",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SpacingBat3/WebCord",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/spel987/PolyUploader?tab=readme-ov-file#-hosts",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/spicetify/cli",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/spocky/miproja1/releases",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SpotX-Official/SpotX",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/spyglass-search/spyglass",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sreechar/TweetDeck-Enhancer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Stability-AI/StableStudio",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SteamAutoCracks/Steam-API-Check-Bypass",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SteamDatabase/BrowserExtension",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SteamGridDB/steam-rom-manager",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SteamRE/DepotDownloader",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/stefankueng/grepWin",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/StefanLobbenmeier/youtube-dl-gui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/stefansundin/zip-download",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/StellarSand/privacy-settings",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/StevenBlack/hosts",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/stoically/contain-amazon",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/stoically/firefox-multi-account-containers",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/streamlink/streamlink",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/streamlink/streamlink-twitch-gui",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Stremio/stremio-manga",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/stsaz/phiola",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/StylishThemes/GitHub-Dark",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/subframe7536/Maple-font",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/SudhanPlayz/Discord-MusicBot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/sun-jiao/flut-renamer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/suno-ai/bark",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/super-netflix/super-netflix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Suwayomi/Suwayomi-Server",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Swordfish90/Lemuroid",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/syeopite/priviblur",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Synzvato/decentraleyes",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tanaikech/goodls",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/TCNOco/TcNo-Acc-Switcher",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/teeteeteeteetee/adobe-discord-rpc",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/th-ch/youtube-music",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/theJayTea/WritingTools",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/theothernt/AerialViews",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ThioJoe/YT-Spammer-Purge",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ThomasTavernier/Improve-Crunchyroll",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tlorien/Unfollow-Everyone-on-Instagram",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tlorien/Unlike-Everything-on-Facebook",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tnodir/fort",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tomboy-notes/tomboy-ng",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tom-james-watson/old-reddit-redirect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tonikelope/megabasterd",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tonsky/FiraCode",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Tormak9970/Steam-Art-Manager",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/TrackMeNot/trackmenot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/translate-tools/linguist",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tranxuanthang/lrcget",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/trapexit/mergerfs",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/travisbrown/memory.lol/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tridactyl/tridactyl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/TriliumNext/Trilium",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Trinovantes/MAL-Cover-CSS",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/trustedtomato/youtube-popout-player",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Tsuk1ko/bilibili-subtitle",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tsynik/LeanbackLauncher",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/tumpio/requestcontrol",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/TuxedoTako/4chan-xt",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/twitchAdSkip/twitchAdSkip",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/TwitchRecover/TwitchRecover",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/twitter/twemoji",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Tyrrrz/DiscordChatExporter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Tyrrrz/YoutubeDownloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/uBlockOrigin/uBlock-issues/wiki/Resources-Library",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/uBlockOrigin/uBOL-home",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ueokande/vim-vixen",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Unclickable/unclickable-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/UnderminersTeam/UndertaleModTool",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/UnigramDev/Unigram",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/unixfox/antiCaptchaResolver",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/uowuo/abaddon",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/uYouPlus/uYouPlus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ValdikSS/GoodbyeDPI/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/vasusen-code/SaveRestrictedContentBot",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Vencord/Vesktop",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Venomalia/UniversalDynamicInput",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/veteran29/steam-url-open-extension",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/vhf/free-programming-books",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/VikParuchuri/marker",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/vitiko98/qobuz-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/VitorVilela7/wide-snes",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/vpinball/vpinball",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/vsDizzy/SaveAsMHT",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Warwolfer/auto-creamapi-2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/watsonbox/exportify",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/webclipper/web-clipper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/webclipper/web-clipper-browser-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/webosbrew/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/web-scrobbler/web-scrobbler",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/whipper-team/whipper",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/whyvl/wireproxy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Windows200000/TwitchDropsMiner-updated",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Windscribe/browser-extension",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/WirelessAlien/BhagavadGitaApp",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/woefe/ytcc",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/WofWca/jumpcutter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/w-okada/voice-changer",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Woolverine94/biniou",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/WorldBrain/Memex",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/WorldBrain/storex-sync",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/wseagar/eight-dollars",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/WujekFoliarz/DualSenseY-v2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/WXRIW/Lyricify-App",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Xanashi/Icaros",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xbmc/xbmc",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xd4rker/MinerBlock",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xgi/castero",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xlenore/ps2-covers",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xlenore/psx-covers",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Xonshiz/comic-dl",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Xpl0itU/WiiUDownloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xtekky/gpt4free",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/xthexder/wide-github",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/XTLS/Xray-core",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/yairm210/Unciv",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/YARC-Official",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/YePpHa/YouTubeCenter/wiki",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/yokoffing/ChatGPT-Prompts",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/yoshisuga/MAME4iOS",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/younesaassila/ttv-lol-pro",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/yt-dlp/yt-dlp",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ytdl-patched/ytdl-patched",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/YTLitePlus/YTLitePlus",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/yuliskov/SmartTube",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/Yutaka-Sawada/MultiPar",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zacharee/MastodonRedirect",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zaps166/QMPlay2",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/ZDoom/Raze",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zedeus/nitter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zeltox/Google-Drive-PDF-Downloader",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zemoto/WhatAmIHearing",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zombieFox/nightTab",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github.com",
    "url": "https://github.com/zorua98741/PS3-Rich-Presence-for-Discord",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "github-emoji-picker.vercel.app",
    "url": "https://github-emoji-picker.vercel.app/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/An0/SimpleDiscordCrypt",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/deeplydrumming/DeemixFix",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/edouardklein/falsisign",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/flagtism/Extra-Flags-for-4chan",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/GoogleDriveIndex/Google-Drive-Index",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/magnolia1234/bypass-paywalls-firefox-clean",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/ParveenBhadooOfficial/tg-channel-cloner-workers",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/rpdev/opentodolist",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/SuperSaltyGamer/ame",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitlab.com",
    "url": "https://gitlab.com/then-try-this/samplebrain",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitmind.com",
    "url": "https://gitmind.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gitwit.dev",
    "url": "https://gitwit.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "givemebadge.alexflipnote.dev",
    "url": "https://givemebadge.alexflipnote.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "glitchtextgenerator.com",
    "url": "https://glitchtextgenerator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gload.to",
    "url": "https://gload.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "global.sitesafety.trendmicro.com",
    "url": "https://global.sitesafety.trendmicro.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "globetv.app",
    "url": "https://globetv.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "glorybeats.com",
    "url": "https://glorybeats.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "g-meh.com",
    "url": "https://g-meh.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gn-math.github.io",
    "url": "https://gn-math.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gnupg.org",
    "url": "https://gnupg.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "goalietrend.com",
    "url": "https://goalietrend.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "goalkicker.com",
    "url": "https://goalkicker.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gobble.bot",
    "url": "https://gobble.bot/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "goblin.tools",
    "url": "https://goblin.tools/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "goblin.tools",
    "url": "https://goblin.tools/Formalizer/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gofile.io",
    "url": "https://gofile.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gofstv.live",
    "url": "https://gofstv.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gog-games.to",
    "url": "https://gog-games.to/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gogunlocked.com",
    "url": "https://gogunlocked.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gojo.to",
    "url": "https://gojo.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "goldenaudiobook.com",
    "url": "https://goldenaudiobook.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "golfparty.io",
    "url": "https://golfparty.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "golfstreams.net",
    "url": "https://golfstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "google.com",
    "url": "https://google.com/aimode",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "googlesnakemods.com",
    "url": "https://googlesnakemods.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gopeed.com",
    "url": "https://gopeed.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gottcode.org",
    "url": "https://gottcode.org/focuswriter/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gpodder.github.io",
    "url": "https://gpodder.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gpop.io",
    "url": "https://gpop.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gpuopen.com",
    "url": "https://gpuopen.com/ocat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "graebor.itch.io",
    "url": "https://graebor.itch.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "graph.tips",
    "url": "https://graph.tips/beta/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gravesoft.dev",
    "url": "https://gravesoft.dev/office_c2r_links",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "grayjay.app",
    "url": "https://grayjay.app/desktop/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/18450-steam-bypass-age-confirmation-prompts",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/404535",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/435220",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/442089",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/443011",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/451259",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/453802",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/456055",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/456388-fmhy-safeguard",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/460086",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/468740",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/481134",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/485278",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/485772-fmhy-base64-auto-decoder",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/488855-fmhy-linksafe-guard",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/501249",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/506340",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "greasyfork.org",
    "url": "https://greasyfork.org/en/scripts/520194",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "grok.com",
    "url": "https://grok.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "groq.com",
    "url": "https://groq.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "gse-smart-iptv.com",
    "url": "https://gse-smart-iptv.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "guides.loc.gov",
    "url": "https://guides.loc.gov/foreign-newspapers/digital-resources",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hack64.net",
    "url": "https://hack64.net/tools/patcher.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hackernewsbooks.com",
    "url": "https://hackernewsbooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hacker-recommended-books.vercel.app",
    "url": "https://hacker-recommended-books.vercel.app/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hackmd.io",
    "url": "https://hackmd.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hailuoai.video",
    "url": "https://hailuoai.video/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hakuneko.download",
    "url": "https://hakuneko.download/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hal.science",
    "url": "https://hal.science/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "halome.nu",
    "url": "https://halome.nu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hamishlang.github.io",
    "url": "https://hamishlang.github.io/clickbath/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hammertime.cyou",
    "url": "https://hammertime.cyou/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "handballstreams.net",
    "url": "https://handballstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "handwrittner.com",
    "url": "https://handwrittner.com/?lang=en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hardcover.app",
    "url": "https://hardcover.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hardwaretester.com",
    "url": "https://hardwaretester.com/gamepad",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "harmonoid.com",
    "url": "https://harmonoid.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hasitleaked.com",
    "url": "https://hasitleaked.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hate5six.com",
    "url": "https://hate5six.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "haveibeenpwned.com",
    "url": "https://haveibeenpwned.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "haveibeenpwned.com",
    "url": "https://haveibeenpwned.com/Passwords",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "havenweb.org",
    "url": "https://havenweb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hayase.watch",
    "url": "https://hayase.watch/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hbpms.blogspot.com",
    "url": "https://hbpms.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hdaudiobooks.com",
    "url": "https://hdaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hdclump.com",
    "url": "https://hdclump.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "heartive.pages.dev",
    "url": "https://heartive.pages.dev/live/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hentai2read.com",
    "url": "https://hentai2read.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hentaiera.com",
    "url": "https://hentaiera.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hentaifox.com",
    "url": "https://hentaifox.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hentaihere.com",
    "url": "https://hentaihere.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hentainexus.com",
    "url": "https://hentainexus.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hentairead.com",
    "url": "https://hentairead.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "heroicgameslauncher.com",
    "url": "https://heroicgameslauncher.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hesgoal.tv",
    "url": "https://hesgoal.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hexload.com",
    "url": "https://hexload.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hexo.io",
    "url": "https://hexo.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hexrom.com",
    "url": "https://hexrom.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "heystacks.com",
    "url": "https://heystacks.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hh.gbdev.io",
    "url": "https://hh.gbdev.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hi10anime.com",
    "url": "https://hi10anime.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hianime.to",
    "url": "https://hianime.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hicartoon.to",
    "url": "https://hicartoon.to/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hiddenpalace.org",
    "url": "https://hiddenpalace.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hiddify.com",
    "url": "https://hiddify.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hitomi.la",
    "url": "https://hitomi.la/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hkchengrex.com",
    "url": "https://hkchengrex.com/MMAudio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hoaxy.osome.iu.edu",
    "url": "https://hoaxy.osome.iu.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hockeyweb.site",
    "url": "https://hockeyweb.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hollymoviehd.cc",
    "url": "https://hollymoviehd.cc/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "holybooks.com",
    "url": "https://holybooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "holyunblocker.org",
    "url": "https://holyunblocker.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "home.eapy.io",
    "url": "https://home.eapy.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hoofoot.com",
    "url": "https://hoofoot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hostrider.com",
    "url": "https://hostrider.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hostux.network",
    "url": "https://hostux.network/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hotaudiobooks.com",
    "url": "https://hotaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "howlongtobeat.com",
    "url": "https://howlongtobeat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "howlongtoread.com",
    "url": "https://howlongtoread.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hshop.erista.me",
    "url": "https://hshop.erista.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "html5.thebestarcadescript.com",
    "url": "https://html5.thebestarcadescript.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "html5games.com",
    "url": "https://html5games.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hueyy.github.io",
    "url": "https://hueyy.github.io/awesome-mastodon/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/hexgrad/Kokoro-82M",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/akhaliq/anycoder",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/allenai/WildBench",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/allenai/ZeroEval",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/AP123/IllusionDiffusion",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/bigcode/bigcode-models-leaderboard",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/black-forest-labs/FLUX.1-schnell",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/Eddycrack864/UVR5-UI",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/enzostvs/ai-jukebox",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/enzostvs/deepsite",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/facebook/MusicGen",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/hexgrad/Kokoro-TTS",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/hf-audio/open_asr_leaderboard",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/mteb/leaderboard",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/nvidia/parakeet-tdt-0.6b-v2",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/NyxKrage/LLM-Model-VRAM-Calculator",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/opencompass/open_vlm_leaderboard",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/Qwen/Qwen3-MT-Demo",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/rednote-hilab/dots-vlm1-demo",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/ResembleAI/Chatterbox",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huggingface.co",
    "url": "https://huggingface.co/spaces/skytnt/moe-tts",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "huhu.to",
    "url": "https://huhu.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hybrid-analysis.com",
    "url": "https://hybrid-analysis.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hydralauncher.gg",
    "url": "https://hydralauncher.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hypem.com",
    "url": "https://hypem.com/popular",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hyper.space",
    "url": "https://hyper.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hyperspace-wizard.itch.io",
    "url": "https://hyperspace-wizard.itch.io/spinner",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "hypetrigger.io",
    "url": "https://hypetrigger.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "i78s.org",
    "url": "https://i78s.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ibookpile.in",
    "url": "https://ibookpile.in/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ibroadcast.com",
    "url": "https://ibroadcast.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "icecreamapps.com",
    "url": "https://icecreamapps.com/Ebook-Reader/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "icedrive.net",
    "url": "https://icedrive.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ideas.repec.org",
    "url": "https://ideas.repec.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "idoc.pub",
    "url": "https://idoc.pub/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "idoc.tips",
    "url": "https://idoc.tips/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "id-ransomware.malwarehunterteam.com",
    "url": "https://id-ransomware.malwarehunterteam.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "idyll-lang.org",
    "url": "https://idyll-lang.org/editor",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ieeexplore.ieee.org",
    "url": "https://ieeexplore.ieee.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ifonts.xyz",
    "url": "https://ifonts.xyz/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "igwiki.lyci.de",
    "url": "https://igwiki.lyci.de/wiki/Data_recovery",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ihsoyct.github.io",
    "url": "https://ihsoyct.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "illuminate.google.com",
    "url": "https://illuminate.google.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ilovemusic.de",
    "url": "https://ilovemusic.de/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imageclipboard.com",
    "url": "https://imageclipboard.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imagepromptguru.net",
    "url": "https://imagepromptguru.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imagus.app",
    "url": "https://imagus.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imgcook.com",
    "url": "https://imgcook.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imginn.com",
    "url": "https://imginn.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imgsys.org",
    "url": "https://imgsys.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imhentai.xxx",
    "url": "https://imhentai.xxx/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imissmycafe.com",
    "url": "https://imissmycafe.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imisstheoffice.eu",
    "url": "https://imisstheoffice.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "immortalupdates.com",
    "url": "https://immortalupdates.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "improvedtube.com",
    "url": "https://improvedtube.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "imslp.org",
    "url": "https://imslp.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "incompetech.com",
    "url": "https://incompetech.com/graphpaper/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "index.fansubcar.tel",
    "url": "https://index.fansubcar.tel/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "infinite-story.com",
    "url": "https://infinite-story.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "instaloader.github.io",
    "url": "https://instaloader.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "instances.social",
    "url": "https://instances.social/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "instant.audio",
    "url": "https://instant.audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "instaparty.gg",
    "url": "https://instaparty.gg/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "int10h.org",
    "url": "https://int10h.org/oldschool-pc-fonts/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "intellectual.insprill.net",
    "url": "https://intellectual.insprill.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "intelx.io",
    "url": "https://intelx.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "internet-radio.com",
    "url": "https://internet-radio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "intmusic.net",
    "url": "https://intmusic.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "invidious.io",
    "url": "https://invidious.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "invoke-ai.github.io",
    "url": "https://invoke-ai.github.io/InvokeAI/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "io808.com",
    "url": "https://io808.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iogames.party",
    "url": "https://iogames.party/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iogames.space",
    "url": "https://iogames.space/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ioquake3.org",
    "url": "https://ioquake3.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ios.codevn.net",
    "url": "https://ios.codevn.net/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iosvizor.com",
    "url": "https://iosvizor.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ipleak.net",
    "url": "https://ipleak.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptv.community",
    "url": "https://iptv.community/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptvcat.com",
    "url": "https://iptvcat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptvgratuit.com",
    "url": "https://iptvgratuit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptvnator.vercel.app",
    "url": "https://iptvnator.vercel.app",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptv-org.github.io",
    "url": "https://iptv-org.github.io",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptvplayer.stream",
    "url": "https://iptvplayer.stream/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "iptv-web.app",
    "url": "https://iptv-web.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "isbndb.com",
    "url": "https://isbndb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "isfdb.org",
    "url": "https://isfdb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ish.junioralive.in",
    "url": "https://ish.junioralive.in/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "isle.pizza",
    "url": "https://isle.pizza/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "issuu.com",
    "url": "https://issuu.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "isthereanydeal.com",
    "url": "https://isthereanydeal.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itch.io",
    "url": "https://itch.io/games/free/platform-web",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itdmusic.in",
    "url": "https://itdmusic.in/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "it-ebooks.info",
    "url": "https://it-ebooks.info/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itizso.itch.io",
    "url": "https://itizso.itch.io/retrofab",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itopmusicx.com",
    "url": "https://itopmusicx.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itsbetterwithai.com",
    "url": "https://itsbetterwithai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itsfoss.com",
    "url": "https://itsfoss.com/calibre-remove-drm-kindle/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "itty.bitty.site",
    "url": "https://itty.bitty.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ivigo.cc",
    "url": "https://ivigo.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ja.wikisource.org",
    "url": "https://ja.wikisource.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jackboxutility.com",
    "url": "https://jackboxutility.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jakevdp.github.io",
    "url": "https://jakevdp.github.io/PythonDataScienceHandbook/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jakubmelka.github.io",
    "url": "https://jakubmelka.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jami.net",
    "url": "https://jami.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jan.ai",
    "url": "https://jan.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "janereader.com",
    "url": "https://janereader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jango.com",
    "url": "https://jango.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "janitorai.com",
    "url": "https://janitorai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "japanesepccompendium.blogspot.com",
    "url": "https://japanesepccompendium.blogspot.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "japanesetorrents.wordpress.com",
    "url": "https://japanesetorrents.wordpress.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jcw87.github.io",
    "url": "https://jcw87.github.io/c2-sans-fight/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jdmfsm.info",
    "url": "https://jdmfsm.info/Auto/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jdownloader.org",
    "url": "https://jdownloader.org/jdownloader2",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jellyfin.org",
    "url": "https://jellyfin.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jellymar.io",
    "url": "https://jellymar.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jeromedockes.github.io",
    "url": "https://jeromedockes.github.io/labelbuddy/labelbuddy/current/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jetblackcode.com",
    "url": "https://jetblackcode.com/TumblrOriginalPostFinder",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jetsetradio.live",
    "url": "https://jetsetradio.live/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jezzamon.itch.io",
    "url": "https://jezzamon.itch.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jnovels.com",
    "url": "https://jnovels.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joedangerthegame.com",
    "url": "https://joedangerthegame.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "johncena141.eu.org",
    "url": "https://johncena141.eu.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joinbookwyrm.com",
    "url": "https://joinbookwyrm.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "join-lemmy.org",
    "url": "https://join-lemmy.org/apps",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joinmastodon.org",
    "url": "https://joinmastodon.org/apps",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joinpeertube.org",
    "url": "https://joinpeertube.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joinpeertube.org",
    "url": "https://joinpeertube.org/browse-content",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joinpeertube.org",
    "url": "https://joinpeertube.org/instances",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joplinapp.org",
    "url": "https://joplinapp.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "journaltxt.github.io",
    "url": "https://journaltxt.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "joytokey.net",
    "url": "https://joytokey.net/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jp.itch.io",
    "url": "https://jp.itch.io/playscii",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jrnl.sh",
    "url": "https://jrnl.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "js13kgames.com",
    "url": "https://js13kgames.com/entries",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jsbooks.revolunet.com",
    "url": "https://jsbooks.revolunet.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jshelter.org",
    "url": "https://jshelter.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jsmsj.github.io",
    "url": "https://jsmsj.github.io/GdriveCloneBot/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jsonview.com",
    "url": "https://jsonview.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jstris.jezevec10.com",
    "url": "https://jstris.jezevec10.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jtprince.com",
    "url": "https://jtprince.com/discord/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jummb.us",
    "url": "https://jummb.us/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jumo-dl.pages.dev",
    "url": "https://jumo-dl.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "jumpshare.com",
    "url": "https://jumpshare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "justbeamit.com",
    "url": "https://justbeamit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "justdeleteme.xyz",
    "url": "https://justdeleteme.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "justnotepad.com",
    "url": "https://justnotepad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "justsignpdf.com",
    "url": "https://justsignpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kaa.to",
    "url": "https://kaa.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kaaes.github.io",
    "url": "https://kaaes.github.io/albums-availability/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kadium.kasper.space",
    "url": "https://kadium.kasper.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kagane.org",
    "url": "https://kagane.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kaoskrew.org",
    "url": "https://kaoskrew.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "karanpc.com",
    "url": "https://karanpc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "katb.in",
    "url": "https://katb.in/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "katelyn.moe",
    "url": "https://katelyn.moe/bleh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kayoanime.com",
    "url": "https://kayoanime.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kcc.iosphe.re",
    "url": "https://kcc.iosphe.re/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kcnawatch.us",
    "url": "https://kcnawatch.us/korea-central-tv-livestream",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kdeconnect.kde.org",
    "url": "https://kdeconnect.kde.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kdramaost.com",
    "url": "https://kdramaost.com/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "keep.google.com",
    "url": "https://keep.google.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "keepass.info",
    "url": "https://keepass.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "keepassxc.org",
    "url": "https://keepassxc.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kemono.cr",
    "url": "https://kemono.cr/patreon/user/37343853",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kemono.su",
    "url": "https://kemono.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kentonishi.com",
    "url": "https://kentonishi.com/LiveTL/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kevin.games",
    "url": "https://kevin.games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "keybase.io",
    "url": "https://keybase.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "keygenmusic.tk",
    "url": "https://keygenmusic.tk/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kid3.kde.org",
    "url": "https://kid3.kde.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "killytoronto.github.io",
    "url": "https://killytoronto.github.io/textanalyzer/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kimcartoon.si",
    "url": "https://kimcartoon.si/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kindanice.itch.io",
    "url": "https://kindanice.itch.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kindle-epub-fix.netlify.app",
    "url": "https://kindle-epub-fix.netlify.app/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kinopio.club",
    "url": "https://kinopio.club/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kira.vercel.app",
    "url": "https://kira.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kirill-live.itch.io",
    "url": "https://kirill-live.itch.io/tuesday-js",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kissanime.com.ru",
    "url": "https://kissanime.com.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kisscartoon.nz",
    "url": "https://kisscartoon.nz/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kissmanga.dev",
    "url": "https://kissmanga.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kits4beats.com",
    "url": "https://kits4beats.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kitsu.io",
    "url": "https://kitsu.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kitsunekko.net",
    "url": "https://kitsunekko.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "klear.com",
    "url": "https://klear.com/free-tools/find-twitter-influencers",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kliktopia.org",
    "url": "https://kliktopia.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "klmanga.com",
    "url": "https://klmanga.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "knowfree.tradepub.com",
    "url": "https://knowfree.tradepub.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "koalabeast.com",
    "url": "https://koalabeast.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kodi.tv",
    "url": "https://kodi.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "koe.anime-sharing.com",
    "url": "https://koe.anime-sharing.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "koel.dev",
    "url": "https://koel.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "komga.org",
    "url": "https://komga.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kompad.vercel.app",
    "url": "https://kompad.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "konachan.com",
    "url": "https://konachan.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "konghack.com",
    "url": "https://konghack.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kool.tools",
    "url": "https://kool.tools/domino",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kopia.io",
    "url": "https://kopia.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "koreader.rocks",
    "url": "https://koreader.rocks/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kotatsu.app",
    "url": "https://kotatsu.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kpop.fandom.com",
    "url": "https://kpop.fandom.com/wiki/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kpopping.com",
    "url": "https://kpopping.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "krakenfiles.com",
    "url": "https://krakenfiles.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kuasark.com",
    "url": "https://kuasark.com/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kukuruzka165.github.io",
    "url": "https://kukuruzka165.github.io/materialgram/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kumu.io",
    "url": "https://kumu.io/Windscribe/vpn-relationships",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kupdf.net",
    "url": "https://kupdf.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kuribo64.net",
    "url": "https://kuribo64.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kurozora.app",
    "url": "https://kurozora.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kushview.net",
    "url": "https://kushview.net/element/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kworb.net",
    "url": "https://kworb.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "kyutai.org",
    "url": "https://kyutai.org/next/tts",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "labs.google",
    "url": "https://labs.google/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "labs.google",
    "url": "https://labs.google/fx/tools/image-fx",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "labs.google",
    "url": "https://labs.google/fx/tools/music-fx",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "laingame.net",
    "url": "https://laingame.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lainzine.org",
    "url": "https://lainzine.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lakka.tv",
    "url": "https://lakka.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "landrop.app",
    "url": "https://landrop.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "languagetool.org",
    "url": "https://languagetool.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lantern.io",
    "url": "https://lantern.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lastfm-iceberg.dawdle.space",
    "url": "https://lastfm-iceberg.dawdle.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lastfmstats.com",
    "url": "https://lastfmstats.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "latimes.newspapers.com",
    "url": "https://latimes.newspapers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "launchball.sciencemuseum.org.uk",
    "url": "https://launchball.sciencemuseum.org.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "launchpad.net",
    "url": "https://launchpad.net/qpdfview",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "layer13.net",
    "url": "https://layer13.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lazypy.ro",
    "url": "https://lazypy.ro/tts/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lazytetris.com",
    "url": "https://lazytetris.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "leaflet.pub",
    "url": "https://leaflet.pub/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "leaked.cx",
    "url": "https://leaked.cx/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "leak-lookup.com",
    "url": "https://leak-lookup.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "learn.microsoft.com",
    "url": "https://learn.microsoft.com/en-us/defender-endpoint/safety-scanner-download",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "learn.microsoft.com",
    "url": "https://learn.microsoft.com/en-us/sysinternals/downloads/sdelete",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "learn.microsoft.com",
    "url": "https://learn.microsoft.com/en-us/windows/powertoys/powerrename",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "learn.microsoft.com",
    "url": "https://learn.microsoft.com/en-us/windows/security/application-security/application-isolation/windows-sandbox/windows-sandbox-overview",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "learning.google.com",
    "url": "https://learning.google.com/experiments/learn-about",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "legcord.app",
    "url": "https://legcord.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lemmy.dbzer0.com",
    "url": "https://lemmy.dbzer0.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lemmyverse.net",
    "url": "https://lemmyverse.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "leomccormack.github.io",
    "url": "https://leomccormack.github.io/sparta-site/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "levelsharesquare.com",
    "url": "https://levelsharesquare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lhscan.net",
    "url": "https://lhscan.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libbyapp.com",
    "url": "https://libbyapp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "liber3.eth.limo",
    "url": "https://liber3.eth.limo/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "liberationschool.org",
    "url": "https://liberationschool.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libgen.gs",
    "url": "https://libgen.gs/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libgen.is",
    "url": "https://libgen.is/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libgen.li",
    "url": "https://libgen.li/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libgen.rs",
    "url": "https://libgen.rs/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libgen.st",
    "url": "https://libgen.st/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "library.gamehistory.org",
    "url": "https://library.gamehistory.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "library.land",
    "url": "https://library.land/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librarygenesis.net",
    "url": "https://librarygenesis.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libraryofcodexes.com",
    "url": "https://libraryofcodexes.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librechat.ai",
    "url": "https://librechat.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libredirect.github.io",
    "url": "https://libredirect.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libredns.gr",
    "url": "https://libredns.gr/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librefutbol.su",
    "url": "https://librefutbol.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libregamewiki.org",
    "url": "https://libregamewiki.org/List_of_games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "libretranslate.com",
    "url": "https://libretranslate.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librewolf.net",
    "url": "https://librewolf.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librisadepti.com",
    "url": "https://librisadepti.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librivox.org",
    "url": "https://librivox.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "librumreader.com",
    "url": "https://librumreader.com",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lifearchitect.ai",
    "url": "https://lifearchitect.ai/models-table/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lifeat.io",
    "url": "https://lifeat.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lightnovelpub.com",
    "url": "https://lightnovelpub.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ligurio.github.io",
    "url": "https://ligurio.github.io/awesome-ttygames/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lilyspeech.com",
    "url": "https://lilyspeech.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lingojam.com",
    "url": "https://lingojam.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "linktr.ee",
    "url": "https://linktr.ee/kpfire",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "linux-gaming.kwindu.eu",
    "url": "https://linux-gaming.kwindu.eu/index.php?title=Main_Page",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "listatv.pl",
    "url": "https://listatv.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "listen.moe",
    "url": "https://listen.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "listenbrainz.org",
    "url": "https://listenbrainz.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "liteapks.com",
    "url": "https://liteapks.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "literal.club",
    "url": "https://literal.club/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "litera-reader.com",
    "url": "https://litera-reader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "litgu.ru",
    "url": "https://litgu.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "littlealchemy.com",
    "url": "https://littlealchemy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "littlealchemy2.com",
    "url": "https://littlealchemy2.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "live.footybite.to",
    "url": "https://live.footybite.to/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "live.redditnhlstreams.com",
    "url": "https://live.redditnhlstreams.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "live365.com",
    "url": "https://live365.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livebootlegconcert.blogspot.com",
    "url": "https://livebootlegconcert.blogspot.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livecodebench.github.io",
    "url": "https://livecodebench.github.io/leaderboard.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livecounts.io",
    "url": "https://livecounts.io/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livematches.net",
    "url": "https://livematches.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "liveonlineradio.net",
    "url": "https://liveonlineradio.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livepush.io",
    "url": "https://livepush.io/hls-player/index.html",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livesplit.org",
    "url": "https://livesplit.org/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "liveswebench.ai",
    "url": "https://liveswebench.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livesx.eu",
    "url": "https://livesx.eu/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "livetv.sx",
    "url": "https://livetv.sx/enx/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ll4n.ru",
    "url": "https://ll4n.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "llamacoder.together.ai",
    "url": "https://llamacoder.together.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "llaun.ch",
    "url": "https://llaun.ch/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "llm.datasette.io",
    "url": "https://llm.datasette.io/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "llm-explorer.com",
    "url": "https://llm-explorer.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "llmresourceshub.vercel.app",
    "url": "https://llmresourceshub.vercel.app/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "llm-stats.com",
    "url": "https://llm-stats.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmanime.com",
    "url": "https://lmanime.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmao.love",
    "url": "https://lmao.love/channels/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmarena.ai",
    "url": "https://lmarena.ai/?mode=direct",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmarena.ai",
    "url": "https://lmarena.ai/?mode=direct&chat-modality=search",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmarena.ai",
    "url": "https://lmarena.ai/leaderboard",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmms.io",
    "url": "https://lmms.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lmstudio.ai",
    "url": "https://lmstudio.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "loadspot.pages.dev",
    "url": "https://loadspot.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lobechat.com",
    "url": "https://lobechat.com/chat",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "localsend.org",
    "url": "https://localsend.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "localtubemanager.pages.dev",
    "url": "https://localtubemanager.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lockhunter.com",
    "url": "https://lockhunter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "locomalito.com",
    "url": "https://locomalito.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lofi.limo",
    "url": "https://lofi.limo/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lofiandgames.com",
    "url": "https://lofiandgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "loficlub.vercel.app",
    "url": "https://loficlub.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lofigenerator.com",
    "url": "https://lofigenerator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "logoilibrary.com",
    "url": "https://logoilibrary.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "logs.musichoarders.xyz",
    "url": "https://logs.musichoarders.xyz/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "logseq.com",
    "url": "https://logseq.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "loilo.github.io",
    "url": "https://loilo.github.io/diffr/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lolmythesis.com",
    "url": "https://lolmythesis.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "loofi.netlify.app",
    "url": "https://loofi.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lookup-id.com",
    "url": "https://lookup-id.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "losslessalbums.club",
    "url": "https://losslessalbums.club/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lossless-flac.com",
    "url": "https://lossless-flac.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "losslessma.net",
    "url": "https://losslessma.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lossless-music.org",
    "url": "https://lossless-music.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lovo.ai",
    "url": "https://lovo.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lrclib.net",
    "url": "https://lrclib.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lrcmaker.com",
    "url": "https://lrcmaker.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lucida.to",
    "url": "https://lucida.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "luciferdonghua.in",
    "url": "https://luciferdonghua.in/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lukas-blecher.github.io",
    "url": "https://lukas-blecher.github.io/LaTeX-OCR/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lumalabs.ai",
    "url": "https://lumalabs.ai/genie",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lumalabs.ai",
    "url": "https://lumalabs.ai/interactive-scenes",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "luminescence-software.org",
    "url": "https://luminescence-software.org/en/metatogger/about/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "luminousscans.com",
    "url": "https://luminousscans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lunatask.app",
    "url": "https://lunatask.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lutris.net",
    "url": "https://lutris.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lvllvl.com",
    "url": "https://lvllvl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lykos.ai",
    "url": "https://lykos.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lyricstranslate.com",
    "url": "https://lyricstranslate.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lyrion.org",
    "url": "https://lyrion.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "lyzem.com",
    "url": "https://lyzem.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "m.vk.com",
    "url": "https://m.vk.com/topic-178186634_39300099?offset=0",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "m210.duke4.net",
    "url": "https://m210.duke4.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "m2v.ru",
    "url": "https://m2v.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "m3u4u.com",
    "url": "https://m3u4u.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "m3u-ip.tv",
    "url": "https://m3u-ip.tv/browser",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "m4ckd0ge-repacks.site",
    "url": "https://m4ckd0ge-repacks.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "macgames-download.com",
    "url": "https://macgames-download.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "maddymakesgamesinc.itch.io",
    "url": "https://maddymakesgamesinc.itch.io/celesteclassic",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "madebyjase.com",
    "url": "https://madebyjase.com/game-pauser/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "madelinemiller.dev",
    "url": "https://madelinemiller.dev/apps/emojify/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "magazinelib.com",
    "url": "https://magazinelib.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "magcius.github.io",
    "url": "https://magcius.github.io/xplain/article/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "magdownload.org",
    "url": "https://magdownload.org/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "magenta.tensorflow.org",
    "url": "https://magenta.tensorflow.org/lofi-player",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "magzter.com",
    "url": "https://magzter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mailvelope.com",
    "url": "https://mailvelope.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "makeayo.com",
    "url": "https://makeayo.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "makeitmeme.com",
    "url": "https://makeitmeme.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "maketext.io",
    "url": "https://maketext.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "maloja.krateng.ch",
    "url": "https://maloja.krateng.ch",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mamahd.org",
    "url": "https://mamahd.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mamedev.emulab.it",
    "url": "https://mamedev.emulab.it/clrmamepro/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mameworld.info",
    "url": "https://mameworld.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manalyzer.org",
    "url": "https://manalyzer.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manga1000.com",
    "url": "https://manga1000.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manga1001.top",
    "url": "https://manga1001.top/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangabaka.dev",
    "url": "https://mangabaka.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangabot.github.io",
    "url": "https://mangabot.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangabuddy.com",
    "url": "https://mangabuddy.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangaclash.com",
    "url": "https://mangaclash.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangacodex.com",
    "url": "https://mangacodex.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangadex.org",
    "url": "https://mangadex.org/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangafast.net",
    "url": "https://mangafast.net/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangafire.to",
    "url": "https://mangafire.to/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangafreak.net",
    "url": "https://mangafreak.net/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangago.me",
    "url": "https://mangago.me/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangahere.cc",
    "url": "https://mangahere.cc/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangahub.io",
    "url": "https://mangahub.io/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangainn.net",
    "url": "https://mangainn.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangajar.com",
    "url": "https://mangajar.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangakakalot.gg",
    "url": "https://mangakakalot.gg/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangakatana.com",
    "url": "https://mangakatana.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangaki.fr",
    "url": "https://mangaki.fr/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangaowl.net",
    "url": "https://mangaowl.net/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangapanda.onl",
    "url": "https://mangapanda.onl/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangapark.io",
    "url": "https://mangapark.io/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangapill.com",
    "url": "https://mangapill.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangaplus.shueisha.co.jp",
    "url": "https://mangaplus.shueisha.co.jp/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangapro.top",
    "url": "https://mangapro.top/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manga-raw.club",
    "url": "https://manga-raw.club/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangareader.to",
    "url": "https://mangareader.to/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangasee123.com",
    "url": "https://mangasee123.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mangatx.to",
    "url": "https://mangatx.to/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhuafast.com",
    "url": "https://manhuafast.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhuahot.com",
    "url": "https://manhuahot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhuaplus.com",
    "url": "https://manhuaplus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhuascan.io",
    "url": "https://manhuascan.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhuaus.com",
    "url": "https://manhuaus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhwa18.net",
    "url": "https://manhwa18.net/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhwaclan.com",
    "url": "https://manhwaclan.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manhwatop.com",
    "url": "https://manhwatop.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "maniacsvault.net",
    "url": "https://maniacsvault.net/ecwolf/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manned.org",
    "url": "https://manned.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "manybooks.net",
    "url": "https://manybooks.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mapofmetal.com",
    "url": "https://mapofmetal.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "marbleblast.vaniverse.io",
    "url": "https://marbleblast.vaniverse.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mariopartylegacy.com",
    "url": "https://mariopartylegacy.com/forum/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "markdownpastebin.com",
    "url": "https://markdownpastebin.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "marketplace.visualstudio.com",
    "url": "https://marketplace.visualstudio.com/items?itemName=icrawl.discord-vscode",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "markmap.js.org",
    "url": "https://markmap.js.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mars3d-game.wixsite.com",
    "url": "https://mars3d-game.wixsite.com/index",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "masonicshop.com",
    "url": "https://masonicshop.com/masonic-library/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "masquerade.site",
    "url": "https://masquerade.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "master.ayra.ch",
    "url": "https://master.ayra.ch/text2img/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mataroa.blog",
    "url": "https://mataroa.blog/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "matharena.ai",
    "url": "https://matharena.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "matrix.org",
    "url": "https://matrix.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mattermost.com",
    "url": "https://mattermost.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "matthewgall.codes",
    "url": "https://matthewgall.codes/mirrors/iptv",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mattw.io",
    "url": "https://mattw.io/youtube-metadata/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "maulvi.github.io",
    "url": "https://maulvi.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mazespin.live",
    "url": "https://mazespin.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mb.srb2.org",
    "url": "https://mb.srb2.org/threads/srb2kart.25868/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "md2mobi.lapw.at",
    "url": "https://md2mobi.lapw.at/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "md2pdf.netlify.app",
    "url": "https://md2pdf.netlify.app/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "measuringpolyphony.org",
    "url": "https://measuringpolyphony.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "medal.tv",
    "url": "https://medal.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mediaarea.net",
    "url": "https://mediaarea.net/en/MediaInfo",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mediahistoryproject.org",
    "url": "https://mediahistoryproject.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mediathekviewweb.de",
    "url": "https://mediathekviewweb.de/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "medicalstudyzone.com",
    "url": "https://medicalstudyzone.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mediux.pro",
    "url": "https://mediux.pro/albums",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mednafen.github.io",
    "url": "https://mednafen.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mega.io",
    "url": "https://mega.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mega.io",
    "url": "https://mega.io/cmd",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mega.io",
    "url": "https://mega.io/desktop",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mega.nz",
    "url": "https://mega.nz/folder/WdNAlY5Z#K6PmrQFyDm2k7BEV8KoAmg",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mega4upload.net",
    "url": "https://mega4upload.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "megadrive-emulator.com",
    "url": "https://megadrive-emulator.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "megagames.com",
    "url": "https://megagames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "megamanmaker.com",
    "url": "https://megamanmaker.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "megathread.pages.dev",
    "url": "https://megathread.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "megaup.net",
    "url": "https://megaup.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "melobytes.com",
    "url": "https://melobytes.com/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "melonds.kuribo64.net",
    "url": "https://melonds.kuribo64.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "metacpan.org",
    "url": "https://metacpan.org/pod/VK::MP3",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "metal.iplay.ro",
    "url": "https://metal.iplay.ro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "methstreams.cx",
    "url": "https://methstreams.cx/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "metroidconstruction.com",
    "url": "https://metroidconstruction.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mexicantrain.online",
    "url": "https://mexicantrain.online/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mfgg.net",
    "url": "https://mfgg.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mgba.io",
    "url": "https://mgba.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "miconv.com",
    "url": "https://miconv.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "microsoft.github.io",
    "url": "https://microsoft.github.io/generative-ai-for-beginners/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "midi-recorder.web.app",
    "url": "https://midi-recorder.web.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mihon.app",
    "url": "https://mihon.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "milkytracker.org",
    "url": "https://milkytracker.org/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mindexpandingbooks.com",
    "url": "https://mindexpandingbooks.com",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mindmapp.cedoor.dev",
    "url": "https://mindmapp.cedoor.dev/app",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "miniblox.io",
    "url": "https://miniblox.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mirlo.space",
    "url": "https://mirlo.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "miroppb.com",
    "url": "https://miroppb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "miru.js.org",
    "url": "https://miru.js.org/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mixdrop.ag",
    "url": "https://mixdrop.ag/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mixing.dj",
    "url": "https://mixing.dj/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mixloads.to",
    "url": "https://mixloads.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mixtapemonkey.com",
    "url": "https://mixtapemonkey.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mixupload.com",
    "url": "https://mixupload.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mixxx.org",
    "url": "https://mixxx.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mjl.clarivate.com",
    "url": "https://mjl.clarivate.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mkpc.malahieude.net",
    "url": "https://mkpc.malahieude.net/mariokart.php",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlb24all.ir",
    "url": "https://mlb24all.ir/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlb66.ir",
    "url": "https://mlb66.ir/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlbbite.com",
    "url": "https://mlbbite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlbgamepass.com",
    "url": "https://mlbgamepass.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlblive.net",
    "url": "https://mlblive.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlbshow.com",
    "url": "https://mlbshow.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mlbstreams.to",
    "url": "https://mlbstreams.to/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mmabite.ag",
    "url": "https://mmabite.ag/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mmastreams.cc",
    "url": "https://mmastreams.cc/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mmethstreams.net",
    "url": "https://mmethstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mobilism.org",
    "url": "https://mobilism.org/viewforum.php?f=398",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mocha-repository.info",
    "url": "https://mocha-repository.info/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mochi.cards",
    "url": "https://mochi.cards/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "modarchive.org",
    "url": "https://modarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moddb.com",
    "url": "https://moddb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "modded-1.com",
    "url": "https://modded-1.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moddinglinked.com",
    "url": "https://moddinglinked.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moddingway.com",
    "url": "https://moddingway.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "models.spriters-resource.com",
    "url": "https://models.spriters-resource.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "modernfontstacks.com",
    "url": "https://modernfontstacks.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "modheader.com",
    "url": "https://modheader.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "modworkshop.net",
    "url": "https://modworkshop.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "modyolo.com",
    "url": "https://modyolo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moises.ai",
    "url": "https://moises.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mojeek.com",
    "url": "https://mojeek.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "monitor.mozilla.org",
    "url": "https://monitor.mozilla.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "monitorss.xyz",
    "url": "https://monitorss.xyz/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "monkeytype.com",
    "url": "https://monkeytype.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "monoskop.org",
    "url": "https://monoskop.org/log/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moodist.app",
    "url": "https://moodist.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moomoo.io",
    "url": "https://moomoo.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moonlight-stream.org",
    "url": "https://moonlight-stream.org/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moosync.app",
    "url": "https://moosync.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mope.io",
    "url": "https://mope.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mopidy.com",
    "url": "https://mopidy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "morsecode.me",
    "url": "https://morsecode.me/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "morsecode.world",
    "url": "https://morsecode.world/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "moss.garden",
    "url": "https://moss.garden/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "motogpstream.me",
    "url": "https://motogpstream.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "motorsportstreams.com",
    "url": "https://motorsportstreams.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "motrix.app",
    "url": "https://motrix.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mp3db.pro",
    "url": "https://mp3db.pro/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mpv.io",
    "url": "https://mpv.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mrantifun.net",
    "url": "https://mrantifun.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "msasanmh.github.io",
    "url": "https://msasanmh.github.io/DNSveil/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mstream.io",
    "url": "https://mstream.io/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "msty.app",
    "url": "https://msty.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mubert.com",
    "url": "https://mubert.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "muffon.netlify.app",
    "url": "https://muffon.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mugen.karaokes.moe",
    "url": "https://mugen.karaokes.moe/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mullvad.net",
    "url": "https://mullvad.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mullvad.net",
    "url": "https://mullvad.net/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mullvad.net",
    "url": "https://mullvad.net/en/browser",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mullvad.net",
    "url": "https://mullvad.net/en/help/dns-over-https-and-dns-over-tls/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "multicommander.com",
    "url": "https://multicommander.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "multitwitch.tv",
    "url": "https://multitwitch.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "multiup.io",
    "url": "https://multiup.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "multporn.net",
    "url": "https://multporn.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mupdf.com",
    "url": "https://mupdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "murglar.app",
    "url": "https://murglar.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "muryou-aigazou.com",
    "url": "https://muryou-aigazou.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "museeks.io",
    "url": "https://museeks.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musescore.com",
    "url": "https://musescore.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musescore.org",
    "url": "https://musescore.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "music.cliggo.com",
    "url": "https://music.cliggo.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "music.ishkur.com",
    "url": "https://music.ishkur.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "music.youtube.com",
    "url": "https://music.youtube.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musical-artifacts.com",
    "url": "https://musical-artifacts.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicboard.app",
    "url": "https://musicboard.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicbrainz.org",
    "url": "https://musicbrainz.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicbucket.net",
    "url": "https://musicbucket.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicchartmaker.com",
    "url": "https://musicchartmaker.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicdex.org",
    "url": "https://musicdex.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicforprogramming.net",
    "url": "https://musicforprogramming.net/latest/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicmap.info",
    "url": "https://musicmap.info/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicorumapp.com",
    "url": "https://musicorumapp.com/generate",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicpresence.pocha.moe",
    "url": "https://musicpresence.pocha.moe/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "music-reader.com",
    "url": "https://music-reader.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicrider.org",
    "url": "https://musicrider.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musictaste.space",
    "url": "https://musictaste.space/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musicvid.org",
    "url": "https://musicvid.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musify.club",
    "url": "https://musify.club/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musikcube.com",
    "url": "https://musikcube.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "muslimscholars.info",
    "url": "https://muslimscholars.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musopen.org",
    "url": "https://musopen.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "musopen.org",
    "url": "https://musopen.org/music/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "muspy.com",
    "url": "https://muspy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mvsep.com",
    "url": "https://mvsep.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "myanime.live",
    "url": "https://myanime.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "myanimelist.net",
    "url": "https://myanimelist.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mynoise.net",
    "url": "https://mynoise.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mypitchfork.fun",
    "url": "https://mypitchfork.fun/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "myrunningman.com",
    "url": "https://myrunningman.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "mytuner-radio.com",
    "url": "https://mytuner-radio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nanasubs.com",
    "url": "https://nanasubs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nap.nationalacademies.org",
    "url": "https://nap.nationalacademies.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nascarstreams.net",
    "url": "https://nascarstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nationalarchives.gov.uk",
    "url": "https://nationalarchives.gov.uk/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "navidrome.org",
    "url": "https://navidrome.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nbabite.com",
    "url": "https://nbabite.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nbabox.tv",
    "url": "https://nbabox.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nbamonster.com",
    "url": "https://nbamonster.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nbastreams.to",
    "url": "https://nbastreams.to/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nba-streams.tv",
    "url": "https://nba-streams.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ncase.me",
    "url": "https://ncase.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "neal.fun",
    "url": "https://neal.fun/infinite-craft/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nelly.tools",
    "url": "https://nelly.tools/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nepu.to",
    "url": "https://nepu.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nepu.to",
    "url": "https://nepu.to/ebooks",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nerdyteachers.com",
    "url": "https://nerdyteachers.com/PICO-8/Games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "netbird.io",
    "url": "https://netbird.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "netgames.io",
    "url": "https://netgames.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "neurophysics.ucsd.edu",
    "url": "https://neurophysics.ucsd.edu/Manuals/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nevix.com",
    "url": "https://nevix.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "new.space",
    "url": "https://new.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "new10.gdtot.dad",
    "url": "https://new10.gdtot.dad",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newage.one",
    "url": "https://newage.one/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newalbumreleases.net",
    "url": "https://newalbumreleases.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newerteam.com",
    "url": "https://newerteam.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "news.google.com",
    "url": "https://news.google.com/newspapers",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newsit.benwinding.com",
    "url": "https://newsit.benwinding.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newspapermap.com",
    "url": "https://newspapermap.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newspapers.com",
    "url": "https://newspapers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "new-team.org",
    "url": "https://new-team.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "newvella.com",
    "url": "https://newvella.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nextdns.io",
    "url": "https://nextdns.io",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nfggames.com",
    "url": "https://nfggames.com/games/fontmaker/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nflbite.com",
    "url": "https://nflbite.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nflhunter.com",
    "url": "https://nflhunter.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nfl-replays.com",
    "url": "https://nfl-replays.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nflstreams.me",
    "url": "https://nflstreams.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nflstreams.to",
    "url": "https://nflstreams.to/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nfl-streams.tv",
    "url": "https://nfl-streams.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nfl-video.com",
    "url": "https://nfl-video.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nfodb.net.ru",
    "url": "https://nfodb.net.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nginxproxymanager.com",
    "url": "https://nginxproxymanager.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ngp.re",
    "url": "https://ngp.re/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhentai.net",
    "url": "https://nhentai.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhentai.to",
    "url": "https://nhentai.to/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhl24all.ir",
    "url": "https://nhl24all.ir/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhl66.ir",
    "url": "https://nhl66.ir/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhlbite.com",
    "url": "https://nhlbite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhlstreams.io",
    "url": "https://nhlstreams.io/v1/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nhlstreams.to",
    "url": "https://nhlstreams.to/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nibl.co.uk",
    "url": "https://nibl.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nicetranslator.com",
    "url": "https://nicetranslator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nicotine-plus.org",
    "url": "https://nicotine-plus.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nigelcoldwell.co.uk",
    "url": "https://nigelcoldwell.co.uk/audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nightride.fm",
    "url": "https://nightride.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nightscans.net",
    "url": "https://nightscans.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nilaoda.github.io",
    "url": "https://nilaoda.github.io/N_m3u8DL-CLI/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nimbletext.com",
    "url": "https://nimbletext.com/Live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ninemanga.com",
    "url": "https://ninemanga.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nitter.net",
    "url": "https://nitter.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nmac.to",
    "url": "https://nmac.to/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nodata.tv",
    "url": "https://nodata.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "noib.app",
    "url": "https://noib.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "no-intro.org",
    "url": "https://no-intro.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "noisecraft.app",
    "url": "https://noisecraft.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "noisyloop.com",
    "url": "https://noisyloop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nonnullish.github.io",
    "url": "https://nonnullish.github.io/share-liked-songs/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nonoki.com",
    "url": "https://nonoki.com/music/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nopaste.boris.sh",
    "url": "https://nopaste.boris.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nopaystation.com",
    "url": "https://nopaystation.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "noramusic.netlify.app",
    "url": "https://noramusic.netlify.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "noscript.net",
    "url": "https://noscript.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nostarch.com",
    "url": "https://nostarch.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "not.ultranx.ru",
    "url": "https://not.ultranx.ru/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notebooklm.google",
    "url": "https://notebooklm.google/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notepad.js.org",
    "url": "https://notepad.js.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notepad-online.com",
    "url": "https://notepad-online.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notepad-online.net",
    "url": "https://notepad-online.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notepad-plus-plus.org",
    "url": "https://notepad-plus-plus.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notepin.co",
    "url": "https://notepin.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "notesnook.com",
    "url": "https://notesnook.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "novel12.com",
    "url": "https://novel12.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "novelbuddy.com",
    "url": "https://novelbuddy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "novelwriter.io",
    "url": "https://novelwriter.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nqn.blue",
    "url": "https://nqn.blue/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ns2db.com",
    "url": "https://ns2db.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nsaneforums.com",
    "url": "https://nsaneforums.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nsarchive.gwu.edu",
    "url": "https://nsarchive.gwu.edu/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nsf.nesbbs.com",
    "url": "https://nsf.nesbbs.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nsmbhd.net",
    "url": "https://nsmbhd.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nswrom.com",
    "url": "https://nswrom.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ntc.party",
    "url": "https://ntc.party/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ntcore.com",
    "url": "https://ntcore.com/?page_id=371",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ntvstream.cx",
    "url": "https://ntvstream.cx/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nuclearplayer.com",
    "url": "https://nuclearplayer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nurpax.github.io",
    "url": "https://nurpax.github.io/petmate/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nxbrew.net",
    "url": "https://nxbrew.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "nyaa.si",
    "url": "https://nyaa.si/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oapen.org",
    "url": "https://oapen.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oatd.org",
    "url": "https://oatd.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "obscurifymusic.com",
    "url": "https://obscurifymusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "obsidian.md",
    "url": "https://obsidian.md/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "obsidian.md",
    "url": "https://obsidian.md/canvas",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oceanofpdf.com",
    "url": "https://oceanofpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ocremix.org",
    "url": "https://ocremix.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ocw.mit.edu",
    "url": "https://ocw.mit.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "official.nflstreams.to",
    "url": "https://official.nflstreams.to/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ogladajanime.pl",
    "url": "https://ogladajanime.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ojack.xyz",
    "url": "https://ojack.xyz/PIXELSYNTH/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oku.club",
    "url": "https://oku.club/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "okular.kde.org",
    "url": "https://okular.kde.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "old.reddit.com",
    "url": "https://old.reddit.com/r/footballhighlights/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oldgamesdownload.com",
    "url": "https://oldgamesdownload.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oldgameshelf.com",
    "url": "https://oldgameshelf.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oldtime.radio",
    "url": "https://oldtime.radio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oleksis.github.io",
    "url": "https://oleksis.github.io/youtube-dl-gui/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oll.libertyfund.org",
    "url": "https://oll.libertyfund.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ollama.com",
    "url": "https://ollama.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "olympicstreams.co",
    "url": "https://olympicstreams.co/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "omegascans.com",
    "url": "https://omegascans.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ondoku3.com",
    "url": "https://ondoku3.com/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "one.libretexts.org",
    "url": "https://one.libretexts.org/home",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "one.one.one.one",
    "url": "https://one.one.one.one/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "oneforalldownloader.com",
    "url": "https://oneforalldownloader.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ongaku.js.org",
    "url": "https://ongaku.js.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onionshare.org",
    "url": "https://onionshare.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "online.oldgames.sk",
    "url": "https://online.oldgames.sk/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "online2pdf.com",
    "url": "https://online2pdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinebooks.library.upenn.edu",
    "url": "https://onlinebooks.library.upenn.edu/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "online-courses.club",
    "url": "https://online-courses.club/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "online-fix.me",
    "url": "https://online-fix.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlineinterview.io",
    "url": "https://onlineinterview.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinenotep.ad",
    "url": "https://onlinenotep.ad",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinenotepad.org",
    "url": "https://onlinenotepad.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlineradiobox.com",
    "url": "https://onlineradiobox.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinesequencer.net",
    "url": "https://onlinesequencer.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinetextcompare.com",
    "url": "https://onlinetextcompare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinetexttools.com",
    "url": "https://onlinetexttools.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "onlinetools.com",
    "url": "https://onlinetools.com/ascii/convert-ascii-to-image",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ooooooooo.ooo",
    "url": "https://ooooooooo.ooo/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ootmm.com",
    "url": "https://ootmm.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "open.bccampus.ca",
    "url": "https://open.bccampus.ca/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "open.spotify.com",
    "url": "https://open.spotify.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "open.spotify.com",
    "url": "https://open.spotify.com/artist/1FSWXfsYsosTxjcV9WoLax",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "open.spotify.com",
    "url": "https://open.spotify.com/browse/podcasts",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "open.umn.edu",
    "url": "https://open.umn.edu/opentextbooks/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openasar.dev",
    "url": "https://openasar.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openaudio.webprofusion.com",
    "url": "https://openaudio.webprofusion.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openchapter.io",
    "url": "https://openchapter.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "opencritic.com",
    "url": "https://opencritic.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "opendyslexic.org",
    "url": "https://opendyslexic.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openemu.org",
    "url": "https://openemu.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openfortress.fun",
    "url": "https://openfortress.fun/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openings.moe",
    "url": "https://openings.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openknowledgemaps.org",
    "url": "https://openknowledgemaps.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openlibrary.org",
    "url": "https://openlibrary.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openlm.ai",
    "url": "https://openlm.ai/chatbot-arena/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openmaktaba.com",
    "url": "https://openmaktaba.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openmd.com",
    "url": "https://openmd.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openmedialibrary.com",
    "url": "https://openmedialibrary.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openmhz.com",
    "url": "https://openmhz.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openmpt.org",
    "url": "https://openmpt.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openmw.org",
    "url": "https://openmw.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openpaper.work",
    "url": "https://openpaper.work/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openpaymentsdata.cms.gov",
    "url": "https://openpaymentsdata.cms.gov/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openphish.com",
    "url": "https://openphish.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openpodcast.dev",
    "url": "https://openpodcast.dev",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openra.net",
    "url": "https://openra.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openrct2.io",
    "url": "https://openrct2.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openrouter.ai",
    "url": "https://openrouter.ai/rankings",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openscrobbler.com",
    "url": "https://openscrobbler.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "open-slum.org",
    "url": "https://open-slum.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openstax.org",
    "url": "https://openstax.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openuserjs.org",
    "url": "https://openuserjs.org/scripts/darkred/Instagram_-_visible_images_counter",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openuserjs.org",
    "url": "https://openuserjs.org/scripts/sjehuda/Proxy_Redirect",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openwebui.com",
    "url": "https://openwebui.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "openwhyd.org",
    "url": "https://openwhyd.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "opslagify.deruever.nl",
    "url": "https://opslagify.deruever.nl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "orangefreesounds.com",
    "url": "https://orangefreesounds.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "orpheus.network",
    "url": "https://orpheus.network/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "osanime.com",
    "url": "https://osanime.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "osf.io",
    "url": "https://osf.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "osf.io",
    "url": "https://osf.io/preprints/socarxiv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "osgameclones.com",
    "url": "https://osgameclones.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ossia.io",
    "url": "https://ossia.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "osu.ppy.sh",
    "url": "https://osu.ppy.sh/home",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "osudroid.moe",
    "url": "https://osudroid.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "otakuost.net",
    "url": "https://otakuost.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "otakuu.se",
    "url": "https://otakuu.se/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "otranscribe.com",
    "url": "https://otranscribe.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ottplayer.es",
    "url": "https://ottplayer.es/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "output.com",
    "url": "https://output.com/products/pack-generator",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "overlayed.dev",
    "url": "https://overlayed.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "overtakefans.com",
    "url": "https://overtakefans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ownersman.com",
    "url": "https://ownersman.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "owri.netlify.app",
    "url": "https://owri.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pad.riseup.net",
    "url": "https://pad.riseup.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pagepundit.com",
    "url": "https://pagepundit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pahe.ink",
    "url": "https://pahe.ink/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pairdrop.net",
    "url": "https://pairdrop.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pandabomber.gg",
    "url": "https://pandabomber.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pandacd.io",
    "url": "https://pandacd.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pandoc.org",
    "url": "https://pandoc.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pandora.nla.gov.au",
    "url": "https://pandora.nla.gov.au/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "papeer.tech",
    "url": "https://papeer.tech/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "paperback.moe",
    "url": "https://paperback.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "paperity.org",
    "url": "https://paperity.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "paperpanda.app",
    "url": "https://paperpanda.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "papers.im",
    "url": "https://papers.im/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "parsec.app",
    "url": "https://parsec.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "paste.centos.org",
    "url": "https://paste.centos.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "paste.ee",
    "url": "https://paste.ee/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "paste.sparked.host",
    "url": "https://paste.sparked.host/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pastebin.com",
    "url": "https://pastebin.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pastebin.com",
    "url": "https://pastebin.com/uRDJVGkL",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pastebin.pl",
    "url": "https://pastebin.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pasteepad.com",
    "url": "https://pasteepad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pastes.dev",
    "url": "https://pastes.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pastes.fmhy.net",
    "url": "https://pastes.fmhy.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "patorjk.com",
    "url": "https://patorjk.com/software/taag/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "patorjk.com",
    "url": "https://patorjk.com/text-color-fader/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pbc.biaman.pl",
    "url": "https://pbc.biaman.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pc.joshw.info",
    "url": "https://pc.joshw.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pcgamestorrents.com",
    "url": "https://pcgamestorrents.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pcsx2.net",
    "url": "https://pcsx2.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pcsx2.net",
    "url": "https://pcsx2.net/compatibility-list.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pcsx4.com",
    "url": "https://pcsx4.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdf.24eme.fr",
    "url": "https://pdf.24eme.fr/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdf24.org",
    "url": "https://pdf24.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfbooksdownload.com",
    "url": "https://pdfbooksdownload.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdf-books-free-download.com",
    "url": "https://pdf-books-free-download.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfbooksworld.com",
    "url": "https://pdfbooksworld.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfcandy.com",
    "url": "https://pdfcandy.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfcoffee.com",
    "url": "https://pdfcoffee.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfcookie.com",
    "url": "https://pdfcookie.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfcrowd.com",
    "url": "https://pdfcrowd.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfdrive.to",
    "url": "https://pdfdrive.to/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfdude.com",
    "url": "https://pdfdude.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfebookfree.com",
    "url": "https://pdfebookfree.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfencrypt.net",
    "url": "https://pdfencrypt.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdffixer.com",
    "url": "https://pdffixer.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfgrep.org",
    "url": "https://pdfgrep.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfhost.io",
    "url": "https://pdfhost.io/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfmagazines.club",
    "url": "https://pdfmagazines.club/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfmagazines.org",
    "url": "https://pdfmagazines.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdf-magazines-archive.com",
    "url": "https://pdf-magazines-archive.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdf-magazines-download.com",
    "url": "https://pdf-magazines-download.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfroom.com",
    "url": "https://pdfroom.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pdfsearches.com",
    "url": "https://pdfsearches.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "peazip.github.io",
    "url": "https://peazip.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pegasus-frontend.org",
    "url": "https://pegasus-frontend.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pentacom.jp",
    "url": "https://pentacom.jp/pentacom/bitfontmaker2/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "perchance.org",
    "url": "https://perchance.org/ai-text-to-image-generator",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "perchance.org",
    "url": "https://perchance.org/generators",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "perchancestory.com",
    "url": "https://perchancestory.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "persepolisdm.github.io",
    "url": "https://persepolisdm.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "personaldata.info",
    "url": "https://personaldata.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pesticide.io",
    "url": "https://pesticide.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "petals.dev",
    "url": "https://petals.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "petersalomonsen.com",
    "url": "https://petersalomonsen.com/webassemblymusic/livecodev2/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pfps.gg",
    "url": "https://pfps.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pgun.rilisoft.info",
    "url": "https://pgun.rilisoft.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "phanpy.social",
    "url": "https://phanpy.social/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "phantom.lol",
    "url": "https://phantom.lol/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "phish.in",
    "url": "https://phish.in/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "phishing.army",
    "url": "https://phishing.army/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "phoenixplace.xyz",
    "url": "https://phoenixplace.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "phoennix.gitlab.io",
    "url": "https://phoennix.gitlab.io/youtubesearchfix/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "photondev.netlify.app",
    "url": "https://photondev.netlify.app/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "photon-reddit.com",
    "url": "https://photon-reddit.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pianoboi.site",
    "url": "https://pianoboi.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "picard.musicbrainz.org",
    "url": "https://picard.musicbrainz.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "picoe.ca",
    "url": "https://picoe.ca/products/pablodraw/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pict.chat",
    "url": "https://pict.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pieces.app",
    "url": "https://pieces.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pigenai.onrender.com",
    "url": "https://pigenai.onrender.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pi-hole.net",
    "url": "https://pi-hole.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pillows.su",
    "url": "https://pillows.su/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "piped.video",
    "url": "https://piped.video/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "piratecity.top",
    "url": "https://piratecity.top/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pivigames.blog",
    "url": "https://pivigames.blog/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixelartgenerator.app",
    "url": "https://pixelartgenerator.app/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixeldrain.com",
    "url": "https://pixeldrain.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixelfed.org",
    "url": "https://pixelfed.org/mobile-apps",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixoguess.io",
    "url": "https://pixoguess.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixso.net",
    "url": "https://pixso.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixsoriginadventures.co.uk",
    "url": "https://pixsoriginadventures.co.uk/PCZone/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixverse.ai",
    "url": "https://pixverse.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pixwlk.itch.io",
    "url": "https://pixwlk.itch.io/petaporon",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plaintexttools.github.io",
    "url": "https://plaintexttools.github.io/plain-text-table/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plastinka.org",
    "url": "https://plastinka.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "platinmods.com",
    "url": "https://platinmods.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.cartesia.ai",
    "url": "https://play.cartesia.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.google.com",
    "url": "https://play.google.com/store/apps/details?id=com.google.android.apps.books",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.google.com",
    "url": "https://play.google.com/store/apps/details?id=com.retroarch",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.google.com",
    "url": "https://play.google.com/store/apps/details?id=com.spocky.projengmenu",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.google.com",
    "url": "https://play.google.com/store/apps/details?id=com.valvesoftware.steamlink",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.google.com",
    "url": "https://play.google.com/store/apps/details?id=dev.uint.qrserv",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.pocketcasts.com",
    "url": "https://play.pocketcasts.com/discover",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.typeracer.com",
    "url": "https://play.typeracer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.webrcade.com",
    "url": "https://play.webrcade.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.xumo.com",
    "url": "https://play.xumo.com/networks",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "play.you.radio",
    "url": "https://play.you.radio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playboard.co",
    "url": "https://playboard.co",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playclassic.games",
    "url": "https://playclassic.games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playemulator.online",
    "url": "https://playemulator.online/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "player.fm",
    "url": "https://player.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playground.allenai.org",
    "url": "https://playground.allenai.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playground.zyphra.com",
    "url": "https://playground.zyphra.com/audio",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playit.gg",
    "url": "https://playit.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlist.tools",
    "url": "https://playlist.tools/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlisthospital.com",
    "url": "https://playlisthospital.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlistor.io",
    "url": "https://playlistor.io/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlistproxy.net",
    "url": "https://playlistproxy.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlist-randomizer.com",
    "url": "https://playlist-randomizer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlists.at",
    "url": "https://playlists.at/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playlists.cloud",
    "url": "https://playlists.cloud/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playnite.link",
    "url": "https://playnite.link/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playold.games",
    "url": "https://playold.games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playretrogames.net",
    "url": "https://playretrogames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playscene.org",
    "url": "https://playscene.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playseek.app",
    "url": "https://playseek.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "playsnake.org",
    "url": "https://playsnake.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plaza.one",
    "url": "https://plaza.one/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pleasuredome.github.io",
    "url": "https://pleasuredome.github.io/pleasuredome/mame/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plex.tv",
    "url": "https://plex.tv/live-tv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plugdata.org",
    "url": "https://plugdata.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plugins.iem.at",
    "url": "https://plugins.iem.at/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plugins4free.com",
    "url": "https://plugins4free.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pluja.github.io",
    "url": "https://pluja.github.io/awesome-privacy/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pluto.tv",
    "url": "https://pluto.tv/live-tv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "plutonium.pw",
    "url": "https://plutonium.pw/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pluvior.com",
    "url": "https://pluvior.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pockettube.io",
    "url": "https://pockettube.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "podbay.fm",
    "url": "https://podbay.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "podcastindex.org",
    "url": "https://podcastindex.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "podcasts.apple.com",
    "url": "https://podcasts.apple.com/us/home",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "podclips.com",
    "url": "https://podclips.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "podscripts.co",
    "url": "https://podscripts.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "podstatus.com",
    "url": "https://podstatus.com/charts",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "poedit.net",
    "url": "https://poedit.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "poetryarchive.org",
    "url": "https://poetryarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "poets.org",
    "url": "https://poets.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pokemerald.com",
    "url": "https://pokemerald.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "poki.com",
    "url": "https://poki.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "polsy.org.uk",
    "url": "https://polsy.org.uk/stuff/ytrestrict.cgi",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "polyuploader.vercel.app",
    "url": "https://polyuploader.vercel.app/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "poolsuite.net",
    "url": "https://poolsuite.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "popupoff.org",
    "url": "https://popupoff.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "popuw.com",
    "url": "https://popuw.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "portapps.io",
    "url": "https://portapps.io/app/discord-portable/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "potplayer.daum.net",
    "url": "https://potplayer.daum.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "powerline.io",
    "url": "https://powerline.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ppv.to",
    "url": "https://ppv.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ppv.zone",
    "url": "https://ppv.zone/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pre.corrupt-net.org",
    "url": "https://pre.corrupt-net.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "predb.de",
    "url": "https://predb.de/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "predb.eu",
    "url": "https://predb.eu",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "predb.me",
    "url": "https://predb.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "predb.org",
    "url": "https://predb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "predb.pw",
    "url": "https://predb.pw/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "premid.app",
    "url": "https://premid.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "preterhuman.net",
    "url": "https://preterhuman.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "preview.reve.art",
    "url": "https://preview.reve.art/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "previews-app.com",
    "url": "https://previews-app.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pritunl.com",
    "url": "https://pritunl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privacyredirect.com",
    "url": "https://privacyredirect.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privacyspy.org",
    "url": "https://privacyspy.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privadovpn.com",
    "url": "https://privadovpn.com/software",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privatebin.net",
    "url": "https://privatebin.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privatebin.rinuploads.org",
    "url": "https://privatebin.rinuploads.org/?7de767d3a4aa0f3d#HDAH1mLZJBQEMPKLf3mbo9b2QgyLLs296spAFSBFTEYo",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privategpt.dev",
    "url": "https://privategpt.dev/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "privsec.dev",
    "url": "https://privsec.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "products.aspose.app",
    "url": "https://products.aspose.app/pdf/annotation",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "projectdxxx.me",
    "url": "https://projectdxxx.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "projectfreetv.sx",
    "url": "https://projectfreetv.sx/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "projectignis.github.io",
    "url": "https://projectignis.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "prosettings.net",
    "url": "https://prosettings.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "proton.me",
    "url": "https://proton.me/drive",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "proton.me",
    "url": "https://proton.me/drive/docs",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "proton.me",
    "url": "https://proton.me/mail",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "protonvpn.com",
    "url": "https://protonvpn.com",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "provenance-emu.com",
    "url": "https://provenance-emu.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "prowritingaid.com",
    "url": "https://prowritingaid.com/grammar-checker",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "proxyium.com",
    "url": "https://proxyium.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "proxyof2.com",
    "url": "https://proxyof2.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "proxypal.net",
    "url": "https://proxypal.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ps1emulator.com",
    "url": "https://ps1emulator.com",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ps3r.com",
    "url": "https://ps3r.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "psbdmp.ws",
    "url": "https://psbdmp.ws/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "psiphon.ca",
    "url": "https://psiphon.ca/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "psnprofiles.com",
    "url": "https://psnprofiles.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pst.moe",
    "url": "https://pst.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pstream.mov",
    "url": "https://pstream.mov/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "psvitavpk.com",
    "url": "https://psvitavpk.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "psxroms.pro",
    "url": "https://psxroms.pro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "psyarxiv.com",
    "url": "https://psyarxiv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pub.microbin.eu",
    "url": "https://pub.microbin.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "public.sqrx.com",
    "url": "https://public.sqrx.com/web",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "publicdomainreview.org",
    "url": "https://publicdomainreview.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pubmed.ncbi.nlm.nih.gov",
    "url": "https://pubmed.ncbi.nlm.nih.gov/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "puffer.stanford.edu",
    "url": "https://puffer.stanford.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "punkcata.blogspot.com",
    "url": "https://punkcata.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "purpletv.aeong.win",
    "url": "https://purpletv.aeong.win/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pururin.to",
    "url": "https://pururin.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pwn.sh",
    "url": "https://pwn.sh/tools/getstream.html",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pwrestling.com",
    "url": "https://pwrestling.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "pyload.net",
    "url": "https://pyload.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "qqdl.site",
    "url": "https://qqdl.site/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "qrcp.sh",
    "url": "https://qrcp.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "qstream.pages.dev",
    "url": "https://qstream.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "qtox.github.io",
    "url": "https://qtox.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quarkle.ai",
    "url": "https://quarkle.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quavergame.com",
    "url": "https://quavergame.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quickpenai.com",
    "url": "https://quickpenai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quillbot.com",
    "url": "https://quillbot.com/grammar-check",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quod.lib.umich.edu",
    "url": "https://quod.lib.umich.edu/e/eebogroup/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quod.lib.umich.edu",
    "url": "https://quod.lib.umich.edu/m/moa/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "quran.com",
    "url": "https://quran.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "racereplay.net",
    "url": "https://racereplay.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "racing.pmnd.rs",
    "url": "https://racing.pmnd.rs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "racingstreams.net",
    "url": "https://racingstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "r-a-d.io",
    "url": "https://r-a-d.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "raddio.net",
    "url": "https://raddio.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radio.dubbeh.net",
    "url": "https://radio.dubbeh.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radio.garden",
    "url": "https://radio.garden/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radio.kwsx.online",
    "url": "https://radio.kwsx.online/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radio.madza.dev",
    "url": "https://radio.madza.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radio.uwu.network",
    "url": "https://radio.uwu.network/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radiooooo.com",
    "url": "https://radiooooo.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radioparadise.com",
    "url": "https://radioparadise.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "radioside.com",
    "url": "https://radioside.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ragnos1997.com",
    "url": "https://ragnos1997.com/optimization-catalog/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rainbowhunt.com",
    "url": "https://rainbowhunt.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "raindrop.io",
    "url": "https://raindrop.io/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rainwave.cc",
    "url": "https://rainwave.cc/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rainyscope.com",
    "url": "https://rainyscope.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ramensoftware.com",
    "url": "https://ramensoftware.com/textify",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "randomizers.debigare.com",
    "url": "https://randomizers.debigare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "random-song.com",
    "url": "https://random-song.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "randomsong.org",
    "url": "https://randomsong.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "randomsonggenerator.com",
    "url": "https://randomsonggenerator.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ranelpadon.github.io",
    "url": "https://ranelpadon.github.io/ngram-type/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rankedagi.com",
    "url": "https://rankedagi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ranoz.gg",
    "url": "https://ranoz.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rare2pdf.com",
    "url": "https://rare2pdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rarebit.neocities.org",
    "url": "https://rarebit.neocities.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rate.house",
    "url": "https://rate.house/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rateyourmusic.com",
    "url": "https://rateyourmusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rateyourmusic.com",
    "url": "https://rateyourmusic.com/list/TheScientist/rym-ultimate-box-set/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ratm.live",
    "url": "https://ratm.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ravebooksearch.com",
    "url": "https://ravebooksearch.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "raw.senmanga.com",
    "url": "https://raw.senmanga.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rawdevart.com",
    "url": "https://rawdevart.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rawg.io",
    "url": "https://rawg.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rawkbawx.rocks",
    "url": "https://rawkbawx.rocks/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rawkuma.com",
    "url": "https://rawkuma.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rawlazy.com",
    "url": "https://rawlazy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "raylibtech.itch.io",
    "url": "https://raylibtech.itch.io/rfxgen",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rclone.org",
    "url": "https://rclone.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rdx.overdevs.com",
    "url": "https://rdx.overdevs.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "react-guitar.com",
    "url": "https://react-guitar.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readermode.io",
    "url": "https://readermode.io/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readest.com",
    "url": "https://readest.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readmanga.live",
    "url": "https://readmanga.live/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readmanganato.com",
    "url": "https://readmanganato.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readonlinefreebook.com",
    "url": "https://readonlinefreebook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readow.ai",
    "url": "https://readow.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readpoopfiction.com",
    "url": "https://readpoopfiction.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readthistwice.com",
    "url": "https://readthistwice.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "readwok.com",
    "url": "https://readwok.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "realfight.org",
    "url": "https://realfight.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "really.boring.website",
    "url": "https://really.boring.website/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "realnotcomplex.com",
    "url": "https://realnotcomplex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reaperscans.com",
    "url": "https://reaperscans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rebane2001.com",
    "url": "https://rebane2001.com/discord-colored-text-generator/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rec.torontocast.stream",
    "url": "https://rec.torontocast.stream/player/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "recalbox.com",
    "url": "https://recalbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "recherche-ebook.fr",
    "url": "https://recherche-ebook.fr/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "recommendmeabook.com",
    "url": "https://recommendmeabook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redacted.sh",
    "url": "https://redacted.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redarena.ai",
    "url": "https://redarena.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/1ibz2yz",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/2fgm9p",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/3l0yxp",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/gn7fw5",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/gobcne",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/nlw3er",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/x804wg",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redd.it",
    "url": "https://redd.it/xa0aya",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.com",
    "url": "https://reddit.com/r/MotorsportsReplays",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.com",
    "url": "https://reddit.com/r/NameThatSong",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.com",
    "url": "https://reddit.com/r/RepackWorld",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.com",
    "url": "https://reddit.com/r/sheetmusic",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.com",
    "url": "https://reddit.com/r/Twitter",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.com",
    "url": "https://reddit.com/r/xTrill",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.musicplayer.io",
    "url": "https://reddit.musicplayer.io/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.nbastreams.cc",
    "url": "https://reddit.nbastreams.cc/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.nflbite.com",
    "url": "https://reddit.nflbite.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit.rnbastreams.com",
    "url": "https://reddit.rnbastreams.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit-chan.vercel.app",
    "url": "https://reddit-chan.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditcomber.com",
    "url": "https://redditcomber.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditenhancementsuite.com",
    "url": "https://redditenhancementsuite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditle.com",
    "url": "https://redditle.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditmetis.com",
    "url": "https://redditmetis.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditmlbstreams.live",
    "url": "https://redditmlbstreams.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditp.com",
    "url": "https://redditp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditsoccerstreams.tv",
    "url": "https://redditsoccerstreams.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditsport.cc",
    "url": "https://redditsport.cc/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reddit-stream.com",
    "url": "https://reddit-stream.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redditstuff.github.io",
    "url": "https://redditstuff.github.io/sna/vizit/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redlib.fmhy.net",
    "url": "https://redlib.fmhy.net",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redream.io",
    "url": "https://redream.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redsquirrel87.com",
    "url": "https://redsquirrel87.com/doku.php/projects-list",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "redtexts.org",
    "url": "https://redtexts.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reflect4.me",
    "url": "https://reflect4.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rejetto.com",
    "url": "https://rejetto.com/hfs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rekt.network",
    "url": "https://rekt.network/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rekulous.github.io",
    "url": "https://rekulous.github.io/gd-efc-encryptor/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "releasefeed.elomatreb.eu",
    "url": "https://releasefeed.elomatreb.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "releases.moe",
    "url": "https://releases.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "relisten.net",
    "url": "https://relisten.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reloadedsteam.com",
    "url": "https://reloadedsteam.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "remixsearch.net",
    "url": "https://remixsearch.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "renovatiorecords.blogspot.com",
    "url": "https://renovatiorecords.blogspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/128bitbay",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/bbbr4cfr",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/cm4b7",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/firehawk52",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#766-occult-books",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#adsanctuary",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#alchemy-drive",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#alvro",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#archive",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#archiveorg-newspapers",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#armgddn-browser",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#arquivista",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#atvtools",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#azrks-library",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#bbc-essential",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#calibre-libraries",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#chrono-divide",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#cinematictools-archive",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#craftstuff",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#csf",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#cursor",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#daddylive-proxy",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#directory-opus",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#dyren",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#echerdex-repository",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#emulator-files",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#eset",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#film-books",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#finalburn-neo",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#fl-studio",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#font-collections",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#gnarly_repacks",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#gns",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#goa-psytrance-livesets",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#gservice-gen",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#gta-radio-stations",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#hcs-forum",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#history-newsboys-of-1899",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#how-denuvo-works",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#humanitys-vault",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#ib-pc-port",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#idm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/fmhybase64#iptv-playlists",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#isidore",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#it-books-drive",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#kpop-torrent",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#lefthandpath",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#library-drive",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#lossless-scaling",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#magipack",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#math-and-physics-books",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/fmhybase64#mega-gen",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#messy-occult-library",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#moe81",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#myrient",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#no-intro",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#picowesome",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#public-witchcraft-library",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#qmusic",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#qsl",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#radio-nowhere",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/fmhybase64#rave-library",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#rom-collections",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#sm64romhacks",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#smw-hacks",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#software-library-flash",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#soren-megathread",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#spirituality-megadrive",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#sr-game",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#streamfire",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#switch-emulation",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#team-vr",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#tosec",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#totk-optimization",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#ttrpg-books",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#tvquickactions",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#various-books-manuals",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#vb-cables",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#wilds-occult-ebook-sources",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FMHYBase64#witchcraft-library",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/FontPiracy",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/Gamedecomps",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/megathread-yuzu",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/musicdiscovery",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/rivestream",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/simple-rclone-usage",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/sportcalendars",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/VIPSportsBox",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/wheredownloadmusic",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/WindowsFPS",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.co",
    "url": "https://rentry.co/zeoemsh9",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.org",
    "url": "https://rentry.org/aipiracyresources",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.org",
    "url": "https://rentry.org/jb-listing",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.org",
    "url": "https://rentry.org/pgames",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.org",
    "url": "https://rentry.org/steamdeckpirates",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rentry.org",
    "url": "https://rentry.org/YouTubePlaylistMerge",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "repacklab.com",
    "url": "https://repacklab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "repair.wiki",
    "url": "https://repair.wiki/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rephonic.com",
    "url": "https://rephonic.com/graph",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "replay.nontonx.com",
    "url": "https://replay.nontonx.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "replugged.dev",
    "url": "https://replugged.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "repository.duke.edu",
    "url": "https://repository.duke.edu/catalog?utf8=%E2%9C%93&search_scope=https%3A%2F%2Frepository.duke.edu%2Fcatalog&q=&search_field=all_fields",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "requestly.io",
    "url": "https://requestly.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "resanance.com",
    "url": "https://resanance.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rescuezilla.com",
    "url": "https://rescuezilla.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reset-scans.com",
    "url": "https://reset-scans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "reshade.me",
    "url": "https://reshade.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "restic.net",
    "url": "https://restic.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "restoreprivacy.com",
    "url": "https://restoreprivacy.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rethinkdns.com",
    "url": "https://rethinkdns.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retractionwatch.com",
    "url": "https://retractionwatch.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retro.sx",
    "url": "https://retro.sx/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retroachievements.org",
    "url": "https://retroachievements.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retroarch.com",
    "url": "https://retroarch.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrobat.ovh",
    "url": "https://retrobat.ovh/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrocatalog.com",
    "url": "https://retrocatalog.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrodeck.net",
    "url": "https://retrodeck.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrogamesbot.com",
    "url": "https://retrogamesbot.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrogametalk.com",
    "url": "https://retrogametalk.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retromags.com",
    "url": "https://retromags.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retropie.org.uk",
    "url": "https://retropie.org.uk/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrospec.sgn.net",
    "url": "https://retrospec.sgn.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "retrozone.co",
    "url": "https://retrozone.co/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "returnyoutubedislike.com",
    "url": "https://returnyoutubedislike.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "revdl.com",
    "url": "https://revdl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "revoldiv.com",
    "url": "https://revoldiv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "revolt.chat",
    "url": "https://revolt.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rexagames.com",
    "url": "https://rexagames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rezi.one",
    "url": "https://rezi.one/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rgshows.me",
    "url": "https://rgshows.me/livetv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rhythm-plus.com",
    "url": "https://rhythm-plus.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rhythmplus.io",
    "url": "https://rhythmplus.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ripped.guide",
    "url": "https://ripped.guide/PC-Software/Games/#cracking-tools",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "riseup.net",
    "url": "https://riseup.net/en/vpn",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "risinghub.net",
    "url": "https://risinghub.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rivestream.org",
    "url": "https://rivestream.org/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rivestream.org",
    "url": "https://rivestream.org/iptv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rizzcomic.com",
    "url": "https://rizzcomic.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rlsbb.ru",
    "url": "https://rlsbb.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rnote.flxzt.net",
    "url": "https://rnote.flxzt.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "roland50.studio",
    "url": "https://roland50.studio/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rom.so",
    "url": "https://rom.so/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romhacking.com",
    "url": "https://romhacking.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romhackplaza.org",
    "url": "https://romhackplaza.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romheaven.com",
    "url": "https://romheaven.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romm.app",
    "url": "https://romm.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "roms2000.com",
    "url": "https://roms2000.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romsever.com",
    "url": "https://romsever.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romsfun.com",
    "url": "https://romsfun.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romshq.com",
    "url": "https://romshq.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romsim.com",
    "url": "https://romsim.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "romslab.com",
    "url": "https://romslab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ROMspure.cc",
    "url": "https://ROMspure.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ronaldo7.net",
    "url": "https://ronaldo7.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "roocode.com",
    "url": "https://roocode.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rookiesvr.com",
    "url": "https://rookiesvr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rooms.xyz",
    "url": "https://rooms.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rork.com",
    "url": "https://rork.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rosegardenmusic.com",
    "url": "https://rosegardenmusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rpcs3.net",
    "url": "https://rpcs3.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rpcs3.net",
    "url": "https://rpcs3.net/compatibility",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rpcs4.com",
    "url": "https://rpcs4.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rpgonly.com",
    "url": "https://rpgonly.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rpubs.com",
    "url": "https://rpubs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "r-roms.github.io",
    "url": "https://r-roms.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rsarchive.org",
    "url": "https://rsarchive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rsync.samba.org",
    "url": "https://rsync.samba.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ruffle.rs",
    "url": "https://ruffle.rs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rugby24.net",
    "url": "https://rugby24.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rugbystreams.me",
    "url": "https://rugbystreams.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rustpad.io",
    "url": "https://rustpad.io",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rutor.info",
    "url": "https://rutor.info/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rutracker.org",
    "url": "https://rutracker.org/forum/index.php?c=28",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rutracker.org",
    "url": "https://rutracker.org/forum/index.php?c=8",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rutracker.org",
    "url": "https://rutracker.org/forum/tracker.php?nm=ebook",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rutracker.org",
    "url": "https://rutracker.org/forum/viewforum.php?f=548",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ruverses.com",
    "url": "https://ruverses.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "rytr.me",
    "url": "https://rytr.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ryujinx.org",
    "url": "https://ryujinx.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "s4windows.itch.io",
    "url": "https://s4windows.itch.io/scanlines-for-windows",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "s7-tv.blogspot.com",
    "url": "https://s7-tv.blogspot.com/p/t.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "saavn-web-ui.vercel.app",
    "url": "https://saavn-web-ui.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "saber.adil.hanney.org",
    "url": "https://saber.adil.hanney.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sacred-texts.com",
    "url": "https://sacred-texts.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sadwhale-studios.itch.io",
    "url": "https://sadwhale-studios.itch.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "safeaudiokit.com",
    "url": "https://safeaudiokit.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "safebooru.org",
    "url": "https://safebooru.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "safing.io",
    "url": "https://safing.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sagexpo.org",
    "url": "https://sagexpo.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sameboy.github.io",
    "url": "https://sameboy.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sampleswap.org",
    "url": "https://sampleswap.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "samplette.io",
    "url": "https://samplette.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "samplv1.sourceforge.io",
    "url": "https://samplv1.sourceforge.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sandboxie-plus.com",
    "url": "https://sandboxie-plus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sandtris.com",
    "url": "https://sandtris.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sankakucomplex.com",
    "url": "https://sankakucomplex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "saurabhdaware.github.io",
    "url": "https://saurabhdaware.github.io/text-to-handwriting/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "savefileconverter.com",
    "url": "https://savefileconverter.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scale.com",
    "url": "https://scale.com/leaderboard",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scanlibs.com",
    "url": "https://scanlibs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scatteredsecrets.com",
    "url": "https://scatteredsecrets.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scdownloader.io",
    "url": "https://scdownloader.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scene-rls.net",
    "url": "https://scene-rls.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "schismtracker.org",
    "url": "https://schismtracker.org/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scholar.archive.org",
    "url": "https://scholar.archive.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scholar.google.com",
    "url": "https://scholar.google.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sci-hub.mksa.top",
    "url": "https://sci-hub.mksa.top/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sci-hub.ru",
    "url": "https://sci-hub.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sci-hub.se",
    "url": "https://sci-hub.se/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sci-hub.st",
    "url": "https://sci-hub.st/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sci-hub.tf",
    "url": "https://sci-hub.tf/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scinapse.io",
    "url": "https://scinapse.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scira.ai",
    "url": "https://scira.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scispace.com",
    "url": "https://scispace.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scnlog.me",
    "url": "https://scnlog.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scoreascore.com",
    "url": "https://scoreascore.com/homesick",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scp-wiki.wikidot.com",
    "url": "https://scp-wiki.wikidot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "screenpi.pe",
    "url": "https://screenpi.pe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scripai.com",
    "url": "https://scripai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "scrolldrop.com",
    "url": "https://scrolldrop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sdk.vercel.ai",
    "url": "https://sdk.vercel.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "seanime.app",
    "url": "https://seanime.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "search.brave.com",
    "url": "https://search.brave.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "search.crossref.org",
    "url": "https://search.crossref.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "search.fuckoffgoogle.net",
    "url": "https://search.fuckoffgoogle.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "search-ace.stream",
    "url": "https://search-ace.stream/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "searchthearxiv.com",
    "url": "https://searchthearxiv.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "searx.fmhy.net",
    "url": "https://searx.fmhy.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "searx.space",
    "url": "https://searx.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "secondhandsongs.com",
    "url": "https://secondhandsongs.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sega-play.online",
    "url": "https://sega-play.online/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "segaretro.org",
    "url": "https://segaretro.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "semiwiki.com",
    "url": "https://semiwiki.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "send.djazz.se",
    "url": "https://send.djazz.se/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "send.internxt.com",
    "url": "https://send.internxt.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "send.now",
    "url": "https://send.now/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "send.tresorit.com",
    "url": "https://send.tresorit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "send.vis.ee",
    "url": "https://send.vis.ee/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sequencer.henryfellerhoff.com",
    "url": "https://sequencer.henryfellerhoff.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "serato.com",
    "url": "https://serato.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "seriesgraph.com",
    "url": "https://seriesgraph.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sfbgames.itch.io",
    "url": "https://sfbgames.itch.io/chiptone",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sfx.thelazy.net",
    "url": "https://sfx.thelazy.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sfxr.me",
    "url": "https://sfxr.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shabzefilters.netlify.app",
    "url": "https://shabzefilters.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shadowsocks.org",
    "url": "https://shadowsocks.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shailendramaurya.github.io",
    "url": "https://shailendramaurya.github.io/racoon/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "share.osf.io",
    "url": "https://share.osf.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sharefile.co",
    "url": "https://sharefile.co/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sharemania.us",
    "url": "https://sharemania.us/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sharepad.io",
    "url": "https://sharepad.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sharer.pw",
    "url": "https://sharer.pw",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sheet.host",
    "url": "https://sheet.host/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sheetmusicscanner.com",
    "url": "https://sheetmusicscanner.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shepherd.com",
    "url": "https://shepherd.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sherlock-holm.es",
    "url": "https://sherlock-holm.es/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shinden.pl",
    "url": "https://shinden.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shmuplations.com",
    "url": "https://shmuplations.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "short-stories.co",
    "url": "https://short-stories.co/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shout-tv.com",
    "url": "https://shout-tv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "showroom-live.com",
    "url": "https://showroom-live.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "shrib.com",
    "url": "https://shrib.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "siarchives.si.edu",
    "url": "https://siarchives.si.edu/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sidequestvr.com",
    "url": "https://sidequestvr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sigil-ebook.com",
    "url": "https://sigil-ebook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sigma-file-manager.vercel.app",
    "url": "https://sigma-file-manager.vercel.app",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "signal.org",
    "url": "https://signal.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "signal.vercel.app",
    "url": "https://signal.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simkl.com",
    "url": "https://simkl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simon-knuth.github.io",
    "url": "https://simon-knuth.github.io/scanner/index",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simple64.github.io",
    "url": "https://simple64.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simple-bench.com",
    "url": "https://simple-bench.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simplenote.com",
    "url": "https://simplenote.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simpleoptout.com",
    "url": "https://simpleoptout.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simplepdf.com",
    "url": "https://simplepdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "simplex.chat",
    "url": "https://simplex.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sing-box.sagernet.org",
    "url": "https://sing-box.sagernet.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "singlelogin.re",
    "url": "https://singlelogin.re/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sioyek.info",
    "url": "https://sioyek.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "siptv.eu",
    "url": "https://siptv.eu/converter/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sites.google.com",
    "url": "https://sites.google.com/site/tyronesgamesez/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sites.google.com",
    "url": "https://sites.google.com/view/bonmarioinc/rom-hacks/released-rom-hacks",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sites.google.com",
    "url": "https://sites.google.com/view/cancerogenoslab/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sites.google.com",
    "url": "https://sites.google.com/view/rvisualnovels-recs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sites.google.com",
    "url": "https://sites.google.com/view/unblockkisd/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sittingonclouds.com",
    "url": "https://sittingonclouds.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sketchful.io",
    "url": "https://sketchful.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "skiley.net",
    "url": "https://skiley.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "skitty.xyz",
    "url": "https://skitty.xyz/aurora/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "skmedix.pl",
    "url": "https://skmedix.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "skribbl.io",
    "url": "https://skribbl.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "skullxdcc.com",
    "url": "https://skullxdcc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "slackmojis.com",
    "url": "https://slackmojis.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "slatebox.com",
    "url": "https://slatebox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sling.com",
    "url": "https://sling.com/international",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "slowedandreverb.studio",
    "url": "https://slowedandreverb.studio/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "slowroads.io",
    "url": "https://slowroads.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "slsknet.org",
    "url": "https://slsknet.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smallgamez.com",
    "url": "https://smallgamez.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smallpdf.com",
    "url": "https://smallpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smarttubeapp.github.io",
    "url": "https://smarttubeapp.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smash-crusade.itch.io",
    "url": "https://smash-crusade.itch.io/crusade",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smashkarts.io",
    "url": "https://smashkarts.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smbgames.be",
    "url": "https://smbgames.be/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smol.pub",
    "url": "https://smol.pub/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "smwcentral.net",
    "url": "https://smwcentral.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "snek-vunderkind.vercel.app",
    "url": "https://snek-vunderkind.vercel.app/games/tennis.html",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "snippet.host",
    "url": "https://snippet.host/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "snoosnoop.com",
    "url": "https://snoosnoop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "snowflake.torproject.org",
    "url": "https://snowflake.torproject.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "snusbase.com",
    "url": "https://snusbase.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soapy.to",
    "url": "https://soapy.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soccerdoge.com",
    "url": "https://soccerdoge.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soccerfull.net",
    "url": "https://soccerfull.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soccerfullmatch.com",
    "url": "https://soccerfullmatch.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soccerstreams.net",
    "url": "https://soccerstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soccerstreams-100.tv",
    "url": "https://soccerstreams-100.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "socialblade.com",
    "url": "https://socialblade.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "socket.io",
    "url": "https://socket.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "softarchive.download",
    "url": "https://softarchive.download/newspapers",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soitis.dev",
    "url": "https://soitis.dev/control-panel-for-twitter",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "somafm.com",
    "url": "https://somafm.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "somafm.com",
    "url": "https://somafm.com/player/#/now-playing/dronezone",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "someonewhocares.org",
    "url": "https://someonewhocares.org/hosts/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonauto.ai",
    "url": "https://sonauto.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "songslover.li",
    "url": "https://songslover.li/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "songstems.net",
    "url": "https://songstems.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonic3air.org",
    "url": "https://sonic3air.org/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonic-pi.net",
    "url": "https://sonic-pi.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonicrunners.com",
    "url": "https://sonicrunners.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonniss.com",
    "url": "https://sonniss.com/gameaudiogdc",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonobus.net",
    "url": "https://sonobus.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sonolus.com",
    "url": "https://sonolus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sorr.forumotion.net",
    "url": "https://sorr.forumotion.net/t838-new-streets-of-rage-remake-v5-2-download-and-info",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sortmylist.com",
    "url": "https://sortmylist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sotmatches.netlify.app",
    "url": "https://sotmatches.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundcloud.com",
    "url": "https://soundcloud.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundcloudmp3.cc",
    "url": "https://soundcloudmp3.cc/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundcloudmp3.org",
    "url": "https://soundcloudmp3.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundcloudtomp3.app",
    "url": "https://soundcloudtomp3.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundcloud-to-mp3.com",
    "url": "https://soundcloud-to-mp3.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sound-effects.bbcrewind.co.uk",
    "url": "https://sound-effects.bbcrewind.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundoftext.com",
    "url": "https://soundoftext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundraw.io",
    "url": "https://soundraw.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundshow.app",
    "url": "https://soundshow.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundslice.com",
    "url": "https://soundslice.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundsofmaine.life",
    "url": "https://soundsofmaine.life/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundtracktracklist.com",
    "url": "https://soundtracktracklist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "soundux.rocks",
    "url": "https://soundux.rocks/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/album-art/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/astrogrep/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/dxwnd/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/expsoundboard/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/lamexp/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/nootka/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/nutkus/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourceforge.net",
    "url": "https://sourceforge.net/projects/sox/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sourcery.ai",
    "url": "https://sourcery.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "space.coze.cn",
    "url": "https://space.coze.cn/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spacedrop.app",
    "url": "https://spacedrop.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spacetypegenerator.com",
    "url": "https://spacetypegenerator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spectrumcomputing.co.uk",
    "url": "https://spectrumcomputing.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "speechchat.com",
    "url": "https://speechchat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "speechma.com",
    "url": "https://speechma.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "speechnotes.co",
    "url": "https://speechnotes.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "speedify.com",
    "url": "https://speedify.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spicetify.app",
    "url": "https://spicetify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spikehd.github.io",
    "url": "https://spikehd.github.io/projects/dorion/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spin.moe",
    "url": "https://spin.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "splatoon.io",
    "url": "https://splatoon.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "splix.io",
    "url": "https://splix.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sponsor.ajay.app",
    "url": "https://sponsor.ajay.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spoqify.com",
    "url": "https://spoqify.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sport7.pro",
    "url": "https://sport7.pro/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sportontv.xyz",
    "url": "https://sportontv.xyz/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sportplus.live",
    "url": "https://sportplus.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sportshub.stream",
    "url": "https://sportshub.stream/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sportslive.me",
    "url": "https://sportslive.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sportsurge.club",
    "url": "https://sportsurge.club/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sportyhunter.com",
    "url": "https://sportyhunter.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spotify-art.vercel.app",
    "url": "https://spotify-art.vercel.app/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spotify-dedup.com",
    "url": "https://spotify-dedup.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spotifyplaylistarchive.com",
    "url": "https://spotifyplaylistarchive.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "spot-transfer.vercel.app",
    "url": "https://spot-transfer.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "squid.wtf",
    "url": "https://squid.wtf/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "squidgeworld.org",
    "url": "https://squidgeworld.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ssd.eff.org",
    "url": "https://ssd.eff.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stablehorde.net",
    "url": "https://stablehorde.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stacher.io",
    "url": "https://stacher.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "standardebooks.org",
    "url": "https://standardebooks.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "standardnotes.com",
    "url": "https://standardnotes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "standsapp.org",
    "url": "https://standsapp.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "starc.app",
    "url": "https://starc.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "starfiles.co",
    "url": "https://starfiles.co/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "staringispolite.github.io",
    "url": "https://staringispolite.github.io/twayback-machine/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "starlive.click",
    "url": "https://starlive.click/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "starshine-legacy.starstable.com",
    "url": "https://starshine-legacy.starstable.com/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "start.duckduckgo.com",
    "url": "https://start.duckduckgo.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "startgame.world",
    "url": "https://startgame.world/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "status.app",
    "url": "https://status.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steam.design",
    "url": "https://steam.design/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steam250.com",
    "url": "https://steam250.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steambase.io",
    "url": "https://steambase.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steambase.io",
    "url": "https://steambase.io/tools/steam-discord-bot",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steambrew.app",
    "url": "https://steambrew.app/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamcharts.com",
    "url": "https://steamcharts.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamcommunity.com",
    "url": "https://steamcommunity.com/groups/SmartSteamEmu",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamcommunity.com",
    "url": "https://steamcommunity.com/groups/SteamInventoryHelper",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamcommunity.com",
    "url": "https://steamcommunity.com/sharedfiles/filedetails/?id=1746978201",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steam-cracked.com",
    "url": "https://steam-cracked.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamdb.info",
    "url": "https://steamdb.info/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamdb.info",
    "url": "https://steamdb.info/extension/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamgg.net",
    "url": "https://steamgg.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamhunters.com",
    "url": "https://steamhunters.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamid.io",
    "url": "https://steamid.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steaminventoryhelper.com",
    "url": "https://steaminventoryhelper.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steampp.net",
    "url": "https://steampp.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamrip.com",
    "url": "https://steamrip.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamspy.com",
    "url": "https://steamspy.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamunderground.net",
    "url": "https://steamunderground.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steamunlocked.net",
    "url": "https://steamunlocked.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "steelseries.com",
    "url": "https://steelseries.com/gg/moments",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stegcloak.surge.sh",
    "url": "https://stegcloak.surge.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stellular.net",
    "url": "https://stellular.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stepfun.ai",
    "url": "https://stepfun.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stepmodifications.org",
    "url": "https://stepmodifications.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stevenaleong.com",
    "url": "https://stevenaleong.com/tools/spotifyplaylistrandomizer",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stickers.gg",
    "url": "https://stickers.gg",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stolen.shoes",
    "url": "https://stolen.shoes/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "store.steampowered.com",
    "url": "https://store.steampowered.com/app/480/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "store.steampowered.com",
    "url": "https://store.steampowered.com/app/607260/McOsu/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "strand.jinay.dev",
    "url": "https://strand.jinay.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "stratumauth.com",
    "url": "https://stratumauth.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streameast.app",
    "url": "https://streameast.app/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streameast.cz",
    "url": "https://streameast.cz/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streamed.su",
    "url": "https://streamed.su/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streamfireapp.tv",
    "url": "https://streamfireapp.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streamladder.com",
    "url": "https://streamladder.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streamlink.github.io",
    "url": "https://streamlink.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streamurl.link",
    "url": "https://streamurl.link/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streamwriter.org",
    "url": "https://streamwriter.org/en/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "streema.com",
    "url": "https://streema.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "strlen.com",
    "url": "https://strlen.com/treesheets/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "strmd.link",
    "url": "https://strmd.link/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "structifi.com",
    "url": "https://structifi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "strudel.cc",
    "url": "https://strudel.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "subharbor.com",
    "url": "https://subharbor.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "subhra74.github.io",
    "url": "https://subhra74.github.io/xdm/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "subredditstats.com",
    "url": "https://subredditstats.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "subtransfer.ploomberapp.io",
    "url": "https://subtransfer.ploomberapp.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sudachi.emuplace.app",
    "url": "https://sudachi.emuplace.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sullygnome.com",
    "url": "https://sullygnome.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sunnah.com",
    "url": "https://sunnah.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "suno.com",
    "url": "https://suno.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sunxdcc.com",
    "url": "https://sunxdcc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "supercollider.github.io",
    "url": "https://supercollider.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "supercompression.org",
    "url": "https://supercompression.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "superfile.netlify.app",
    "url": "https://superfile.netlify.app/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "supermaven.com",
    "url": "https://supermaven.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "super-productivity.com",
    "url": "https://super-productivity.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "superstarshi.github.io",
    "url": "https://superstarshi.github.io/smatrs/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "suptg.thisisnotatrueending.com",
    "url": "https://suptg.thisisnotatrueending.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "surge-synthesizer.github.io",
    "url": "https://surge-synthesizer.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "suttacentral.net",
    "url": "https://suttacentral.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "suyu.dev",
    "url": "https://suyu.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sweet-hall-e72.notion.site",
    "url": "https://sweet-hall-e72.notion.site/A-Traveler-s-Guide-to-the-Latent-Space-85efba7e5e6a40e5bd3cae980f30235f",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "swingmx.com",
    "url": "https://swingmx.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "switchgamesmall.icu",
    "url": "https://switchgamesmall.icu/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "switchroms.io",
    "url": "https://switchroms.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "sygil-dev.github.io",
    "url": "https://sygil-dev.github.io/sygil-webui/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "symbl.cc",
    "url": "https://symbl.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "symbol.so",
    "url": "https://symbol.so/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "syncthing.net",
    "url": "https://syncthing.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "syosetu.com",
    "url": "https://syosetu.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "syrics-web-akashrchandran.vercel.app",
    "url": "https://syrics-web-akashrchandran.vercel.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/archive_artbooks",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/ArtFacultas",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/AudioFilesDrive",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/AudioWavePro",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/BeatSpotBot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/DeezerMusicBot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/deezload2bot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/dummiesbook",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/eBookRoom",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/GlomaticoBlueMusicBot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/GlomaticoPinkMusicBot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/goatifisports",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/hlvpnbot",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/HQVst",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/JioDLBot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/magZtore",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/mediadownbot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/MegaUploadXbot",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/mephbot",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/motreb_downloader_bot",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/MusicsHuntersbot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/musvkrobot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/nexus_search/214",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/onedrivexbot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/pdfbot",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/pluggsupply",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/radiobot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/scdlbot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/scihubot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/Song_downloaderbot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/soundcloudaudiodownloader",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/spotifydownloadrobot",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/TheGdriveXBot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/VanillaTG",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/vkmsaverbot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/vkmusbot",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "t.me",
    "url": "https://t.me/VRPirates",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tablacus.github.io",
    "url": "https://tablacus.github.io/explorer_en.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tagcloud.rainosullivan.com",
    "url": "https://tagcloud.rainosullivan.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tagging.connectpaste.com",
    "url": "https://tagging.connectpaste.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tagify.me",
    "url": "https://tagify.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tagmap.io",
    "url": "https://tagmap.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tags.mgcounts.com",
    "url": "https://tags.mgcounts.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tahoe-lafs.org",
    "url": "https://tahoe-lafs.org/trac/tahoe-lafs",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "taiga.moe",
    "url": "https://taiga.moe/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tails.net",
    "url": "https://tails.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tailscale.com",
    "url": "https://tailscale.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tailwindpdf.com",
    "url": "https://tailwindpdf.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "takenote.dev",
    "url": "https://takenote.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "talktyper.com",
    "url": "https://talktyper.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "talosintelligence.com",
    "url": "https://talosintelligence.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tamanotchi.world",
    "url": "https://tamanotchi.world/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tamiltoon.net",
    "url": "https://tamiltoon.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tancpol.net",
    "url": "https://tancpol.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tanime.tv",
    "url": "https://tanime.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "taodung.com",
    "url": "https://taodung.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tapochek.net",
    "url": "https://tapochek.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "taskwarrior.org",
    "url": "https://taskwarrior.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tastedive.com",
    "url": "https://tastedive.com/books",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "taterai.github.io",
    "url": "https://taterai.github.io/Text2Image-Generator.html",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tdirectory.me",
    "url": "https://tdirectory.me/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "teamforeveronline.wixsite.com",
    "url": "https://teamforeveronline.wixsite.com/home",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "techbooksforfree.com",
    "url": "https://techbooksforfree.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "techlore.tech",
    "url": "https://techlore.tech/vpn",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "technitium.com",
    "url": "https://technitium.com/dns",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "techtoroms.com",
    "url": "https://techtoroms.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "teldrive-docs.pages.dev",
    "url": "https://teldrive-docs.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "telegra.ph",
    "url": "https://telegra.ph/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "telemelt.com",
    "url": "https://telemelt.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "telesco.pe",
    "url": "https://telesco.pe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "telescope.ac",
    "url": "https://telescope.ac/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "telewizjada.cc",
    "url": "https://telewizjada.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "temp.kotol.cloud",
    "url": "https://temp.kotol.cloud/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "temp.sh",
    "url": "https://temp.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "templatelab.com",
    "url": "https://templatelab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "templetoons.com",
    "url": "https://templetoons.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tenacityaudio.org",
    "url": "https://tenacityaudio.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tennisstream.net",
    "url": "https://tennisstream.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tennisstreams.me",
    "url": "https://tennisstreams.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tensortrust.ai",
    "url": "https://tensortrust.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tetr.io",
    "url": "https://tetr.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tetris.com",
    "url": "https://tetris.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tetw.org",
    "url": "https://tetw.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "texstudio.org",
    "url": "https://texstudio.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "text.is",
    "url": "https://text.is/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textanim.com",
    "url": "https://textanim.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textcleaner.net",
    "url": "https://textcleaner.net/all-tools/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "text-compare.com",
    "url": "https://text-compare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textfx.withgoogle.com",
    "url": "https://textfx.withgoogle.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textmechanic.com",
    "url": "https://textmechanic.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textpro.me",
    "url": "https://textpro.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "texttohandwriting.com",
    "url": "https://texttohandwriting.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "textusm.com",
    "url": "https://textusm.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tf2classic.com",
    "url": "https://tf2classic.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thatguyedd.github.io",
    "url": "https://thatguyedd.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thatiemsz.github.io",
    "url": "https://thatiemsz.github.io/Discord-Emoji-Downloader/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thatoneprivacysite.xyz",
    "url": "https://thatoneprivacysite.xyz/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "th-ch.github.io",
    "url": "https://th-ch.github.io/youtube-music/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theanarchistlibrary.org",
    "url": "https://theanarchistlibrary.org/special/index",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thebiem.com",
    "url": "https://thebiem.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theblankscans.com",
    "url": "https://theblankscans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "the-circle.app",
    "url": "https://the-circle.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thedaddy.dad",
    "url": "https://thedaddy.dad/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "the-eye.eu",
    "url": "https://the-eye.eu/redarcs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "the-eye.eu",
    "url": "https://the-eye.eu/tasra/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "the-federation.info",
    "url": "https://the-federation.info/platform/26",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thefeedreaderbot.com",
    "url": "https://thefeedreaderbot.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thegigabrain.com",
    "url": "https://thegigabrain.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thegoodlineheight.com",
    "url": "https://thegoodlineheight.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theindex.moe",
    "url": "https://theindex.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theislam360.com",
    "url": "https://theislam360.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "themfire.pro",
    "url": "https://themfire.pro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "themixingbowl.org",
    "url": "https://themixingbowl.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thenewoil.org",
    "url": "https://thenewoil.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theonestopradio.com",
    "url": "https://theonestopradio.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theotherpages.org",
    "url": "https://theotherpages.org/quote.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thepiratebay.org",
    "url": "https://thepiratebay.org/search.php?q=top100:100",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "therace.montblancexplorer.com",
    "url": "https://therace.montblancexplorer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "therace.montblanclegend.com",
    "url": "https://therace.montblanclegend.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "therokuchannel.roku.com",
    "url": "https://therokuchannel.roku.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theromdepot.com",
    "url": "https://theromdepot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theshfl.com",
    "url": "https://theshfl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theshowgrid.com",
    "url": "https://theshowgrid.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thesilentlibrary.com",
    "url": "https://thesilentlibrary.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thestreamhub.xyz",
    "url": "https://thestreamhub.xyz/live_tv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thetvapp.to",
    "url": "https://thetvapp.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "theuser.cloud",
    "url": "https://theuser.cloud/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thewh1teagle.github.io",
    "url": "https://thewh1teagle.github.io/vibe/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thewhitenoisemachine.com",
    "url": "https://thewhitenoisemachine.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thewiki.moe",
    "url": "https://thewiki.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thirteenag.github.io",
    "url": "https://thirteenag.github.io/wfp",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thorium.edrlab.org",
    "url": "https://thorium.edrlab.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "threadreaderapp.com",
    "url": "https://threadreaderapp.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thunderstore.io",
    "url": "https://thunderstore.io/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tiddlywiki.com",
    "url": "https://tiddlywiki.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tierify.app",
    "url": "https://tierify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tildearrow.org",
    "url": "https://tildearrow.org/furnace/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tilderadio.org",
    "url": "https://tilderadio.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "timesoccertv.com",
    "url": "https://timesoccertv.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "timstreams.cfd",
    "url": "https://timstreams.cfd/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "timstreams.online",
    "url": "https://timstreams.online/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "timstreams.xyz",
    "url": "https://timstreams.xyz/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tinybones.pages.dev",
    "url": "https://tinybones.pages.dev/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tinylist.app",
    "url": "https://tinylist.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "titaniumnetwork.org",
    "url": "https://titaniumnetwork.org/services/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "titantv.com",
    "url": "https://titantv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tiwylt.musimap.io",
    "url": "https://tiwylt.musimap.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tix.tax",
    "url": "https://tix.tax/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tiz-cycling.tv",
    "url": "https://tiz-cycling.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "to-do.office.com",
    "url": "https://to-do.office.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "todoist.com",
    "url": "https://todoist.com/downloads/extensions",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "todozero.com",
    "url": "https://todozero.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "toffeeshare.com",
    "url": "https://toffeeshare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tokybook.com",
    "url": "https://tokybook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tones.wolfram.com",
    "url": "https://tones.wolfram.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tooldriveproject.net",
    "url": "https://tooldriveproject.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tools.stefankueng.com",
    "url": "https://tools.stefankueng.com/SKTimeStamp.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "toolscord.com",
    "url": "https://toolscord.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "toonily.com",
    "url": "https://toonily.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "top.gg",
    "url": "https://top.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "topdjmixes.com",
    "url": "https://topdjmixes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "topmanhua.com",
    "url": "https://topmanhua.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "topostext.org",
    "url": "https://topostext.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torinak.com",
    "url": "https://torinak.com/qaop/games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torrent-games.games",
    "url": "https://torrent-games.games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torrent-games.net",
    "url": "https://torrent-games.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torrentleech.org",
    "url": "https://torrentleech.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torrentmac.net",
    "url": "https://torrentmac.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torrents.torrentech.org",
    "url": "https://torrents.torrentech.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "torzu.dev",
    "url": "https://torzu.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tosdr.org",
    "url": "https://tosdr.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "totalsportek.at",
    "url": "https://totalsportek.at/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "totalsportek.me",
    "url": "https://totalsportek.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tox.chat",
    "url": "https://tox.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trace.moe",
    "url": "https://trace.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trackerhub.cx",
    "url": "https://trackerhub.cx/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trackid.net",
    "url": "https://trackid.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "transfer.it",
    "url": "https://transfer.it/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "transfer.pcloud.com",
    "url": "https://transfer.pcloud.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "transfonter.org",
    "url": "https://transfonter.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "translate.google.com",
    "url": "https://translate.google.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "translate.google.com",
    "url": "https://translate.google.com/intl/en/about/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "translate.kagi.com",
    "url": "https://translate.kagi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "translate.yandex.com",
    "url": "https://translate.yandex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "translator.bookfere.com",
    "url": "https://translator.bookfere.com",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "transreads.org",
    "url": "https://transreads.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trends24.in",
    "url": "https://trends24.in/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trevor.shinyapps.io",
    "url": "https://trevor.shinyapps.io/subalgebra/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tria.ge",
    "url": "https://tria.ge/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "triahgames.com",
    "url": "https://triahgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trikatuka.aknakn.eu",
    "url": "https://trikatuka.aknakn.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "trilarion.github.io",
    "url": "https://trilarion.github.io/opensourcegames/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "truesteamachievements.com",
    "url": "https://truesteamachievements.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tsumino.com",
    "url": "https://tsumino.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ttsopenai.com",
    "url": "https://ttsopenai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tubi.tv",
    "url": "https://tubi.tv/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tumblthreeapp.github.io",
    "url": "https://tumblthreeapp.github.io/TumblThree/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tunebat.com",
    "url": "https://tunebat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tunein.com",
    "url": "https://tunein.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tuneyou.com",
    "url": "https://tuneyou.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "turboscribe.ai",
    "url": "https://turboscribe.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tuta.com",
    "url": "https://tuta.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tv.garden",
    "url": "https://tv.garden/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tv.jest.one",
    "url": "https://tv.jest.one/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tv.tflix.app",
    "url": "https://tv.tflix.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tvchart.benmiz.com",
    "url": "https://tvchart.benmiz.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tvcharts.co",
    "url": "https://tvcharts.co/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tvpass.org",
    "url": "https://tvpass.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tvplayer.com",
    "url": "https://tvplayer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tvradiotuner.com",
    "url": "https://tvradiotuner.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twcclassics.com",
    "url": "https://twcclassics.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twinery.org",
    "url": "https://twinery.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twintaillauncher.app",
    "url": "https://twintaillauncher.app/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twistedwave.com",
    "url": "https://twistedwave.com/online",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twitchemotes.com",
    "url": "https://twitchemotes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twitchrss.appspot.com",
    "url": "https://twitchrss.appspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twitsave.com",
    "url": "https://twitsave.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "twstalker.com",
    "url": "https://twstalker.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "txt.fyi",
    "url": "https://txt.fyi/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typ.ing",
    "url": "https://typ.ing/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typ.io",
    "url": "https://typ.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typedesignresources.com",
    "url": "https://typedesignresources.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typefully.com",
    "url": "https://typefully.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typefully.com",
    "url": "https://typefully.com/minimal-twitter",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typersguild.com",
    "url": "https://typersguild.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typetrials.com",
    "url": "https://typetrials.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typing.works",
    "url": "https://typing.works/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typings.gg",
    "url": "https://typings.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typo.polona.pl",
    "url": "https://typo.polona.pl/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "typst.app",
    "url": "https://typst.app/home",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "tytel.org",
    "url": "https://tytel.org/helm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "uberduck.ai",
    "url": "https://uberduck.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ubg365.github.io",
    "url": "https://ubg365.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ublockorigin.com",
    "url": "https://ublockorigin.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "uevr.io",
    "url": "https://uevr.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ufcstream.me",
    "url": "https://ufcstream.me/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ufdc.ufl.edu",
    "url": "https://ufdc.ufl.edu/juv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ufile.io",
    "url": "https://ufile.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ukradiolive.com",
    "url": "https://ukradiolive.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ultimateelectronicsbook.com",
    "url": "https://ultimateelectronicsbook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ultrabox.github.io",
    "url": "https://ultrabox.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "uncut.wtf",
    "url": "https://uncut.wtf/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "undergroundgames.net",
    "url": "https://undergroundgames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unenc.com",
    "url": "https://unenc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unglue.it",
    "url": "https://unglue.it/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unheard.fm",
    "url": "https://unheard.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unhook.app",
    "url": "https://unhook.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unicode-explorer.com",
    "url": "https://unicode-explorer.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unifoundry.com",
    "url": "https://unifoundry.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unifycosmos.com",
    "url": "https://unifycosmos.com/relaxing-sounds/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "union-crax.xyz",
    "url": "https://union-crax.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "universal-bypass.org",
    "url": "https://universal-bypass.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "universalsans.com",
    "url": "https://universalsans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unrar.online",
    "url": "https://unrar.online/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "untrap.app",
    "url": "https://untrap.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "unzip-online.com",
    "url": "https://unzip-online.com/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "upbeatradio.net",
    "url": "https://upbeatradio.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "upload.disroot.org",
    "url": "https://upload.disroot.org/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "uploadnow.io",
    "url": "https://uploadnow.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "upx.github.io",
    "url": "https://upx.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "upzur.com",
    "url": "https://upzur.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "url-decode.com",
    "url": "https://url-decode.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "urlebird.com",
    "url": "https://urlebird.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "urlscan.io",
    "url": "https://urlscan.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "uselinked.com",
    "url": "https://uselinked.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "usememos.com",
    "url": "https://usememos.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "usersdrive.com",
    "url": "https://usersdrive.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ustvgo.click",
    "url": "https://ustvgo.click/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ustvgo.tv",
    "url": "https://ustvgo.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "v0.dev",
    "url": "https://v0.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "v1.gostreameast.link",
    "url": "https://v1.gostreameast.link/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "v2.hysteria.network",
    "url": "https://v2.hysteria.network/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "v2.sherpa.ac.uk",
    "url": "https://v2.sherpa.ac.uk/opendoar/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "v2.sportsurge.net",
    "url": "https://v2.sportsurge.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "valvearchive.com",
    "url": "https://valvearchive.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vangoghletters.org",
    "url": "https://vangoghletters.org/vg/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vapor.my",
    "url": "https://vapor.my/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vaporarchive.neocities.org",
    "url": "https://vaporarchive.neocities.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vaughn.live",
    "url": "https://vaughn.live/browse/misc",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vault.fbi.gov",
    "url": "https://vault.fbi.gov/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vault.gearvr.net",
    "url": "https://vault.gearvr.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vba-m.com",
    "url": "https://vba-m.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vcvrack.com",
    "url": "https://vcvrack.com/Rack",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vdoc.pub",
    "url": "https://vdoc.pub/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vedabase.io",
    "url": "https://vedabase.io/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vegamovies.gmbh",
    "url": "https://vegamovies.gmbh/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "veloratv.ru",
    "url": "https://veloratv.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "velvetyne.fr",
    "url": "https://velvetyne.fr/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vencord.dev",
    "url": "https://vencord.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "veridiansoftware.com",
    "url": "https://veridiansoftware.com/collections/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "versefy.app",
    "url": "https://versefy.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vert.sh",
    "url": "https://vert.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vetbooks.ir",
    "url": "https://vetbooks.ir/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vetusware.com",
    "url": "https://vetusware.com/category/Games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "v-fonts.com",
    "url": "https://v-fonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vgm.mmosvc.com",
    "url": "https://vgm.mmosvc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vgmdb.net",
    "url": "https://vgmdb.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vgmradio.com",
    "url": "https://vgmradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vgmrips.net",
    "url": "https://vgmrips.net/packs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vibrancegui.com",
    "url": "https://vibrancegui.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vidbox.to",
    "url": "https://vidbox.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vidbox.to",
    "url": "https://vidbox.to/radio",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "viddit.red",
    "url": "https://viddit.red/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "videogamemods.com",
    "url": "https://videogamemods.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "videorecap.viewodyssey.com",
    "url": "https://videorecap.viewodyssey.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vidiq.com",
    "url": "https://vidiq.com/extension/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vifm.info",
    "url": "https://vifm.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vikingfile.com",
    "url": "https://vikingfile.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vikunja.io",
    "url": "https://vikunja.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vimm.net",
    "url": "https://vimm.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "violentmonkey.github.io",
    "url": "https://violentmonkey.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vipleague.im",
    "url": "https://vipleague.im/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vipotv.com",
    "url": "https://vipotv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "virgil.samidy.com",
    "url": "https://virgil.samidy.com/Game-search/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "virtocean.com",
    "url": "https://virtocean.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "virtualconsoles.com",
    "url": "https://virtualconsoles.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "virtualpiano.net",
    "url": "https://virtualpiano.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "virusscan.jotti.org",
    "url": "https://virusscan.jotti.org/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "virustotal.github.io",
    "url": "https://virustotal.github.io/yara/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vita3k.org",
    "url": "https://vita3k.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vital.audio",
    "url": "https://vital.audio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vivago.ai",
    "url": "https://vivago.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vizzy.io",
    "url": "https://vizzy.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vk.com",
    "url": "https://vk.com/bookstagram_eng",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vk.com",
    "url": "https://vk.com/conceptart",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vk.com",
    "url": "https://vk.com/engnewspapers",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vk.com",
    "url": "https://vk.com/non_fic",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vk.com",
    "url": "https://vk.com/vgartbooks",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vkvideo.ru",
    "url": "https://vkvideo.ru/@miselet",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vndb.org",
    "url": "https://vndb.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vo.odgn.net",
    "url": "https://vo.odgn.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vocal.media",
    "url": "https://vocal.media/fiction/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vocali.se",
    "url": "https://vocali.se/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vocalremover.org",
    "url": "https://vocalremover.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vocaroo.com",
    "url": "https://vocaroo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vodarchive.com",
    "url": "https://vodarchive.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "voicecontrol.chat",
    "url": "https://voicecontrol.chat/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "voice-models.com",
    "url": "https://voice-models.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "voicenotebook.com",
    "url": "https://voicenotebook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "voicetotext.org",
    "url": "https://voicetotext.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "voidscans.com",
    "url": "https://voidscans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "voidtools.com",
    "url": "https://voidtools.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "volleyballstreams.net",
    "url": "https://volleyballstreams.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "volume.com",
    "url": "https://volume.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vorapis.pages.dev",
    "url": "https://vorapis.pages.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vpn.net",
    "url": "https://vpn.net/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vpnpro.com",
    "url": "https://vpnpro.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vrpirates.club",
    "url": "https://vrpirates.club/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vrpirates.wiki",
    "url": "https://vrpirates.wiki/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "vtuner.com",
    "url": "https://vtuner.com/setupapp/guide/asp/BrowseStations/startpage.asp",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wan.video",
    "url": "https://wan.video/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wanderers-library.wikidot.com",
    "url": "https://wanderers-library.wikidot.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wario-land.github.io",
    "url": "https://wario-land.github.io/HackVault/index.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "warmplace.ru",
    "url": "https://warmplace.ru/soft/sunvox/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "warshipsresearch.blogspot.com",
    "url": "https://warshipsresearch.blogspot.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watabou.itch.io",
    "url": "https://watabou.itch.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watch.plex.tv",
    "url": "https://watch.plex.tv/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watch.sling.com",
    "url": "https://watch.sling.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watch.spencerdevs.xyz",
    "url": "https://watch.spencerdevs.xyz/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchf1full.com",
    "url": "https://watchf1full.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchmmafull.com",
    "url": "https://watchmmafull.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchnewslive.tv",
    "url": "https://watchnewslive.tv/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchprowrestlings.live",
    "url": "https://watchprowrestlings.live/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchreplay.net",
    "url": "https://watchreplay.net/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchsports.to",
    "url": "https://watchsports.to/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchwrestling.ae",
    "url": "https://watchwrestling.ae/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watch-wrestling.eu",
    "url": "https://watch-wrestling.eu/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchwrestling.la",
    "url": "https://watchwrestling.la/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchwrestling.st",
    "url": "https://watchwrestling.st/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "watchwrestling.wtf",
    "url": "https://watchwrestling.wtf/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wattpad.com",
    "url": "https://wattpad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wavacity.com",
    "url": "https://wavacity.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "waveformer.replicate.dev",
    "url": "https://waveformer.replicate.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wavetracker.org",
    "url": "https://wavetracker.org/",
    "category": "torrenty",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wavian.com",
    "url": "https://wavian.com/font-list.html",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wearechecking.online",
    "url": "https://wearechecking.online/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "thetrove.is",
    "url": "https://web.archive.org/web/20210614215400/https://thetrove.is/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "cdn.discordapp.com",
    "url": "https://web.archive.org/web/20230729100139/https://cdn.discordapp.com/attachments/689605845058715801/862281806820278292/Snow.zip",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "web.libretro.com",
    "url": "https://web.libretro.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "web.lmarena.ai",
    "url": "https://web.lmarena.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "webextension.org",
    "url": "https://webextension.org/listing/chrome-reader-view.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "webkay.robinlinus.com",
    "url": "https://webkay.robinlinus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "webosumania.com",
    "url": "https://webosumania.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "webrecorder.net",
    "url": "https://webrecorder.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "websites.umich.edu",
    "url": "https://websites.umich.edu/~archive/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "webtopdf.com",
    "url": "https://webtopdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "webwormhole.io",
    "url": "https://webwormhole.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wecapable.com",
    "url": "https://wecapable.com/braille-translator/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wecapable.com",
    "url": "https://wecapable.com/tools/text-to-sign-language-converter/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "weebcentral.com",
    "url": "https://weebcentral.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "weights.com",
    "url": "https://weights.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "welib.org",
    "url": "https://welib.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "weloma.art",
    "url": "https://weloma.art/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "weplaydos.games",
    "url": "https://weplaydos.games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "west.io",
    "url": "https://west.io/news-feed-eradicator/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "westechsolutions.net",
    "url": "https://westechsolutions.net/sites/WindowedBorderlessGaming/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wfonts.com",
    "url": "https://wfonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wgdashboard.dev",
    "url": "https://wgdashboard.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whatfonttool.com",
    "url": "https://whatfonttool.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whatslink.info",
    "url": "https://whatslink.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whatsmybitrate.com",
    "url": "https://whatsmybitrate.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whattowatchon.tv",
    "url": "https://whattowatchon.tv/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whimsical.com",
    "url": "https://whimsical.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whitemagic.github.io",
    "url": "https://whitemagic.github.io/JoystickGremlin/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wholeearth.info",
    "url": "https://wholeearth.info/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whopostedwhat.com",
    "url": "https://whopostedwhat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "whos-zycher.github.io",
    "url": "https://whos-zycher.github.io/opsec-guide/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wickbot.com",
    "url": "https://wickbot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiesenthal.github.io",
    "url": "https://wiesenthal.github.io/SubjectiveSort/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiki.axekin.com",
    "url": "https://wiki.axekin.com/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiki.gg",
    "url": "https://wiki.gg/wikis/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiki.hydrogenaud.io",
    "url": "https://wiki.hydrogenaud.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiki.restarters.net",
    "url": "https://wiki.restarters.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wikia.schneedc.com",
    "url": "https://wikia.schneedc.com/bot-creation/intro",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiki-index.pages.dev",
    "url": "https://wiki-index.pages.dev/base64/#daddylive-proxy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wiktenauer.com",
    "url": "https://wiktenauer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "willow.arlen.icu",
    "url": "https://willow.arlen.icu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "win7games.com",
    "url": "https://win7games.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wincdemu.sysprogs.org",
    "url": "https://wincdemu.sysprogs.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "windjview.sourceforge.io",
    "url": "https://windjview.sourceforge.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "windscribe.com",
    "url": "https://windscribe.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "windscribe.com",
    "url": "https://windscribe.com/browser-extensions",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "winscp.net",
    "url": "https://winscp.net/eng/index.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wire.com",
    "url": "https://wire.com/en/download/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wkhtmltopdf.org",
    "url": "https://wkhtmltopdf.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "woe-industries.itch.io",
    "url": "https://woe-industries.itch.io/you-have-not-died-of-dysentery",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wolnelektury.pl",
    "url": "https://wolnelektury.pl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldnews24.tv",
    "url": "https://worldnews24.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "world-newspapers.com",
    "url": "https://world-newspapers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldofpcgames.com",
    "url": "https://worldofpcgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldof-pcgames.net",
    "url": "https://worldof-pcgames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldofspectrum.org",
    "url": "https://worldofspectrum.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldradiohistory.com",
    "url": "https://worldradiohistory.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldradiomap.com",
    "url": "https://worldradiomap.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "worldsbiggestpacman.com",
    "url": "https://worldsbiggestpacman.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wormhole.app",
    "url": "https://wormhole.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wotaku.wiki",
    "url": "https://wotaku.wiki/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wotaku.wiki",
    "url": "https://wotaku.wiki/games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wotaku.wiki",
    "url": "https://wotaku.wiki/glossary/audio",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wowroms.com",
    "url": "https://wowroms.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wowroms.com",
    "url": "https://wowroms.com/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wrestlingnetwork.tv",
    "url": "https://wrestlingnetwork.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "write.as",
    "url": "https://write.as/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "write-box.appspot.com",
    "url": "https://write-box.appspot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "writedown.app",
    "url": "https://writedown.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "writemonkey.com",
    "url": "https://writemonkey.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "writexo.com",
    "url": "https://writexo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.0nradio.com",
    "url": "https://www.0nradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.1001fonts.com",
    "url": "https://www.1001fonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.1001freefonts.com",
    "url": "https://www.1001freefonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.1001tracklists.com",
    "url": "https://www.1001tracklists.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.101soundboards.com",
    "url": "https://www.101soundboards.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.1aradio.com",
    "url": "https://www.1aradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.1shows.ru",
    "url": "https://www.1shows.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.2muslims.com",
    "url": "https://www.2muslims.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.2pdfconverter.com",
    "url": "https://www.2pdfconverter.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.365scores.com",
    "url": "https://www.365scores.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.45cat.com",
    "url": "https://www.45cat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.4chan-x.net",
    "url": "https://www.4chan-x.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.4everproxy.com",
    "url": "https://www.4everproxy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.4webm.org",
    "url": "https://www.4webm.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.7-zip.org",
    "url": "https://www.7-zip.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.8bbit.com",
    "url": "https://www.8bbit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.8notes.com",
    "url": "https://www.8notes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.abandonwaredos.com",
    "url": "https://www.abandonwaredos.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.abc.net.au",
    "url": "https://www.abc.net.au/news/newschannel/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.abstractfonts.com",
    "url": "https://www.abstractfonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.abstractspoon.com",
    "url": "https://www.abstractspoon.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.academia.edu",
    "url": "https://www.academia.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.acclaimedmusic.net",
    "url": "https://www.acclaimedmusic.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.accuradio.com",
    "url": "https://www.accuradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.accuraterip.com",
    "url": "https://www.accuraterip.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.aconvert.com",
    "url": "https://www.aconvert.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.addictinggames.com",
    "url": "https://www.addictinggames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.adobe.com",
    "url": "https://www.adobe.com/acrobat/online/sign-pdf.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.adobe.com",
    "url": "https://www.adobe.com/products/audition/offers/AdobeAuditionDLCSFX.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.adobe.com",
    "url": "https://www.adobe.com/solutions/ebook/digital-editions/download.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.adultswim.com",
    "url": "https://www.adultswim.com/videos/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.advancedrenamer.com",
    "url": "https://www.advancedrenamer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.agorawriter.com",
    "url": "https://www.agorawriter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.aha-music.com",
    "url": "https://www.aha-music.com/identify-songs-music-recognition-online",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.aimp.ru",
    "url": "https://www.aimp.ru/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.airwindows.com",
    "url": "https://www.airwindows.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.akouradio.com",
    "url": "https://www.akouradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.albinoblacksheep.com",
    "url": "https://www.albinoblacksheep.com/games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.albumoftheyear.org",
    "url": "https://www.albumoftheyear.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.alexandria.ucsb.edu",
    "url": "https://www.alexandria.ucsb.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.alfy.com",
    "url": "https://www.alfy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.aljazeera.com",
    "url": "https://www.aljazeera.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.allaboutcircuits.com",
    "url": "https://www.allaboutcircuits.com/education/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.all-hands.dev",
    "url": "https://www.all-hands.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.allmusic.com",
    "url": "https://www.allmusic.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.allmyroms.net",
    "url": "https://www.allmyroms.net/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.allthebestfights.com",
    "url": "https://www.allthebestfights.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.allvoicelab.com",
    "url": "https://www.allvoicelab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.alternatehistory.com",
    "url": "https://www.alternatehistory.com/forum/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.alternate-tools.com",
    "url": "https://www.alternate-tools.com/pages/c_fileshredder.php?lang=ENG",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.amazon.com",
    "url": "https://www.amazon.com/kindle-dbs/fd/kcp",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ambient-mixer.com",
    "url": "https://www.ambient-mixer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.amd.com",
    "url": "https://www.amd.com/en/products/software/ryzen-master.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.amp-what.com",
    "url": "https://www.amp-what.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.amuse-ai.com",
    "url": "https://www.amuse-ai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anarchistfaq.org",
    "url": "https://www.anarchistfaq.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.androeed.ru",
    "url": "https://www.androeed.ru/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.androidtv-guide.com",
    "url": "https://www.androidtv-guide.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.andropalace.org",
    "url": "https://www.andropalace.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anime2enjoy.com",
    "url": "https://www.anime2enjoy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animecharactersdatabase.com",
    "url": "https://www.animecharactersdatabase.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animechiby.com",
    "url": "https://www.animechiby.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animeddl.xyz",
    "url": "https://www.animeddl.xyz/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animefillerlist.com",
    "url": "https://www.animefillerlist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animemusicvideos.org",
    "url": "https://www.animemusicvideos.org/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animenewsnetwork.com",
    "url": "https://www.animenewsnetwork.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animeout.xyz",
    "url": "https://www.animeout.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animeparadise.moe",
    "url": "https://www.animeparadise.moe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anime-planet.com",
    "url": "https://www.anime-planet.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.animerealms.org",
    "url": "https://www.animerealms.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anime-sharing.com",
    "url": "https://www.anime-sharing.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anisearch.com",
    "url": "https://www.anisearch.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.anobii.com",
    "url": "https://www.anobii.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ansilove.org",
    "url": "https://www.ansilove.org/downloads.html",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.answeroverflow.com",
    "url": "https://www.answeroverflow.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.antp.be",
    "url": "https://www.antp.be/software/renamer",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.apkmirror.com",
    "url": "https://www.apkmirror.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.apple.com",
    "url": "https://www.apple.com/ios/books/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.apress.com",
    "url": "https://www.apress.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.arcadeprehacks.com",
    "url": "https://www.arcadeprehacks.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.archeophone.org",
    "url": "https://www.archeophone.org/html/languages/en/index.en.html",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.archivepdf.net",
    "url": "https://www.archivepdf.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.are.na",
    "url": "https://www.are.na/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.arirangtv.com",
    "url": "https://www.arirangtv.com/live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.arkadium.com",
    "url": "https://www.arkadium.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.arrrtype.com",
    "url": "https://www.arrrtype.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.arte.tv",
    "url": "https://www.arte.tv/en/live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.artstation.com",
    "url": "https://www.artstation.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.asahi-net.or.jp",
    "url": "https://www.asahi-net.or.jp/~cs8k-cyu/browser.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.asciiart.eu",
    "url": "https://www.asciiart.eu/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ascii-art-generator.org",
    "url": "https://www.ascii-art-generator.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.astrumargenteum.org",
    "url": "https://www.astrumargenteum.org/library/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.asurascans.com",
    "url": "https://www.asurascans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.asus.com",
    "url": "https://www.asus.com/campaign/GPU-Tweak-III/index.php",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.atarimagazines.com",
    "url": "https://www.atarimagazines.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.atarimania.com",
    "url": "https://www.atarimania.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.atmadharma.com",
    "url": "https://www.atmadharma.com/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.audacityteam.org",
    "url": "https://www.audacityteam.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.audible.com",
    "url": "https://www.audible.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.audiobookshelf.org",
    "url": "https://www.audiobookshelf.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.augmented-steam.com",
    "url": "https://www.augmented-steam.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.auto-brochures.com",
    "url": "https://www.auto-brochures.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.avast.com",
    "url": "https://www.avast.com/en-us/avast-online-security",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.awakening-intuition.com",
    "url": "https://www.awakening-intuition.com/ebooks.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.awwwards.com",
    "url": "https://www.awwwards.com/awwwards/collections/free-fonts/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.axekin.com",
    "url": "https://www.axekin.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.azirevpn.com",
    "url": "https://www.azirevpn.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.azlyrics.com",
    "url": "https://www.azlyrics.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.azquotes.com",
    "url": "https://www.azquotes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.backblaze.com",
    "url": "https://www.backblaze.com/cloud-storage/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.baen.com",
    "url": "https://www.baen.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.baen.com",
    "url": "https://www.baen.com/catalog/category/view/s/free-library/id/2012",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bandlab.com",
    "url": "https://www.bandlab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bandlab.com",
    "url": "https://www.bandlab.com/sounds/packs",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bandlab.com",
    "url": "https://www.bandlab.com/splitter",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.base64decode.org",
    "url": "https://www.base64decode.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.base-search.net",
    "url": "https://www.base-search.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bbc.co.uk",
    "url": "https://www.bbc.co.uk/iplayer/live/bbcone",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bbc.co.uk",
    "url": "https://www.bbc.co.uk/orbitmusic",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bbc.co.uk",
    "url": "https://www.bbc.co.uk/sounds",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bbc.co.uk",
    "url": "https://www.bbc.co.uk/sounds/podcasts",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bbc.com",
    "url": "https://www.bbc.com/sport",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.beatsync.gg",
    "url": "https://www.beatsync.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.beepbox.co",
    "url": "https://www.beepbox.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bespokesynth.com",
    "url": "https://www.bespokesynth.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.best-books.dev",
    "url": "https://www.best-books.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.besteveralbums.com",
    "url": "https://www.besteveralbums.com/index.php",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bestmp3converter.com",
    "url": "https://www.bestmp3converter.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bestoldgames.net",
    "url": "https://www.bestoldgames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.beyondallreason.info",
    "url": "https://www.beyondallreason.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bfxr.net",
    "url": "https://www.bfxr.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bibcit.com",
    "url": "https://www.bibcit.com/en/massivemark",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bible.com",
    "url": "https://www.bible.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.biblegateway.com",
    "url": "https://www.biblegateway.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bibliotecapleyades.net",
    "url": "https://www.bibliotecapleyades.net/esp_tema.htm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bing.com",
    "url": "https://www.bing.com/images/create",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bing.com",
    "url": "https://www.bing.com/translator",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.binisoft.org",
    "url": "https://www.binisoft.org/wfc.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.biomedcentral.com",
    "url": "https://www.biomedcentral.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.biorxiv.org",
    "url": "https://www.biorxiv.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bitdefender.com",
    "url": "https://www.bitdefender.com/solutions/trafficlight.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.blackbox.ai",
    "url": "https://www.blackbox.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.blacktwist.app",
    "url": "https://www.blacktwist.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bleepingcomputer.com",
    "url": "https://www.bleepingcomputer.com/download/farbar-recovery-scan-tool/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bleepingcomputer.com",
    "url": "https://www.bleepingcomputer.com/forums/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.blockaway.net",
    "url": "https://www.blockaway.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.blocktube.app",
    "url": "https://www.blocktube.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.blomp.com",
    "url": "https://www.blomp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bloomberg.com",
    "url": "https://www.bloomberg.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.blueroms.ws",
    "url": "https://www.blueroms.ws/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bohrium.com",
    "url": "https://www.bohrium.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bolidesoft.com",
    "url": "https://www.bolidesoft.com/allmybooks.html",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bookdepository.com",
    "url": "https://www.bookdepository.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bookfrom.net",
    "url": "https://www.bookfrom.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bookgoldmine.com",
    "url": "https://www.bookgoldmine.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.booksie.com",
    "url": "https://www.booksie.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bookstackapp.com",
    "url": "https://www.bookstackapp.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bookviser.com",
    "url": "https://www.bookviser.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.borgbackup.org",
    "url": "https://www.borgbackup.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.braggoscope.com",
    "url": "https://www.braggoscope.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.brainyquote.com",
    "url": "https://www.brainyquote.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.brew.fm",
    "url": "https://www.brew.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.broadcastify.com",
    "url": "https://www.broadcastify.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.brokensilenze.net",
    "url": "https://www.brokensilenze.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bulkrenameutility.co.uk",
    "url": "https://www.bulkrenameutility.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.bulletpapers.ai",
    "url": "https://www.bulletpapers.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.calligrapher.ai",
    "url": "https://www.calligrapher.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.calligraphr.com",
    "url": "https://www.calligraphr.com/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.calmsound.com",
    "url": "https://www.calmsound.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.campus-fm.com",
    "url": "https://www.campus-fm.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.candlapp.com",
    "url": "https://www.candlapp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.canvasdownloader.com",
    "url": "https://www.canvasdownloader.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.capframex.com",
    "url": "https://www.capframex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.carpdfmanual.com",
    "url": "https://www.carpdfmanual.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.carpeludum.com",
    "url": "https://www.carpeludum.com/kega-fusion/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cbsnews.com",
    "url": "https://www.cbsnews.com/live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ccel.org",
    "url": "https://www.ccel.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cdnfonts.com",
    "url": "https://www.cdnfonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.celtx.com",
    "url": "https://www.celtx.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cg-gamespc.com",
    "url": "https://www.cg-gamespc.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cgsecurity.org",
    "url": "https://www.cgsecurity.org/wiki/PhotoRec",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cgsecurity.org",
    "url": "https://www.cgsecurity.org/wiki/TestDisk",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cgtn.com",
    "url": "https://www.cgtn.com/tv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cgwmuseum.org",
    "url": "https://www.cgwmuseum.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.channel4.com",
    "url": "https://www.channel4.com/now",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.channel5.com",
    "url": "https://www.channel5.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.channelnewsasia.com",
    "url": "https://www.channelnewsasia.com/watch",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chartmymusic.com",
    "url": "https://www.chartmymusic.com/lastfm/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chartmymusic.com",
    "url": "https://www.chartmymusic.com/spotify/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chatjams.ai",
    "url": "https://www.chatjams.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chatpdf.com",
    "url": "https://www.chatpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cheatengine.org",
    "url": "https://www.cheatengine.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cheatengine.org",
    "url": "https://www.cheatengine.org/forum/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cheathappens.com",
    "url": "https://www.cheathappens.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cheatmsx.com",
    "url": "https://www.cheatmsx.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chessprogramming.org",
    "url": "https://www.chessprogramming.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.childrensbooksforever.com",
    "url": "https://www.childrensbooksforever.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chirpbooks.com",
    "url": "https://www.chirpbooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chosic.com",
    "url": "https://www.chosic.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.chronocrash.com",
    "url": "https://www.chronocrash.com/forum/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cia.gov",
    "url": "https://www.cia.gov/resources/publications/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cineby.app",
    "url": "https://www.cineby.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cityhop.cafe",
    "url": "https://www.cityhop.cafe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ck12.org",
    "url": "https://www.ck12.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.classicdosgames.com",
    "url": "https://www.classicdosgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.classicgames.me",
    "url": "https://www.classicgames.me/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.classic-rock-covers.com",
    "url": "https://www.classic-rock-covers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.classicrockhistory.com",
    "url": "https://www.classicrockhistory.com/classic-rock-bands-list-and-directory/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.classicube.net",
    "url": "https://www.classicube.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.classroom-6-x.games",
    "url": "https://www.classroom-6-x.games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cleansnap.co",
    "url": "https://www.cleansnap.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cloudflare.com",
    "url": "https://www.cloudflare.com/developer-platform/products/r2/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cloudflare.com",
    "url": "https://www.cloudflare.com/ssl/encrypted-sni/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.clpgs.org.uk",
    "url": "https://www.clpgs.org.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.clubbingtv.com",
    "url": "https://www.clubbingtv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cmoa.jp",
    "url": "https://www.cmoa.jp/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cnn.com",
    "url": "https://www.cnn.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.codacy.com",
    "url": "https://www.codacy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.codesector.com",
    "url": "https://www.codesector.com/teracopy",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.colemak.academy",
    "url": "https://www.colemak.academy/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.colorsandfonts.com",
    "url": "https://www.colorsandfonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.colorzilla.com",
    "url": "https://www.colorzilla.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.commodoregames.net",
    "url": "https://www.commodoregames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.comparetext.io",
    "url": "https://www.comparetext.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.comparitech.com",
    "url": "https://www.comparitech.com/vpn/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.compart.com",
    "url": "https://www.compart.com/en/unicode",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.compucalitv.com",
    "url": "https://www.compucalitv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.computec.ch",
    "url": "https://www.computec.ch/projekte/browserrecon/?s=scan",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.concertarchives.org",
    "url": "https://www.concertarchives.org/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.connectedpapers.com",
    "url": "https://www.connectedpapers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.consoleROMs.com",
    "url": "https://www.consoleROMs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.constituteproject.org",
    "url": "https://www.constituteproject.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.convertcsv.com",
    "url": "https://www.convertcsv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.convertfiles.com",
    "url": "https://www.convertfiles.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.coolmathgames.com",
    "url": "https://www.coolmathgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.coursera.org",
    "url": "https://www.coursera.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.courtlistener.com",
    "url": "https://www.courtlistener.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.crazygames.com",
    "url": "https://www.crazygames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.croxyproxy.com",
    "url": "https://www.croxyproxy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.crunchyroll.com",
    "url": "https://www.crunchyroll.com/comics/manga",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.crunchyroll.com",
    "url": "https://www.crunchyroll.com/videos/anime",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cufonfonts.com",
    "url": "https://www.cufonfonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.customrp.xyz",
    "url": "https://www.customrp.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cutesymbols.net",
    "url": "https://www.cutesymbols.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.cxtvlive.com",
    "url": "https://www.cxtvlive.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dafont.com",
    "url": "https://www.dafont.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dafontfree.co",
    "url": "https://www.dafontfree.co/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.daily.place",
    "url": "https://www.daily.place/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dailyiptvlist.com",
    "url": "https://www.dailyiptvlist.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dataone.org",
    "url": "https://www.dataone.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.datatransfer.com",
    "url": "https://www.datatransfer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dbpedia.org",
    "url": "https://www.dbpedia.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dcode.fr",
    "url": "https://www.dcode.fr/en",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deadpulpit.com",
    "url": "https://www.deadpulpit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deadseascrolls.org.il",
    "url": "https://www.deadseascrolls.org.il/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.decentsamples.com",
    "url": "https://www.decentsamples.com/product/decent-sampler-plugin/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deepl.com",
    "url": "https://www.deepl.com/translator",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deepl.com",
    "url": "https://www.deepl.com/write",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deezer.com",
    "url": "https://www.deezer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.degruyterbrill.com",
    "url": "https://www.degruyterbrill.com/?submittedFilterId=by-type&access_4=open&pageSize=10&sort=datedescending&type_5=book",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.degruyterbrill.com",
    "url": "https://www.degruyterbrill.com/page/2045",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deluxemusic.tv",
    "url": "https://www.deluxemusic.tv/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.den4b.com",
    "url": "https://www.den4b.com/tools/coder",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deviantart.com",
    "url": "https://www.deviantart.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deviantart.com",
    "url": "https://www.deviantart.com/jaxoriginals/art/Keystrokes-v1-3-889349339",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deviantart.com",
    "url": "https://www.deviantart.com/not-finch/art/GameHUB-launcher-2-for-Rainmeter-785369648",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.deviceinfo.me",
    "url": "https://www.deviceinfo.me/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dfonts.org",
    "url": "https://www.dfonts.org/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dfworkshop.net",
    "url": "https://www.dfworkshop.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dhammatalks.org",
    "url": "https://www.dhammatalks.org/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dhushara.com",
    "url": "https://www.dhushara.com/index.htm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.di.fm",
    "url": "https://www.di.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.diffchecker.com",
    "url": "https://www.diffchecker.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.diffnow.com",
    "url": "https://www.diffnow.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.digiparser.com",
    "url": "https://www.digiparser.com/free-tools/pdf",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.digitalbook.io",
    "url": "https://www.digitalbook.io/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.digitaltransgenderarchive.net",
    "url": "https://www.digitaltransgenderarchive.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.diry.ai",
    "url": "https://www.diry.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dirzon.com",
    "url": "https://www.dirzon.com/Doc/SearchAsync",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.discogc.com",
    "url": "https://www.discogc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.discogs.com",
    "url": "https://www.discogs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dnsleaktest.com",
    "url": "https://www.dnsleaktest.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.docsgpt.cloud",
    "url": "https://www.docsgpt.cloud/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.docuseal.com",
    "url": "https://www.docuseal.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dosbox.com",
    "url": "https://www.dosbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dos-games.com",
    "url": "https://www.dos-games.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dosgamesarchive.com",
    "url": "https://www.dosgamesarchive.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.doshaven.eu",
    "url": "https://www.doshaven.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.downloadfonts.io",
    "url": "https://www.downloadfonts.io/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.downloadha.com",
    "url": "https://www.downloadha.com/category/%d8%a8%d8%a7%d8%b2%db%8c-%da%a9%d8%a7%d9%85%d9%be%db%8c%d9%88%d8%aa%d8%b1-pc-computer-game/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.download-helper.net",
    "url": "https://www.download-helper.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.downpour.com",
    "url": "https://www.downpour.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.downthemall.org",
    "url": "https://www.downthemall.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dpgroup.org",
    "url": "https://www.dpgroup.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dr.dk",
    "url": "https://www.dr.dk/drtv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dragonsfoot.org",
    "url": "https://www.dragonsfoot.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.drawize.com",
    "url": "https://www.drawize.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dreamwidth.org",
    "url": "https://www.dreamwidth.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dropbox.com",
    "url": "https://www.dropbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.drumha.us",
    "url": "https://www.drumha.us/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dublab.com",
    "url": "https://www.dublab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.duckstation.org",
    "url": "https://www.duckstation.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.duplicati.com",
    "url": "https://www.duplicati.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.dw.com",
    "url": "https://www.dw.com/en/live-tv/channel-english",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.earlychristianwritings.com",
    "url": "https://www.earlychristianwritings.com/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.earlymoderntexts.com",
    "url": "https://www.earlymoderntexts.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eatthefruit.com",
    "url": "https://www.eatthefruit.com/media-library/pdf-library/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ebookhunter.net",
    "url": "https://www.ebookhunter.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ebooks.com",
    "url": "https://www.ebooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.e-booksdirectory.com",
    "url": "https://www.e-booksdirectory.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.echowalk.com",
    "url": "https://www.echowalk.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.edisk.cz",
    "url": "https://www.edisk.cz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.editcsvonline.com",
    "url": "https://www.editcsvonline.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.editgpt.app",
    "url": "https://www.editgpt.app/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.editthiscookie.com",
    "url": "https://www.editthiscookie.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.edu-games.org",
    "url": "https://www.edu-games.org/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eduke32.com",
    "url": "https://www.eduke32.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.edx.org",
    "url": "https://www.edx.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eff.org",
    "url": "https://www.eff.org/https-everywhere",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eff.org",
    "url": "https://www.eff.org/pages/badger-faq",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eff.org",
    "url": "https://www.eff.org/privacybadger",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eggnog.ai",
    "url": "https://www.eggnog.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.e-ir.info",
    "url": "https://www.e-ir.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.eliashanzer.com",
    "url": "https://www.eliashanzer.com/phase/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emailprivacytester.com",
    "url": "https://www.emailprivacytester.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emojibatch.com",
    "url": "https://www.emojibatch.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emojiengine.com",
    "url": "https://www.emojiengine.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emucr.com",
    "url": "https://www.emucr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emudeck.com",
    "url": "https://www.emudeck.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emugames.net",
    "url": "https://www.emugames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emu-land.net",
    "url": "https://www.emu-land.net/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emulator-zone.com",
    "url": "https://www.emulator-zone.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.emuparadise.me",
    "url": "https://www.emuparadise.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.enhancer-for-youtube.com",
    "url": "https://www.enhancer-for-youtube.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.epsxe.com",
    "url": "https://www.epsxe.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.espn.com",
    "url": "https://www.espn.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.euronews.com",
    "url": "https://www.euronews.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.europeana.eu",
    "url": "https://www.europeana.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.europeana.eu",
    "url": "https://www.europeana.eu/en/collections/topic/18-newspapers",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.evernote.com",
    "url": "https://www.evernote.com/webclipper",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.everyculture.com",
    "url": "https://www.everyculture.com/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.evga.com",
    "url": "https://www.evga.com/precisionx1/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.exactaudiocopy.de",
    "url": "https://www.exactaudiocopy.de/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.excelfunctions.net",
    "url": "https://www.excelfunctions.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.exclassics.com",
    "url": "https://www.exclassics.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.exotica.org.uk",
    "url": "https://www.exotica.org.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.exploitee.rs",
    "url": "https://www.exploitee.rs/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.extractmetadata.com",
    "url": "https://www.extractmetadata.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ezyzip.com",
    "url": "https://www.ezyzip.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.facebook.com",
    "url": "https://www.facebook.com/groups/850609558335839",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fadedpage.com",
    "url": "https://www.fadedpage.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fakemusicgenerator.com",
    "url": "https://www.fakemusicgenerator.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.falcon-bms.com",
    "url": "https://www.falcon-bms.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fanboy.co.nz",
    "url": "https://www.fanboy.co.nz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fanfiction.net",
    "url": "https://www.fanfiction.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fanmtl.com",
    "url": "https://www.fanmtl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.farmanager.com",
    "url": "https://www.farmanager.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fbpurity.com",
    "url": "https://www.fbpurity.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fbreader.org",
    "url": "https://www.fbreader.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.febbox.com",
    "url": "https://www.febbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.feedbooks.com",
    "url": "https://www.feedbooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ff6hacking.com",
    "url": "https://www.ff6hacking.com/patcher/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ffonts.net",
    "url": "https://www.ffonts.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fictionpress.com",
    "url": "https://www.fictionpress.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fiduswriter.org",
    "url": "https://www.fiduswriter.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filebot.net",
    "url": "https://www.filebot.net/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filecad.com",
    "url": "https://www.filecad.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.file-hunter.com",
    "url": "https://www.file-hunter.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filescan.io",
    "url": "https://www.filescan.io/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filesmd.com",
    "url": "https://www.filesmd.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filestash.app",
    "url": "https://www.filestash.app/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filmmusicsite.com",
    "url": "https://www.filmmusicsite.com/en/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.filmon.com",
    "url": "https://www.filmon.com/tv/live",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fimfiction.net",
    "url": "https://www.fimfiction.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.findareddit.com",
    "url": "https://www.findareddit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.findsounds.com",
    "url": "https://www.findsounds.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fireload.com",
    "url": "https://www.fireload.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.firstsounds.org",
    "url": "https://www.firstsounds.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fjsoft.at",
    "url": "https://www.fjsoft.at/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flacmusic.info",
    "url": "https://www.flacmusic.info/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flamingtext.com",
    "url": "https://www.flamingtext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flashscore.com",
    "url": "https://www.flashscore.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flawlesswidescreen.org",
    "url": "https://www.flawlesswidescreen.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flightgear.org",
    "url": "https://www.flightgear.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flowfi.app",
    "url": "https://www.flowfi.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flowoss.com",
    "url": "https://www.flowoss.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flowtunes.app",
    "url": "https://www.flowtunes.app/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.flysat.com",
    "url": "https://www.flysat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.foddy.net",
    "url": "https://www.foddy.net/Athletics.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.folderclone.com",
    "url": "https://www.folderclone.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontbolt.com",
    "url": "https://www.fontbolt.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontgeneratoronline.com",
    "url": "https://www.fontgeneratoronline.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontget.com",
    "url": "https://www.fontget.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontrepo.com",
    "url": "https://www.fontrepo.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fonts4free.net",
    "url": "https://www.fonts4free.net/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontspace.com",
    "url": "https://www.fontspace.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontspring.com",
    "url": "https://www.fontspring.com/free",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fontsquirrel.com",
    "url": "https://www.fontsquirrel.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.foobar2000.org",
    "url": "https://www.foobar2000.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.footballorgin.com",
    "url": "https://www.footballorgin.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.footballstream.tv",
    "url": "https://www.footballstream.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.footybite.com",
    "url": "https://www.footybite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fortelling.app",
    "url": "https://www.fortelling.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.foxit.com",
    "url": "https://www.foxit.com/pdf-reader/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.foxnews.com",
    "url": "https://www.foxnews.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.france24.com",
    "url": "https://www.france24.com/en/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.frankerfacez.com",
    "url": "https://www.frankerfacez.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freac.org",
    "url": "https://www.freac.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeciv.org",
    "url": "https://www.freeciv.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeclassicaudiobooks.com",
    "url": "https://www.freeclassicaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeditorial.com",
    "url": "https://www.freeditorial.com",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeditorial.com",
    "url": "https://www.freeditorial.com/en/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freedosgames.de",
    "url": "https://www.freedosgames.de/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freedownloadmanager.org",
    "url": "https://www.freedownloadmanager.org/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freefaces.gallery",
    "url": "https://www.freefaces.gallery/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeformradio.directory",
    "url": "https://www.freeformradio.directory/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeiptvlist.com",
    "url": "https://www.freeiptvlist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freeprintable.net",
    "url": "https://www.freeprintable.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.free-scores.com",
    "url": "https://www.free-scores.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freesfonline.net",
    "url": "https://www.freesfonline.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freesoundslibrary.com",
    "url": "https://www.freesoundslibrary.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freetechbooks.com",
    "url": "https://www.freetechbooks.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freetogame.com",
    "url": "https://www.freetogame.com/games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.freevpn.org",
    "url": "https://www.freevpn.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.friv.com",
    "url": "https://www.friv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.frontpages.com",
    "url": "https://www.frontpages.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fullreplays.com",
    "url": "https://www.fullreplays.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.futurelearn.com",
    "url": "https://www.futurelearn.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.futuretools.io",
    "url": "https://www.futuretools.io/?pricing-model=free",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.fviewer.com",
    "url": "https://www.fviewer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gaiaonline.com",
    "url": "https://www.gaiaonline.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gamepix.com",
    "url": "https://www.gamepix.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gamezbd.net",
    "url": "https://www.gamezbd.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gamezhero.com",
    "url": "https://www.gamezhero.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gamingalexandria.com",
    "url": "https://www.gamingalexandria.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gbif.org",
    "url": "https://www.gbif.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gbnews.com",
    "url": "https://www.gbnews.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.geeks3d.com",
    "url": "https://www.geeks3d.com/furmark/kombustor/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.generasia.com",
    "url": "https://www.generasia.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.generation-msx.nl",
    "url": "https://www.generation-msx.nl/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.genmo.ai",
    "url": "https://www.genmo.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.genspark.ai",
    "url": "https://www.genspark.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.germanicmythology.com",
    "url": "https://www.germanicmythology.com/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.getepic.com",
    "url": "https://www.getepic.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ghisler.com",
    "url": "https://www.ghisler.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ghostery.com",
    "url": "https://www.ghostery.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gibney.org",
    "url": "https://www.gibney.org/writer",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.globalfreetv.com",
    "url": "https://www.globalfreetv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.globalgreyebooks.com",
    "url": "https://www.globalgreyebooks.com/index.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.glukfonts.pl",
    "url": "https://www.glukfonts.pl/fonts.php",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.glyphrstudio.com",
    "url": "https://www.glyphrstudio.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gnooks.com",
    "url": "https://www.gnooks.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.goalsarena.tv",
    "url": "https://www.goalsarena.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gog.com",
    "url": "https://www.gog.com/galaxy",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.goodbooks.io",
    "url": "https://www.goodbooks.io/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.goodreads.com",
    "url": "https://www.goodreads.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.goodreads.com",
    "url": "https://www.goodreads.com/genres/manga",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.goodtheorist.science",
    "url": "https://www.goodtheorist.science/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.google.com",
    "url": "https://www.google.com/docs/about/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gptdemo.net",
    "url": "https://www.gptdemo.net/gpt/search?lg=en&cate=&keywords=&tags=free,&sort=popular",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.grammarly.com",
    "url": "https://www.grammarly.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.grammarly.com",
    "url": "https://www.grammarly.com/grammar-check",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.greasespot.net",
    "url": "https://www.greasespot.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gridsagegames.com",
    "url": "https://www.gridsagegames.com/rexpaint/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.grosfichiers.com",
    "url": "https://www.grosfichiers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.grupa-mirai.pl",
    "url": "https://www.grupa-mirai.pl/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gtrainers.com",
    "url": "https://www.gtrainers.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.guilded.gg",
    "url": "https://www.guilded.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.guitars101.com",
    "url": "https://www.guitars101.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.guru3d.com",
    "url": "https://www.guru3d.com/files-details/rtss-rivatuner-statistics-server-download.html",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/browse/languages/de",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/browse/languages/es",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/browse/languages/fr",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/browse/languages/ja",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/browse/languages/pl",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.gutenberg.org",
    "url": "https://www.gutenberg.org/browse/languages/ru",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.halakhah.com",
    "url": "https://www.halakhah.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.happyhardcore.com",
    "url": "https://www.happyhardcore.com/forums/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.happyhardcore.com",
    "url": "https://www.happyhardcore.com/radio/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hathitrust.org",
    "url": "https://www.hathitrust.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.haxball.com",
    "url": "https://www.haxball.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hermetics.net",
    "url": "https://www.hermetics.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hermetics.org",
    "url": "https://www.hermetics.org/library.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hideip.co",
    "url": "https://www.hideip.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hockeytv.com",
    "url": "https://www.hockeytv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hollowearthradio.org",
    "url": "https://www.hollowearthradio.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.homeoftheunderdogs.net",
    "url": "https://www.homeoftheunderdogs.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.homepower.com",
    "url": "https://www.homepower.com/archive-browse",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hoopladigital.com",
    "url": "https://www.hoopladigital.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.horntip.com",
    "url": "https://www.horntip.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hourwolf.com",
    "url": "https://www.hourwolf.com/sfbooks/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hoxx.com",
    "url": "https://www.hoxx.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.httrack.com",
    "url": "https://www.httrack.com/page/2/en/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hume.ai",
    "url": "https://www.hume.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.hvsc.c64.org",
    "url": "https://www.hvsc.c64.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iconian.com",
    "url": "https://www.iconian.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.idmdiscovery.com",
    "url": "https://www.idmdiscovery.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.i-dont-care-about-cookies.eu",
    "url": "https://www.i-dont-care-about-cookies.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ifixit.com",
    "url": "https://www.ifixit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.igdb.com",
    "url": "https://www.igdb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.igorski.nl",
    "url": "https://www.igorski.nl/application/efflux/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.igorski.nl",
    "url": "https://www.igorski.nl/download",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iheart.com",
    "url": "https://www.iheart.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ilovepdf.com",
    "url": "https://www.ilovepdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.imagenetz.de",
    "url": "https://www.imagenetz.de/?setLang=en",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.imploded.com",
    "url": "https://www.imploded.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.infobooks.org",
    "url": "https://www.infobooks.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.inkitt.com",
    "url": "https://www.inkitt.com/fanfiction",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.instapaper.com",
    "url": "https://www.instapaper.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.intechopen.com",
    "url": "https://www.intechopen.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.internetdownloadmanager.com",
    "url": "https://www.internetdownloadmanager.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.inuitmyths.com",
    "url": "https://www.inuitmyths.com/index.htm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iopaint.com",
    "url": "https://www.iopaint.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ipalibrary.me",
    "url": "https://www.ipalibrary.me/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iphonecake.com",
    "url": "https://www.iphonecake.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iptvbin.com",
    "url": "https://www.iptvbin.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iptvsat.info",
    "url": "https://www.iptvsat.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iptvsource.com",
    "url": "https://www.iptvsource.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iramanusantara.org",
    "url": "https://www.iramanusantara.org/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.iranicaonline.org",
    "url": "https://www.iranicaonline.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.islegitsite.com",
    "url": "https://www.islegitsite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.itgmania.com",
    "url": "https://www.itgmania.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.itv.com",
    "url": "https://www.itv.com/hub/itv",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ivpn.net",
    "url": "https://www.ivpn.net/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jambase.com",
    "url": "https://www.jambase.com/videos",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jamendo.com",
    "url": "https://www.jamendo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jamovi.org",
    "url": "https://www.jamovi.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.japanesewiki.com",
    "url": "https://www.japanesewiki.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jewishvirtuallibrary.org",
    "url": "https://www.jewishvirtuallibrary.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.joesandbox.com",
    "url": "https://www.joesandbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jokerlivestream.org",
    "url": "https://www.jokerlivestream.org/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jonasjohn.de",
    "url": "https://www.jonasjohn.de/red.htm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jstor.org",
    "url": "https://www.jstor.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.jumbomail.me",
    "url": "https://www.jumbomail.me/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.justfreebooks.info",
    "url": "https://www.justfreebooks.info/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.justlightnovels.com",
    "url": "https://www.justlightnovels.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kaggle.com",
    "url": "https://www.kaggle.com/benchmarks",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kaggle.com",
    "url": "https://www.kaggle.com/datasets",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kammerl.de",
    "url": "https://www.kammerl.de/ascii/AsciiSignature.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kavitareader.com",
    "url": "https://www.kavitareader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kenhendricks.me",
    "url": "https://www.kenhendricks.me/FixEmbed",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kenmei.co",
    "url": "https://www.kenmei.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.keybr.com",
    "url": "https://www.keybr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.khanacademy.org",
    "url": "https://www.khanacademy.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kilodoc.com",
    "url": "https://www.kilodoc.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kimi.com",
    "url": "https://www.kimi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kingofsat.net",
    "url": "https://www.kingofsat.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kobo.com",
    "url": "https://www.kobo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kobo.com",
    "url": "https://www.kobo.com/audiobooks",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kongregate.com",
    "url": "https://www.kongregate.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.koodo-reader.org",
    "url": "https://www.koodo-reader.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kryptor.co.uk",
    "url": "https://www.kryptor.co.uk/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.kvibes.de",
    "url": "https://www.kvibes.de/mediaelch/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.languageisavirus.com",
    "url": "https://www.languageisavirus.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.languagetool.org",
    "url": "https://www.languagetool.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.last.fm",
    "url": "https://www.last.fm/home",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.last.fm",
    "url": "https://www.last.fm/labs",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lastpass.com",
    "url": "https://www.lastpass.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.launchbox-app.com",
    "url": "https://www.launchbox-app.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lbl.fm",
    "url": "https://www.lbl.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.learnlatex.org",
    "url": "https://www.learnlatex.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.learnoutloud.com",
    "url": "https://www.learnoutloud.com/Free-Audiobooks",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ledfx.app",
    "url": "https://www.ledfx.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.legendsworld.net",
    "url": "https://www.legendsworld.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lens.org",
    "url": "https://www.lens.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.letsplaygb.com",
    "url": "https://www.letsplaygb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.letsplayindex.com",
    "url": "https://www.letsplayindex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.letsplaysega.com",
    "url": "https://www.letsplaysega.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.levidia.ch",
    "url": "https://www.levidia.ch/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.libib.com",
    "url": "https://www.libib.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.libraryofshortstories.com",
    "url": "https://www.libraryofshortstories.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.librarything.com",
    "url": "https://www.librarything.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.libreoffice.org",
    "url": "https://www.libreoffice.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lightnovelworld.com",
    "url": "https://www.lightnovelworld.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.linkedin.com",
    "url": "https://www.linkedin.com/learning/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.listal.com",
    "url": "https://www.listal.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.listennotes.com",
    "url": "https://www.listennotes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.literature-map.com",
    "url": "https://www.literature-map.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lithium.app",
    "url": "https://www.lithium.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.litsy.com",
    "url": "https://www.litsy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.littlesounddj.com",
    "url": "https://www.littlesounddj.com/lsd/index.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.liveatc.net",
    "url": "https://www.liveatc.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.livehdtv.com",
    "url": "https://www.livehdtv.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.livenewsnow.com",
    "url": "https://www.livenewsnow.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.livescore.com",
    "url": "https://www.livescore.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.livesoccertv.com",
    "url": "https://www.livesoccertv.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.loc.gov",
    "url": "https://www.loc.gov/newspapers/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.localcdn.org",
    "url": "https://www.localcdn.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.locoloader.com",
    "url": "https://www.locoloader.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lofi.rocks",
    "url": "https://www.lofi.rocks/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.loficafe.net",
    "url": "https://www.loficafe.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lofizen.co",
    "url": "https://www.lofizen.co/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.longdom.org",
    "url": "https://www.longdom.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.longdom.org",
    "url": "https://www.longdom.org/open-access/the-ergonomic-development-of-video-game-controllers-2165-7556-1000209.pdf",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.looperman.com",
    "url": "https://www.looperman.com/free-music-software",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.looperman.com",
    "url": "https://www.looperman.com/loops",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.looptube.xyz",
    "url": "https://www.looptube.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.loras.dev",
    "url": "https://www.loras.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lowlevelformat.info",
    "url": "https://www.lowlevelformat.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.loyalbooks.com",
    "url": "https://www.loyalbooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.luanti.org",
    "url": "https://www.luanti.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.luckypatchers.com",
    "url": "https://www.luckypatchers.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lumina.sh",
    "url": "https://www.lumina.sh/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.luminescence-software.org",
    "url": "https://www.luminescence-software.org/en/echosync/about/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lurker.tv",
    "url": "https://www.lurker.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lyngsat.com",
    "url": "https://www.lyngsat.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lyrical-nonsense.com",
    "url": "https://www.lyrical-nonsense.com/global/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lyrics.com",
    "url": "https://www.lyrics.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.lyricsify.com",
    "url": "https://www.lyricsify.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.m3uiptv.com",
    "url": "https://www.m3uiptv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.macbed.com",
    "url": "https://www.macbed.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mage.space",
    "url": "https://www.mage.space/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.magickeys.com",
    "url": "https://www.magickeys.com/books/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.majorgeeks.com",
    "url": "https://www.majorgeeks.com/files/details/ascii_art_studio.html",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.makewordart.com",
    "url": "https://www.makewordart.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.malwarebytes.com",
    "url": "https://www.malwarebytes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.malwarebytes.com",
    "url": "https://www.malwarebytes.com/adwcleaner/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.malwarebytes.com",
    "url": "https://www.malwarebytes.com/browserguard",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mamedev.org",
    "url": "https://www.mamedev.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mangaread.org",
    "url": "https://www.mangaread.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mangaupdates.com",
    "url": "https://www.mangaupdates.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.manning.com",
    "url": "https://www.manning.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.manuallib.com",
    "url": "https://www.manuallib.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.marapets.com",
    "url": "https://www.marapets.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.marcrobledo.com",
    "url": "https://www.marcrobledo.com/RomPatcher.js/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.martinstoeckli.ch",
    "url": "https://www.martinstoeckli.ch/silentnotes/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.marxists.org",
    "url": "https://www.marxists.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mazmazika.com",
    "url": "https://www.mazmazika.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mcmusiceditor.com",
    "url": "https://www.mcmusiceditor.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mdpi.com",
    "url": "https://www.mdpi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mediafire.com",
    "url": "https://www.mediafire.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mediamonkey.com",
    "url": "https://www.mediamonkey.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.medrxiv.org",
    "url": "https://www.medrxiv.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.megamangames.net",
    "url": "https://www.megamangames.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.memonotepad.com",
    "url": "https://www.memonotepad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.memoryoftheworld.org",
    "url": "https://www.memoryoftheworld.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.memrey.com",
    "url": "https://www.memrey.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mendeley.com",
    "url": "https://www.mendeley.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.messletters.com",
    "url": "https://www.messletters.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.metacritic.com",
    "url": "https://www.metacritic.com/game",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.metadata2go.com",
    "url": "https://www.metadata2go.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.metaflop.com",
    "url": "https://www.metaflop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.metal-archives.com",
    "url": "https://www.metal-archives.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.meta-press.es",
    "url": "https://www.meta-press.es/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.microsoft.com",
    "url": "https://www.microsoft.com/en-us/garage/profiles/journal/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.microsoft.com",
    "url": "https://www.microsoft.com/en-us/p/microsoft-edge/9ncbcv6hfnpm",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.microsoft.com",
    "url": "https://www.microsoft.com/store/productId/9NBLGGH6C4BC",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.miicharacters.com",
    "url": "https://www.miicharacters.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mikemartin.co",
    "url": "https://www.mikemartin.co/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mindmeister.com",
    "url": "https://www.mindmeister.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mindomo.com",
    "url": "https://www.mindomo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.minimalreader.xyz",
    "url": "https://www.minimalreader.xyz/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.miniplay.com",
    "url": "https://www.miniplay.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mirrored.to",
    "url": "https://www.mirrored.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.miruro.com",
    "url": "https://www.miruro.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mixcloud.com",
    "url": "https://www.mixcloud.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mixesdb.com",
    "url": "https://www.mixesdb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mmahighkick.com",
    "url": "https://www.mmahighkick.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mobygames.com",
    "url": "https://www.mobygames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mod.io",
    "url": "https://www.mod.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.modd.io",
    "url": "https://www.modd.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.moddroid.com",
    "url": "https://www.moddroid.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.modularsamples.com",
    "url": "https://www.modularsamples.com/Plugins.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.monsterwriter.com",
    "url": "https://www.monsterwriter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.moonphaseradio.com",
    "url": "https://www.moonphaseradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mostrecommendedbooks.com",
    "url": "https://www.mostrecommendedbooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.moszen.com",
    "url": "https://www.moszen.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mozilla.org",
    "url": "https://www.mozilla.org/en-US/products/vpn/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mozillafoundation.org",
    "url": "https://www.mozillafoundation.org/en/privacynotincluded/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mp3jam.org",
    "url": "https://www.mp3jam.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mp3tag.de",
    "url": "https://www.mp3tag.de/en/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mrfdev.com",
    "url": "https://www.mrfdev.com/enhancer-for-youtube/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mrgbackup.link",
    "url": "https://www.mrgbackup.link/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mrowl.com",
    "url": "https://www.mrowl.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.msi.com",
    "url": "https://www.msi.com/Landing/afterburner",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.msx.org",
    "url": "https://www.msx.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.msxgamesworld.com",
    "url": "https://www.msxgamesworld.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mtv.com",
    "url": "https://www.mtv.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mucommander.com",
    "url": "https://www.mucommander.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.multcloud.com",
    "url": "https://www.multcloud.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musebootlegs.com",
    "url": "https://www.musebootlegs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musicbutler.io",
    "url": "https://www.musicbutler.io/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musicgenretree.org",
    "url": "https://www.musicgenretree.org/chart.html",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musicnotes.com",
    "url": "https://www.musicnotes.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musi-co.com",
    "url": "https://www.musi-co.com/listen/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musicpd.org",
    "url": "https://www.musicpd.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.musicto.com",
    "url": "https://www.musicto.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.myabandonware.com",
    "url": "https://www.myabandonware.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.myanonamouse.net",
    "url": "https://www.myanonamouse.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.myfonts.com",
    "url": "https://www.myfonts.com/pages/whatthefont",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.myinstants.com",
    "url": "https://www.myinstants.com/index/us/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.mysciencework.com",
    "url": "https://www.mysciencework.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.naps2.com",
    "url": "https://www.naps2.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.narrator.ai",
    "url": "https://www.narrator.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.naturalreaders.com",
    "url": "https://www.naturalreaders.com/online/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nbastream.tv",
    "url": "https://www.nbastream.tv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nbcnews.com",
    "url": "https://www.nbcnews.com/now",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ncbi.nlm.nih.gov",
    "url": "https://www.ncbi.nlm.nih.gov/pmc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ndtv.com",
    "url": "https://www.ndtv.com/video/live/channel/ndtv24x7",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.neat-reader.cn",
    "url": "https://www.neat-reader.cn/en/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.neogeofun.com",
    "url": "https://www.neogeofun.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.neopets.com",
    "url": "https://www.neopets.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nerdfonts.com",
    "url": "https://www.nerdfonts.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nesfiles.com",
    "url": "https://www.nesfiles.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.netguard.me",
    "url": "https://www.netguard.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.newgrounds.com",
    "url": "https://www.newgrounds.com/audio",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.newgrounds.com",
    "url": "https://www.newgrounds.com/games",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nextgenroms.com",
    "url": "https://www.nextgenroms.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nexusmods.com",
    "url": "https://www.nexusmods.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nirsoft.net",
    "url": "https://www.nirsoft.net/utils/shadow_copy_view.html/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nitrome.com",
    "url": "https://www.nitrome.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.niwanetwork.org",
    "url": "https://www.niwanetwork.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.noel-friedrich.de",
    "url": "https://www.noel-friedrich.de/terminal/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nomic.ai",
    "url": "https://www.nomic.ai/gpt4all",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nomoreransom.org",
    "url": "https://www.nomoreransom.org/en/decryption-tools.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.noobsubs.com",
    "url": "https://www.noobsubs.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.noosfere.org",
    "url": "https://www.noosfere.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nosteamgames.ro",
    "url": "https://www.nosteamgames.ro/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.noteflight.com",
    "url": "https://www.noteflight.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.notepadsapp.com",
    "url": "https://www.notepadsapp.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.notion.com",
    "url": "https://www.notion.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.notion.so",
    "url": "https://www.notion.so/web-clipper",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.notrace.how",
    "url": "https://www.notrace.how/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.novelupdates.com",
    "url": "https://www.novelupdates.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.npostart.nl",
    "url": "https://www.npostart.nl/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nrk.no",
    "url": "https://www.nrk.no/tv/direkte",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nswdb.com",
    "url": "https://www.nswdb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nts.live",
    "url": "https://www.nts.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.nvidia.com",
    "url": "https://www.nvidia.com/en-us/ai-on-rtx/chatrtx/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.oalib.com",
    "url": "https://www.oalib.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ocenaudio.com",
    "url": "https://www.ocenaudio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.office365versions.com",
    "url": "https://www.office365versions.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.offtiktok.com",
    "url": "https://www.offtiktok.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ofoct.com",
    "url": "https://www.ofoct.com/viewer/epub-reader-online.html",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.old-games.com",
    "url": "https://www.old-games.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.old-games.ru",
    "url": "https://www.old-games.ru/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.oldtimeradiodownloads.com",
    "url": "https://www.oldtimeradiodownloads.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.onecommander.com",
    "url": "https://www.onecommander.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.one-tab.com",
    "url": "https://www.one-tab.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.online-literature.com",
    "url": "https://www.online-literature.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.onlineprogrammingbooks.com",
    "url": "https://www.onlineprogrammingbooks.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.onlyoffice.com",
    "url": "https://www.onlyoffice.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.onyx.app",
    "url": "https://www.onyx.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.open.edu",
    "url": "https://www.open.edu/openlearn/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.opendns.com",
    "url": "https://www.opendns.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.openedition.org",
    "url": "https://www.openedition.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.openmyfiles.com",
    "url": "https://www.openmyfiles.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.openttd.org",
    "url": "https://www.openttd.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.operaonvideo.com",
    "url": "https://www.operaonvideo.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ordrumbox.com",
    "url": "https://www.ordrumbox.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.oreilly.com",
    "url": "https://www.oreilly.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.organism.earth",
    "url": "https://www.organism.earth/library/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.orgroam.com",
    "url": "https://www.orgroam.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.orionsarm.com",
    "url": "https://www.orionsarm.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.outwrite.com",
    "url": "https://www.outwrite.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ov2.eu",
    "url": "https://www.ov2.eu/programs/rapidcrc-unicode",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ovagames.com",
    "url": "https://www.ovagames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.overclock.net",
    "url": "https://www.overclock.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.overleaf.com",
    "url": "https://www.overleaf.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ovpn.com",
    "url": "https://www.ovpn.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.oxfordowl.co.uk",
    "url": "https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.packtpub.com",
    "url": "https://www.packtpub.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pagebypagebooks.com",
    "url": "https://www.pagebypagebooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pandora.com",
    "url": "https://www.pandora.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.papermerge.com",
    "url": "https://www.papermerge.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pbs.org",
    "url": "https://www.pbs.org/livestream/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pcgamebenchmark.com",
    "url": "https://www.pcgamebenchmark.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pcgamez-download.com",
    "url": "https://www.pcgamez-download.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pcgamingwiki.com",
    "url": "https://www.pcgamingwiki.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pcloud.com",
    "url": "https://www.pcloud.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdf24.org",
    "url": "https://www.pdf24.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdf2go.com",
    "url": "https://www.pdf2go.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdfdrive.com",
    "url": "https://www.pdfdrive.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdfescape.com",
    "url": "https://www.pdfescape.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdfgear.com",
    "url": "https://www.pdfgear.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdfiles.net",
    "url": "https://www.pdfiles.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pdfmagaz.in",
    "url": "https://www.pdfmagaz.in/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.perfect-player.com",
    "url": "https://www.perfect-player.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.perfect-privacy.com",
    "url": "https://www.perfect-privacy.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.perplexity.ai",
    "url": "https://www.perplexity.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.perseus.tufts.edu",
    "url": "https://www.perseus.tufts.edu/hopper/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.petges.lu",
    "url": "https://www.petges.lu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pianobook.co.uk",
    "url": "https://www.pianobook.co.uk/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pillowfort.social",
    "url": "https://www.pillowfort.social/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pixiv.net",
    "url": "https://www.pixiv.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pj64-emu.com",
    "url": "https://www.pj64-emu.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pkgps4.click",
    "url": "https://www.pkgps4.click/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.planetebook.com",
    "url": "https://www.planetebook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.planetemu.net",
    "url": "https://www.planetemu.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.planetpublish.com",
    "url": "https://www.planetpublish.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.playdosgames.com",
    "url": "https://www.playdosgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.playlistsorter.com",
    "url": "https://www.playlistsorter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.playnesonline.com",
    "url": "https://www.playnesonline.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.playretrogames.com",
    "url": "https://www.playretrogames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.plitch.com",
    "url": "https://www.plitch.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.plogue.com",
    "url": "https://www.plogue.com/products/sforzando.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pluralsight.com",
    "url": "https://www.pluralsight.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.podbean.com",
    "url": "https://www.podbean.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.podcastrepublic.net",
    "url": "https://www.podcastrepublic.net/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.podchaser.com",
    "url": "https://www.podchaser.com/charts",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.podparadise.com",
    "url": "https://www.podparadise.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.poemhunter.com",
    "url": "https://www.poemhunter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.poetry.com",
    "url": "https://www.poetry.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.poetryfoundation.org",
    "url": "https://www.poetryfoundation.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.poetryintranslation.com",
    "url": "https://www.poetryintranslation.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.polkadotgame.com",
    "url": "https://www.polkadotgame.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.potionsandsnitches.org",
    "url": "https://www.potionsandsnitches.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ppsspp.org",
    "url": "https://www.ppsspp.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pragmaticprogrammer.com",
    "url": "https://www.pragmaticprogrammer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.premierproducts-uk.co.uk",
    "url": "https://www.premierproducts-uk.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.presidency.ucsb.edu",
    "url": "https://www.presidency.ucsb.edu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pressreader.com",
    "url": "https://www.pressreader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.printfriendly.com",
    "url": "https://www.printfriendly.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.privacyguides.org",
    "url": "https://www.privacyguides.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.privacyguides.org",
    "url": "https://www.privacyguides.org/vpn/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.progettoemma.net",
    "url": "https://www.progettoemma.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.programming-books.io",
    "url": "https://www.programming-books.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.projectaon.org",
    "url": "https://www.projectaon.org/en/Main/Home",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.promptfoo.dev",
    "url": "https://www.promptfoo.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.promptingguide.ai",
    "url": "https://www.promptingguide.ai",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.prompy.me",
    "url": "https://www.prompy.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.proquest.com",
    "url": "https://www.proquest.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.protectedtext.com",
    "url": "https://www.protectedtext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.protondb.com",
    "url": "https://www.protondb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.proxifier.com",
    "url": "https://www.proxifier.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ps1fun.com",
    "url": "https://www.ps1fun.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.psiphon.ca",
    "url": "https://www.psiphon.ca/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pulsus.cc",
    "url": "https://www.pulsus.cc/play/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.pushbullet.com",
    "url": "https://www.pushbullet.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.q-3.eu",
    "url": "https://www.q-3.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.qodo.ai",
    "url": "https://www.qodo.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.qownnotes.org",
    "url": "https://www.qownnotes.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.quad9.net",
    "url": "https://www.quad9.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.quadratichq.com",
    "url": "https://www.quadratichq.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.qubes-os.org",
    "url": "https://www.qubes-os.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.quipqiup.com",
    "url": "https://www.quipqiup.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.quotegarden.com",
    "url": "https://www.quotegarden.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.quotemaster.org",
    "url": "https://www.quotemaster.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.quotev.com",
    "url": "https://www.quotev.com/stories/c/Fanfiction",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radio.net",
    "url": "https://www.radio.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radio-browser.info",
    "url": "https://www.radio-browser.info/users",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radiodeck.com",
    "url": "https://www.radiodeck.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radioguide.fm",
    "url": "https://www.radioguide.fm/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radioline.co",
    "url": "https://www.radioline.co/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radioreference.com",
    "url": "https://www.radioreference.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radioshackcatalogs.com",
    "url": "https://www.radioshackcatalogs.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radiou.com",
    "url": "https://www.radiou.com/radiou-tv",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.radmin-vpn.com",
    "url": "https://www.radmin-vpn.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.raidrive.com",
    "url": "https://www.raidrive.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rainymood.com",
    "url": "https://www.rainymood.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.raiplay.it",
    "url": "https://www.raiplay.it/dirette",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ratingsextension.com",
    "url": "https://www.ratingsextension.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rbtv77.gold",
    "url": "https://www.rbtv77.gold/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rbtv77.kaufen",
    "url": "https://www.rbtv77.kaufen/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.re3data.org",
    "url": "https://www.re3data.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.readlightnovel.org",
    "url": "https://www.readlightnovel.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reaper.fm",
    "url": "https://www.reaper.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.recoll.org",
    "url": "https://www.recoll.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.recraft.ai",
    "url": "https://www.recraft.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.redbox.com",
    "url": "https://www.redbox.com/stream-free-live-tv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/anime/wiki/watch_order",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/animepiracy/wiki/index",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/AskHistorians/wiki/books",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/CemuPiracy/wiki/tutorial/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/CFBstreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/ChatGPTJailbreak/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/CrackSupport/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/CrackWatch/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/emulation/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/EmulationOnAndroid/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/EmulationOnPC/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/footballhighlights/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android#wiki_.25B7_android_adblocking",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android#wiki_.25B7_ios_adblocking",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android#wiki_.25B7_privacy_.2F_anti-censorship",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/android/#wiki_.25B7_android_live_tv",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/audio/#wiki_.25B7_last.fm_tools",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/dev-tools#wiki_.25B7_machine_learning",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/internet-tools#wiki_.25B7_email_aliasing",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/internet-tools#wiki_.25B7_paywall_bypass",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/internet-tools#wiki_.25B7_temp_mail",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/linux#wiki_.25B7_adblock_.2F_privacy",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/linux#wiki_.25B7_linux_gaming",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/linux#wiki_.25B7_mac_adblock_.2F_privacy",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/linux#wiki_.25B7_mac_gaming",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/misc#wiki_.25BA_news",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/FREEMEDIAHECKYEAH/wiki/storage#wiki_survival",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/ifyoulikeblank/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/LinuxCrackSupport/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/ListOfSubreddits/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/loopkits/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/manga/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/mangapiracy/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/manhwa/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/MLBstreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/mmafights/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/mmastreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/modpiracy/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/ncaaBBallstreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/NHLstreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/OptimizedGaming/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/panelshow/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/PiratedGames/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/PiratedGames/comments/x804wg/guide_to_download_games_using_irc/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/QuestPiracy/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/Roms/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/rugbystreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/SteamDeckPirates/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/synthrecipes/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/tipofmyjoystick/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/translator/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/TrueLit/wiki/top100lists",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/uBlockOrigin/wiki/solutions/#wiki_facebook",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/VRPiracy/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/WWEstreams/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/youtubedl/wiki/info-guis",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reddit.com",
    "url": "https://www.reddit.com/r/zlibrary/wiki/index/access/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.redditraffler.com",
    "url": "https://www.redditraffler.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.redditreads.com",
    "url": "https://www.redditreads.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reka.ai",
    "url": "https://www.reka.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.relay.fm",
    "url": "https://www.relay.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.relicradio.com",
    "url": "https://www.relicradio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.remove-vocals.com",
    "url": "https://www.remove-vocals.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.renpy.org",
    "url": "https://www.renpy.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.researchgate.net",
    "url": "https://www.researchgate.net/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.resilio.com",
    "url": "https://www.resilio.com/individuals/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retroarch.com",
    "url": "https://www.retroarch.com/index.php?page=docs",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retro-exo.com",
    "url": "https://www.retro-exo.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retrogamechampion.com",
    "url": "https://www.retrogamechampion.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retrogames.cc",
    "url": "https://www.retrogames.cc/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retroreversing.com",
    "url": "https://www.retroreversing.com/source-code/decompiled-retail-console-games",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retrospot.net",
    "url": "https://www.retrospot.net/vault/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.retrostic.com",
    "url": "https://www.retrostic.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.returnyoutubedislike.com",
    "url": "https://www.returnyoutubedislike.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.reveddit.com",
    "url": "https://www.reveddit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rgshows.me",
    "url": "https://www.rgshows.me/games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rgshows.me",
    "url": "https://www.rgshows.me/livetv/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rhcplivearchive.com",
    "url": "https://www.rhcplivearchive.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ricochetrefresh.net",
    "url": "https://www.ricochetrefresh.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rockbox.org",
    "url": "https://www.rockbox.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rockdownload.org",
    "url": "https://www.rockdownload.org/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rockmods.net",
    "url": "https://www.rockmods.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romance.io",
    "url": "https://www.romance.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romcenter.com",
    "url": "https://www.romcenter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romhack.ing",
    "url": "https://www.romhack.ing/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romhacking.net",
    "url": "https://www.romhacking.net/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romhacking.net",
    "url": "https://www.romhacking.net/patch/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romsformame.com",
    "url": "https://www.romsformame.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romsgames.net",
    "url": "https://www.romsgames.net/roms/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romspack.com",
    "url": "https://www.romspack.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romspedia.com",
    "url": "https://www.romspedia.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romstation.fr",
    "url": "https://www.romstation.fr/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.romvault.com",
    "url": "https://www.romvault.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rosebud.ai",
    "url": "https://www.rosebud.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.roundgames.com",
    "url": "https://www.roundgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.royalroad.com",
    "url": "https://www.royalroad.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rt.com",
    "url": "https://www.rt.com/on-air/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rtp.pt",
    "url": "https://www.rtp.pt/play/direto",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.rtve.es",
    "url": "https://www.rtve.es/play/videos/directo/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.russian-records.com",
    "url": "https://www.russian-records.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sakuraost.com",
    "url": "https://www.sakuraost.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sampleseek.co.uk",
    "url": "https://www.sampleseek.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.samtv.fyi",
    "url": "https://www.samtv.fyi/PodFetch/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.satbeams.com",
    "url": "https://www.satbeams.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.satindex.de",
    "url": "https://www.satindex.de/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scamadviser.com",
    "url": "https://www.scamadviser.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scenestream.net",
    "url": "https://www.scenestream.net/demovibes/streams/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.schedulthreads.com",
    "url": "https://www.schedulthreads.com",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.science.gov",
    "url": "https://www.science.gov/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sciencedirect.com",
    "url": "https://www.sciencedirect.com/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scilit.com",
    "url": "https://www.scilit.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scottishpoetrylibrary.org.uk",
    "url": "https://www.scottishpoetrylibrary.org.uk/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scribblehub.com",
    "url": "https://www.scribblehub.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scribd.com",
    "url": "https://www.scribd.com/audiobooks",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.scribens.com",
    "url": "https://www.scribens.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.seafile.com",
    "url": "https://www.seafile.com/en/home/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.secretcanada.com",
    "url": "https://www.secretcanada.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sefaria.org",
    "url": "https://www.sefaria.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sejda.com",
    "url": "https://www.sejda.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.semanticscholar.org",
    "url": "https://www.semanticscholar.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sendgb.com",
    "url": "https://www.sendgb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sequencer64.com",
    "url": "https://www.sequencer64.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.seron.dev",
    "url": "https://www.seron.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.setlist.fm",
    "url": "https://www.setlist.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.setupvpn.com",
    "url": "https://www.setupvpn.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.shadowexplorer.com",
    "url": "https://www.shadowexplorer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.shanaproject.com",
    "url": "https://www.shanaproject.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.shankaracharya.org",
    "url": "https://www.shankaracharya.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.shastras.com",
    "url": "https://www.shastras.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.shazam.com",
    "url": "https://www.shazam.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sheetmusicplus.com",
    "url": "https://www.sheetmusicplus.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.shnflac.net",
    "url": "https://www.shnflac.net/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.showbox.media",
    "url": "https://www.showbox.media/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sillanumsoft.org",
    "url": "https://www.sillanumsoft.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sittingonclouds.net",
    "url": "https://www.sittingonclouds.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.skillscommons.org",
    "url": "https://www.skillscommons.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.skillshare.com",
    "url": "https://www.skillshare.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.skraper.net",
    "url": "https://www.skraper.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.skynews.com",
    "url": "https://www.skynews.com/watch-live",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.skysports.com",
    "url": "https://www.skysports.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.skytorrents.to",
    "url": "https://www.skytorrents.to/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.smartftp.com",
    "url": "https://www.smartftp.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.smartquantai.com",
    "url": "https://www.smartquantai.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.smashwords.com",
    "url": "https://www.smashwords.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.smbarena.com",
    "url": "https://www.smbarena.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.smplayer.info",
    "url": "https://www.smplayer.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.smwgames.com",
    "url": "https://www.smwgames.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.snes9x.com",
    "url": "https://www.snes9x.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.snesfun.com",
    "url": "https://www.snesfun.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.snokido.com",
    "url": "https://www.snokido.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.soccer24hd.com",
    "url": "https://www.soccer24hd.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.social-searcher.com",
    "url": "https://www.social-searcher.com/",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sofascore.com",
    "url": "https://www.sofascore.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.softwareok.com",
    "url": "https://www.softwareok.com/?seite=Freeware/Q-Dir",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.soimort.org",
    "url": "https://www.soimort.org/translate-shell/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.somacon.com",
    "url": "https://www.somacon.com/p568.php",
    "category": "linux-macos",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.songkick.com",
    "url": "https://www.songkick.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sonicvisualiser.org",
    "url": "https://www.sonicvisualiser.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sopcast.com",
    "url": "https://www.sopcast.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sordum.org",
    "url": "https://www.sordum.org/7952/dns-jumper-v2-2/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.soundboard.com",
    "url": "https://www.soundboard.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.soundclick.com",
    "url": "https://www.soundclick.com/default.cfm",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.soundgator.com",
    "url": "https://www.soundgator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.soundhound.com",
    "url": "https://www.soundhound.com/soundhound",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spacedrive.com",
    "url": "https://www.spacedrive.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spatial.io",
    "url": "https://www.spatial.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.speakaboos.com",
    "url": "https://www.speakaboos.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.special-k.info",
    "url": "https://www.special-k.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.speechtexter.com",
    "url": "https://www.speechtexter.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.speedtest.net",
    "url": "https://www.speedtest.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spek.cc",
    "url": "https://www.spek.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.splitscreen.me",
    "url": "https://www.splitscreen.me/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sport-video.org.ua",
    "url": "https://www.sport-video.org.ua/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spotifycover.art",
    "url": "https://www.spotifycover.art/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spotlistr.com",
    "url": "https://www.spotlistr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spreeder.com",
    "url": "https://www.spreeder.com/app.php?intro=1",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.springer.com",
    "url": "https://www.springer.com/gp",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.spriters-resource.com",
    "url": "https://www.spriters-resource.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sp-tarkov.com",
    "url": "https://www.sp-tarkov.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sputnikmusic.com",
    "url": "https://www.sputnikmusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.squibler.io",
    "url": "https://www.squibler.io/dangerous-writing-prompt-app",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.squidify.net",
    "url": "https://www.squidify.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.squidify.org",
    "url": "https://www.squidify.org",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.srb2.org",
    "url": "https://www.srb2.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.srrdb.com",
    "url": "https://www.srrdb.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ssavr.com",
    "url": "https://www.ssavr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ssega.com",
    "url": "https://www.ssega.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sslsecureproxy.com",
    "url": "https://www.sslsecureproxy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ssrn.com",
    "url": "https://www.ssrn.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ssuiteoffice.com",
    "url": "https://www.ssuiteoffice.com/software/ssuitefileshredder.htm",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.stableaudio.com",
    "url": "https://www.stableaudio.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.starfall.com",
    "url": "https://www.starfall.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.startpage.com",
    "url": "https://www.startpage.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.startpage.com",
    "url": "https://www.startpage.com/en/privacy-please/startpage-extension",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.steamcracked.io",
    "url": "https://www.steamcracked.io/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.stemroller.com",
    "url": "https://www.stemroller.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.stevvgame.com",
    "url": "https://www.stevvgame.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.stingray.com",
    "url": "https://www.stingray.com/products/stingray-music/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.stirlingpdf.com",
    "url": "https://www.stirlingpdf.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.stirr.com",
    "url": "https://www.stirr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.storynory.com",
    "url": "https://www.storynory.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.storytel.com",
    "url": "https://www.storytel.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.storywhale.com",
    "url": "https://www.storywhale.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.strawberrymusicplayer.org",
    "url": "https://www.strawberrymusicplayer.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.streameast.sk",
    "url": "https://www.streameast.sk/v8/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.streamscheme.com",
    "url": "https://www.streamscheme.com/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.subcleaner.com",
    "url": "https://www.subcleaner.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sublimetext.com",
    "url": "https://www.sublimetext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.substital.com",
    "url": "https://www.substital.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sub-vod.fr",
    "url": "https://www.sub-vod.fr/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.sumatrapdfreader.org",
    "url": "https://www.sumatrapdfreader.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.superfridaychart.com",
    "url": "https://www.superfridaychart.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.superlist.com",
    "url": "https://www.superlist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.supersmashflash.com",
    "url": "https://www.supersmashflash.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.svtplay.se",
    "url": "https://www.svtplay.se/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.swebench.com",
    "url": "https://www.swebench.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.swisstransfer.com",
    "url": "https://www.swisstransfer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.systemrequirementslab.com",
    "url": "https://www.systemrequirementslab.com/cyri",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.systemrequirementslab.com",
    "url": "https://www.systemrequirementslab.com/cyri/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tablesgenerator.com",
    "url": "https://www.tablesgenerator.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tadviewer.com",
    "url": "https://www.tadviewer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tagspaces.org",
    "url": "https://www.tagspaces.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tampermonkey.net",
    "url": "https://www.tampermonkey.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tapmusic.net",
    "url": "https://www.tapmusic.net/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.taskade.com",
    "url": "https://www.taskade.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tassomusic.org",
    "url": "https://www.tassomusic.org/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.techspot.com",
    "url": "https://www.techspot.com/article/2752-all-google-alternatives/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.telescopictext.org",
    "url": "https://www.telescopictext.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tenforums.com",
    "url": "https://www.tenforums.com/gaming/117377-share-gaming-tweaks-chec-my-comprehensive-list-will-blow-your-mind.html",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tesms.net",
    "url": "https://www.tesms.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.testpressing.org",
    "url": "https://www.testpressing.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.textcleanr.com",
    "url": "https://www.textcleanr.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.textcompare.org",
    "url": "https://www.textcompare.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.textfixer.com",
    "url": "https://www.textfixer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.textgiraffe.com",
    "url": "https://www.textgiraffe.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.textslave.com",
    "url": "https://www.textslave.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.textstudio.com",
    "url": "https://www.textstudio.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.text-to-speech.online",
    "url": "https://www.text-to-speech.online/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.theblackvault.com",
    "url": "https://www.theblackvault.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thedarkmod.com",
    "url": "https://www.thedarkmod.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thefreelibrary.com",
    "url": "https://www.thefreelibrary.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thegamingemporium.com",
    "url": "https://www.thegamingemporium.com/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thegreatestbooks.org",
    "url": "https://www.thegreatestbooks.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.theindierockplaylist.com",
    "url": "https://www.theindierockplaylist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.themorgan.org",
    "url": "https://www.themorgan.org/music",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thenakedscientists.com",
    "url": "https://www.thenakedscientists.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.theoi.com",
    "url": "https://www.theoi.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.theoldcomputer.com",
    "url": "https://www.theoldcomputer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.theologeek.ch",
    "url": "https://www.theologeek.ch/manuskript/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.theosociety.org",
    "url": "https://www.theosociety.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thescore.com",
    "url": "https://www.thescore.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thestorygraph.com",
    "url": "https://www.thestorygraph.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.thoughtco.com",
    "url": "https://www.thoughtco.com/us-historical-newspapers-online-by-state-1422215",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ticktick.com",
    "url": "https://www.ticktick.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.timelineify.com",
    "url": "https://www.timelineify.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tinc-vpn.org",
    "url": "https://www.tinc-vpn.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tinfoil.com",
    "url": "https://www.tinfoil.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tinymediamanager.org",
    "url": "https://www.tinymediamanager.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.togeproductions.com",
    "url": "https://www.togeproductions.com/SteamScout/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tokyoinsider.com",
    "url": "https://www.tokyoinsider.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tokyotosho.info",
    "url": "https://www.tokyotosho.info/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tokyotosho.info",
    "url": "https://www.tokyotosho.info/?cat=7",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.toonamiaftermath.com",
    "url": "https://www.toonamiaftermath.com/schedule",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.top-mods.com",
    "url": "https://www.top-mods.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.torproject.org",
    "url": "https://www.torproject.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.torrentfunk.com",
    "url": "https://www.torrentfunk.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.torrentgalaxy.to",
    "url": "https://www.torrentgalaxy.to/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.torrenting.com",
    "url": "https://www.torrenting.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tosecdev.org",
    "url": "https://www.tosecdev.org/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.trace.tv",
    "url": "https://www.trace.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tracktion.com",
    "url": "https://www.tracktion.com/products/waveform-free",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.trancefix.nl",
    "url": "https://www.trancefix.nl/index.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.transfersize.com",
    "url": "https://www.transfersize.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.traynier.com",
    "url": "https://www.traynier.com/software/steammover",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tree.fm",
    "url": "https://www.tree.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tribalmixes.com",
    "url": "https://www.tribalmixes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tricotism.com",
    "url": "https://www.tricotism.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tritik.com",
    "url": "https://www.tritik.com/product/krush/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.trtworld.com",
    "url": "https://www.trtworld.com/live",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tumbex.com",
    "url": "https://www.tumbex.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tumblebooks.com",
    "url": "https://www.tumblebooks.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tumgik.com",
    "url": "https://www.tumgik.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tumlook.com",
    "url": "https://www.tumlook.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tunefind.com",
    "url": "https://www.tunefind.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tunemymusic.com",
    "url": "https://www.tunemymusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tvmucho.com",
    "url": "https://www.tvmucho.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tvp.pl",
    "url": "https://www.tvp.pl/stream",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tvrename.com",
    "url": "https://www.tvrename.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.tweaking4all.com",
    "url": "https://www.tweaking4all.com/home-theatre/rename-my-tv-series-v2/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.twitchquotes.com",
    "url": "https://www.twitchquotes.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.txori.com",
    "url": "https://www.txori.com/dbdevolution",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typelit.io",
    "url": "https://www.typelit.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typerush.com",
    "url": "https://www.typerush.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typewolf.com",
    "url": "https://www.typewolf.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typing.academy",
    "url": "https://www.typing.academy/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typing.com",
    "url": "https://www.typing.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typingclub.com",
    "url": "https://www.typingclub.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.typingstudy.com",
    "url": "https://www.typingstudy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ubackup.com",
    "url": "https://www.ubackup.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.uclpress.co.uk",
    "url": "https://www.uclpress.co.uk/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.udemy.com",
    "url": "https://www.udemy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.udio.com",
    "url": "https://www.udio.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.udrop.com",
    "url": "https://www.udrop.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.un4seen.com",
    "url": "https://www.un4seen.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.uncensoredlibrary.com",
    "url": "https://www.uncensoredlibrary.com/en",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.uniteforliteracy.com",
    "url": "https://www.uniteforliteracy.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.universalscammerlist.com",
    "url": "https://www.universalscammerlist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.urbackup.org",
    "url": "https://www.urbackup.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.urban-vpn.com",
    "url": "https://www.urban-vpn.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.urlvoid.com",
    "url": "https://www.urlvoid.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vanillavoice.com",
    "url": "https://www.vanillavoice.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.veracrypt.fr",
    "url": "https://www.veracrypt.fr/en/Home.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vertex42.com",
    "url": "https://www.vertex42.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vestalreview.net",
    "url": "https://www.vestalreview.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vevo.com",
    "url": "https://www.vevo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vgleadsheets.com",
    "url": "https://www.vgleadsheets.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vgmpf.com",
    "url": "https://www.vgmpf.com/Wiki/index.php",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vgmusic.com",
    "url": "https://www.vgmusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vh1.com",
    "url": "https://www.vh1.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.videolan.org",
    "url": "https://www.videolan.org/vlc/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.videoutils.com",
    "url": "https://www.videoutils.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vidu.studio",
    "url": "https://www.vidu.studio/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vincenzoscarpa.it",
    "url": "https://www.vincenzoscarpa.it/emuwiki/pmwiki/pmwiki.php?n=Emulators.Emulators&lng=en",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vincenzoscarpa.it",
    "url": "https://www.vincenzoscarpa.it/emuwiki/pmwiki/pmwiki.php?n=OnlineGames.OnlineGames&lng=en",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vinylengine.com",
    "url": "https://www.vinylengine.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vipbox.live",
    "url": "https://www.vipbox.live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.viprow.nu",
    "url": "https://www.viprow.nu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vipvgm.net",
    "url": "https://www.vipvgm.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.virtualdj.com",
    "url": "https://www.virtualdj.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.virtualsheetmusic.com",
    "url": "https://www.virtualsheetmusic.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.virustotal.com",
    "url": "https://www.virustotal.com/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.virustotal.com",
    "url": "https://www.virustotal.com/gui/home/upload",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.visidata.org",
    "url": "https://www.visidata.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.viz.com",
    "url": "https://www.viz.com/shonenjump",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vizzed.com",
    "url": "https://www.vizzed.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.voicy.network",
    "url": "https://www.voicy.network/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vpnbook.com",
    "url": "https://www.vpnbook.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vpngate.net",
    "url": "https://www.vpngate.net/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vrcarena.com",
    "url": "https://www.vrcarena.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vrt.be",
    "url": "https://www.vrt.be/vrtnu/livestream/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.vulgarlang.com",
    "url": "https://www.vulgarlang.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.w10privacy.de",
    "url": "https://www.w10privacy.de/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wabbajack.org",
    "url": "https://www.wabbajack.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wappalyzer.com",
    "url": "https://www.wappalyzer.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.watchcartoononline.com",
    "url": "https://www.watchcartoononline.com/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.watzatsong.com",
    "url": "https://www.watzatsong.com/en",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.waybackyt.download",
    "url": "https://www.waybackyt.download/",
    "category": "pobieranie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wco.tv",
    "url": "https://www.wco.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.webnovel.com",
    "url": "https://www.webnovel.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.webosbrew.org",
    "url": "https://www.webosbrew.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.websynths.com",
    "url": "https://www.websynths.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.webtoons.com",
    "url": "https://www.webtoons.com/en/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.weights.com",
    "url": "https://www.weights.com/replay",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wemod.com",
    "url": "https://www.wemod.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.whatfont.co",
    "url": "https://www.whatfont.co/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.whatfontis.com",
    "url": "https://www.whatfontis.com/",
    "category": "narzedzia-graficzne",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.whdload.de",
    "url": "https://www.whdload.de/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.whichbook.net",
    "url": "https://www.whichbook.net/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.whonix.org",
    "url": "https://www.whonix.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.whosampled.com",
    "url": "https://www.whosampled.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wikibooks.org",
    "url": "https://www.wikibooks.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wikiversity.org",
    "url": "https://www.wikiversity.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wildwest.gg",
    "url": "https://www.wildwest.gg/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.williamkage.com",
    "url": "https://www.williamkage.com/snes_soundfonts/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.windsurf.com",
    "url": "https://www.windsurf.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.winehq.org",
    "url": "https://www.winehq.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.winitor.com",
    "url": "https://www.winitor.com/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.winmoji.com",
    "url": "https://www.winmoji.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.win-rar.com",
    "url": "https://www.win-rar.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wireguard.com",
    "url": "https://www.wireguard.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wolfram.com",
    "url": "https://www.wolfram.com/llm-benchmarking-project/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wombo.ai",
    "url": "https://www.wombo.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wonderhowto.com",
    "url": "https://www.wonderhowto.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wonderplugin.com",
    "url": "https://www.wonderplugin.com/online-tools/google-drive-direct-link-generator/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.worldbank.org",
    "url": "https://www.worldbank.org/en/home",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.worldcat.org",
    "url": "https://www.worldcat.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.worldconcerthall.com",
    "url": "https://www.worldconcerthall.com/en/schedule-list/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.worldhistory.org",
    "url": "https://www.worldhistory.org/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.worldmags.net",
    "url": "https://www.worldmags.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.worteldrie.com",
    "url": "https://www.worteldrie.com/WD5/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wowebook.org",
    "url": "https://www.wowebook.org/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.writealong.io",
    "url": "https://www.writealong.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.writenext.io",
    "url": "https://www.writenext.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.writersolo.com",
    "url": "https://www.writersolo.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.writespace.app",
    "url": "https://www.writespace.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wsgf.org",
    "url": "https://www.wsgf.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.wuxiaworld.com",
    "url": "https://www.wuxiaworld.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.x360ce.com",
    "url": "https://www.x360ce.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xaudiopro.com",
    "url": "https://www.xaudiopro.com/en/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xconvert.com",
    "url": "https://www.xconvert.com",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xdcc.eu",
    "url": "https://www.xdcc.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xdlab.ru",
    "url": "https://www.xdlab.ru/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xiles.app",
    "url": "https://www.xiles.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xpdfreader.com",
    "url": "https://www.xpdfreader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xrel.to",
    "url": "https://www.xrel.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.xumo.tv",
    "url": "https://www.xumo.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.y8.com",
    "url": "https://www.y8.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yamagi.org",
    "url": "https://www.yamagi.org/quake2/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yishama.com",
    "url": "https://www.yishama.com/virtual-pantam-playground/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yomu-reader.com",
    "url": "https://www.yomu-reader.com/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yorku.ca",
    "url": "https://www.yorku.ca/inpar/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtaite.com",
    "url": "https://www.youtaite.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtube.com",
    "url": "https://www.youtube.com/@Dreamofthe90s/playlists",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtube.com",
    "url": "https://www.youtube.com/@GoldenrodRadio251",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtube.com",
    "url": "https://www.youtube.com/@theurbanemporium204/playlists",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtube.com",
    "url": "https://www.youtube.com/c/TroubleChute/featured",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtube.com",
    "url": "https://www.youtube.com/channel/UCupvZG-5bDgK_N8Ym2bNylg",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.youtube.com",
    "url": "https://www.youtube.com/channel/UC-yYn6fN_Lq0pI44U0lM_jA",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.ypforai.com",
    "url": "https://www.ypforai.com",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yucata.de",
    "url": "https://www.yucata.de/en/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yupptv.com",
    "url": "https://www.yupptv.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.yuque.com",
    "url": "https://www.yuque.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zerochan.net",
    "url": "https://www.zerochan.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zerotier.com",
    "url": "https://www.zerotier.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zippyjot.com",
    "url": "https://www.zippyjot.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zombs-lair.com",
    "url": "https://www.zombs-lair.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zooniverse.org",
    "url": "https://www.zooniverse.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zophar.net",
    "url": "https://www.zophar.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zophar.net",
    "url": "https://www.zophar.net/music",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www.zrythm.org",
    "url": "https://www.zrythm.org/en/index.html",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www3.nhk.or.jp",
    "url": "https://www3.nhk.or.jp/nhkworld/en/live/",
    "category": "sport",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "www7.iplusfree.org",
    "url": "https://www7.iplusfree.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "wwwfindyourfest.com",
    "url": "https://wwwfindyourfest.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "x.com",
    "url": "https://x.com/pikaso_me",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "x266.mov",
    "url": "https://x266.mov/discord-embed/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xan105.github.io",
    "url": "https://xan105.github.io/Achievement-Watcher/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xcalibrscans.com",
    "url": "https://xcalibrscans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xdaforums.com",
    "url": "https://xdaforums.com/t/app-firetv-noroot-launcher-manager-change-launcher-without-root.4176349/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xdaforums.com",
    "url": "https://xdaforums.com/t/tool-all-in-one-tool-for-windows-android-tv-tools-v4.4648239/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xemu.app",
    "url": "https://xemu.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xenia.jp",
    "url": "https://xenia.jp/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "x-minus.pro",
    "url": "https://x-minus.pro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xmplaylist.com",
    "url": "https://xmplaylist.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xonotic.org",
    "url": "https://xonotic.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xournalpp.github.io",
    "url": "https://xournalpp.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xpipe.io",
    "url": "https://xpipe.io",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xprime.tv",
    "url": "https://xprime.tv/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xprm.net",
    "url": "https://xprm.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xtiles.app",
    "url": "https://xtiles.app/en",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "xxluke.de",
    "url": "https://xxluke.de/subscription-history/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "y0urd34th.github.io",
    "url": "https://y0urd34th.github.io/Project-GLD/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "y2mate.is",
    "url": "https://y2mate.is/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yacy.net",
    "url": "https://yacy.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yadg.cc",
    "url": "https://yadg.cc/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yande.re",
    "url": "https://yande.re/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yandex.com",
    "url": "https://yandex.com/games/",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yaytext.com",
    "url": "https://yaytext.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yazi-rs.github.io",
    "url": "https://yazi-rs.github.io/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yearcompass.com",
    "url": "https://yearcompass.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yell0wsuit.page",
    "url": "https://yell0wsuit.page/games.html",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yflix.to",
    "url": "https://yflix.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yogadns.com",
    "url": "https://yogadns.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "you.dj",
    "url": "https://you.dj/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "youarelistening.to",
    "url": "https://youarelistening.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "you-get.org",
    "url": "https://you-get.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yourcountdown.to",
    "url": "https://yourcountdown.to/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yourdigitalrights.org",
    "url": "https://yourdigitalrights.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "youtubemp3.to",
    "url": "https://youtubemp3.to/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yt1s.com",
    "url": "https://yt1s.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yt1s.pro",
    "url": "https://yt1s.pro/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytch.xyz",
    "url": "https://ytch.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytconv.net",
    "url": "https://ytconv.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytdn.netlify.app",
    "url": "https://ytdn.netlify.app/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytiz.xyz",
    "url": "https://ytiz.xyz/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmdl.deepjyoti30.dev",
    "url": "https://ytmdl.deepjyoti30.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmp3.cc",
    "url": "https://ytmp3.cc/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmp3.nu",
    "url": "https://ytmp3.nu/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmp3.plus",
    "url": "https://ytmp3.plus/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmp3.video",
    "url": "https://ytmp3.video/",
    "category": "filmy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmp3.zone",
    "url": "https://ytmp3.zone/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytmp3hub.com",
    "url": "https://ytmp3hub.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytplaylist-len.sharats.dev",
    "url": "https://ytplaylist-len.sharats.dev/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytpp3.com",
    "url": "https://ytpp3.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytpp3.org",
    "url": "https://ytpp3.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ytthumbnailhd.com",
    "url": "https://ytthumbnailhd.com/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yupp.ai",
    "url": "https://yupp.ai/",
    "category": "ai",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "yushare.my.id",
    "url": "https://yushare.my.id",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "z3.fm",
    "url": "https://z3.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zamunda.net",
    "url": "https://zamunda.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zardam.github.io",
    "url": "https://zardam.github.io/webnofrendo/",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zaudiobooks.com",
    "url": "https://zaudiobooks.com/",
    "category": "muzyka",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zen.unit.ms",
    "url": "https://zen.unit.ms/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zenius-i-vanisher.com",
    "url": "https://zenius-i-vanisher.com/v5.2/arcades.php",
    "category": "gry",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zeno.fm",
    "url": "https://zeno.fm/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zenodo.org",
    "url": "https://zenodo.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zenpen.io",
    "url": "https://zenpen.io/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zeroscans.com",
    "url": "https://zeroscans.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zh.wikisource.org",
    "url": "https://zh.wikisource.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zhangboheng.github.io",
    "url": "https://zhangboheng.github.io/Easy-Web-TV-M3u8/routes/countries.html",
    "category": "programowanie",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zim-wiki.org",
    "url": "https://zim-wiki.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zinmanga.com",
    "url": "https://zinmanga.com/",
    "category": "komiksy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "ziperto.com",
    "url": "https://ziperto.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zipextractor.app",
    "url": "https://zipextractor.app/",
    "category": "privacy",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "z-lib.fm",
    "url": "https://z-lib.fm/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "z-lib.gd",
    "url": "https://z-lib.gd/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "z-lib.io",
    "url": "https://z-lib.io/",
    "category": "ebooki",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zloemu.net",
    "url": "https://zloemu.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zonelets.net",
    "url": "https://zonelets.net/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "z-o-o-m.eu",
    "url": "https://z-o-o-m.eu/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zty.pe",
    "url": "https://zty.pe/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zulu.zscaler.com",
    "url": "https://zulu.zscaler.com/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  },
  {
    "name": "zvu4no.org",
    "url": "https://zvu4no.org/",
    "category": "pozostale",
    "description": "",
    "added": "2026-01-03 22:03"
  }
];
