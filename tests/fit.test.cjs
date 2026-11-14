const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { loadGame } = require('./helpers/arcade-harness.cjs');

// GryKit.fit: boards grow into the free window space (and shrink in small windows), keep their aspect ratio,
// stop at 3× (or the game's own max) and keep pointer coordinates in logical board units.
// linkedom has no layout, so each test gives the board, its stage and the page container their sizes.
const $ = (p, sel) => p.document.querySelector(sel);
function box(el, { left = 0, top = 0, width = 0, height = 0, client } = {}) {
  el.getBoundingClientRect = () => ({ left, top, width, height, right: left + width, bottom: top + height });
  if (client != null) Object.defineProperty(el, 'clientWidth', { configurable: true, value: client });
}
// Desktop page: container (wrapper) 1968 px wide, .game-stage limited by --game-width, board below the header.
function layout(p, board, { stageW, top = 225, wrapperW = 1968, natural } = {}) {
  const stage = board.closest('.game-stage');
  box(stage, { left: (wrapperW - stageW) / 2, top, width: stageW, height: 500, client: stageW });
  box(stage.parentElement, { width: wrapperW, height: 900, client: wrapperW });
  if (board.parentElement !== stage) box(board.parentElement, { top, width: stageW, height: 500, client: stageW });
  box(board, { left: (wrapperW - stageW) / 2, top, width: natural ? natural[0] : stageW, height: natural ? natural[1] : 500 });
  if (natural) Object.defineProperties(board, { offsetWidth: { configurable: true, value: natural[0] }, offsetHeight: { configurable: true, value: natural[1] } });
  return stage;
}
const scale = p => p.run('GryKit.fitted()[0].scale');

test('Fit: the kit scales boards up as well as down, 3× at most by default', () => {
  const src = fs.readFileSync(path.join(__dirname, '../assets/gry-kit/gry-kit.js'), 'utf8');
  assert.match(src, /var FIT_MAX = 3;/);
  assert.doesNotMatch(src, /o\.max \|\| 1\b/, 'no hidden 1× cap left');
});

test('Fit: Flappy grows in a large window (2000×985) and is limited by the height below the header', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 985 }), board = $(p, '#game');
  layout(p, board, { stageW: 720, natural: [488, 648] });
  p.frame(0);
  const z = parseFloat(board.style.zoom);
  assert.ok(z > 1.1, 'zoom ' + board.style.zoom);
  assert.ok(648 * z <= 985 - 225 - 12 + 1, 'board ends above the bottom edge');
  assert.equal(z.toFixed(3), scale(p).toFixed(3));
});

test('Fit: the scale-up stops at 3× in a huge window', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 4000, height: 4000 }), board = $(p, '#game');
  layout(p, board, { stageW: 720, wrapperW: 3968, natural: [488, 648] });
  p.frame(0);
  assert.equal(board.style.zoom, '3.000');
});

test('Fit: a small window still shrinks the board', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 820, height: 560 }), board = $(p, '#game');
  layout(p, board, { stageW: 720, wrapperW: 788, top: 251, natural: [488, 648] });
  p.frame(0);
  const z = parseFloat(board.style.zoom);
  assert.ok(z > 0.3 && z < 0.5, 'zoom ' + board.style.zoom);
});

test('Fit: a canvas board scales by CSS size with a matching sharp buffer and keeps its aspect ratio', () => {
  const p = loadGame('gry/tower/tower.html', { width: 2000, height: 1200 }), canvas = $(p, '#game');
  layout(p, canvas, { stageW: 720 });
  p.frame(0);
  const s = scale(p), w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height);
  assert.ok(s > 1.5 && s <= 3, 'scale ' + s);
  assert.equal(w, Math.floor(400 * s)); assert.equal(h, Math.floor(500 * s));
  assert.equal(canvas.width, w, 'buffer follows the CSS size (devicePixelRatio 1)');
  assert.equal(p.run('GryKit.ratio(document.getElementById("game"))'), w / 400);
});

test('Fit: GryKit.pointer maps clicks on a scaled canvas back to logical board units', () => {
  const p = loadGame('gry/tower/tower.html', { width: 2000, height: 1200 }), canvas = $(p, '#game');
  layout(p, canvas, { stageW: 720 });
  p.frame(0);
  const w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height);
  box(canvas, { left: 30, top: 200, width: w, height: h });
  const pt = p.run(`GryKit.pointer(document.getElementById('game'), { clientX: ${30 + w / 2}, clientY: ${200 + h / 4} })`);
  assert.deepEqual({ x: Math.round(pt.x), y: Math.round(pt.y) }, { x: 200, y: 125 });
  const touch = p.run(`GryKit.pointer(document.getElementById('game'), { touches: [{ clientX: ${30 + w}, clientY: ${200 + h} }] })`);
  assert.deepEqual({ x: Math.round(touch.x), y: Math.round(touch.y) }, { x: 400, y: 500 });
});

