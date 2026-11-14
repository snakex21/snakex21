const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { loadGame } = require('./helpers/arcade-harness.cjs');

// The old Ping-Pong (vs computer) and Pong Co-op pages are now redirects into the merged
// Ping-pong game (gry/pong/pong.html?tryb=ai|2p|coop). These tests check the redirects and
// keep the old guarantees in the merged game's matching modes.
const root = path.join(__dirname, '..');
const FILE = 'gry/pong/pong.html';
const W = 900, H = 540, PAD_H = 104;
const LEGACY = [
  { page: 'gry/pingpong/Ping-pong.html', mode: 'ai' },
  { page: 'gry/pongcoop/pongcoop.html', mode: 'coop' }
];

function redirect(page, search, hash = '') {
  const source = fs.readFileSync(path.join(root, page), 'utf8');
  const script = source.match(/<script>([\s\S]*?)<\/script>/)[1];
  let target = null;
  vm.runInNewContext(script, { URLSearchParams, location: { search, hash, replace(url) { target = url; } } });
  return target;
}

// Same probe as tests/pong.test.cjs: read/write the game's closure state via g('expr').
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
  p.step = (n = 1) => { for (let i = 0; i < n; i++) { t += 50; p.frame(t); } };
  p.step();
  return Object.assign(p, {
    g, canvas,
    setRect(r) { rect = { ...rect, ...r }; },
    primary: () => p.document.querySelector('.gk-overlay .kit-btn.primary'),
    overlayTitle: () => p.document.querySelector('.gk-overlay h2').textContent,
    key(code, props = {}, target = p.document) {
      const key = { KeyP: 'p', KeyX: 'x', KeyW: 'w', KeyS: 's' }[code] || code;
      return p.fire('keydown', { code, key, ...props }, target);
    },
    countOver() { p.run('window.__overCalls = 0; { const o = GryKit.over; GryKit.over = a => { window.__overCalls++; return o(a); }; }'); return () => p.run('window.__overCalls'); },
    miss(side) {
      g(`serveT = 0; ball.speed = 300; ball.vy = 0; ball.spin = 0; ball.y = ${H / 2};
         ball.x = ${side === 'left' ? -15 : W + 15}; ball.vx = ${side === 'left' ? -300 : 300};`);
      p.step();
    }
  });
}

test('Legacy pages redirect into the matching mode and keep query and hash', () => {
  for (const { page, mode } of LEGACY) {
    assert.equal(redirect(page, ''), `../pong/pong.html?tryb=${mode}`, page);
    assert.equal(redirect(page, '?theme=dark&variant=retro', '#gra'), `../pong/pong.html?theme=dark&variant=retro&tryb=${mode}#gra`, page);
    assert.equal(redirect(page, '?tryb=2p&theme=dark'), '../pong/pong.html?tryb=2p&theme=dark', `${page}: explicit mode wins`);
    const html = fs.readFileSync(path.join(root, page), 'utf8');
    assert.match(html, new RegExp(`http-equiv="refresh" content="0; url=\\.\\./pong/pong\\.html\\?tryb=${mode}"`), `${page}: no-JS refresh`);
    assert.match(html, new RegExp(`<a href="\\.\\./pong/pong\\.html\\?tryb=${mode}">`), `${page}: fallback link`);
    assert.ok(fs.existsSync(path.join(root, path.dirname(page), '../pong/pong.html')));
  }
});

test('Legacy redirect targets open the merged game with that mode first; Enter starts it', () => {
  for (const [search, mode, label] of [['?tryb=ai', 'ai', 'Z komputerem'], ['?tryb=coop', 'coop', 'Współpraca'], ['?tryb=2p', '2p', '2 graczy'], ['?theme=dark&tryb=CO-OP', 'coop', 'Współpraca']]) {
    const p = loadPong({ search });
    assert.equal(p.run('GryKit.state'), 'menu', search);
    assert.equal(p.primary().firstChild.textContent, label, search);
    p.key('Enter');
    assert.equal(p.run('GryKit.state'), 'playing', search);
    assert.equal(p.run('GryKit.mode'), mode, search);
    assert.equal(p.g('mode'), mode, search);
  }
});

