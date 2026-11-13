// Quiz o podzespołach – ekran startu, pauza i koniec z GryKit; pytania budowane przez textContent (bez wstawiania HTML z danych).
(() => {
    'use strict';
    const Kit = window.GryKit;

    // correct: indeks poprawnej odpowiedzi w answers; why: krótkie wyjaśnienie po odpowiedzi.
    const QUESTIONS = [
        { question: 'Ile bitów ma jeden bajt?', answers: ['8', '2', '16', '100'], correct: 0, why: 'Bajt to 8 bitów – zapisze 256 różnych wartości.' },
        { question: 'Jakie cyfry wykorzystuje system binarny?', answers: ['0 i 1', '1 i 2', 'Od 0 do 9', 'Tylko 1'], correct: 0, why: 'Dwa stany (0 i 1) łatwo odróżnić elektronicznie, dlatego komputery liczą dwójkowo.' },
        { question: 'Który podzespół wykonuje instrukcje programu?', answers: ['Procesor (CPU)', 'Obudowa', 'Monitor', 'Klawiatura'], correct: 0, why: 'Procesor pobiera kolejne instrukcje z pamięci i je wykonuje.' },
        { question: 'Do czego służy układ graficzny (GPU)?', answers: ['Przetwarzania grafiki', 'Zasilania komputera', 'Chłodzenia obudowy', 'Wprowadzania tekstu'], correct: 0, why: 'GPU liczy równolegle tysiące pikseli – stąd jego rola w grach i obliczeniach.' },
        { question: 'Co zwykle dzieje się z danymi w pamięci RAM po odłączeniu zasilania?', answers: ['Zostają utracone', 'Trafiają do drukarki', 'Automatycznie trafiają do chmury', 'Zawsze pozostają w RAM'], correct: 0, why: 'RAM to pamięć ulotna – bez prądu traci zawartość, dlatego pliki zapisuje się na dysku.' },
        { question: 'Który nośnik nie ma ruchomych części mechanicznych?', answers: ['SSD', 'Dysk twardy HDD', 'Dyskietka w stacji', 'Płyta CD w napędzie'], correct: 0, why: 'SSD trzyma dane w pamięci flash; HDD ma wirujące talerze i ruchomą głowicę.' },
        { question: 'Które złącze może przesyłać cyfrowy obraz i dźwięk?', answers: ['HDMI', 'PS/2', 'VGA', 'Złącze zasilania ATX'], correct: 0, why: 'HDMI przesyła cyfrowo obraz i dźwięk jednym kablem; VGA jest analogowe i bez dźwięku.' },
        { question: 'Który z tych programów jest przeglądarką internetową?', answers: ['Firefox', 'Kalkulator', 'Notatnik', 'Paint'], correct: 0, why: 'Firefox, Chrome czy Edge to przeglądarki – wyświetlają strony WWW.' },
        { question: 'Który z tych formatów służy do zapisu obrazów?', answers: ['PNG', 'MP3', 'WAV', 'TXT'], correct: 0, why: 'PNG to obraz z kompresją bezstratną; MP3 i WAV to dźwięk, TXT – tekst.' },
        { question: 'Co oznacza skrót HTML?', answers: ['HyperText Markup Language', 'High Transfer Memory Link', 'Home Tool Machine Logic', 'HyperText Music Library'], correct: 0, why: 'HTML to język znaczników opisujący strukturę stron internetowych.' },
        { question: 'Które złącze jest powszechnie używane do podłączania klawiatury, myszy i pendrive’a?', answers: ['USB', 'HDMI', 'Gniazdo procesora', 'Złącze wentylatora'], correct: 0, why: 'USB (Universal Serial Bus) to uniwersalne złącze urządzeń zewnętrznych.' },
        { question: 'Do czego służy karta sieciowa?', answers: ['Łączenia komputera z siecią', 'Wyświetlania obrazu', 'Zasilania procesora', 'Drukowania dokumentów'], correct: 0, why: 'Karta sieciowa (przewodowa lub Wi-Fi) łączy komputer z siecią lokalną i internetem.' },
        { question: 'Które oprogramowanie zarządza zasobami komputera i uruchamianiem aplikacji?', answers: ['System operacyjny', 'Tapeta pulpitu', 'Plik tekstowy', 'Kabel USB'], correct: 0, why: 'System operacyjny (np. Windows, Linux) przydziela programom pamięć, procesor i dostęp do urządzeń.' },
        { question: 'Który podzespół rozprowadza energię elektryczną do części komputera?', answers: ['Zasilacz', 'Dysk SSD', 'Karta dźwiękowa', 'Pamięć RAM'], correct: 0, why: 'Zasilacz zamienia prąd z gniazdka na niskie napięcia stałe potrzebne podzespołom.' },
        { question: 'Jaki znak zwykle oddziela nazwę użytkownika od domeny w adresie e-mail?', answers: ['@', '#', '%', '&'], correct: 0, why: 'Adres e-mail ma postać nazwa@domena, np. jan@example.com.' },
        { question: 'Do której części komputera montuje się procesor, pamięć RAM i karty rozszerzeń?', answers: ['Płyta główna', 'Zasilacz', 'Dysk twardy', 'Monitor'], correct: 0, why: 'Płyta główna łączy wszystkie podzespoły i pozwala im się komunikować.' },
        { question: 'Do czego służy oprogramowanie BIOS/UEFI na płycie głównej?', answers: ['Sprawdza sprzęt i uruchamia system', 'Edytuje zdjęcia', 'Przyspiesza internet', 'Usuwa wirusy z poczty'], correct: 0, why: 'BIOS/UEFI startuje jako pierwszy: inicjuje sprzęt i przekazuje sterowanie systemowi operacyjnemu.' },
        { question: 'Co najczęściej odprowadza ciepło z procesora?', answers: ['Radiator z wentylatorem', 'Zasilacz', 'Pamięć RAM', 'Karta sieciowa'], correct: 0, why: 'Ciepło przez pastę termoprzewodzącą trafia do radiatora, a wentylator wydmuchuje je z obudowy.' },
        { question: 'W jakich jednostkach podaje się częstotliwość taktowania procesora?', answers: ['Gigahercach (GHz)', 'Gigabajtach (GB)', 'Watach (W)', 'Calach (″)'], correct: 0, why: '1 GHz to miliard cykli zegara na sekundę; GB mierzy pojemność, W – moc.' },
        { question: 'Co mierzy się w gigabajtach (GB)?', answers: ['Pojemność pamięci', 'Szybkość procesora', 'Moc zasilacza', 'Przekątną ekranu'], correct: 0, why: 'Bajty (KB, MB, GB, TB) opisują ilość danych – pojemność RAM, dysku czy pliku.' },
        { question: 'Co oznacza skrót SSD?', answers: ['Solid State Drive', 'Super Speed Disk', 'System Storage Device', 'Serial Sound Device'], correct: 0, why: 'Solid State Drive – dysk półprzewodnikowy, bez ruchomych części.' },
        { question: 'W które gniazdo płyty głównej wkłada się zwykle kartę graficzną?', answers: ['PCI Express (PCIe)', 'SATA', 'USB', 'RJ-45'], correct: 0, why: 'Karty graficzne montuje się w gnieździe PCIe x16 – ma największą przepustowość.' },
        { question: 'Do czego służy złącze SATA?', answers: ['Podłączania dysków', 'Podłączania monitora', 'Podłączania słuchawek', 'Ładowania telefonu'], correct: 0, why: 'SATA łączy z płytą główną dyski HDD, dyski SSD 2,5″ i napędy optyczne.' },
        { question: 'Co oznacza rozdzielczość ekranu 1920×1080?', answers: ['Liczbę pikseli w poziomie i w pionie', 'Częstotliwość odświeżania', 'Przekątną ekranu w cm', 'Liczbę kolorów'], correct: 0, why: 'To 1920 pikseli w poziomie i 1080 w pionie (Full HD) – razem ponad 2 mln pikseli.' },
        { question: 'Które gniazdo służy do przewodowego połączenia z siecią (Ethernet)?', answers: ['RJ-45', 'HDMI', 'Mini-jack 3,5 mm', 'DisplayPort'], correct: 0, why: 'Kabel sieciowy „skrętka” kończy się wtykiem RJ-45.' }
    ];
    const MODES = {
        single: { count: 1, time: 0 },
        multiple: { count: 10, time: 0 },
        timed: { count: 10, time: 15 }
    };
    const LETTERS = ['A', 'B', 'C', 'D'];

    const card = document.getElementById('quiz-card');
    const counterEl = document.getElementById('quiz-counter'), timerEl = document.getElementById('quiz-timer');
    const timebar = document.getElementById('quiz-timebar'), timebarFill = timebar.querySelector('i');
    const stepsEl = document.getElementById('quiz-steps'), questionEl = document.getElementById('quiz-question');
    const answersEl = document.getElementById('quiz-answers'), feedbackEl = document.getElementById('quiz-feedback');
    const nextButton = document.getElementById('quiz-next'), progressStat = document.getElementById('quiz-progress-stat');

    let mode = 'multiple', active = [], index = 0, correct = 0, points = 0, answered = true, picks = [];
    let timeLeft = 0, lastTick = 0, raf = 0;

    function randomInt(max) {
        const c = window.crypto;
        if (!c || !c.getRandomValues || max <= 0) return Math.floor(Math.random() * max);
        const limit = Math.floor(0x100000000 / max) * max, buf = new Uint32Array(1);
        do { c.getRandomValues(buf); } while (buf[0] >= limit);
        return buf[0] % max;
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) { const j = randomInt(i + 1); [array[i], array[j]] = [array[j], array[i]]; }
        return array;
    }
    function esc(s) { return String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c])); }
    const timed = () => MODES[mode].time > 0;

    function renderSteps() {
        stepsEl.textContent = '';
        active.forEach((q, i) => {
            const s = document.createElement('i');
            if (i < picks.length) s.className = picks[i] === q.correct ? 'ok' : 'bad';
            else if (i === index) s.className = 'now';
            stepsEl.appendChild(s);
        });
        stepsEl.hidden = active.length < 2;
    }
    function stats() {
        progressStat.textContent = active.length ? `${Math.min(index + 1, active.length)}/${active.length}` : '–';
        Kit.score(timed() ? points : correct);
    }

    function answerButton(text, key, onClick) {
        const b = document.createElement('button');
        b.type = 'button';
        const k = document.createElement('span'); k.className = 'key'; k.textContent = key;
        const t = document.createElement('span'); t.className = 'txt'; t.textContent = text;
        b.append(k, t);
        b.setAttribute('aria-label', `${key}: ${text}`);
        if (onClick) b.addEventListener('click', onClick);
        return b;
    }

    // Plansza pod ekranem startu: przykładowe pytanie (zasłonięte nakładką).
    function renderIdle() {
        stopTimer();
        active = []; index = 0; picks = []; answered = true;
        counterEl.textContent = 'Quiz o podzespołach';
        timerEl.hidden = true; timebar.hidden = true; stepsEl.hidden = true;
        questionEl.textContent = 'Który podzespół wykonuje instrukcje programu?';
        answersEl.textContent = '';
        ['Procesor (CPU)', 'Karta graficzna (GPU)', 'Pamięć RAM', 'Dysk SSD'].forEach((t, i) => {
            const b = answerButton(t, LETTERS[i]); b.disabled = true; answersEl.appendChild(b);
        });
        feedbackEl.textContent = ''; feedbackEl.className = 'quiz-feedback';
        nextButton.hidden = true;
        progressStat.textContent = '–';
    }

    function start(m) {
        mode = MODES[m] ? m : 'multiple';
        active = shuffle(QUESTIONS.slice()).slice(0, MODES[mode].count).map(q => {
            // tasowanie odpowiedzi z zachowaniem indeksu poprawnej
            const order = shuffle(q.answers.map((_, i) => i));
            return { question: q.question, why: q.why, answers: order.map(i => q.answers[i]), correct: order.indexOf(q.correct) };
        });
        index = 0; correct = 0; points = 0; picks = [];
        Kit.score(0);
        showQuestion();
    }

    function showQuestion() {
        const q = active[index];
        answered = false;
        counterEl.textContent = `Pytanie ${index + 1} z ${active.length}`;
        questionEl.textContent = q.question;
        answersEl.textContent = '';
        q.answers.forEach((text, i) => answersEl.appendChild(answerButton(text, LETTERS[i], () => answer(i))));
        feedbackEl.textContent = ''; feedbackEl.className = 'quiz-feedback';
        nextButton.hidden = true;
        renderSteps(); stats();
        timerEl.hidden = !timed(); timebar.hidden = !timed();
        if (timed()) { timeLeft = MODES[mode].time; lastTick = 0; drawTimer(); runTimer(); }
        Kit.refit();
    }

    function drawTimer() {
        const total = MODES[mode].time, low = timeLeft <= 5;
        timerEl.textContent = `⏱ ${Math.ceil(Math.max(0, timeLeft))} s`;
        timerEl.classList.toggle('low', low); timebar.classList.toggle('low', low);
        timebarFill.style.transform = `scaleX(${Math.max(0, timeLeft / total)})`;
    }
    function runTimer() { if (!raf) raf = requestAnimationFrame(tickTimer); }
    function stopTimer() { if (raf) cancelAnimationFrame(raf); raf = 0; lastTick = 0; }
    function tickTimer(now) {
        raf = 0;
        if (answered || !timed()) return;
        if (Kit.playing) {
            if (lastTick) timeLeft -= Math.min(0.1, (now - lastTick) / 1000);
            lastTick = now;
            const before = Math.ceil(timeLeft + 0.0001);
            drawTimer();
            if (timeLeft <= 0) { answer(-1); return; }
            if (timeLeft <= 3 && Math.ceil(timeLeft) !== before) Kit.sfx.play('tick');
        } else lastTick = 0;
        raf = requestAnimationFrame(tickTimer);
    }

    function answer(choice) {
        if (answered || !Kit.playing || index >= active.length) return;
        const q = active[index];
        answered = true; stopTimer();
        picks[index] = choice;
        const buttons = answersEl.querySelectorAll('button');
        buttons.forEach((b, i) => {
            b.disabled = true;
            if (i === q.correct) b.classList.add('correct');
            else if (i === choice) b.classList.add('wrong');
        });
        const ok = choice === q.correct;
        feedbackEl.textContent = '';
        const head = document.createElement('b');
        if (ok) {
            correct++;
            const gain = timed() ? 10 + Math.ceil(Math.max(0, timeLeft)) : 1;
            points += gain;
            head.textContent = 'Dobrze! ';
            Kit.sfx.play('score');
            Kit.fx.flash('#2f8a57', { on: card, strength: 0.22 });
            const b = buttons[choice];
            Kit.fx.burstAt(b, { color: ['#2f8a57', '#b8d58e', '#f2c14e'], count: 16, spread: 70 });
            const br = b.getBoundingClientRect(), cr = card.getBoundingClientRect();
            Kit.fx.float(br.left - cr.left + br.width / 2, br.top - cr.top, `+${gain}`, { on: card, color: '#2f8a57' });
        } else {
            head.textContent = choice < 0 ? `Czas minął! Poprawna: ${q.answers[q.correct]}. ` : `Niestety. Poprawna: ${q.answers[q.correct]}. `;
            Kit.sfx.play('error');
            Kit.fx.flash('#c2453d', { on: card, strength: 0.22 });
            Kit.fx.shake(card, 7, 320);
        }
        feedbackEl.className = 'quiz-feedback ' + (ok ? 'ok' : 'bad');
        feedbackEl.append(head, q.why);
        renderSteps(); stats();
        nextButton.textContent = index + 1 >= active.length ? 'Pokaż wynik' : 'Dalej →';
        nextButton.hidden = false;
        try { nextButton.focus({ preventScroll: true }); } catch (e) { nextButton.focus(); }
        if (window.innerWidth < 700) {
            const r = nextButton.getBoundingClientRect();
            if (r.bottom > window.innerHeight) nextButton.scrollIntoView({ block: 'end', behavior: Kit.reducedMotion ? 'auto' : 'smooth' });
        }
    }

    function next() {
        if (!answered || !Kit.playing || !active.length) return;
        index++;
        if (index < active.length) { showQuestion(); return; }
        finish();
    }

    function finish() {
        const n = active.length, pct = Math.round(correct / n * 100);
        progressStat.textContent = `${n}/${n}`;
        const wrong = active.map((q, i) => ({ q, pick: picks[i] })).filter(x => x.pick !== x.q.correct);
        const score = timed() ? points : correct, best = Math.max(Kit.best || 0, score);
        let html = `<div class="quiz-summary"><div class="quiz-ring" style="--p:${pct}"><b>${pct}%</b></div>` +
            `<div class="quiz-sum"><b>${correct} z ${n}</b> poprawnych` +
            (timed() ? `<br>Punkty: <b>${score}</b>` : '') + `<br>Rekord: <b>${best}</b></div></div>`;
        if (wrong.length) {
            html += `<p class="quiz-wrong-title">Do powtórki</p><ul class="quiz-wrong">` + wrong.map(x =>
                `<li><b>${esc(x.q.question)}</b><span>Twoja: ${x.pick < 0 ? 'brak (czas)' : esc(x.q.answers[x.pick])} · Poprawna: ${esc(x.q.answers[x.q.correct])}</span></li>`).join('') + '</ul>';
        }
        const title = pct === 100 ? 'Bezbłędnie!' : pct >= 70 ? 'Świetny wynik!' : pct >= 40 ? 'Nieźle!' : 'Warto powtórzyć';
        Kit.over({
            score, showScore: false,
            win: pct >= 70,
            title, icon: pct === 100 ? '🏆' : pct >= 70 ? '🎉' : pct >= 40 ? '👍' : '📚',
            html
        });
        if (pct >= 70) Kit.fx.burst(card.getBoundingClientRect().width / 2, 90, { on: card, count: 36, spread: 180, size: 8, duration: 1100, color: ['#2f8a57', '#e8763d', '#f2c14e', '#3f7f9a'] });
    }

    nextButton.addEventListener('click', next);
    document.getElementById('quiz-menu').addEventListener('click', () => Kit.menu());
    document.addEventListener('keydown', e => {
        if (!Kit.playing || e.altKey || e.ctrlKey || e.metaKey) return;
        const key = e.key.toLowerCase();
        if (!answered) {
            let i = ['1', '2', '3', '4'].indexOf(key);
            if (i < 0) i = ['a', 'b', 'c', 'd'].indexOf(key);
            if (i >= 0 && i < answersEl.children.length) { e.preventDefault(); answer(i); }
            return;
        }
        if (key === 'enter' || key === ' ' || key === 'arrowright') {
            if (e.target && e.target.closest && e.target.closest('button') && key !== 'arrowright') return; // przycisk sam obsłuży Enter/Spację
            e.preventDefault();
            if (!e.repeat) next();
        }
    });

    renderIdle();
    Kit.init({
        id: 'quiz', title: 'Quiz o podzespołach', icon: '💻',
        howTo: ['Wybierz jedną z czterech odpowiedzi – po każdej zobaczysz krótkie wyjaśnienie.'],
        controls: '<kbd>1</kbd>–<kbd>4</kbd> / <kbd>A</kbd>–<kbd>D</kbd> odpowiedź · <kbd>Enter</kbd> dalej · <kbd>P</kbd> pauza',
        modes: [
            { id: 'multiple', label: '📝 Seria 10 pytań', desc: 'Losowe pytania i podsumowanie z błędami' },
            { id: 'single', label: '⚡ Jedno pytanie', desc: 'Szybki test na rozgrzewkę' },
            { id: 'timed', label: '⏱ Na czas', desc: '10 pytań po 15 s – szybciej = więcej punktów' }
        ],
        board: card,
        hud: { score: '#quiz-score-stat', best: '#quiz-best' },
        bestPerMode: true, liveBest: false,
        fit: { el: card, zoom: true, min: 0.6 },
        onStart: start,
        onMenu: renderIdle
    });
})();
