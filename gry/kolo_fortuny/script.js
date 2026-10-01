// Self-contained wheel: no CDN, HTML insertion or overlapping animation loops.
(() => {
    const canvas = document.querySelector('.canvas'), ctx = canvas.getContext('2d');
    const input = document.querySelector('.joiner'), list = document.querySelector('.participants');
    const spinButton = document.querySelector('.spin-trigger'), addButton = document.querySelector('.add');
    const winner = document.querySelector('.winner'), resetButton = document.querySelector('.reset');
    const colors = ['#2563eb', '#7c3aed', '#db2777', '#d97706', '#059669', '#0891b2'];
    let participants = [], angle = 0, timer = null, spinning = false;
    winner.setAttribute('aria-live', 'polite');
    canvas.setAttribute('aria-label', 'Koło losowania; uczestnicy na liście obok');
    input.maxLength = 80;
    function setMessage(text) { winner.textContent = text; winner.style.display = text ? 'block' : 'none'; }
    function controls() {
        spinButton.disabled = spinning || !participants.length;
        addButton.disabled = spinning; input.disabled = spinning;
    }
    function draw() {
        ctx.clearRect(0, 0, 500, 500);
        if (!participants.length) {
            ctx.beginPath(); ctx.arc(250, 250, 200, 0, Math.PI * 2);
            ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 2; ctx.stroke();
            ctx.fillStyle = '#64748b'; ctx.font = '18px sans-serif'; ctx.textAlign = 'center';
            ctx.fillText('Dodaj uczestników', 250, 250); return;
        }
        const arc = Math.PI * 2 / participants.length;
        participants.forEach((name, i) => {
            const start = angle + i * arc;
            ctx.beginPath(); ctx.moveTo(250, 250); ctx.arc(250, 250, 200, start, start + arc); ctx.closePath();
            ctx.fillStyle = colors[i % colors.length]; ctx.fill(); ctx.strokeStyle = '#ffffff'; ctx.stroke();
            ctx.save(); ctx.translate(250, 250); ctx.rotate(start + arc / 2);
            ctx.fillStyle = '#ffffff'; ctx.textAlign = 'right'; ctx.font = 'bold 15px sans-serif';
            ctx.fillText(name.length > 22 ? name.slice(0, 20) + '…' : name, 185, 5); ctx.restore();
        });
        ctx.beginPath(); ctx.moveTo(238, 32); ctx.lineTo(262, 32); ctx.lineTo(250, 64); ctx.closePath(); ctx.fillStyle = '#ef4444'; ctx.fill();
    }
    function addParticipant(event) {
        event?.preventDefault();
        const name = input.value.trim(); if (spinning || !name) return;
        if (participants.length >= 100) { setMessage('Maksymalnie 100 uczestników.'); return; }
        participants.push(name.slice(0, 80));
        const item = document.createElement('li'); item.textContent = participants[participants.length - 1]; list.appendChild(item);
        input.value = ''; setMessage(''); controls(); draw(); input.focus();
    }
    function spin() {
        if (spinning || !participants.length) return;
        spinning = true; controls(); setMessage('Losowanie…');
        const start = angle, travel = Math.PI * 2 * (5 + Math.random() * 3), began = performance.now();
        function frame() {
            const progress = Math.min(1, (performance.now() - began) / 4000);
            angle = start + travel * (1 - Math.pow(1 - progress, 3)); draw();
            if (progress < 1) { timer = setTimeout(frame, 16); return; }
            timer = null; spinning = false; angle %= Math.PI * 2;
            const relative = ((-Math.PI / 2 - angle) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
            const index = Math.floor(relative / (Math.PI * 2 / participants.length)) % participants.length;
            setMessage(`Wylosowano: ${participants[index]}`); controls();
        }
        timer = setTimeout(frame, 16);
    }
    function reset() {
        clearTimeout(timer); timer = null; spinning = false; angle = 0; participants = [];
        list.innerHTML = ''; input.value = ''; setMessage(''); controls(); draw();
    }
    addButton.addEventListener('click', addParticipant);
    document.querySelector('.iform').addEventListener('submit', addParticipant);
    spinButton.addEventListener('click', spin); resetButton.addEventListener('click', reset);
    controls(); draw();
})();