test('Legacy Ping-Pong (vs computer): unrelated, site and repeated keys cannot start the match', () => {
  const p = loadPong({ search: '?tryb=ai' });
  p.key('KeyX');
  p.key('Enter', {}, p.document.querySelector('.site-links a'));
  p.key('Enter', { repeat: true });
  assert.equal(p.run('GryKit.state'), 'menu');
  assert.equal(p.g('running'), false);
  p.key('Enter');
  assert.equal(p.run('GryKit.state'), 'playing');
  assert.equal(p.document.activeElement, p.canvas, 'start returns focus to the table');
  p.key('KeyP');
  assert.equal(p.run('GryKit.state'), 'paused');
  p.key('Escape', { repeat: true });
  assert.equal(p.run('GryKit.state'), 'paused');
  const x = p.g('ball.x');
  p.step(30);
  assert.equal(p.g('ball.x'), x);
  p.primary().click();
  assert.equal(p.run('GryKit.state'), 'playing');
  assert.equal(p.document.activeElement, p.canvas, 'resume returns focus to the table');
  assert.equal(p.key('ArrowUp', {}, p.document.activeElement).defaultPrevented, true);
  p.document.hidden = true;
  p.fire('visibilitychange');
  assert.equal(p.run('GryKit.state'), 'paused');
});

test('Legacy Ping-Pong (vs computer): the 7th point stops at once, stays visible and restarts cleanly', () => {
  const p = loadPong({ search: '?tryb=ai' });
  p.key('Enter');
  const over = p.countOver();
  p.g('left.score = 6; syncHud();');
  p.miss('right');
  assert.equal(p.g('left.score'), 7);
  assert.equal(p.run('GryKit.state'), 'over');
  assert.equal(p.g('running'), false);
  assert.equal(p.document.getElementById('score-left').textContent, '7');
  p.step(50);
  assert.equal(p.g('left.score'), 7);
  assert.equal(over(), 1);
  p.tick(500);
  assert.equal(p.overlayTitle(), 'Wygrana!');
  assert.match(p.document.getElementById('game-status').textContent, /Koniec meczu 7 : 0/);
  const loops = p.frames.size;
  p.primary().click();
  assert.equal(p.g('left.score'), 0);
  assert.equal(p.g('running'), true);
  assert.equal(p.run('GryKit.mode'), 'ai');
  assert.equal(p.frames.size, loops);
});

test('Merged 2-player mode: a point waits for the serve and the 7th point ends once', () => {
  const p = loadPong({ search: '?tryb=2p' });
  p.key('Enter');
  assert.equal(p.document.getElementById('label-left').textContent, 'Lewy');
  assert.equal(p.document.getElementById('label-right').textContent, 'Prawy');
  const over = p.countOver();
  p.miss('right');
  assert.equal(p.g('left.score'), 1);
  assert.equal(p.run('GryKit.state'), 'playing');
  assert.match(p.document.getElementById('game-status').textContent, /Punkt dla lewego gracza/);
  p.step(19);
  assert.equal(p.g('ball.vx'), 0, 'serve waits');
  assert.equal(p.g('left.score + right.score'), 1);
  p.step(2);
  assert.ok(p.g('ball.vx') > 0, 'serve goes to the player who lost the point');
  p.g('left.score = 6; syncHud();');
  p.miss('right');
  assert.equal(p.g('left.score'), 7);
  assert.equal(p.run('GryKit.state'), 'over');
  p.step(50);
  assert.equal(p.g('left.score'), 7);
  assert.equal(over(), 1);
  p.tick(500);
  assert.equal(p.overlayTitle(), 'Wygrywa lewy gracz!');
  p.primary().click();
  assert.equal(p.run('GryKit.mode'), '2p');
  assert.equal(p.g('left.score + right.score'), 0);
  assert.equal(p.g('running'), true);
});

