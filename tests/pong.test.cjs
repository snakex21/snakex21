const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const { loadGame } = require('./helpers/arcade-harness.cjs');

// Ping-pong (gry/pong/pong.html) keeps its state inside an IIFE. The loader gives the
// test a read/write probe into that closure (`g('ball.x')`) and an optional ?query,
// without changing the game logic. Time advances in whole 50 ms frames.
const FILE = 'gry/pong/pong.html';
const W = 900, H = 540, PAD_H = 104;
function loadPong({ search = '', ...options } = {}) {
  const real = fs.readFileSync;
  fs.readFileSync = function (file, ...rest) {
    const out = real.call(this, file, ...rest);
    if (typeof file !== 'string' || !file.replace(/\\/g, '/').endsWith(FILE)) return out;
    const hooked = out.replace(/startDemo\(\);(\s*)requestAnimationFrame\(frame\);/,
      'startDemo();$1window.__pong = expr => eval(expr);$1requestAnimationFrame(frame);');
    assert.notEqual(hooked, out, 'test probe could not be attached to the game script');
    return hooked.replace('<head>', `<head><script>location.search = ${JSON.stringify(search)};</script>`);
  };
  let p;
  try { p = loadGame(FILE, options); } finally { fs.readFileSync = real; }
  const canvas = p.document.getElementById('pong-canvas');
  let rect = { left: 0, top: 0, width: W, height: H };
  canvas.getBoundingClientRect = () => ({ ...rect, right: rect.left + rect.width, bottom: rect.top + rect.height });
  let t = 0;
  const g = expr => p.run(`window.__pong(${JSON.stringify(expr)})`);
  return Object.assign(p, {
    g, canvas,
    setRect(r) { rect = { ...rect, ...r }; },
    step(n = 1) { for (let i = 0; i < n; i++) { t += 50; p.frame(t); } },
    overlayButtons: () => [...p.document.querySelectorAll('.gk-overlay .kit-btn')],
    primary: () => p.document.querySelector('.gk-overlay .kit-btn.primary'),
    overlayHidden: () => p.document.querySelector('.gk-overlay').hidden,
    key(code, props = {}, target = p.document) {
      const key = { KeyP: 'p', Escape: 'Escape', Enter: 'Enter', KeyW: 'w', KeyS: 's', ArrowUp: 'ArrowUp', ArrowDown: 'ArrowDown', KeyX: 'x' }[code] || code;
      return p.fire('keydown', { code, key, ...props }, target);
    },
    countOver() { p.run('window.__overCalls = 0; { const o = GryKit.over; GryKit.over = a => { window.__overCalls++; return o(a); }; }'); return () => p.run('window.__overCalls'); },
    // Put the ball just past one side's paddle, live (no serve countdown), and let one frame run.
    miss(side) {
      g(`serveT = 0; ball.speed = 300; ball.vy = 0; ball.spin = 0; ball.y = ${H / 2};
         ball.x = ${side === 'left' ? -15 : W + 15}; ball.vx = ${side === 'left' ? -300 : 300};`);
      this.step();
    }
  });
}
function startAi(p) {
  p.step();
  p.primary().click();
  assert.equal(p.run('GryKit.state'), 'playing');
  assert.equal(p.run('GryKit.mode'), 'ai');
}

test('Pong: the menu waits for a start button; the serve comes after a short countdown', () => {
  const p = loadPong();
  assert.equal(p.run('GryKit.state'), 'menu');
  assert.deepEqual(p.overlayButtons().map(b => b.firstChild.textContent), ['Z komputerem', '2 graczy', 'Współpraca']);
  assert.equal(p.g('running'), false);
  p.step(40);
  assert.equal(p.document.getElementById('score-left').textContent, '0');
  assert.equal(p.document.getElementById('score-right').textContent, '0');
  startAi(p);
  assert.equal(p.overlayHidden(), true);
  assert.equal(p.g('running'), true);
  assert.equal(p.g('left.score + right.score'), 0);
  p.step(17);
  assert.equal(p.g('ball.vx'), 0, 'still counting down to the serve');
  p.step(3);
  assert.notEqual(p.g('ball.vx'), 0, 'served after ~0.9 s');
});

