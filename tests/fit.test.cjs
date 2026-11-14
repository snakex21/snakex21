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
