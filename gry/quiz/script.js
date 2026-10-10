const questions = [
    { question: "Ile bitów ma jeden bajt?", answers: ["8", "2", "16", "100"], correct: 0 },
    { question: "Jakie cyfry wykorzystuje system binarny?", answers: ["0 i 1", "1 i 2", "Od 0 do 9", "Tylko 1"], correct: 0 },
    { question: "Który podzespół wykonuje instrukcje programu?", answers: ["Procesor (CPU)", "Obudowa", "Monitor", "Klawiatura"], correct: 0 },
    { question: "Do czego służy układ graficzny (GPU)?", answers: ["Przetwarzania grafiki", "Zasilania komputera", "Chłodzenia obudowy", "Wprowadzania tekstu"], correct: 0 },
    { question: "Co zwykle dzieje się z danymi w pamięci RAM po odłączeniu zasilania?", answers: ["Zostają utracone", "Trafiają do drukarki", "Automatycznie trafiają do chmury", "Zawsze pozostają w RAM"], correct: 0 },
    { question: "Który nośnik nie ma ruchomych części mechanicznych?", answers: ["SSD", "Dysk twardy HDD", "Dyskietka w stacji", "Płyta CD w napędzie"], correct: 0 },
    { question: "Które złącze może przesyłać cyfrowy obraz i dźwięk?", answers: ["HDMI", "PS/2", "VGA", "Złącze zasilania ATX"], correct: 0 },
    { question: "Który z tych programów jest przeglądarką internetową?", answers: ["Firefox", "Kalkulator", "Notatnik", "Paint"], correct: 0 },
    { question: "Który z tych formatów służy do zapisu obrazów?", answers: ["PNG", "MP3", "WAV", "TXT"], correct: 0 },
    { question: "Co oznacza skrót HTML?", answers: ["HyperText Markup Language", "High Transfer Memory Link", "Home Tool Machine Logic", "HyperText Music Library"], correct: 0 },
    { question: "Które złącze jest powszechnie używane do podłączania klawiatury, myszy i pendrive’a?", answers: ["USB", "HDMI", "Gniazdo procesora", "Złącze wentylatora"], correct: 0 },
    { question: "Do czego służy karta sieciowa?", answers: ["Łączenia komputera z siecią", "Wyświetlania obrazu", "Zasilania procesora", "Drukowania dokumentów"], correct: 0 },
    { question: "Które oprogramowanie zarządza zasobami komputera i uruchamianiem aplikacji?", answers: ["System operacyjny", "Tapeta pulpitu", "Plik tekstowy", "Kabel USB"], correct: 0 },
    { question: "Który podzespół rozprowadza energię elektryczną do części komputera?", answers: ["Zasilacz", "Dysk SSD", "Karta dźwiękowa", "Pamięć RAM"], correct: 0 },
    { question: "Jaki znak zwykle oddziela nazwę użytkownika od domeny w adresie e-mail?", answers: ["@", "#", "%", "&"], correct: 0 }
];