test('Fit: a board wider than --game-width widens its stage instead of overflowing it', () => {
  const p = loadGame('gry/dino/dino.html', { width: 2000, height: 985 }), canvas = $(p, '#game');
  const stage = layout(p, canvas, { stageW: 804 });
  p.frame(0);
  assert.equal(scale(p), 2, 'Dino keeps its own 2× cap');
  assert.equal(canvas.style.width, '1600px');
  assert.ok(parseFloat(stage.style.maxWidth) >= 1600, 'stage max-width ' + stage.style.maxWidth);
});

test('Fit: a fluid board (100% of the stage) is not widened past the stage', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 1600 }), board = $(p, '#game');
  const stage = layout(p, board, { stageW: 720, natural: [720, 300] });
  // Without the stage limit the board would follow the container: it is fluid.
  const original = Object.getOwnPropertyDescriptor(board, 'offsetWidth');
  Object.defineProperty(board, 'offsetWidth', { configurable: true, get: () => stage.style.maxWidth === 'none' ? 1968 : original.value });
  p.frame(0);
  assert.equal(board.style.zoom, '', 'width-limited at 1×');
  assert.equal(stage.style.maxWidth, '');
});

// Layout 'auto': in a wide window a portrait/square board gets the full height and the game bar moves beside it.
// The mocked geometry follows the .gk-side class like a browser would: stacked, the board starts below the bar
// (top 225); side by side, it starts at the top of the page container (152) and the bar takes a 220 px column.
function sideLayout(p, board, { wrapperW = 1968, natural, barH = 183 } = {}) {
  const stage = board.closest('.game-stage'), wrap = stage.parentElement, bar = $(p, '.game-bar');
  const side = () => wrap.classList.contains('gk-side');
  const top = () => side() ? 152 : 225;
  const stageW = () => side() ? natural[0] : 720;
  stage.getBoundingClientRect = () => ({ left: 0, top: top(), width: stageW(), height: natural[1], right: stageW(), bottom: top() + natural[1] });
  Object.defineProperty(stage, 'clientWidth', { configurable: true, get: stageW });
  Object.defineProperty(wrap, 'clientWidth', { configurable: true, value: wrapperW });
  board.getBoundingClientRect = () => ({ left: 0, top: top(), width: natural[0], height: natural[1], right: natural[0], bottom: top() + natural[1] });
  Object.defineProperties(board, { offsetWidth: { configurable: true, value: natural[0] }, offsetHeight: { configurable: true, value: natural[1] } });
  Object.defineProperty(bar, 'offsetWidth', { configurable: true, get: () => side() ? 220 : 720 });
  bar.getBoundingClientRect = () => ({ left: 0, top: 152, width: side() ? 220 : 720, height: side() ? barH : 57, right: 0, bottom: 152 + (side() ? barH : 57) });
  // Status line under the bar (side) or under the board (stacked); the page header stays put.
  for (const el of wrap.children) if (el !== bar && el !== stage) el.getBoundingClientRect = () => ({ left: 0, top: 360, width: 220, height: 21, right: 220, bottom: 381 });
  $(p, '.site-header').getBoundingClientRect = () => ({ left: 0, top: 0, width: 2000, height: 128, right: 2000, bottom: 0 });
  return { wrap, side };
}

test('Fit math: the scale is limited by width, height and the cap; the side layout needs a clear gain to switch', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 985 });
  const s = (...a) => p.run(`GryKit.fitMath.scale(${a.join(',')})`);
  const pick = (a, b, was) => p.run(`GryKit.fitMath.pick(${a}, ${b}, ${was})`);
  assert.equal(s(1000, 800, 400, 500, 0, 0, 3), 1.6, 'height-limited');
  assert.equal(s(500, 2000, 400, 500, 100, 0, 3), 1, 'width minus the frame around the board');
  assert.equal(s(5000, 5000, 400, 500, 0, 0, 3), 3, 'cap');
  assert.equal(pick(1.0, 1.03, false), 'stack', 'a 3% gain is not worth moving the bar');
  assert.equal(pick(1.0, 1.05, false), 'side');
  assert.equal(pick(1.0, 1.03, true), 'side', 'hysteresis: an active side layout stays while it still clearly helps');
  assert.equal(pick(1.0, 1.0, true), 'stack');
  assert.equal(pick(1.2, 0, false), 'stack', 'side layout that does not fit');
  assert.equal(p.run('GryKit.fitMath.SIDE_MIN_VW'), 700);
});

test('Layout auto: Flappy in a 2000×985 window puts the bar beside the board and gets the full height', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 985 }), board = $(p, '#game');
  const { wrap, side } = sideLayout(p, board, { natural: [488, 648] });
  p.frame(0);
  assert.equal(p.run('GryKit.layout'), 'side');
  assert.ok(side() && wrap.getAttribute('data-gk-layout') === 'side');
  const z = parseFloat(board.style.zoom), stacked = (985 - 225 - 12) / 648;
  assert.equal(board.style.zoom, ((985 - 152 - 12) / 648).toFixed(3), 'height from the top of the page container');
  assert.ok(z > stacked * 1.04, `side ${z} vs stacked ${stacked}`);
  assert.equal(p.run('GryKit.fitted()[0].layout'), 'side');
});

