/* Original Pong inspired by the Code Golf Stack Exchange example:
 * https://codegolf.stackexchange.com/questions/10713/pong-in-the-shortest-code
 * This version keeps the Q/A and arrow controls, with explicit round lifecycle.
 */
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const status = document.getElementById('game-status');
const keys = {};
const state = { left: 190, right: 190, leftScore: 0, rightScore: 0, x: 300, y: 235, vx: -5, vy: 3, running: false, paused: false, over: false };

function render() {
  ctx.clearRect(0, 0, 640, 480);
  ctx.fillStyle = '#fff';
  for (let y = 5; y < 480; y += 20) ctx.fillRect(318, y, 4, 10);
  ctx.font = '48px monospace'; ctx.textAlign = 'center';
  ctx.fillText(state.leftScore + ' : ' + state.rightScore, 320, 60);
  ctx.fillRect(20, state.left, 20, 100);
  ctx.fillRect(600, state.right, 20, 100);
  ctx.fillRect(state.x, state.y, 10, 10);
}
function clearKeys() { Object.keys(keys).forEach(key => { keys[key] = false; }); }
function startGame() {
  if (state.over) { restartGame(); return; }
  state.running = true; state.paused = false; clearKeys(); canvas.focus();
  document.getElementById('pause-game').textContent = 'Pauza';
  status.textContent = 'Do 7 punktów · Q/A: lewa · ↑/↓: prawa · Esc: pauza';
}
function restartGame() {
  Object.assign(state, { left: 190, right: 190, leftScore: 0, rightScore: 0, x: 300, y: 235, vx: -5, vy: 3, over: false });
  startGame(); render();
}
function setPaused(value) {
  if (!state.running || state.over) return;
  state.paused = !!value; clearKeys(); if (!state.paused) canvas.focus();
  document.getElementById('pause-game').textContent = state.paused ? 'Wznów' : 'Pauza';
  status.textContent = state.paused ? 'Pauza' : 'Do 7 punktów · Q/A: lewa · ↑/↓: prawa';
}
function point(side) {
  state[side + 'Score']++;
  state.running = false; clearKeys();
  state.x = 315; state.y = 235; state.vx = side === 'left' ? -5 : 5; state.vy = 3;
  if (state[side + 'Score'] >= 7) {
    state.over = true;
    status.textContent = `Wygrywa ${side === 'left' ? 'lewy' : 'prawy'} gracz! Start lub Nowy mecz, aby zagrać ponownie.`;
  } else status.textContent = 'Punkt! Enter lub Start rozpoczyna następną wymianę.';
}
function update() {
  if (!state.running || state.paused || document.hidden) return;
  state.left += (keys.KeyA ? 5 : 0) - (keys.KeyQ ? 5 : 0);
  state.right += (keys.ArrowDown ? 5 : 0) - (keys.ArrowUp ? 5 : 0);
  state.left = Math.max(0, Math.min(380, state.left));
  state.right = Math.max(0, Math.min(380, state.right));
  state.x += state.vx; state.y += state.vy;
  if (state.y < 0) { state.y = 0; state.vy = Math.abs(state.vy); }
  if (state.y > 470) { state.y = 470; state.vy = -Math.abs(state.vy); }
  if (state.vx < 0 && state.x <= 40 && state.x >= 20 && state.y + 10 > state.left && state.y < state.left + 100) {
    state.x = 40; state.vx = Math.min(15, -state.vx + 0.2); state.vy = Math.max(-10, Math.min(10, state.vy + (state.y - state.left - 45) / 20));
  }
  if (state.vx > 0 && state.x + 10 >= 600 && state.x <= 620 && state.y + 10 > state.right && state.y < state.right + 100) {
    state.x = 590; state.vx = Math.max(-15, -state.vx - 0.2); state.vy = Math.max(-10, Math.min(10, state.vy + (state.y - state.right - 45) / 20));
  }
  if (state.x < -10) point('right');
  else if (state.x > 640) point('left');
}
document.addEventListener('keydown', e => {
  if (e.altKey || e.ctrlKey || e.metaKey || e.target?.closest?.('header,a,input,textarea,select')) return;
  if (['Escape', 'KeyP'].includes(e.code) && !e.repeat) { e.preventDefault(); setPaused(!state.paused); return; }
  if (e.target?.closest?.('button')) return;
  if (e.code === 'Enter' && !e.repeat) { e.preventDefault(); if (!state.running || state.paused) startGame(); return; }
  if (['KeyQ', 'KeyA', 'ArrowUp', 'ArrowDown'].includes(e.code)) { e.preventDefault(); keys[e.code] = true; }
});
document.addEventListener('keyup', e => { keys[e.code] = false; });
document.addEventListener('visibilitychange', () => { if (document.hidden) setPaused(true); });
function movePointer(e) {
  if (!state.running || state.paused) return;
  const rect = canvas.getBoundingClientRect(); if (!rect.width || !rect.height) return;
  const side = e.clientX - rect.left < rect.width / 2 ? 'left' : 'right';
  state[side] = Math.max(0, Math.min(380, (e.clientY - rect.top) * 480 / rect.height - 50));
}
canvas.addEventListener('pointerdown', e => { e.preventDefault(); canvas.setPointerCapture?.(e.pointerId); movePointer(e); });
canvas.addEventListener('pointermove', e => { if (e.buttons || e.pressure) movePointer(e); });
setInterval(() => { update(); render(); }, 30);
render();