test('Merged 2-player mode: restarts keep one loop, pointers map each half, keys are split, hide pauses', () => {
  const p = loadPong({ search: '?tryb=2p' });
  const loops = p.frames.size;
  p.key('Enter');
  p.run('GryKit.start("2p"); GryKit.start("2p"); GryKit.start("2p");');
  p.document.getElementById('new-game').click();
  assert.equal(p.frames.size, loops);
  p.setRect({ width: 450, height: 270 });
  p.fire('pointerdown', { clientX: 20, clientY: 200, pointerId: 1 }, p.canvas);
  p.fire('pointerdown', { clientX: 400, clientY: 0, pointerId: 2 }, p.canvas);
  assert.equal(p.g('left.target'), 400 - PAD_H / 2);
  assert.equal(p.g('right.target'), -PAD_H / 2);
  p.step(30);
  assert.equal(p.g('right.y'), 0, 'right paddle clamped at the top');
  assert.ok(Math.abs(p.g('left.y') - (400 - PAD_H / 2)) < 1);
  // A finger keeps controlling its own paddle even when it slides over the net.
  p.fire('pointermove', { clientX: 400, clientY: 270, pointerId: 1 }, p.canvas);
  assert.equal(p.g('left.target'), H - PAD_H / 2);
  assert.equal(p.g('right.target'), -PAD_H / 2);
  p.fire('pointerup', { pointerId: 1 }, p.canvas);
  p.fire('pointerup', { pointerId: 2 }, p.canvas);
  const right = p.g('right.y');
  p.key('ArrowDown', {}, p.canvas);
  p.key('KeyW', {}, p.document.querySelector('.site-links a'));
  p.step(5);
  assert.ok(p.g('right.y') > right, 'arrows steer the right paddle');
  assert.equal(p.g('!!keys.KeyW'), false, 'header keys do not steer');
  p.document.hidden = true;
  p.fire('visibilitychange');
  assert.equal(p.run('GryKit.state'), 'paused');
  const ball = p.g('ball.x');
  p.step(20);
  assert.equal(p.g('ball.x'), ball);
});

test('Merged co-op mode: each return counts, the first miss ends the rally once and saves the record', () => {
  for (const blockStorage of [false, true]) {
    const p = loadPong({ search: '?tryb=coop', blockStorage });
    p.key('Enter');
    assert.equal(p.document.getElementById('tile-rally').hidden, false);
    assert.equal(p.document.getElementById('tile-left').hidden, true);
    const over = p.countOver();
    for (let i = 1; i <= 3; i++) {
      const left = i % 2 === 1;
      p.g(`serveT = 0; ball.speed = 300; ball.vy = 0; ball.spin = 0; left.y = right.y = ${H / 2 - PAD_H / 2}; ball.y = ${H / 2};
           ball.x = ${left ? 70 : W - 70}; ball.vx = ${left ? -300 : 300};`);
      p.step();
      assert.equal(p.g('rally'), i);
      assert.equal(p.document.getElementById('rally').textContent, String(i));
    }
    assert.equal(p.run('GryKit.state'), 'playing');
    p.miss('left');
    assert.equal(p.run('GryKit.state'), 'over');
    assert.equal(p.g('running'), false);
    p.step(40);
    assert.equal(p.g('rally'), 3);
    assert.equal(over(), 1);
    assert.equal(p.run('GryKit.best'), 3);
    assert.equal(p.document.getElementById('best').textContent, '3');
    assert.equal(p.storage.get('gry:pong:best:coop'), blockStorage ? undefined : '3');
    p.tick(600);
    assert.equal(p.overlayTitle(), 'Piłka uciekła');
    assert.match(p.document.querySelector('.gk-overlay').textContent, /3 odbicia/);
    p.primary().click();
    assert.equal(p.run('GryKit.mode'), 'coop');
    assert.equal(p.g('rally'), 0);
    assert.equal(p.document.getElementById('rally').textContent, '0');
  }
});
