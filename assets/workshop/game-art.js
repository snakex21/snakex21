// Flat cover illustrations for the games catalogue (window.gameArt[slug]).
// One palette and one 160x90 grid keep every card consistent, and nothing is
// hot-linked from other sites. Covers are decorative: cards are labelled by text.
(() => {
  const C = {
    ink: '#1f2a25', cream: '#fffefa', green: '#21654d', lime: '#b8d58e', mint: '#e7ecdd',
    orange: '#e8763d', red: '#d05c5c', blue: '#3f6fb5', sky: '#cfe0f2', yellow: '#f2c14e',
    purple: '#7a5aa6', lilac: '#e4dcf0', sand: '#f3e6cf', night: '#17231e'
  };
  const svg = (bg, body) =>
    `<svg viewBox="0 0 160 90" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" preserveAspectRatio="xMidYMid slice"><rect width="160" height="90" fill="${bg}"/>${body}</svg>`;
  const grid = (x, y, cols, rows, size, gap, fill) => {
    let out = '';
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const color = typeof fill === 'function' ? fill(c, r) : fill;
      if (color) out += `<rect x="${x + c * (size + gap)}" y="${y + r * (size + gap)}" width="${size}" height="${size}" rx="${size > 8 ? 3 : 1.5}" fill="${color}"/>`;
    }
    return out;
  };

  window.gameArt = {
    'wojna-er': svg(C.sand,
      `<path d="M0 70 Q40 58 80 66 T160 62 V90 H0Z" fill="${C.lime}"/>` +
      `<rect x="14" y="40" width="22" height="30" fill="${C.green}"/><path d="M12 40h26l-13-12z" fill="${C.ink}"/>` +
      `<rect x="124" y="34" width="24" height="36" fill="${C.red}"/><rect x="128" y="28" width="5" height="8" fill="${C.red}"/><rect x="139" y="28" width="5" height="8" fill="${C.red}"/>` +
      `<circle cx="58" cy="58" r="4" fill="${C.ink}"/><rect x="55" y="62" width="6" height="8" fill="${C.ink}"/><path d="M62 54l8-10" stroke="${C.ink}" stroke-width="2.5"/>` +
      `<circle cx="102" cy="56" r="4" fill="${C.ink}"/><rect x="99" y="60" width="6" height="10" fill="${C.ink}"/><path d="M98 52l-8-8" stroke="${C.ink}" stroke-width="2.5"/>` +
      `<path d="M74 40l6-8 6 8-6 4z" fill="${C.orange}"/>`),
    memory: svg(C.lilac,
      grid(34, 13, 4, 2, 20, 6, (c, r) => (c + r) % 3 === 0 ? C.purple : C.cream) +
      `<text x="54" y="31" font-size="14" text-anchor="middle" fill="${C.cream}" font-family="sans-serif">★</text>` +
      `<text x="106" y="57" font-size="14" text-anchor="middle" fill="${C.purple}" font-family="sans-serif">★</text>`),
    '2048': svg(C.sand, (() => {
      const values = [[0, 2, 0, 4], [2, 8, 16, 0], [0, 64, 2, 0], [4, 0, 0, 2]];
      const tint = { 2: C.cream, 4: C.yellow, 8: C.orange, 16: C.red, 64: C.green };
      return grid(46, 9, 4, 4, 15, 3, (c, r) => tint[values[r][c]] || 'rgba(31,42,37,.08)') +
        `<text x="71.5" y="55.5" font-size="8" font-weight="700" text-anchor="middle" fill="${C.cream}" font-family="sans-serif">64</text>`;
    })()),
    chess: svg(C.mint,
      grid(40, 5, 8, 8, 10, 0, (c, r) => (c + r) % 2 ? C.green : C.cream) +
      `<path d="M74 70h12l-2-6h-8zM76 64l1-14h6l1 14zM75 50h10l-2-5h-6zM80 33a4 4 0 1 1 0 8 4 4 0 0 1 0-8z" fill="${C.ink}"/>`),
    hangman: svg(C.cream,
      `<path d="M40 78h46M52 78V14h34v10" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>` +
      `<circle cx="86" cy="32" r="7" fill="none" stroke="${C.ink}" stroke-width="3"/><path d="M86 39v18M86 44l-8 6M86 44l8 6M86 57l-6 10M86 57l6 10" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M106 70h8M118 70h8M130 70h8" stroke="${C.green}" stroke-width="3"/><text x="122" y="64" font-size="10" text-anchor="middle" fill="${C.green}" font-family="sans-serif" font-weight="700">A</text>`),
    tetris: svg(C.night,
      grid(50, 6, 6, 8, 9, 1, (c, r) => {
        const map = ['......', '..YY..', '..YY..', '......', 'B....R', 'BB..RR', 'BOOGGR', 'OOGGLL'];
        return { Y: C.yellow, B: C.blue, R: C.red, O: C.orange, G: C.green, L: C.lime }[map[r][c]];
      })),
    'space-invaders': svg(C.night,
      [30, 62, 94, 126].map(x => `<path d="M${x} 20h4v4h-4zM${x + 12} 20h4v4h-4zM${x} 24h16v4h-16zM${x - 4} 28h24v4h-24zM${x - 4} 32h4v4h-4zM${x + 16} 32h4v4h-4z" fill="${C.lime}"/>`).join('') +
      `<path d="M74 72h12v6H74zM78 66h4v6h-4z" fill="${C.yellow}"/><rect x="79" y="46" width="2" height="12" fill="${C.yellow}"/>`),
    pong: svg(C.ink,
      `<path d="M80 6v78" stroke="${C.cream}" stroke-width="2" stroke-dasharray="5 5" opacity=".5"/>` +
      `<rect x="20" y="26" width="6" height="26" rx="2" fill="${C.cream}"/><rect x="134" y="40" width="6" height="26" rx="2" fill="${C.lime}"/>` +
      `<circle cx="100" cy="36" r="4" fill="${C.yellow}"/>`),
    'tic-tac-toe': svg(C.cream,
      `<path d="M66 12v66M94 12v66M46 34h68M46 56h68" stroke="${C.ink}" stroke-width="3" stroke-linecap="round"/>` +
      `<path d="M50 16l12 12M62 16L50 28M98 60l12 12M110 60L98 72" stroke="${C.red}" stroke-width="4" stroke-linecap="round"/>` +
      `<circle cx="80" cy="45" r="7" fill="none" stroke="${C.blue}" stroke-width="4"/><circle cx="104" cy="22" r="7" fill="none" stroke="${C.blue}" stroke-width="4"/>`),
    wheel: svg(C.sky,
      [0, 1, 2, 3, 4, 5].map(i => {
        const a1 = i * Math.PI / 3, a2 = (i + 1) * Math.PI / 3;
        const p = a => `${(80 + 34 * Math.cos(a)).toFixed(1)} ${(46 + 34 * Math.sin(a)).toFixed(1)}`;
        return `<path d="M80 46L${p(a1)}A34 34 0 0 1 ${p(a2)}Z" fill="${[C.red, C.yellow, C.green, C.orange, C.blue, C.purple][i]}"/>`;
      }).join('') +
      `<circle cx="80" cy="46" r="6" fill="${C.cream}"/><path d="M80 4l-6 10h12z" fill="${C.ink}"/>`),
    'hardware-quiz': svg(C.yellow,
      `<rect x="38" y="16" width="84" height="44" rx="10" fill="${C.cream}"/><path d="M60 60l-6 14 18-14z" fill="${C.cream}"/>` +
      `<text x="80" y="48" font-size="26" font-weight="800" text-anchor="middle" fill="${C.ink}" font-family="sans-serif">?</text>` +
      grid(126, 52, 3, 3, 5, 2, C.ink)),
    'typing-test': svg(C.mint,
      grid(22, 34, 10, 3, 10, 3, (c, r) => (r === 1 && c === 4) ? C.green : C.cream) +
      `<rect x="48" y="73" width="64" height="9" rx="3" fill="${C.cream}"/>` +
      `<text x="22" y="24" font-size="11" font-family="monospace" fill="${C.ink}">abc_</text><text x="138" y="24" font-size="11" text-anchor="end" font-weight="700" font-family="sans-serif" fill="${C.green}">60 WPM</text>`),
    minesweeper: svg(C.mint,
      grid(40, 5, 8, 8, 9, 1, (c, r) => (c + r * 3) % 7 === 0 || r > 4 || c > 5 ? C.lime : C.cream) +
      `<circle cx="90" cy="35" r="7" fill="${C.ink}"/><path d="M90 24v22M79 35h22M82 27l16 16M98 27L82 43" stroke="${C.ink}" stroke-width="2"/><circle cx="87" cy="32" r="2" fill="${C.cream}"/>` +
      `<path d="M61 47v14M61 47l8 3-8 3" stroke="${C.red}" stroke-width="2" fill="${C.red}"/>`),
    arkanoid: svg(C.night,
      [C.red, C.orange, C.yellow].map((color, r) =>
        Array.from({ length: 8 }, (_, c) => `<rect x="${18 + c * 16}" y="${10 + r * 10}" width="14" height="7" rx="1.5" fill="${color}"/>`).join('')).join('') +
      `<rect x="62" y="76" width="36" height="6" rx="3" fill="${C.lime}"/><circle cx="92" cy="58" r="4" fill="${C.cream}"/>`),
    'flappy-bird': svg(C.sky,
      `<rect x="104" y="0" width="22" height="30" fill="${C.green}"/><rect x="100" y="24" width="30" height="8" rx="2" fill="${C.green}"/>` +
      `<rect x="104" y="60" width="22" height="30" fill="${C.green}"/><rect x="100" y="56" width="30" height="8" rx="2" fill="${C.green}"/>` +
      `<ellipse cx="62" cy="44" rx="13" ry="10" fill="${C.yellow}"/><circle cx="67" cy="41" r="3" fill="${C.cream}"/><circle cx="68" cy="41" r="1.5" fill="${C.ink}"/><path d="M74 45l7 2-7 3z" fill="${C.orange}"/><ellipse cx="57" cy="46" rx="6" ry="3.5" fill="${C.cream}"/>` +
      `<rect y="82" width="160" height="8" fill="${C.lime}"/>`),
    snake: svg(C.ink,
      grid(36, 18, 9, 5, 8, 2, (c, r) => {
        const body = ['.........', '.SSSSS...', '.S...S...', 'HS...SSS.', '.......S.'];
        return body[r][c] === 'S' ? C.lime : body[r][c] === 'H' ? C.green : null;
      }) +
      `<rect x="116" y="58" width="8" height="8" rx="4" fill="${C.red}"/>`),
    'hacker-tycoon': svg(C.night,
      `<rect x="30" y="14" width="100" height="58" rx="6" fill="#0d1612" stroke="${C.green}" stroke-width="2"/>` +
      `<text x="40" y="34" font-size="9" font-family="monospace" fill="${C.lime}">&gt; hack --all</text>` +
      `<text x="40" y="48" font-size="9" font-family="monospace" fill="${C.lime}" opacity=".7">+250 BITS/s</text>` +
      `<text x="40" y="62" font-size="9" font-family="monospace" fill="${C.yellow}">1 024 BITS_</text>` +
      `<rect x="66" y="74" width="28" height="6" fill="${C.green}"/>`),
    sudoku: svg(C.cream,
      grid(53, 4, 3, 3, 26, 1, C.mint).replace(/rx="3"/g, 'rx="1"') +
      `<path d="M53 31h80M53 58h80M80 4v81M107 4v81" stroke="${C.ink}" stroke-width="2"/>` +
      [[62, 22, 5], [96, 22, 3], [120, 49, 9], [66, 76, 1], [94, 49, 7], [120, 76, 4]].map(([x, y, n]) =>
        `<text x="${x}" y="${y}" font-size="13" font-weight="700" font-family="sans-serif" fill="${n === 7 ? C.green : C.ink}">${n}</text>`).join('')),
    solitaire: svg(C.green,
      [[30, -8, C.red, 'A♥'], [62, -3, C.ink, 'K♠'], [94, 2, C.red, 'Q♦']].map(([x, rot, color, label]) =>
        `<g transform="rotate(${rot} ${x + 18} 45)"><rect x="${x}" y="18" width="36" height="52" rx="4" fill="${C.cream}" stroke="${C.ink}" stroke-opacity=".15"/>` +
        `<text x="${x + 5}" y="31" font-size="11" font-weight="700" font-family="sans-serif" fill="${color}">${label}</text></g>`).join('') +
      `<rect x="126" y="22" width="26" height="40" rx="4" fill="${C.blue}" stroke="${C.cream}" stroke-width="2"/>`),
    wordle: svg(C.cream,
      [['K', C.green], ['O', C.yellow], ['T', '#9a9aa2'], ['E', C.green], ['K', C.yellow]].map(([ch, color], i) =>
        `<rect x="${21 + i * 24}" y="18" width="20" height="20" rx="3" fill="${color}"/><text x="${31 + i * 24}" y="33" font-size="12" font-weight="800" text-anchor="middle" font-family="sans-serif" fill="${C.cream}">${ch}</text>`).join('') +
      grid(21, 44, 5, 2, 20, 4, 'none').replace(/fill="none"/g, `fill="none" stroke="${C.ink}" stroke-opacity=".2" stroke-width="1.5"`)),
    connect4: svg(C.sky,
      `<rect x="34" y="8" width="92" height="76" rx="8" fill="${C.blue}"/>` +
      Array.from({ length: 30 }, (_, i) => {
        const c = i % 6, r = Math.floor(i / 6);
        const filled = { '4,1': C.red, '4,2': C.yellow, '3,2': C.red, '4,3': C.red, '3,3': C.yellow, '2,3': C.red, '4,4': C.yellow, '3,4': C.yellow, '2,4': C.yellow, '1,4': C.red }[`${r},${c}`];
        return `<circle cx="${47 + c * 13.2}" cy="${20 + r * 15}" r="5.2" fill="${filled || C.cream}"/>`;
      }).join('')),
    'dino-run': svg(C.cream,
      `<path d="M0 72h160" stroke="${C.ink}" stroke-width="2"/><path d="M20 76h6M60 78h4M110 76h8" stroke="${C.ink}" stroke-opacity=".4" stroke-width="2"/>` +
      `<path d="M38 72v-8h4v-6h-4v-10h4v-6h4v-6h14v10h-8v4h6v4h-6v10h-4v8h-4v-6h-4v6z" fill="${C.ink}"/><rect x="50" y="38" width="3" height="3" fill="${C.cream}"/>` +
      `<path d="M112 72V48h6v24zM106 60v-8h4v8h2v4h-6zM124 56v-8h-4v12h-2v4h6z" fill="${C.green}"/>`),
    'tower-stack': svg(C.lilac,
      `<rect x="58" y="72" width="48" height="10" rx="2" fill="${C.purple}"/><rect x="60" y="61" width="44" height="10" rx="2" fill="${C.blue}"/>` +
      `<rect x="62" y="50" width="38" height="10" rx="2" fill="${C.green}"/><rect x="64" y="39" width="34" height="10" rx="2" fill="${C.yellow}"/>` +
      `<rect x="84" y="20" width="34" height="10" rx="2" fill="${C.orange}"/><path d="M76 25h-8M124 25h8" stroke="${C.ink}" stroke-width="2" stroke-linecap="round" opacity=".4"/>`),
    'simon-says': svg(C.ink,
      `<path d="M80 45V11a34 34 0 0 0-34 34z" fill="${C.lime}"/><path d="M80 45V11a34 34 0 0 1 34 34z" fill="${C.red}"/>` +
      `<path d="M80 45v34a34 34 0 0 1-34-34z" fill="${C.yellow}"/><path d="M80 45v34a34 34 0 0 0 34-34z" fill="${C.blue}"/>` +
      `<path d="M80 9v72M44 45h72" stroke="${C.ink}" stroke-width="4"/><circle cx="80" cy="45" r="11" fill="${C.ink}"/>`),
    'z-type': svg(C.night,
      `<text x="34" y="26" font-size="10" font-family="monospace" fill="${C.cream}">kot</text><text x="96" y="20" font-size="10" font-family="monospace" fill="${C.cream}">rakieta</text>` +
      `<text x="58" y="48" font-size="10" font-family="monospace"><tspan fill="${C.yellow}">gwi</tspan><tspan fill="${C.cream}">azda</tspan></text>` +
      `<path d="M80 78l-7 8h14z" fill="${C.lime}"/><path d="M80 76L72 52" stroke="${C.yellow}" stroke-width="1.5" stroke-dasharray="3 2"/>`)
  };
})();
