/* GryKit – wspólna warstwa gier snakex21 (window.GryKit).
 *
 * Dołączenie (w <head>, bez defer – gry wołają API ze swoich skryptów):
 *   <script src="../../assets/gry-kit/gry-kit.js?v=1"></script>
 * Arkusz gry-kit.css ładuje się sam (obok pliku .js).
 *
 * Najczęstsze użycie:
 *   GryKit.init({
 *     id: 'snake', title: 'Snake', icon: '🐍',
 *     howTo: ['Zbieraj jedzenie', 'Nie uderzaj w ściany ani w ogon'],
 *     controls: '<kbd>←</kbd><kbd>↑</kbd><kbd>→</kbd><kbd>↓</kbd> ruch · <kbd>P</kbd>/<kbd>Esc</kbd> pauza',
 *     board: canvas,                 // nad tym elementem pojawia się nakładka
 *     hud: { score: '#score', best: '#high-score', lives: false },
 *     modes: [{ id: 'ai', label: 'Z komputerem', desc: '…' }, …],   // opcjonalnie: przyciski trybów zamiast „Graj”
 *     onStart(mode) { reset(); run(); },   // „Graj”, „Zagraj ponownie”, GryKit.start()
 *     onPause(paused) { … },               // P / Esc / utrata fokusu okna
 *     onMenu() { … }                       // „Menu” na ekranie końca
 *   });
 *   GryKit.score(10); GryKit.lives(2);
 *   GryKit.over({ score, win: false });   // zapisuje rekord i pokazuje ekran końca
 *   GryKit.state                          // 'menu' | 'playing' | 'paused' | 'over'
 *   GryKit.fx.burst(x, y, { on: canvas, color: '#e8763d' }); GryKit.fx.float(x, y, '+10', { on: canvas });
 *   GryKit.fx.shake(); GryKit.fx.flash('#d05c5c'); GryKit.sfx.play('eat');
 *   GryKit.font(18, 700)  → '700 18px <czcionka strony>' dla ctx.font
 *   GryKit.fit(canvas, { pixel: true })  → plansza mieści się w oknie (bez przewijania)
 * Wszystko działa bez localStorage, bez WebAudio i z prefers-reduced-motion. */