test('Pong: an ordinary point waits for one delayed serve without adding extra points', () => {
  const p = loadPong();
  startAi(p);
  const over = p.countOver();
  p.miss('left');
  assert.equal(p.g('right.score'), 1);
  assert.equal(p.document.getElementById('score-right').textContent, '1');
  assert.match(p.document.getElementById('game-status').textContent, /Punkt dla komputera/);
  p.step(19);
  assert.equal(p.g('ball.vx'), 0, 'serve waits about a second');
  assert.equal(p.g('ball.x'), W / 2);
  assert.equal(p.g('right.score + left.score'), 1);
  p.step(2);
  assert.ok(p.g('ball.vx') < 0, 'serve goes towards the player who lost the point');
  assert.equal(p.g('right.score + left.score'), 1);
  assert.equal(p.run('GryKit.state'), 'playing');
  assert.equal(over(), 0);
});

test('Pong: the 7th point ends the match exactly once and "play again" starts a fresh one', () => {
  const p = loadPong();
  startAi(p);
  const over = p.countOver();
  p.g('right.score = 6; left.score = 4; syncHud();');
  p.miss('left');
  assert.equal(p.g('right.score'), 7);
  assert.equal(p.run('GryKit.state'), 'over');
  assert.equal(p.g('running'), false);
  assert.equal(over(), 1);
  const ball = p.g('JSON.stringify([ball.x, ball.y])');
  p.step(60);
  assert.equal(p.g('right.score'), 7, 'the finished match does not keep scoring');
  assert.equal(p.g('JSON.stringify([ball.x, ball.y])'), ball, 'the ball stays where the match ended');
  assert.equal(over(), 1);
  p.tick(500);
  assert.equal(p.overlayHidden(), false);
  assert.equal(p.document.querySelector('.gk-overlay h2').textContent, 'Przegrana');
  assert.match(p.document.querySelector('.gk-overlay').textContent, /4 : 7/);
  assert.equal(p.primary().textContent, 'Zagraj ponownie');
  p.primary().click();
  assert.equal(p.run('GryKit.state'), 'playing');
  assert.equal(p.run('GryKit.mode'), 'ai');
  assert.equal(p.g('left.score + right.score'), 0);
  assert.equal(p.document.getElementById('score-right').textContent, '0');
  p.step(20);
  assert.notEqual(p.g('ball.vx'), 0);
  assert.equal(over(), 1);
});

test('Pong: repeated restarts keep a single animation loop and the full serve countdown', () => {
  const p = loadPong();
  p.step();
  const loops = p.frames.size;
  startAi(p);
  p.step(10);
  for (let i = 0; i < 3; i++) p.document.getElementById('new-game').click();
  p.run('GryKit.start("ai"); GryKit.start("ai");');
  assert.equal(p.frames.size, loops);
  p.step(5);
  assert.equal(p.frames.size, loops);
  assert.equal(p.g('ball.vx'), 0, 'restart serves again from the start of the countdown');
  p.step(15);
  assert.notEqual(p.g('ball.vx'), 0);
  // One loop means one physics step per frame: a 50 ms frame moves the ball by vx * 0.05.
  const x0 = p.g('ball.x'), vx = p.g('ball.vx');
  p.g('ball.vy = 0; ball.spin = 0; ball.y = 270;');
  p.step();
  assert.ok(Math.abs(p.g('ball.x') - (x0 + vx * 0.05)) < 1e-6);
});

test('Pong: P/Escape pause freezes the ball, resumes, and hiding the tab pauses', () => {
  const p = loadPong();
  startAi(p);
  p.step(25);
  p.key('KeyP');
  assert.equal(p.run('GryKit.state'), 'paused');
  const pos = p.g('JSON.stringify([ball.x, ball.y, left.y, right.y])');
  p.step(40);
  assert.equal(p.g('JSON.stringify([ball.x, ball.y, left.y, right.y])'), pos);
  p.key('Escape', { repeat: true });
  assert.equal(p.run('GryKit.state'), 'paused', 'a held key does not resume');
  p.key('KeyP');
  assert.equal(p.run('GryKit.state'), 'playing');
  p.step(2);
  assert.notEqual(p.g('ball.x'), JSON.parse(pos)[0]);
  p.key('Escape');
  assert.equal(p.run('GryKit.state'), 'paused');
  p.key('Escape');
  assert.equal(p.run('GryKit.state'), 'playing');
  p.document.hidden = true;
  p.fire('visibilitychange');
  assert.equal(p.run('GryKit.state'), 'paused');
  const hidden = p.g('ball.x');
  p.step(10);
  assert.equal(p.g('ball.x'), hidden);
});

