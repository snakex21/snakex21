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
    const progress = document.createElement('p');
    progress.textContent = `Pytanie ${currentQuestionIndex + 1} z ${activeQuestions.length}`;
    const title = document.createElement('h2'); title.textContent = question.question;
    quizPage.append(progress, title);
    const expectedIndex = currentQuestionIndex;
    shuffle(question.answers.map((text, index) => ({text, index}))).forEach(answer => {
        const button = document.createElement('button'); button.type = 'button';
        button.textContent = answer.text; button.dataset.answer = answer.index;
        button.addEventListener('click', () => {
            if (expectedIndex === currentQuestionIndex) checkAnswerMultiple(answer.index);
        });
        quizPage.appendChild(button);
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
    currentQuestionIndex++;
    const next = document.createElement('button'); next.type = 'button';
    next.textContent = currentQuestionIndex === activeQuestions.length ? 'Pokaż wynik' : 'Następne pytanie';
    next.addEventListener('click', displayNextQuestion); quizPage.appendChild(next);
    if (currentQuestionIndex === activeQuestions.length) showResults();
}
function showResults() {
    quizPage.classList.add('hidden'); resultPage.classList.remove('hidden'); resultPage.innerHTML = '';
    const title = document.createElement('h1'); title.textContent = `Twój wynik: ${score} z ${activeQuestions.length}`; resultPage.appendChild(title);
    activeQuestions.forEach((question, index) => {
        const review = document.createElement('p');
        const selected = selectedAnswers[index];
        review.textContent = `${question.question} — Twoja odpowiedź: ${selected === undefined ? 'brak' : question.answers[selected]}. Poprawna: ${question.answers[question.correct]}`;
        resultPage.appendChild(review);
    });
    for (const [label, action] of [['Zagraj ponownie', restartQuiz], ['Powrót do wyboru trybu', returnToStart]]) {
        const button = document.createElement('button'); button.type = 'button'; button.textContent = label;
        button.addEventListener('click', action); resultPage.appendChild(button);
    }
}
function returnToStart() {
    document.getElementById('start-page').classList.remove('hidden');
    quizPage.classList.add('hidden'); resultPage.classList.add('hidden'); answered = true;
}
document.getElementById('single-question').addEventListener('click', () => startQuiz(false));
document.getElementById('multiple-questions').addEventListener('click', startMultipleQuestionsQuiz);
