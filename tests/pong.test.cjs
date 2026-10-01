const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { parseHTML } = require('linkedom');

// Exercise the shipped inline script with a deterministic clock and canvas.
// These are behavior tests, not a replacement for browser rendering checks.
function loadPong() {
  const source = fs.readFileSync(path.join(__dirname, '..', 'gry/pong/pong.html'), 'utf8');
  const { document, Event } = parseHTML(source);
  const canvas = document.getElementById('pong-canvas');
  canvas.width = Number(canvas.getAttribute('width'));
  canvas.height = Number(canvas.getAttribute('height'));
  canvas.getContext = () => ({
    fillRect() {}, beginPath() {}, arc() {}, fill() {}, strokeText() {}, fillText() {}
  });
  const rect = { top: 100, height: 600 };
  canvas.getBoundingClientRect = () => rect;
  let now = 0;
  let nextId = 1;
  const timeouts = new Map();
  const intervals = new Map();
  const context = vm.createContext({
    document, console,
    localStorage: { getItem: () => null, setItem() {} },
    Math: Object.assign(Object.create(Math), { random: () => 0.75 }),
    setTimeout: (callback, delay) => {
      const id = nextId++;
      timeouts.set(id, { callback, due: now + delay });
      return id;
    },
    clearTimeout: id => timeouts.delete(id),
    setInterval: callback => { const id = nextId++; intervals.set(id, callback); return id; },
    clearInterval: id => intervals.delete(id)
  });
  const run = js => vm.runInContext(js, context, { timeout: 1000 });
  for (const match of source.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)) run(match[1]);
  return {
    run, document, rect, timeouts, intervals,
    advance(ms) {
      const until = now + ms;
      let next;
      while ((next = [...timeouts].filter(([, timer]) => timer.due <= until)
        .sort((a, b) => a[1].due - b[1].due)[0])) {
        const [id, timer] = next;
        now = timer.due;
        timeouts.delete(id);
        timer.callback();
      }
      now = until;
    },
    switchMode(mode) {
      document.querySelector(`[data-mode="${mode}"]`).dispatchEvent(new Event('click'));
    },
    mouse(y) {
      const event = new Event('mousemove');
      event.clientY = rect.top + y;
      canvas.dispatchEvent(event);
    }
  };
}

function scorePoint(page, winning = false) {
  // Pass the left paddle, so the right player scores without a collision.
  page.run(`gameMode = 'coop'; startGame(); rightPaddle.score = ${winning ? 6 : 0};
    ball.x = 0; ball.y = 30; ball.velocityX = -5; ball.velocityY = 0; update();`);
}

test('Pong: a winning score schedules exactly one match restart across later frames', () => {
  const p = loadPong();
  scorePoint(p, true);
  p.run('for (let i = 0; i < 120; i++) update();');
  assert.equal(p.run('rightPaddle.score'), 7);
  assert.equal(p.timeouts.size, 1);
  assert.equal(p.run('scoringCooldown'), true);
});

test('Pong: the winning pause leads to one fresh match and one delayed serve', () => {
  const p = loadPong();
  scorePoint(p, true);
  p.run('for (let i = 0; i < 100; i++) update();');
  p.advance(2000);
  assert.equal(p.run('rightPaddle.score'), 0);
  assert.equal(p.timeouts.size, 1);
  assert.equal(p.run('scoringCooldown'), true);
  p.advance(2000);
  assert.equal(p.timeouts.size, 0);
  assert.equal(p.run('scoringCooldown'), false);
  assert.notEqual(p.run('ball.velocityX'), 0);
});

test('Pong: repeated restart cancels the old serve and keeps the full new countdown', () => {
  const p = loadPong();
  p.run('startGame(); restartGame();');
  p.advance(1000);
  p.run('restartGame();');
  assert.equal(p.timeouts.size, 1);
  p.advance(1000);
  assert.equal(p.run('scoringCooldown'), true);
  assert.equal(p.run('ball.velocityX'), 0);
  p.advance(1000);
  assert.equal(p.run('scoringCooldown'), false);
  assert.equal(p.intervals.size, 1);
});

test('Pong: changing mode cancels a pending serve and keeps the start screen still', () => {
  const p = loadPong();
  p.run('startGame(); restartGame();');
  p.switchMode('coop');
  assert.equal(p.timeouts.size, 0);
  p.advance(2000);
  assert.equal(p.run('gameStarted'), false);
  assert.equal(p.run('ball.velocityX'), 0);
  assert.equal(p.run('ball.velocityY'), 0);
  assert.equal(p.intervals.size, 0);
  assert.equal(p.document.getElementById('start-btn').classList.contains('hidden'), false);
});

test('Pong: an old winning callback cannot reset a newly selected match', () => {
  const p = loadPong();
  scorePoint(p, true);
  p.switchMode('ai');
  p.run('startGame(); leftPaddle.score = 3;');
  p.advance(4000);
  assert.equal(p.run('leftPaddle.score'), 3);
  assert.equal(p.run('ball.velocityX'), 5);
  assert.equal(p.timeouts.size, 0);
});

test('Pong: manual restart also cancels the old winning callback', () => {
  const p = loadPong();
  scorePoint(p, true);
  p.advance(1000);
  p.run('restartGame(); leftPaddle.score = 2;');
  p.advance(1000);
  assert.equal(p.run('leftPaddle.score'), 2);
  assert.equal(p.run('scoringCooldown'), true);
  p.advance(1000);
  assert.equal(p.run('scoringCooldown'), false);
});

test('Pong: an ordinary point pauses once and resumes without adding extra points', () => {
  const p = loadPong();
  scorePoint(p);
  p.run('for (let i = 0; i < 120; i++) update();');
  assert.equal(p.run('rightPaddle.score'), 1);
  assert.equal(p.timeouts.size, 1);
  p.advance(1999);
  assert.equal(p.run('scoringCooldown'), true);
  p.advance(1);
  assert.equal(p.run('scoringCooldown'), false);
  assert.equal(p.run('rightPaddle.score'), 1);
});

test('Pong: mouse coordinates track the canvas scale, including a later resize', () => {
  const p = loadPong();
  p.run('startGame();');
  for (const height of [600, 300, 150]) {
    p.rect.height = height;
    p.mouse(height / 2);
    assert.equal(p.run('leftPaddle.y'), 210, `canvas displayed at ${height}px tall`);
    p.mouse(height * 0.75);
    assert.equal(p.run('leftPaddle.y'), 360, `lower quarter at ${height}px tall`);
  }
});

test('Pong: pointer input stays in bounds and only controls a running AI match', () => {
  const p = loadPong();
  p.mouse(0);
  assert.equal(p.run('leftPaddle.y'), 210);
  p.run('startGame();');
  p.rect.height = 300;
  p.mouse(0);
  assert.equal(p.run('leftPaddle.y'), 0);
  p.mouse(300);
  assert.equal(p.run('leftPaddle.y'), 420);
  p.rect.height = 0;
  p.mouse(0);
  assert.equal(p.run('leftPaddle.y'), 420);
  p.switchMode('coop');
  p.run('startGame();');
  p.mouse(0);
  assert.equal(p.run('leftPaddle.y'), 420);
});