let currentQuestionIndex = 0, score = 0, quizMode = 'single', answered = false;
let activeQuestions = [], selectedAnswers = [];
const quizPage = document.getElementById('quiz-page');
const resultPage = document.getElementById('result-page');
const progressStat = document.getElementById('quiz-progress-stat');
const scoreStat = document.getElementById('quiz-score-stat');
function updateStats() {
    if (progressStat) progressStat.textContent = activeQuestions.length ? `${Math.min(currentQuestionIndex + (answered ? 0 : 1), activeQuestions.length)}/${activeQuestions.length}` : '–';
    if (scoreStat) scoreStat.textContent = score;
}
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
function startQuiz(isMultiple) {
    quizMode = isMultiple ? 'multiple' : 'single';
    activeQuestions = shuffle([...questions]).slice(0, isMultiple ? 10 : 1);
    currentQuestionIndex = 0; score = 0; selectedAnswers = []; answered = false;
    document.getElementById('start-page').classList.add('hidden');
    resultPage.classList.add('hidden'); quizPage.classList.remove('hidden');
    displayNextQuestion();
}
function startMultipleQuestionsQuiz() { startQuiz(true); }
function startRandomQuestionsQuiz() { startQuiz(true); }
function restartQuiz() { startQuiz(quizMode === 'multiple'); }
function displayNextQuestion() {
    if (currentQuestionIndex >= activeQuestions.length) { showResults(); return; }
    answered = false; quizPage.innerHTML = '';
    const question = activeQuestions[currentQuestionIndex];
    const progress = document.createElement('p'); progress.className = 'quiz-progress';
    progress.textContent = `Pytanie ${currentQuestionIndex + 1} z ${activeQuestions.length}`;
    const title = document.createElement('h2'); title.className = 'quiz-question'; title.textContent = question.question;
    const answers = document.createElement('div'); answers.className = 'quiz-answers';
    quizPage.append(progress, title, answers);
    updateStats();
    const expectedIndex = currentQuestionIndex;
    shuffle(question.answers.map((text, index) => ({text, index}))).forEach(answer => {
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = answer.text; button.dataset.answer = answer.index;
        button.addEventListener('click', () => {
            if (expectedIndex === currentQuestionIndex) checkAnswerMultiple(answer.index);
        });
        answers.appendChild(button);
    });
}
function checkAnswerMultiple(selectedAnswer) {
    if (answered || currentQuestionIndex >= activeQuestions.length || quizPage.classList.contains('hidden')) return;
    const question = activeQuestions[currentQuestionIndex];
    if (!Number.isInteger(selectedAnswer) || selectedAnswer < 0 || selectedAnswer >= question.answers.length) return;
    answered = true; selectedAnswers[currentQuestionIndex] = selectedAnswer;
    if (selectedAnswer === question.correct) score++;
    quizPage.querySelectorAll('button[data-answer]').forEach(button => {
        const index = Number(button.dataset.answer); button.disabled = true;
        if (index === question.correct) button.classList.add('correct-answer');
        else if (index === selectedAnswer) button.classList.add('wrong-answer');
    });
    currentQuestionIndex++; updateStats();
    const actions = document.createElement('div'); actions.className = 'quiz-actions';
    const next = document.createElement('button'); next.type = 'button'; next.className = 'kit-btn primary';
    next.textContent = currentQuestionIndex === activeQuestions.length ? 'Pokaż wynik' : 'Następne pytanie';
    next.addEventListener('click', displayNextQuestion); actions.appendChild(next); quizPage.appendChild(actions);
    if (currentQuestionIndex === activeQuestions.length) showResults();
}
function showResults() {
    quizPage.classList.add('hidden'); resultPage.classList.remove('hidden'); resultPage.innerHTML = '';
    const kicker = document.createElement('p'); kicker.className = 'quiz-kicker'; kicker.textContent = 'Podsumowanie';
    const title = document.createElement('h2'); title.className = 'quiz-result'; title.textContent = `Twój wynik: ${score} z ${activeQuestions.length}`;
    const ratio = activeQuestions.length ? score / activeQuestions.length : 0;
    const note = document.createElement('p'); note.className = 'quiz-result-note';
    note.textContent = ratio === 1 ? 'Bezbłędnie!' : ratio >= 0.7 ? 'Bardzo dobrze.' : ratio >= 0.4 ? 'Nieźle – spróbuj jeszcze raz.' : 'Warto powtórzyć podstawy.';
    const reviewList = document.createElement('ul'); reviewList.className = 'quiz-review';
    resultPage.append(kicker, title, note, reviewList);
    activeQuestions.forEach((question, index) => {
        const review = document.createElement('li');
        const selected = selectedAnswers[index];
        review.className = selected === question.correct ? 'ok' : 'bad';
        const asked = document.createElement('b'); asked.textContent = question.question;
        const detail = document.createElement('span');
        detail.textContent = `Twoja odpowiedź: ${selected === undefined ? 'brak' : question.answers[selected]} · Poprawna: ${question.answers[question.correct]}`;
        review.append(asked, detail); reviewList.appendChild(review);
    });
    const actions = document.createElement('div'); actions.className = 'quiz-actions'; resultPage.appendChild(actions);
    for (const [label, action, kind] of [['Zagraj ponownie', restartQuiz, 'kit-btn primary'], ['Powrót do wyboru trybu', returnToStart, 'kit-btn']]) {
        const button = document.createElement('button'); button.type = 'button'; button.className = kind; button.textContent = label;
        button.addEventListener('click', action); actions.appendChild(button);
    }
}
function returnToStart() {
    document.getElementById('start-page').classList.remove('hidden');
    quizPage.classList.add('hidden'); resultPage.classList.add('hidden'); answered = true;
}
document.getElementById('single-question').addEventListener('click', () => startQuiz(false));
document.getElementById('multiple-questions').addEventListener('click', startMultipleQuestionsQuiz);