test('Pong: pointer coordinates track the canvas scale, including a later resize', () => {
  const p = loadPong();
  startAi(p);
  for (const height of [540, 270, 135]) {
    p.setRect({ top: 100, width: height * W / H, height });
    p.fire('pointerdown', { clientX: 10, clientY: 100 + height / 2, pointerId: 1 }, p.canvas);
    assert.equal(p.g('left.target'), H / 2 - PAD_H / 2, `centre at ${height}px tall`);
    p.fire('pointermove', { clientX: 10, clientY: 100 + height * 0.75, pointerId: 1 }, p.canvas);
    assert.equal(p.g('left.target'), H * 0.75 - PAD_H / 2, `lower quarter at ${height}px tall`);
    p.fire('pointerup', { pointerId: 1 }, p.canvas);
  }
  p.step(20);
  assert.ok(Math.abs(p.g('left.y') - (H * 0.75 - PAD_H / 2)) < 1, 'paddle follows the pointer');
});

test('Pong: pointer input keeps the paddle in bounds and only controls a running match', () => {
  const p = loadPong();
  p.step();
  p.setRect({ top: 100, height: 270, width: 450 });
  p.fire('pointerdown', { clientX: 10, clientY: 100, pointerId: 1 }, p.canvas);
  p.fire('pointermove', { clientX: 10, clientY: 100, pointerType: 'mouse', pointerId: 2 }, p.canvas);
  assert.equal(p.g('left.target'), null, 'the start screen ignores the pointer');
  startAi(p);
  p.fire('pointermove', { clientX: 10, clientY: 0, pointerType: 'mouse', pointerId: 2 }, p.canvas);
  p.step(30);
  assert.equal(p.g('left.y'), 0, 'clamped at the top');
  p.fire('pointermove', { clientX: 10, clientY: 900, pointerType: 'mouse', pointerId: 2 }, p.canvas);
  p.step(30);
  assert.equal(p.g('left.y'), H - PAD_H, 'clamped at the bottom');
  p.setRect({ height: 0, width: 0 });
  p.fire('pointerdown', { clientX: 0, clientY: 100, pointerId: 4 }, p.canvas);
  p.fire('pointermove', { clientX: 0, clientY: 100, pointerType: 'mouse', pointerId: 5 }, p.canvas);
  p.step(5);
  assert.equal(p.g('left.y'), H - PAD_H, 'a collapsed (0 px) canvas cannot send the paddle to NaN');
  p.setRect({ height: 270, width: 450 });
  p.key('KeyP');
  p.fire('pointermove', { clientX: 10, clientY: 100, pointerType: 'mouse', pointerId: 2 }, p.canvas);
  p.fire('pointerdown', { clientX: 10, clientY: 100, pointerId: 3 }, p.canvas);
  assert.notEqual(p.g('left.target'), -PAD_H / 2, 'a paused match ignores the pointer');
  p.key('KeyP');
  p.step(30);
  assert.equal(p.g('left.y'), H - PAD_H);
});

test('Pong: steering keys work on the table but not from the page header or the start screen', () => {
  const p = loadPong();
  p.step();
  p.key('KeyW', {}, p.canvas);
  assert.equal(p.g('!!keys.KeyW'), false, 'start screen');
  startAi(p);
  assert.equal(p.document.activeElement, p.canvas, 'start focuses the table');
  const link = p.document.querySelector('.site-links a');
  p.key('KeyS', {}, link);
  p.key('ArrowDown', {}, p.document.getElementById('theme-toggle'));
  assert.equal(p.g('!!keys.KeyS || !!keys.ArrowDown'), false);
  const y = p.g('left.y');
  p.step(5);
  assert.equal(p.g('left.y'), y, 'header keys do not move the paddle');
  const e = p.key('KeyS', {}, p.canvas);
  assert.equal(e.defaultPrevented, true);
  p.step(5);
  assert.ok(p.g('left.y') > y, 'S moves the paddle down');
  p.fire('keyup', { code: 'KeyS' }, p.canvas);
  assert.equal(p.g('!!keys.KeyS'), false);
});