test('Layout auto: the width of the side column is subtracted from the room for the board', () => {
  // Stacked: height-limited at (1300 - 225 - 12) / 648 = 1.640. Side: width-limited at (1060 - 220) / 488 = 1.721.
  const p = loadGame('gry/flappy/flappy.html', { width: 1092, height: 1300 }), board = $(p, '#game');
  sideLayout(p, board, { wrapperW: 1060, natural: [488, 648] });
  p.frame(0);
  assert.equal(p.run('GryKit.layout'), 'side');
  assert.equal(board.style.zoom, ((1060 - 220) / 488).toFixed(3), 'width-limited: container minus the 220 px bar column');
});

test('Layout auto: narrow windows, landscape boards and a bar taller than the window keep the stacked layout', () => {
  let p = loadGame('gry/flappy/flappy.html', { width: 690, height: 985 }), board = $(p, '#game');
  let s = sideLayout(p, board, { wrapperW: 658, natural: [488, 648] });
  p.frame(0);
  assert.equal(p.run('GryKit.layout'), 'stack', 'phone / narrow window');
  assert.ok(!s.side());

  p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 985 }); board = $(p, '#game');
  s = sideLayout(p, board, { natural: [900, 400] });
  p.frame(0);
  assert.equal(p.run('GryKit.layout'), 'stack', 'landscape board');
  assert.ok(!s.side());

  p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 985 }); board = $(p, '#game');
  s = sideLayout(p, board, { natural: [488, 648], barH: 900 });
  p.frame(0);
  assert.equal(p.run('GryKit.layout'), 'stack', 'the side column would not fit in the window');
  assert.ok(!s.side());
});

test('Layout auto: the layout switches live on resize, both ways', () => {
  const p = loadGame('gry/flappy/flappy.html', { width: 2000, height: 985 }), board = $(p, '#game');
  const { side } = sideLayout(p, board, { natural: [488, 648] });
  p.frame(0);
  assert.ok(side());
  p.run('window.innerWidth = 650'); p.windowEvent('resize'); p.frame(16);
  assert.equal(p.run('GryKit.layout'), 'stack');
  assert.ok(!side());
  assert.equal(board.style.zoom, ((985 - 225 - 12) / 648).toFixed(3), 'stacked fit again');
  p.run('window.innerWidth = 2000'); p.windowEvent('resize'); p.frame(32);
  assert.equal(p.run('GryKit.layout'), 'side');
  assert.ok(side());
});

test('Layout auto: GryKit.pointer still maps to logical units on a canvas scaled in the side layout', () => {
  const p = loadGame('gry/tower/tower.html', { width: 2000, height: 985 }), canvas = $(p, '#game');
  sideLayout(p, canvas, { natural: [400, 500] });
  p.frame(0);
  assert.equal(p.run('GryKit.layout'), 'side');
  const w = parseFloat(canvas.style.width), h = parseFloat(canvas.style.height);
  assert.equal(h, Math.floor(500 * (985 - 152 - 12) / 500));
  box(canvas, { left: 800, top: 152, width: w, height: h });
  const pt = p.run(`GryKit.pointer(document.getElementById('game'), { clientX: ${800 + w / 4}, clientY: ${152 + h * 3 / 4} })`);
  assert.deepEqual({ x: Math.round(pt.x), y: Math.round(pt.y) }, { x: 100, y: 375 });
});

test('Layout auto: portrait and square games opt in; the CSS keeps DOM order and gives the board its own column', () => {
  const read = f => fs.readFileSync(path.join(__dirname, '..', f), 'utf8');
  for (const f of ['gry/flappy/flappy.html', 'gry/tetris/tetris.html', 'gry/spaceinvaders/spaceinvaders.js', 'gry/tower/tower.html',
    'gry/snakex21/snake.html', 'gry/chess/chess.html', 'gry/sudoku/sudoku.html', 'gry/kolkokrzyrzykc/kolkokrzyzykc.html',
    'gry/simon/simon.html', 'gry/saper/saper.html', 'gry/wordle/wordle.html']) assert.match(read(f), /layout: 'auto'/, f);
  for (const f of ['gry/dino/dino.html', 'gry/pong/pong.html', 'gry/arkanoid/arkanoid.html', 'gry/2048/2048.html']) assert.doesNotMatch(read(f), /layout: 'auto'/, f);
  const css = read('assets/gry-kit/gry-kit.css'), side = css.slice(css.indexOf('.game-shell .gk-side {'));
  assert.match(side, /\.gk-side > \.game-stage \{ grid-column: 2; grid-row: 1 \/ -1;/);
  assert.doesNotMatch(side, /\border\s*:/, 'no visual reordering (focus order = DOM order)');
});
