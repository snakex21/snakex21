// Koło fortuny – losowanie z listy. Koło rysowane na canvasie (jednostki logiczne 500×500),
// nakładka z wynikiem, dźwięk, konfetti i dopasowanie do okna z GryKit. Bez CDN i bez wstawiania HTML z danych.
(() => {
    'use strict';
    const Kit = window.GryKit || null;
    const canvas = document.getElementById('wheel'), ctx = canvas.getContext('2d');
    const input = document.querySelector('.joiner'), list = document.querySelector('.participants');
    const form = document.querySelector('.wheel-form');
    const spinButton = document.querySelector('.spin-trigger'), addButton = document.querySelector('.add');
    const resetButton = document.querySelector('.reset'), winner = document.querySelector('.winner');
    const side = document.getElementById('wheel-side');
    const countEl = document.getElementById('wheel-count'), spinsEl = document.getElementById('spin-count');

    const SIZE = 500, CX = 250, CY = 262, R = 204, RIM = 18, HUB = 40, TAU = Math.PI * 2;
    const MAX = 100, MAX_LEN = 80, STORE_KEY = 'gry:kolo:names';
    const COLORS = ['#21654d', '#e8763d', '#f2c14e', '#3f7f9a', '#c2453d', '#8bb35a', '#7a5a9a', '#d9a066'];
    const SAMPLE = ['Ala', 'Bartek', 'Celina', 'Darek', 'Ewa', 'Franek'];

    let names = load();
    let angle = -Math.PI / 2 - Math.PI / (names.length || SAMPLE.length);
    let spinning = false, spins = 0, raf = 0;
    let swing = 0, lastSeg = -1, picked = -1, highlight = 0, lastFrame = 0;
    let anim = null;

    const mod = (a, m) => ((a % m) + m) % m;
    const font = (size, weight) => Kit ? Kit.font(size, weight) : `${weight || 600} ${size}px Inter, "Segoe UI", sans-serif`;
    const reduced = () => !!(Kit && Kit.reducedMotion);
    const sound = name => { if (Kit) Kit.sfx.play(name); };

    // Równomierna liczba całkowita z [0, max) z CSPRNG (jak Kit.randomInt w assets/workshop/kit.js).
    function randomInt(max) {
        if (window.Kit && typeof window.Kit.randomInt === 'function') return window.Kit.randomInt(max);
        const c = window.crypto;
        if (!c || !c.getRandomValues || max <= 0) return Math.floor(Math.random() * max);
        const limit = Math.floor(0x100000000 / max) * max, buf = new Uint32Array(1);
        do { c.getRandomValues(buf); } while (buf[0] >= limit);
        return buf[0] % max;
    }

    function load() {
        try {
            const raw = JSON.parse(localStorage.getItem(STORE_KEY) || '[]');
            return Array.isArray(raw) ? raw.filter(s => typeof s === 'string' && s.trim()).map(s => s.slice(0, MAX_LEN)).slice(0, MAX) : [];
        } catch (e) { return []; }
    }
    function save() {
        try { if (names.length) localStorage.setItem(STORE_KEY, JSON.stringify(names)); else localStorage.removeItem(STORE_KEY); } catch (e) {}
    }

    function colorIndex(i, n) {
        let c = i % COLORS.length;
        if (n > 2 && i === n - 1 && c === 0) c = 1; // ostatnie pole nie może mieć koloru pierwszego
        return c;
    }
    function textColor(hex) {
        const v = parseInt(hex.slice(1), 16), r = v >> 16, g = (v >> 8) & 255, b = v & 255;
        return (0.299 * r + 0.587 * g + 0.114 * b) > 165 ? '#1f2a24' : '#ffffff';
    }
    function theme() {
        const css = (name, fb) => (Kit ? Kit.css(name, fb) : fb) || fb;
        return { card: css('--shell-card', '#fffefa'), soft: css('--shell-soft', '#e7ecdd'), border: css('--shell-border', '#d9ddd4'),
            text: css('--shell-text', '#202b27'), muted: css('--shell-muted', '#65716a'), accent: css('--shell-accent', '#21654d') };
    }
    let colors = theme();
    if (typeof MutationObserver === 'function') {
        new MutationObserver(() => { colors = theme(); requestAnimationFrame(draw); })
            .observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'data-pulpit-theme', 'data-palette'] });
    }

    function segmentAtPointer(n) { return Math.floor(mod(-Math.PI / 2 - angle, TAU) / (TAU / n)) % n; }

    function fitLabel(text, maxW, size) {
        let s = size;
        ctx.font = font(s, 700);
        while (ctx.measureText(text).width > maxW && s > 11) { s -= 1; ctx.font = font(s, 700); }
        if (ctx.measureText(text).width <= maxW) return text;
        let t = text;
        while (t.length > 1 && ctx.measureText(t + '…').width > maxW) t = t.slice(0, -1);
        return t.trimEnd() + '…';
    }

    function circle(x, y, r) { ctx.beginPath(); ctx.arc(x, y, r, 0, TAU); }

    function draw() {
        const ratio = Kit ? Kit.ratio(canvas) : canvas.width / SIZE;
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        ctx.clearRect(0, 0, SIZE, SIZE);
        const empty = !names.length;
        const items = empty ? SAMPLE : names;
        const n = items.length, arc = TAU / n;

        // obręcz z cieniem
        ctx.save();
        ctx.shadowColor = 'rgba(0,0,0,.28)'; ctx.shadowBlur = 22; ctx.shadowOffsetY = 8;
        circle(CX, CY, R + RIM);
        const rim = ctx.createLinearGradient(0, CY - R - RIM, 0, CY + R + RIM);
        rim.addColorStop(0, empty ? '#8d978f' : '#3d5a4c'); rim.addColorStop(1, empty ? '#5f6a62' : '#1b2a23');
        ctx.fillStyle = rim; ctx.fill();
        ctx.restore();

        // pola
        for (let i = 0; i < n; i++) {
            const start = angle + i * arc;
            ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, R, start, start + arc); ctx.closePath();
            const base = COLORS[colorIndex(i, n)];
            ctx.fillStyle = empty ? (i % 2 ? colors.soft : colors.border) : base;
            ctx.fill();
            ctx.lineWidth = n > 40 ? 0.6 : 1.5; ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.stroke();
        }
        // połysk
        const shine = ctx.createRadialGradient(CX - R * 0.35, CY - R * 0.45, 10, CX, CY, R);
        shine.addColorStop(0, 'rgba(255,255,255,.22)'); shine.addColorStop(0.55, 'rgba(255,255,255,0)'); shine.addColorStop(1, 'rgba(0,0,0,.14)');
        circle(CX, CY, R); ctx.fillStyle = shine; ctx.fill();

        // przyciemnienie pól poza wylosowanym
        if (!empty && highlight > 0 && picked >= 0 && picked < n) {
            for (let i = 0; i < n; i++) {
                if (i === picked) continue;
                const start = angle + i * arc;
                ctx.beginPath(); ctx.moveTo(CX, CY); ctx.arc(CX, CY, R, start, start + arc); ctx.closePath();
                ctx.fillStyle = `rgba(15,22,18,${0.42 * highlight})`; ctx.fill();
            }
        }

        // etykiety
        const outer = R - 16, inner = HUB + 12, maxW = outer - inner;
        const size = Math.max(11, Math.min(24, R * 0.62 * arc * 0.62));
        for (let i = 0; i < n; i++) {
            ctx.save();
            ctx.translate(CX, CY); ctx.rotate(angle + i * arc + arc / 2);
            const label = fitLabel(items[i], maxW, size);
            ctx.textAlign = 'right'; ctx.textBaseline = 'middle';
            if (empty) { ctx.fillStyle = colors.muted; ctx.globalAlpha = 0.75; }
            else {
                const fg = textColor(COLORS[colorIndex(i, n)]);
                ctx.fillStyle = fg;
                if (fg === '#ffffff') { ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 3; ctx.shadowOffsetY = 1; }
            }
            ctx.fillText(label, outer, 1);
            ctx.restore();
        }

        // ćwieki na obręczy (na granicach pól)
        const studs = n <= 36 ? n * Math.max(1, Math.ceil(12 / n)) : 36;
        for (let k = 0; k < studs; k++) {
            const a = angle + k * TAU / studs, x = CX + Math.cos(a) * (R + RIM / 2), y = CY + Math.sin(a) * (R + RIM / 2);
            const g = ctx.createRadialGradient(x - 1.5, y - 1.5, 0.5, x, y, 5);
            g.addColorStop(0, '#fff8dc'); g.addColorStop(0.6, empty ? '#c8ccc6' : '#e3c26a'); g.addColorStop(1, empty ? '#8a918b' : '#9c7a2a');
            circle(x, y, 4.4); ctx.fillStyle = g; ctx.fill();
        }

        // środek
        if (empty) {
            ctx.save();
            ctx.font = font(20, 750);
            const msg = 'Dodaj uczestników', w = ctx.measureText(msg).width + 40, h = 50;
            ctx.shadowColor = 'rgba(0,0,0,.18)'; ctx.shadowBlur = 12; ctx.shadowOffsetY = 3;
            ctx.beginPath();
            if (ctx.roundRect) ctx.roundRect(CX - w / 2, CY - h / 2, w, h, h / 2); else ctx.rect(CX - w / 2, CY - h / 2, w, h);
            ctx.fillStyle = colors.card; ctx.fill();
            ctx.shadowColor = 'transparent'; ctx.lineWidth = 2; ctx.strokeStyle = colors.accent; ctx.stroke();
            ctx.fillStyle = colors.text; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.fillText(msg, CX, CY + 1);
            ctx.restore();
        } else {
            ctx.save();
            ctx.shadowColor = 'rgba(0,0,0,.3)'; ctx.shadowBlur = 10; ctx.shadowOffsetY = 3;
            circle(CX, CY, HUB);
            const hub = ctx.createRadialGradient(CX - 12, CY - 14, 4, CX, CY, HUB);
            hub.addColorStop(0, '#ffffff'); hub.addColorStop(1, '#dfe4da');
            ctx.fillStyle = hub; ctx.fill();
            ctx.restore();
            ctx.lineWidth = 5; ctx.strokeStyle = '#2a3d33'; circle(CX, CY, HUB - 2.5); ctx.stroke();
            ctx.fillStyle = '#21654d'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
            ctx.font = font(spinning ? 22 : 15, 800);
            ctx.fillText(spinning ? '★' : 'LOSUJ', CX, CY + 1);
        }

        // wskaźnik (wychyla się, gdy przechodzi przez ćwiek)
        ctx.save();
        ctx.translate(CX, 22); ctx.rotate(swing);
        ctx.shadowColor = 'rgba(0,0,0,.35)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 3;
        ctx.beginPath(); ctx.moveTo(0, 50); ctx.lineTo(-16, 6); ctx.arc(0, 6, 16, Math.PI, 0); ctx.closePath();
        const pg = ctx.createLinearGradient(-16, 0, 16, 0);
        pg.addColorStop(0, '#e0564c'); pg.addColorStop(1, '#a8322b');
        ctx.fillStyle = empty ? '#9aa39c' : pg; ctx.fill();
        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 2.5; ctx.strokeStyle = '#ffffff'; ctx.stroke();
        circle(0, 6, 5.5); ctx.fillStyle = '#ffffff'; ctx.fill();
        ctx.restore();
    }

    function loop(now) {
        raf = 0;
        const dt = Math.min(64, lastFrame ? now - lastFrame : 16);
        lastFrame = now;
        if (anim) {
            const t = Math.min(1, (now - anim.began) / anim.duration);
            angle = anim.start + anim.travel * (1 - Math.pow(1 - t, 4)); // zwalnianie jak przy tarciu (ease-out quart)
            const seg = segmentAtPointer(names.length);
            if (seg !== lastSeg) {
                lastSeg = seg;
                swing = -0.5; // ćwiek pcha wskaźnik w stronę obrotu
                sound('tick');
            }
            if (t >= 1) finish();
        }
        if (swing) { swing *= Math.pow(0.0008, dt / 1000); if (Math.abs(swing) < 0.003) swing = 0; }
        draw();
        if (anim || swing) raf = requestAnimationFrame(loop);
        else lastFrame = 0;
    }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }

    function controls() {
        const n = names.length;
        spinButton.disabled = spinning || !n;
        addButton.disabled = spinning || n >= MAX;
        input.disabled = spinning;
        resetButton.disabled = spinning || !n;
        list.querySelectorAll('.remove').forEach(b => { b.disabled = spinning; });
        canvas.classList.toggle('is-empty', !n);
        canvas.classList.toggle('is-spinning', spinning);
        canvas.setAttribute('aria-disabled', String(spinning || !n));
        if (countEl) countEl.textContent = n;
        if (spinsEl) spinsEl.textContent = spins;
    }
    function setMessage(text, name) {
        winner.textContent = '';
        if (!text) return;
        winner.append(text);
        if (name != null) { const b = document.createElement('b'); b.textContent = name; winner.append(b); }
    }

    function renderList() {
        list.textContent = '';
        names.forEach((name, i) => {
            const li = document.createElement('li');
            if (i === picked && highlight > 0) li.className = 'picked';
            const dot = document.createElement('span'); dot.className = 'dot';
            dot.style.background = COLORS[colorIndex(i, names.length)];
            const label = document.createElement('span'); label.className = 'name'; label.textContent = name;
            const remove = document.createElement('button');
            remove.type = 'button'; remove.className = 'remove'; remove.textContent = '×';
            remove.setAttribute('aria-label', `Usuń: ${name}`); remove.title = 'Usuń z koła';
            remove.addEventListener('click', () => removeAt(i));
            li.append(dot, label, remove);
            list.appendChild(li);
        });
        controls();
    }
    function changed() {
        picked = -1; highlight = 0;
        if (Kit) Kit.hideOverlay();
        save(); renderList(); draw();
    }

    function addParticipant(event) {
        if (event) event.preventDefault();
        if (spinning) return;
        const parts = input.value.split(/[\n,;]+/).map(s => s.trim()).filter(Boolean);
        if (!parts.length) { input.focus(); return; }
        let added = 0;
        for (const p of parts) {
            if (names.length >= MAX) { setMessage(`Maksymalnie ${MAX} pozycji na kole.`); break; }
            names.push(p.slice(0, MAX_LEN)); added++;
        }
        if (added) {
            input.value = '';
            if (names.length < MAX) setMessage('');
            changed();
            sound('tap');
            const last = list.lastElementChild;
            if (last) { last.scrollIntoView({ block: 'nearest' }); if (Kit) Kit.fx.pop(last, 1.04); }
        }
        input.focus();
    }
    function removeAt(i) {
        if (spinning || i < 0 || i >= names.length) return;
        names.splice(i, 1);
        setMessage('');
        changed();
        sound('click');
    }

    function spin() {
        if (spinning || !names.length) return;
        if (Kit) Kit.hideOverlay();
        const n = names.length, arc = TAU / n;
        const win = randomInt(n);
        const offset = (0.15 + randomInt(1000) / 1000 * 0.7) * arc;  // miejsce w polu – nie tuż przy krawędzi
        const target = -Math.PI / 2 - (win * arc + offset);
        const turns = reduced() ? 1 : 5 + randomInt(3);
        anim = {
            win, start: angle, began: performance.now(),
            travel: turns * TAU + mod(target - angle, TAU),
            duration: reduced() ? 1400 : 4300 + randomInt(1400)
        };
        spinning = true; picked = -1; highlight = 0; lastSeg = segmentAtPointer(n);
        setMessage('Losowanie…');
        renderList();
        if (window.innerWidth < 700) {
            const r = canvas.getBoundingClientRect();
            if (r.top < 0 || r.bottom > window.innerHeight) canvas.scrollIntoView({ block: 'center', behavior: reduced() ? 'auto' : 'smooth' });
        }
        sound('start');
        kick();
    }
    function finish() {
        const n = names.length, win = anim.win;
        anim = null; spinning = false;
        angle = mod(angle, TAU);
        const index = segmentAtPointer(n) === win ? win : segmentAtPointer(n);
        const name = names[index];
        spins++; picked = index; highlight = 1;
        setMessage('Wylosowano: ', name);
        renderList();
        draw();
        if (Kit) {
            Kit.sfx.play('win');
            const confetti = { on: canvas, count: 40, spread: 230, size: 9, duration: 1300, gravity: 60, square: true, color: COLORS };
            Kit.fx.burst(CX, CY - 40, confetti);
            setTimeout(() => Kit.fx.burst(CX, CY + 30, confetti), 160);
            setTimeout(() => showResult(index, name), reduced() ? 0 : 450);
        }
    }
    function showResult(index, name) {
        if (spinning || names[index] !== name) return;
        const buttons = [{ label: 'Losuj ponownie', primary: true, onClick: spin }];
        if (names.length > 1) buttons.push({ label: 'Usuń z koła i losuj dalej', onClick: () => {
            const i = names[index] === name ? index : names.indexOf(name);
            if (i >= 0) { names.splice(i, 1); changed(); }
            spin();
        } });
        buttons.push({ label: 'Zamknij', onClick: () => canvas.focus({ preventScroll: true }) });
        Kit.message({
            icon: '🎉',
            title: `Wylosowano: ${name}`,
            text: `Losowanie nr ${spins} · ${names.length} ${names.length === 1 ? 'pozycja' : (names.length % 10 >= 2 && names.length % 10 <= 4 && (names.length % 100 < 10 || names.length % 100 >= 20)) ? 'pozycje' : 'pozycji'} na kole`,
            buttons
        });
    }

    function reset() {
        if (spinning || !names.length) return;
        const clear = () => { names = []; spins = 0; setMessage(''); changed(); input.focus(); };
        if (!Kit) { clear(); return; }
        Kit.message({
            icon: '🗑️', title: 'Wyczyścić listę?', text: `Z koła zniknie ${names.length} ${names.length === 1 ? 'pozycja' : 'pozycji'}.`,
            buttons: [{ label: 'Wyczyść', primary: true, onClick: clear }, { label: 'Anuluj' }]
        });
    }

    function syncSide() {
        const wide = window.innerWidth >= 700 && canvas.style.height;
        side.style.height = wide ? canvas.style.height : '';
        side.classList.toggle('tight', !!wide && parseFloat(canvas.style.height) < 440);
        draw();
    }

    form.addEventListener('submit', addParticipant);
    spinButton.addEventListener('click', spin);
    resetButton.addEventListener('click', reset);
    canvas.addEventListener('click', () => { if (names.length) spin(); else input.focus(); });
    canvas.addEventListener('keydown', e => {
        if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (!e.repeat) { if (names.length) spin(); else input.focus(); } }
    });

    if (Kit) {
        Kit.init({
            id: 'kolo', title: 'Koło fortuny', icon: '🎡',
            board: canvas, focus: canvas,
            startScreen: false, pausable: false, autoPause: false, hud: false,
            fit: { el: canvas, width: SIZE, height: SIZE, max: 1.8, min: 0.4, sharp: true, onFit: syncSide }
        });
    }
    renderList();
    draw();
})();