(function () {
  'use strict';
  if (window.GryKit) return;

  var doc = document;
  var root = doc.documentElement;
  var script = doc.currentScript;
  var embedded = false;
  try { embedded = window.parent !== window; } catch (e) { embedded = true; }
  if (embedded) root.classList.add('gk-embedded');

  /* ---------- arkusz ---------- */
  var cssReady = false;
  var cssWaiters = [];
  (function loadCss() {
    var href = script && script.src ? script.src.replace(/\.js(\?[^#]*)?(#.*)?$/, '.css$1') : '';
    if (!href) { cssReady = true; return; }
    var link = doc.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    link.id = 'gry-kit-css';
    var done = function () { cssReady = true; cssWaiters.splice(0).forEach(function (fn) { fn(); }); };
    link.onload = done; link.onerror = done;
    setTimeout(done, 1500);
    (doc.head || root).appendChild(link);
  })();
  function whenCss(fn) { if (cssReady) fn(); else cssWaiters.push(fn); }
  function ready(fn) { if (doc.readyState === 'loading') doc.addEventListener('DOMContentLoaded', fn); else fn(); }

  /* ---------- pamięć ---------- */
  function read(key) { try { return localStorage.getItem(key); } catch (e) { return null; } }
  function write(key, value) {
    try { if (value === null) localStorage.removeItem(key); else localStorage.setItem(key, String(value)); } catch (e) {}
  }

  var reducedQuery = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
  function reduced() { return !!(reducedQuery && reducedQuery.matches); }

  /* ---------- czcionka i kolory ---------- */
  var fontCache = '';
  function fontFamily() {
    if (!fontCache && doc.body) {
      fontCache = getComputedStyle(doc.body).fontFamily || 'sans-serif';
      if (/times/i.test(fontCache.split(',')[0])) fontCache = 'Inter, -apple-system, "Segoe UI", Roboto, sans-serif';
    }
    return fontCache || 'Inter, -apple-system, "Segoe UI", Roboto, sans-serif';
  }
  function font(size, weight) { return (weight || 600) + ' ' + Math.round(size) + 'px ' + fontFamily(); }
  function cssVar(name, fallback) {
    var v = getComputedStyle(doc.body || root).getPropertyValue(name).trim();
    return v || fallback || '';
  }
  if (typeof MutationObserver === 'function') {
    new MutationObserver(function () { fontCache = ''; }).observe(root, { attributes: true, attributeFilter: ['data-theme', 'data-pulpit-theme', 'data-palette'] });
  }
  whenCss(function () { fontCache = ''; });

  /* ---------- dźwięk (WebAudio, bez plików) ---------- */
  var MUTE_KEY = 'gry:muted';
  var muted = read(MUTE_KEY) === '1';
  var actx = null;
  var master = null;
  function audio() {
    if (actx) return actx;
    var AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    try {
      actx = new AC();
      master = actx.createGain();
      master.gain.value = 0.18;
      master.connect(actx.destination);
    } catch (e) { actx = null; }
    return actx;
  }
  function unlock() {
    var a = audio();
    if (a && a.state === 'suspended') { try { a.resume(); } catch (e) {} }
  }
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (t) { window.addEventListener(t, unlock, { passive: true, capture: true }); });

  function tone(o) {
    var a = audio();
    if (!a || muted || a.state !== 'running') return;
    var t0 = a.currentTime + (o.delay || 0);
    var dur = o.dur || 0.08;
    var g = a.createGain();
    var vol = o.vol == null ? 0.6 : o.vol;
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + Math.min(0.01, dur / 4));
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    var src;
    if (o.noise) {
      var len = Math.max(1, Math.floor(a.sampleRate * dur));
      var buf = a.createBuffer(1, len, a.sampleRate);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      src = a.createBufferSource();
      src.buffer = buf;
      var filter = a.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(o.freq || 1200, t0);
      if (o.to) filter.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
      src.connect(filter); filter.connect(g);
    } else {
      src = a.createOscillator();
      src.type = o.type || 'square';
      src.frequency.setValueAtTime(o.freq || 440, t0);
      if (o.to) src.frequency.exponentialRampToValueAtTime(o.to, t0 + dur);
      src.connect(g);
    }
    g.connect(master);
    src.start(t0);
    src.stop(t0 + dur + 0.02);
  }
  var SOUNDS = {
    click: [{ freq: 700, dur: 0.035, type: 'square', vol: 0.3 }],
    tick: [{ freq: 1600, dur: 0.018, type: 'square', vol: 0.18 }],
    tap: [{ freq: 1100, to: 900, dur: 0.03, type: 'triangle', vol: 0.4 }],
    eat: [{ freq: 660, to: 990, dur: 0.07, type: 'square', vol: 0.35 }, { freq: 1320, dur: 0.06, type: 'triangle', delay: 0.05, vol: 0.3 }],
    coin: [{ freq: 988, dur: 0.06, type: 'square', vol: 0.3 }, { freq: 1319, dur: 0.12, type: 'square', delay: 0.06, vol: 0.3 }],
    score: [{ freq: 520, to: 780, dur: 0.12, type: 'triangle', vol: 0.5 }],
    hit: [{ freq: 320, to: 260, dur: 0.05, type: 'square', vol: 0.35 }],
    bounce: [{ freq: 480, to: 380, dur: 0.04, type: 'square', vol: 0.3 }],
    wall: [{ freq: 200, to: 160, dur: 0.05, type: 'square', vol: 0.3 }],
    jump: [{ freq: 300, to: 640, dur: 0.12, type: 'triangle', vol: 0.45 }],
    shoot: [{ freq: 1100, to: 220, dur: 0.1, type: 'square', vol: 0.22 }],
    boom: [{ noise: true, freq: 1800, to: 120, dur: 0.35, vol: 0.7 }],
    error: [{ freq: 150, dur: 0.16, type: 'square', vol: 0.3 }, { freq: 120, dur: 0.16, type: 'square', delay: 0.09, vol: 0.25 }],
    lose: [{ freq: 440, to: 110, dur: 0.55, type: 'sawtooth', vol: 0.35 }],
    win: [{ freq: 523, dur: 0.1, type: 'square', vol: 0.3 }, { freq: 659, dur: 0.1, type: 'square', delay: 0.1, vol: 0.3 },
      { freq: 784, dur: 0.1, type: 'square', delay: 0.2, vol: 0.3 }, { freq: 1047, dur: 0.25, type: 'triangle', delay: 0.3, vol: 0.4 }],
    start: [{ freq: 392, dur: 0.07, type: 'triangle', vol: 0.4 }, { freq: 784, dur: 0.12, type: 'triangle', delay: 0.07, vol: 0.4 }],
    pause: [{ freq: 600, to: 400, dur: 0.08, type: 'triangle', vol: 0.3 }],
    line: [{ freq: 660, dur: 0.06, type: 'square', vol: 0.3 }, { freq: 880, dur: 0.06, type: 'square', delay: 0.06, vol: 0.3 }, { freq: 1175, dur: 0.1, type: 'square', delay: 0.12, vol: 0.3 }]
  };
  var sfx = {
    play: function (name, opts) {
      var list = SOUNDS[name];
      if (!list) return;
      var pitch = opts && opts.pitch ? opts.pitch : 1;
      for (var i = 0; i < list.length; i++) {
        var o = {};
        for (var k in list[i]) o[k] = list[i][k];
        if (o.freq) o.freq *= pitch;
        if (o.to) o.to *= pitch;
        tone(o);
      }
    },
    tone: tone,
    get muted() { return muted; },
    setMuted: function (value) {
      muted = !!value;
      write(MUTE_KEY, muted ? '1' : null);
      syncMute();
    },
    toggle: function () { sfx.setMuted(!muted); if (!muted) sfx.play('click'); }
  };
  var muteButtons = [];
  function syncMute() {
    muteButtons.forEach(function (b) {
      b.textContent = muted ? '🔇' : '🔊';
      b.setAttribute('aria-pressed', String(muted));
      b.setAttribute('aria-label', muted ? 'Włącz dźwięk' : 'Wycisz dźwięk');
      b.title = muted ? 'Dźwięk wyłączony' : 'Dźwięk włączony';
    });
  }
  window.addEventListener('storage', function (e) { if (e.key === MUTE_KEY) { muted = e.newValue === '1'; syncMute(); } });

  /* ---------- efekty ---------- */
  var fxLayer = null;
  function layer() {
    if (!fxLayer && doc.body) {
      fxLayer = doc.createElement('div');
      fxLayer.className = 'gk-fx';
      fxLayer.setAttribute('aria-hidden', 'true');
      doc.body.appendChild(fxLayer);
    }
    return fxLayer;
  }
  // Punkt (x, y) we współrzędnych elementu `on` (canvas: piksele bufora; inny element: piksele CSS od lewego górnego rogu)
  // → współrzędne okna.
  function toViewport(x, y, on) {
    var el = on || (cfg && cfg.board) || doc.body;
    var r = el.getBoundingClientRect();
    var sx = 1, sy = 1;
    if (el._gkLogical) { sx = r.width / el._gkLogical.w; sy = r.height / el._gkLogical.h; }
    else if (el.tagName === 'CANVAS' && el.width && el.height) { sx = r.width / el.width; sy = r.height / el.height; }
    return { x: r.left + x * sx, y: r.top + y * sy };
  }
  function animate(el, frames, opts, after) {
    if (!el.animate) { if (after) after(); else el.remove(); return; }
    var anim = el.animate(frames, opts);
    anim.onfinish = function () { if (after) after(); else el.remove(); };
  }
  var fx = {
    burst: function (x, y, o) {
      o = o || {};
      if (reduced()) return;
      var L = layer(); if (!L) return;
      var p = toViewport(x, y, o.on);
      var colors = [].concat(o.color || ['#e8763d', '#f2c14e', '#b8d58e']);
      var n = Math.min(40, o.count || 12);
      for (var i = 0; i < n; i++) {
        var d = doc.createElement('i');
        d.className = 'gk-particle';
        var size = (o.size || 7) * (0.6 + Math.random() * 0.8);
        d.style.width = d.style.height = size + 'px';
        d.style.background = colors[i % colors.length];
        if (o.square) d.style.borderRadius = '2px';
        L.appendChild(d);
        var ang = Math.random() * Math.PI * 2;
        var dist = (o.spread || 46) * (0.45 + Math.random() * 0.75);
        var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist + (o.gravity == null ? 18 : o.gravity);
        animate(d, [
          { transform: 'translate(' + p.x + 'px,' + p.y + 'px) scale(1)', opacity: 1 },
          { transform: 'translate(' + (p.x + dx) + 'px,' + (p.y + dy) + 'px) scale(.2)', opacity: 0 }
        ], { duration: (o.duration || 520) * (0.7 + Math.random() * 0.5), easing: 'cubic-bezier(.15,.7,.35,1)' });
      }
    },
    float: function (x, y, text, o) {
      o = o || {};
      var L = layer(); if (!L) return;
      var p = toViewport(x, y, o.on);
      var d = doc.createElement('span');
      d.className = 'gk-float';
      d.textContent = text;
      if (o.color) d.style.color = o.color;
      if (o.size) d.style.fontSize = o.size + 'px';
      L.appendChild(d);
      var rise = reduced() ? 0 : (o.rise || 38);
      animate(d, [
        { transform: 'translate(' + p.x + 'px,' + p.y + 'px) translate(-50%,-50%) scale(.8)', opacity: 0 },
        { transform: 'translate(' + p.x + 'px,' + (p.y - rise * 0.3) + 'px) translate(-50%,-50%) scale(1.1)', opacity: 1, offset: 0.2 },
        { transform: 'translate(' + p.x + 'px,' + (p.y - rise) + 'px) translate(-50%,-50%) scale(1)', opacity: 0 }
      ], { duration: o.duration || 800, easing: 'ease-out' });
    },
    shake: function (el, strength, ms) {
      if (reduced()) return;
      el = el || (cfg && cfg.board);
      if (!el || !el.animate) return;
      var s = strength || 6;
      var frames = [];
      for (var i = 0; i <= 6; i++) {
        var k = (6 - i) / 6;
        frames.push({ transform: 'translate(' + ((Math.random() * 2 - 1) * s * k).toFixed(1) + 'px,' + ((Math.random() * 2 - 1) * s * k).toFixed(1) + 'px)' });
      }
      frames[frames.length - 1] = { transform: 'translate(0,0)' };
      el.animate(frames, { duration: ms || 280, easing: 'linear' });
    },
    flash: function (color, o) {
      o = o || {};
      var el = o.on || (cfg && cfg.board);
      if (!el) return;
      var r = el.getBoundingClientRect();
      var L = layer(); if (!L) return;
      var d = doc.createElement('div');
      d.className = 'gk-flash';
      d.style.cssText = 'position:fixed;left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;background:' + (color || '#fff') + ';';
      L.appendChild(d);
      var peak = reduced() ? 0.18 : (o.strength || 0.45);
      animate(d, [{ opacity: peak }, { opacity: 0 }], { duration: o.duration || 260, easing: 'ease-out' });
    },
    // Krótkie „wyskoczenie” elementu DOM (kafelek, przycisk)
    pop: function (el, scale) {
      if (!el || !el.animate || reduced()) return;
      el.animate([{ transform: 'scale(1)' }, { transform: 'scale(' + (scale || 1.15) + ')' }, { transform: 'scale(1)' }], { duration: 180, easing: 'ease-out' });
    },
    burstAt: function (el, o) {
      if (!el) return;
      var r = el.getBoundingClientRect();
      var opts = {}; for (var k in (o || {})) opts[k] = o[k];
      opts.on = doc.body;
      var b = doc.body.getBoundingClientRect();
      fx.burst(r.left + r.width / 2 - b.left, r.top + r.height / 2 - b.top, opts);
    }
  };

  /* ---------- dopasowanie planszy do okna ---------- */
  var fitted = [];
  function outerH(el) {
    if (!el || el.nodeType !== 1) return 0;
    var cs = getComputedStyle(el);
    if (cs.display === 'none' || cs.position === 'absolute' || cs.position === 'fixed') return 0;
    return el.offsetHeight + (parseFloat(cs.marginTop) || 0) + (parseFloat(cs.marginBottom) || 0);
  }
  function reserveBelow(el) {
    // Wysokość elementów pod planszą (pasek statusu, pad dotykowy) aż do końca głównego kontenera.
    var total = 0;
    var node = el.closest('.game-stage') || el;
    var stop = el.closest('[role="main"], main, .game-wrapper') || doc.body;
    while (node && node !== stop && node !== doc.body) {
      var sib = node.nextElementSibling;
      while (sib) { if (sib.tagName !== 'SCRIPT') total += outerH(sib); sib = sib.nextElementSibling; }
      node = node.parentElement;
    }
    if (stop && stop !== doc.body) total += parseFloat(getComputedStyle(stop).paddingBottom) || 0;
    return total;
  }
  // Na wąskich ekranach (telefon) nagłówek strony może odjechać przy przewijaniu – liczy się miejsce pod nim.
  function headerOffset() {
    if (window.innerWidth >= 700) return 0;
    var hd = doc.querySelector('.site-header');
    return hd ? hd.getBoundingClientRect().bottom + window.scrollY : 0;
  }
  function applyFit(item) {
    var el = item.el, o = item.opts;
    if (!el.isConnected) return;
    var host = o.within || el.parentElement;
    var hcs = getComputedStyle(host);
    var availW = host.clientWidth - (parseFloat(hcs.paddingLeft) || 0) - (parseFloat(hcs.paddingRight) || 0);
    if (o.maxWidth) availW = Math.min(availW, o.maxWidth);
    var extraW = o.extraWidth || 0, extraH = o.extraHeight || 0;
    if (o.zoom) {
      el.style.zoom = '';
      var natW = el.offsetWidth, natH = el.offsetHeight;
      var top = el.getBoundingClientRect().top + window.scrollY;
      var reserve = o.reserve != null ? o.reserve : reserveBelow(el);
      var availH = window.innerHeight - (top - headerOffset()) - reserve - (o.gap == null ? 12 : o.gap);
      var z = Math.min(o.max || 1, (availW - extraW) / natW, (availH - extraH) / natH);
      z = Math.max(o.min || 0.45, z);
      if (z < 0.995 || z > 1.005) el.style.zoom = z.toFixed(3);
      item.scale = z;
    } else {
      if (!item.natW) { item.natW = o.width || el.width || el.offsetWidth; item.natH = o.height || el.height || el.offsetHeight; }
      var w = item.natW, h = item.natH;
      el.style.width = ''; el.style.height = '';
      var topC = el.getBoundingClientRect().top + window.scrollY;
      var res = o.reserve != null ? o.reserve : reserveBelow(el);
      var availHC = window.innerHeight - (topC - headerOffset()) - res - (o.gap == null ? 12 : o.gap);
      var s = Math.min(o.max || 1, (availW - extraW) / w, (availHC - extraH) / h);
      s = Math.max(o.min || 0.35, s);
      if (o.pixel && s >= 1) s = Math.floor(s);
      el.style.maxWidth = 'none';
      el.style.width = Math.floor(w * s) + 'px';
      el.style.height = Math.floor(h * s) + 'px';
      if (o.pixel) el.classList.add('gk-pixel');
      if (o.sharp && el.tagName === 'CANVAS') {
        // Bufor w rozdzielczości ekranu; gra rysuje w jednostkach logicznych (w × h) po ctx.setTransform(GryKit.ratio(canvas)…).
        var dpr = Math.min(3, window.devicePixelRatio || 1);
        var bw = Math.max(1, Math.round(Math.floor(w * s) * dpr)), bh = Math.max(1, Math.round(Math.floor(h * s) * dpr));
        if (el.width !== bw) el.width = bw;
        if (el.height !== bh) el.height = bh;
        el._gkLogical = { w: w, h: h };
      }
      item.scale = s;
    }
    if (o.onFit) o.onFit(item.scale);
    syncOverlay();
  }
  var fitQueued = false;
  function refit() {
    if (fitQueued) return;
    fitQueued = true;
    requestAnimationFrame(function () { fitQueued = false; fitted.forEach(applyFit); });
  }
  window.addEventListener('resize', refit);
  window.addEventListener('orientationchange', refit);
  function fit(el, opts) {
    if (typeof el === 'string') el = doc.querySelector(el);
    if (!el) return null;
    var item = null;
    for (var i = 0; i < fitted.length; i++) if (fitted[i].el === el) item = fitted[i];
    if (!item) { item = { el: el, opts: opts || {}, scale: 1 }; fitted.push(item); }
    else if (opts) item.opts = opts;
    ready(function () { whenCss(function () { applyFit(item); requestAnimationFrame(function () { applyFit(item); }); }); });
    if (doc.fonts && doc.fonts.ready) doc.fonts.ready.then(refit);
    return item;
  }

  /* ---------- nakładka, stan, HUD ---------- */
  var cfg = null;
  var state = 'idle';
  var mode = null;
  var overlay = null, card = null, host = null;
  var hud = { score: null, best: null, lives: null };
  var current = 0, best = 0, bestAtStart = 0, livesValue = null;
  var lastFocus = null;

  function $(sel) { return typeof sel === 'string' ? doc.querySelector(sel) : sel; }
  function el(tag, cls, html) {
    var e = doc.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmt(v) { return cfg && cfg.format ? cfg.format(v) : String(v); }

  function bestKey() { return 'gry:' + cfg.id + ':best' + (cfg.bestPerMode && mode ? ':' + mode : ''); }
  function loadBest() {
    var raw = read(bestKey());
    if (raw === null && cfg.legacyBestKey && !(cfg.bestPerMode && mode)) raw = read(cfg.legacyBestKey);
    var v = parseFloat(raw);
    best = isFinite(v) ? v : 0;
    bestAtStart = best;
    showBest();
  }
  function showBest() {
    if (hud.best) hud.best.textContent = best ? fmt(best) : (cfg.lowerIsBetter ? '–' : '0');
  }
  function better(v) {
    if (!isFinite(v)) return false;
    if (cfg.lowerIsBetter) return v > 0 && (!best || v < best);
    return v > best;
  }

  function statTile(label, cls) {
    var stats = doc.querySelector('.game-stats');
    if (!stats) {
      var bar = doc.querySelector('.game-bar');
      if (!bar) return null;
      stats = el('div', 'game-stats');
      var buttons = bar.querySelector('.game-buttons');
      bar.insertBefore(stats, buttons || null);
    }
    var tile = el('div', 'game-stat' + (cls ? ' ' + cls : ''));
    tile.appendChild(el('span', '', esc(label)));
    var b = el('b', '', '0');
    tile.appendChild(b);
    stats.appendChild(tile);
    return b;
  }
  function setupHud() {
    var h = cfg.hud === false ? {} : (cfg.hud || { score: true, best: true });
    if (h.score) hud.score = h.score === true ? statTile(cfg.scoreLabel || 'Wynik') : $(h.score);
    if (h.best) hud.best = h.best === true ? statTile(cfg.bestLabel || 'Rekord') : $(h.best);
    if (h.lives) hud.lives = h.lives === true ? statTile('Życia', 'gk-lives') : $(h.lives);
    if (hud.lives && hud.lives.parentElement) hud.lives.parentElement.classList.add('gk-lives');
    loadBest();
  }

  function setupButtons() {
    var buttons = doc.querySelector('.game-buttons');
    if (!buttons) {
      var bar = doc.querySelector('.game-bar');
      if (!bar) return;
      buttons = el('div', 'game-buttons');
      bar.appendChild(buttons);
    }
    if (cfg.pausable !== false && !doc.querySelector('[data-gk-pause]')) {
      var pb = el('button', 'kit-btn small gk-pause-btn', 'Pauza');
      pb.type = 'button';
      pb.setAttribute('data-gk-pause', '');
      buttons.appendChild(pb);
    }
    doc.querySelectorAll('[data-gk-pause]').forEach(function (b) {
      b.addEventListener('click', function () { api.togglePause(); });
    });
    if (cfg.muteButton !== false) {
      var mb = el('button', 'kit-btn small gk-mute');
      mb.type = 'button';
      mb.addEventListener('click', function () { sfx.toggle(); });
      buttons.appendChild(mb);
      muteButtons.push(mb);
      syncMute();
    }
  }
  function syncPauseButtons() {
    doc.querySelectorAll('[data-gk-pause]').forEach(function (b) {
      b.textContent = state === 'paused' ? 'Wznów' : 'Pauza';
      b.disabled = !(state === 'playing' || state === 'paused');
      b.setAttribute('aria-pressed', String(state === 'paused'));
    });
  }

  function buildOverlay() {
    var board = cfg.board;
    host = cfg.overlayHost ? $(cfg.overlayHost) : (/^(CANVAS|IMG|SVG|INPUT|VIDEO)$/i.test(board.tagName) ? board.parentElement : board);
    if (getComputedStyle(host).position === 'static') host.classList.add('gk-host');
    overlay = el('div', 'gk-overlay');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-live', 'polite');
    overlay.hidden = true;
    if (!cssReady) overlay.style.display = 'none';
    whenCss(function () { overlay.style.display = ''; syncOverlay(); });
    card = el('div', 'gk-card');
    overlay.appendChild(card);
    host.appendChild(overlay);
    if (typeof ResizeObserver === 'function') {
      var ro = new ResizeObserver(syncOverlay);
      ro.observe(board); if (host !== board) ro.observe(host);
    }
    window.addEventListener('resize', syncOverlay);
  }
  function syncOverlay() {
    if (!overlay || !cfg) return;
    var board = cfg.board;
    var w, h;
    if (host === board) {
      overlay.style.left = '0px'; overlay.style.top = '0px';
      w = board.clientWidth; h = board.clientHeight;
      overlay.style.width = '100%'; overlay.style.height = '100%';
    } else {
      var hr = host.getBoundingClientRect(), br = board.getBoundingClientRect();
      var z = parseFloat(getComputedStyle(host).zoom) || 1;
      w = br.width; h = br.height;
      overlay.style.left = ((br.left - hr.left) / z - host.clientLeft) + 'px';
      overlay.style.top = ((br.top - hr.top) / z - host.clientTop) + 'px';
      overlay.style.width = w / z + 'px';
      overlay.style.height = h / z + 'px';
    }
    overlay.classList.toggle('gk-compact', h < 380 || w < 330);
    overlay.classList.toggle('gk-tiny', h < 260);
  }

  function button(label, cls, onClick) {
    var b = el('button', 'kit-btn ' + (cls || ''), label);
    b.type = 'button';
    b.addEventListener('click', function (e) { e.stopPropagation(); sfx.play('click'); onClick(); });
    return b;
  }
  function show(nodes, focusFirst) {
    if (!overlay) return;
    card.innerHTML = '';
    nodes.forEach(function (n) { if (n) card.appendChild(n); });
    overlay.hidden = false;
    syncOverlay();
    if (focusFirst !== false) {
      var f = card.querySelector('.kit-btn.primary') || card.querySelector('button');
      if (f) { try { f.focus({ preventScroll: true }); } catch (e) { f.focus(); } }
    }
  }
  function hide() {
    if (!overlay) return;
    overlay.hidden = true;
    var target = cfg.focus ? $(cfg.focus) : null;
    if (target && target.focus) { try { target.focus({ preventScroll: true }); } catch (e) {} }
    else if (overlay.contains(doc.activeElement)) doc.activeElement.blur();
  }
  function head(title, icon) {
    var frag = doc.createDocumentFragment();
    if (icon) frag.appendChild(el('div', 'gk-icon', esc(icon)));
    frag.appendChild(el('h2', '', esc(title)));
    return frag;
  }
  function scoreBox(score, label) {
    var box = el('div', 'gk-score');
    if (score != null) box.innerHTML += '<div><span>' + esc(label || cfg.scoreLabel || 'Wynik') + '</span><b>' + esc(fmt(score)) + '</b></div>';
    if (cfg.hud !== false && cfg.showBest !== false) box.innerHTML += '<div><span>' + esc(cfg.bestLabel || 'Rekord') + '</span><b>' + (best ? esc(fmt(best)) : '–') + '</b></div>';
    return box;
  }

  function showMenu() {
    state = 'menu';
    syncPauseButtons();
    if (cfg.startScreen === false) { overlay.hidden = true; return; }
    var nodes = [head(cfg.title, cfg.icon)];
    if (cfg.subtitle) nodes.push(el('p', 'gk-text', esc(cfg.subtitle)));
    if (cfg.howTo) {
      var list = [].concat(cfg.howTo);
      var ul = el('ul', 'gk-howto');
      list.forEach(function (t) { ul.appendChild(el('li', '', t)); });
      nodes.push(ul);
    }
    if (cfg.extra) { var ex = el('div', 'gk-extra'); ex.appendChild($(cfg.extra)); nodes.push(ex); }
    if (cfg.modes && cfg.modes.length) {
      var m = el('div', 'gk-modes');
      cfg.modes.forEach(function (md, i) {
        var b = button(esc(md.label) + (md.desc ? '<small>' + esc(md.desc) + '</small>' : ''), i === 0 ? 'primary' : '', function () { api.start(md.id); });
        m.appendChild(b);
      });
      nodes.push(m);
    } else {
      var a = el('div', 'gk-actions');
      a.appendChild(button(esc(cfg.playLabel || 'Graj'), 'primary', function () { api.start(); }));
      nodes.push(a);
    }
    if (cfg.controls) nodes.push(el('p', 'gk-controls', cfg.controls));
    if (cfg.hud !== false && cfg.showBest !== false && best) nodes.push(el('p', 'gk-best', 'Rekord: <b>' + esc(fmt(best)) + '</b>'));
    show(nodes);
  }

  var api = {
    version: 1,
    init: function (opts) {
      cfg = opts || {};
      cfg.id = cfg.id || location.pathname.split('/').slice(-2, -1)[0] || 'gra';
      var run = function () {
        cfg.board = $(cfg.board) || doc.querySelector('.game-stage > *') || doc.querySelector('.game-stage');
        if (!cfg.board) return;
        setupHud();
        setupButtons();
        buildOverlay();
        if (cfg.fit) fit(cfg.fit === true ? cfg.board : $(cfg.fit.el || cfg.board), cfg.fit === true ? {} : cfg.fit);
        if (cfg.startScreen === false) { state = 'idle'; syncPauseButtons(); }
        else showMenu();
      };
      if (doc.body && $(cfg.board || '.game-stage')) run(); else ready(run);
      return api;
    },
    get state() { return state; },
    get mode() { return mode; },
    get playing() { return state === 'playing'; },
    get paused() { return state === 'paused'; },
    get best() { return best; },
    get reducedMotion() { return reduced(); },
    get embedded() { return embedded; },
    start: function (m) {
      if (m !== undefined) mode = m;
      else if (mode == null && cfg.modes && cfg.modes.length) mode = cfg.modes[0].id;
      if (cfg.bestPerMode) loadBest();
      bestAtStart = best;
      current = 0;
      hide();
      state = 'playing';
      syncPauseButtons();
      sfx.play('start');
      // Telefon: po starcie przewiń tak, by pasek gry i plansza były widoczne (nagłówek strony może zniknąć u góry).
      if (window.innerWidth < 700 && !embedded) {
        var bar = doc.querySelector('.game-bar') || cfg.board;
        var r = bar.getBoundingClientRect();
        if (r.top > 4) { try { window.scrollTo({ top: window.scrollY + r.top - 4, behavior: reduced() ? 'auto' : 'smooth' }); } catch (e) {} }
      }
      if (cfg.onStart) cfg.onStart(mode);
    },
    // Gra sama zaczyna się od ruchu gracza (np. strzałka w Snake) – przejście w „gra” bez wołania onStart.
    begin: function () {
      if (state === 'playing') return;
      hide(); state = 'playing'; syncPauseButtons();
    },
    pause: function (why) {
      if (state !== 'playing' || cfg.pausable === false) return;
      state = 'paused';
      syncPauseButtons();
      if (cfg.onPause) cfg.onPause(true);
      if (why !== 'silent') sfx.play('pause');
      var nodes = [head('Pauza', '⏸')];
      nodes.push(el('p', 'gk-text', why === 'blur' ? 'Gra wstrzymana, bo okno straciło fokus.' : 'Odpocznij chwilę – plansza poczeka.'));
      if (current) nodes.push(scoreBox(current));
      var a = el('div', 'gk-actions');
      a.appendChild(button('Wznów', 'primary', function () { api.resume(); }));
      a.appendChild(button('Od nowa', '', function () { api.start(mode); }));
      nodes.push(a);
      nodes.push(el('p', 'gk-controls', '<kbd>P</kbd> / <kbd>Esc</kbd> / <kbd>Enter</kbd> – wznów'));
      show(nodes);
    },
    resume: function () {
      if (state !== 'paused') return;
      hide();
      state = 'playing';
      syncPauseButtons();
      if (cfg.onPause) cfg.onPause(false);
    },
    togglePause: function () { if (state === 'paused') api.resume(); else api.pause(); },
    over: function (o) {
      o = o || {};
      if (state === 'over') return;
      state = 'over';
      syncPauseButtons();
      var score = o.score != null ? o.score : current;
      var record = false;
      if (o.record !== false && cfg.hud !== false && score != null) {
        if (better(score)) { best = score; write(bestKey(), best); showBest(); }
        // Rekord bity w tej partii (także gdy GryKit.score() podbijał go na bieżąco).
        var prevBest = bestAtStart;
        record = best === score && (cfg.lowerIsBetter ? score > 0 && (!prevBest || score < prevBest) : score > prevBest && score > 0);
      }
      if (o.sound !== false) sfx.play(o.win ? 'win' : 'lose');
      var nodes = [head(o.title || (o.win ? 'Wygrana!' : 'Koniec gry'), o.icon || (o.win ? '🏆' : ''))];
      if (record) nodes.push(el('span', 'gk-record', 'Nowy rekord!'));
      if (o.text) nodes.push(el('p', 'gk-text', esc(o.text)));
      if (o.html) nodes.push(el('div', 'gk-text', o.html));
      if (o.showScore !== false && score != null) nodes.push(scoreBox(score, o.scoreLabel));
      var a = el('div', 'gk-actions');
      a.appendChild(button(esc(o.again || 'Zagraj ponownie'), 'primary', function () { api.start(mode); }));
      if (o.menu !== false && cfg.startScreen !== false) a.appendChild(button('Menu', '', function () { api.menu(); }));
      nodes.push(a);
      if (o.delay) { setTimeout(function () { if (state === 'over') show(nodes); }, o.delay); }
      else show(nodes);
    },
    // Dowolny komunikat w nakładce (np. „Poziom 2”, wynik losowania). buttons: [{label, primary, onClick}]
    message: function (o) {
      o = o || {};
      var nodes = [head(o.title || '', o.icon)];
      if (o.text) nodes.push(el('p', 'gk-text', esc(o.text)));
      if (o.html) nodes.push(el('div', 'gk-text', o.html));
      var a = el('div', 'gk-actions');
      (o.buttons || [{ label: 'OK', primary: true }]).forEach(function (bt) {
        a.appendChild(button(esc(bt.label), bt.primary ? 'primary' : '', function () { hide(); if (bt.onClick) bt.onClick(); }));
      });
      nodes.push(a);
      show(nodes);
    },
    hideOverlay: hide,
    menu: function () {
      if (cfg.onMenu) cfg.onMenu();
      showMenu();
    },
    score: function (v) {
      if (v === undefined) return current;
      current = v;
      if (hud.score) hud.score.textContent = fmt(v);
      if (!cfg.lowerIsBetter && cfg.liveBest !== false && better(v)) { best = v; write(bestKey(), best); showBest(); }
      return v;
    },
    addScore: function (n) { return api.score(current + n); },
    lives: function (v) {
      if (v === undefined) return livesValue;
      livesValue = v;
      if (hud.lives) hud.lives.textContent = v > 0 && v <= 6 ? new Array(v + 1).join('♥') : String(Math.max(0, v));
      return v;
    },
    setBest: function (v) { best = v; write(bestKey(), v); showBest(); },
    fit: fit,
    refit: refit,
    // Skala bufora canvasu względem jednostek logicznych (po fit z { sharp: true }): ctx.setTransform(r, 0, 0, r, 0, 0).
    ratio: function (canvas) { return canvas && canvas._gkLogical ? canvas.width / canvas._gkLogical.w : 1; },
    // Punkt zdarzenia (mysz / dotyk) w jednostkach logicznych canvasu.
    pointer: function (canvas, e) {
      var r = canvas.getBoundingClientRect();
      var t = e.touches && e.touches[0] ? e.touches[0] : (e.changedTouches && e.changedTouches[0] ? e.changedTouches[0] : e);
      var lw = canvas._gkLogical ? canvas._gkLogical.w : canvas.width, lh = canvas._gkLogical ? canvas._gkLogical.h : canvas.height;
      return { x: (t.clientX - r.left) * lw / r.width, y: (t.clientY - r.top) * lh / r.height };
    },
    font: font,
    fontFamily: fontFamily,
    css: cssVar,
    fx: fx,
    sfx: sfx,
    store: { get: read, set: write }
  };

  /* ---------- klawiatura i fokus ---------- */
  function typingTarget(t) {
    return t && t.closest && t.closest('input:not([type=button]):not([type=checkbox]):not([type=radio]):not([type=range]), textarea, select, [contenteditable="true"]');
  }
  window.addEventListener('keydown', function (e) {
    if (!cfg || e.altKey || e.ctrlKey || e.metaKey) return;
    var key = e.key;
    var isPause = key === 'Escape' || ((e.code === 'KeyP' || key === 'p' || key === 'P') && cfg.pauseKeyP !== false);
    if (state === 'playing' && isPause && cfg.pausable !== false) {
      if (key !== 'Escape' && typingTarget(e.target)) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (!e.repeat) api.pause();
      return;
    }
    if (state === 'paused' && (isPause || key === 'Enter' || key === ' ')) {
      if (key !== 'Escape' && typingTarget(e.target)) return;
      if ((key === 'Enter' || key === ' ') && e.target && e.target.closest && e.target.closest('button') && overlay.contains(e.target)) return;
      e.preventDefault(); e.stopImmediatePropagation();
      if (!e.repeat) api.resume();
      return;
    }
    if ((state === 'menu' || state === 'over') && overlay && !overlay.hidden) {
      if (key === 'Enter' || key === ' ') {
        if (typingTarget(e.target)) return;
        if (e.target && e.target.closest && e.target.closest('button,a,select')) return;
        e.preventDefault(); e.stopImmediatePropagation();
        if (!e.repeat) {
          if (state === 'over') api.start(mode);
          else if (cfg.modes && cfg.modes.length) api.start(cfg.modes[0].id); else api.start();
        }
        return;
      }
      // Klawisze gry nie działają pod nakładką (strzałki, spacja itp.), chyba że gra o to prosi (startKeys).
      if (state === 'menu' && cfg.startKeys && cfg.startKeys.indexOf(key) >= 0 && !(cfg.modes && cfg.modes.length)) {
        api.start();
        return;
      }
    }
  }, true);
  window.addEventListener('blur', function () { if (cfg && cfg.autoPause !== false && state === 'playing') api.pause('blur'); });
  doc.addEventListener('visibilitychange', function () { if (doc.hidden && cfg && cfg.autoPause !== false && state === 'playing') api.pause('blur'); });

  window.GryKit = api;
})();
