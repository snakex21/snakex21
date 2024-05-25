// Przypisanie obsługi zdarzeń do przycisków rozpoczynających quiz
document.getElementById('single-question').addEventListener('click', function() {
    startQuiz(false);
});

document.getElementById('multiple-questions').addEventListener('click', function() {
    startQuiz(true);
});

// Inicjalizacja zmiennych stanu quizu
let currentQuestionIndex = 0; // Index bieżącego pytania
let score = 0; // Wynik użytkownika
// Definicja pytań quizu
const questions = [
    { question: "Jaka była najbardziej popularna karta w 2010 roku?", answers: ["ATI Radeon HD 4870", "GeForce 8800 GT", "GeForce 9800 GT", "GTX 260", "HD 5870", "HD 5770"], correct: 0 },
    { question: "1 procesor 4-rdzeniowy", answers: ["Intel Q6/QX6", "AMD Phenom X4", "Intel Xeon", "AMD Opteron"], correct: 0 },
    { question: "1 procesor 64-bitowy", answers: ["AMD Athlon 64", "Pentium 4 'Prescott'", "Core 2 Duo", "Athlon 64 FX"], correct: 0 },
    { question: "Ile faktycznie rdzeni/wątków miały procesory FX 8000?", answers: ["Co ty, miały tyle, ile pisano", "4 rdzenie i wątki", "6 rdzeni i wątków", "4 rdzenie 8 wątków"], correct: 3 },
    { question: "Wymień model Core 2 Duo, którego wartość nie spadła do końca życia sklepowego", answers: ["E4600", "E6600", "X6800", "E8400", "E7500"], correct: 3 },
    {
        question: "Która z tych kart ma pamięci GDDR4?",
        answers: ["HD 3870", "HD 4870", "GeForce 8800 GTX", "GTX 280", "GTX 480"],
        correct: 0 // HD 4870
    },
    {
        question: "Ile pamięci zakładając, że mamy różne płyty, ile standardów DDR można było mieć na sockecie 775?",
        answers: ["3 standardy DDR, DDR2, DDR3", "2 standardy DDR2, DDR3", "2 standardy DDR, DDR2", "1 standard DDR2"],
        correct: 0 // 3 standardy DDR, DDR2, DDR3
    },
    {
        question: "Która karta 1 procesorowa była najszybsza w 2009 roku?",
        answers: ["HD 5870", "GTX 285", "HD 4890"],
        correct: 0 // HD 5870
    },
    {
        question: "Kiedy AMD kupiło firmę ATI?",
        answers: ["Poprawna data", "Losowa data 1", "Losowa data 2", "Losowa data 3", "Losowa data 4"], // Załóżmy, że "Poprawna data" to prawidłowa odpowiedź
        correct: 0
    },
    {
        question: "Ile lat NVIDIA produkowała karty GTX?",
        answers: ["16 lat", "15 lat", "14 lat", "10 lat"],
        correct: 1 // 15 lat
    },
    {
        question: "Wymień ostatni socket gdzie AMD i Intel miało wspólnie procesory",
        answers: ["Socket 7", "Socket 3", "Socket 378"],
        correct: 0 // Socket 7
    },
    {
        question: "Kto jako pierwszy wprowadził standard PCIe 4.0 do swoich kart graficznych?",
        answers: ["AMD", "NVIDIA"],
        correct: 0 // AMD
    },
    {
        question: "Kiedy wyszły pierwsze płyty, które wspierały DDR4?",
        answers: ["2014", "2015", "2016", "2017"],
        correct: 0 // 2014
    },
    {
        question: "Kiedy DisplayPort został użyty po raz pierwszy w karcie graficznej?",
        answers: ["2007", "2006", "2008", "2009", "2010"],
        correct: 0 // 2007
    },
    {
        question: "Kiedy powstały technologie G-Sync i FreeSync?",
        answers: ["2014", "2013", "2011", "2012", "2015"],
        correct: 0 // 2014
    }
];

// Funkcja rozpoczynająca quiz
function startQuiz(isMultiple) {
    currentQuestionIndex = 0;
    score = 0;
    // Ukrywanie i pokazywanie odpowiednich sekcji strony
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
    document.getElementById('result-page').classList.add('hidden');
    // Decyzja o typie quizu do wyświetlenia
    if (isMultiple) {
        displayMultipleQuestions();
    } else {
        displaySingleQuestion();
    }
}

function getRandomQuestions(questions, numOfQuestions) {
    let shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, numOfQuestions);
}

// Funkcja wyświetlająca pojedyncze pytanie quizu
function displaySingleQuestion() {
    const question = questions[currentQuestionIndex];
    const quizPage = document.getElementById('quiz-page');
    // Wyświetlenie pytania i przycisków z odpowiedziami
    quizPage.innerHTML = `
        <h2>${question.question}</h2>
        ${question.answers.map((answer, index) => 
            `<button onclick="checkAnswer(${index}, false)">${answer}</button>`
        ).join('')}
    `;
}


// Funkcja inicjująca quiz z wieloma pytaniami
function startMultipleQuestionsQuiz() {
    // Pobierz losowo 10 pytań z pełnej listy
    let selectedQuestions = getRandomQuestions(questions, 10);

    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
    document.getElementById('result-page').classList.add('hidden');
    displayMultipleQuestions(selectedQuestions); // Zaktualizuj, aby przyjmować wybrane pytania
}

// Funkcja wyświetlająca wiele pytań z mieszaniem odpowiedzi
function displayMultipleQuestions(selectedQuestions) {
    const quizPage = document.getElementById('quiz-page');
    quizPage.innerHTML = selectedQuestions.map((question, questionIndex) => {
        // Przetasuj odpowiedzi dla każdego pytania i zaktualizuj indeks poprawnej odpowiedzi
        let { shuffledAnswers, correctIndex } = shuffleAnswers(question);
        question.shuffledAnswers = shuffledAnswers;
        question.correctIndex = correctIndex;
        return `
            <div class="question">
                <h2>${question.question}</h2>
                ${shuffledAnswers.map((answer, index) => `
                    <button onclick="checkAnswer(${index}, true, ${questionIndex})">${answer}</button>
                `).join('')}
            </div>
        `;
    }).join('') + `<button onclick="showResults()">Zakończ quiz</button>`;
}

function checkAnswer(selectedAnswer, isMultiple, questionIndex = currentQuestionIndex) {
    const question = questions[questionIndex];
    const buttons = document.getElementById('quiz-page').querySelectorAll('button');

    if (selectedAnswer === question.correct) {
        buttons.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct-answer');
            } else {
                btn.disabled = true;
            }
        });
    } else {
        buttons.forEach((btn, index) => {
            if (index === question.correct) {
                btn.classList.add('correct-answer');
            } else if (index === selectedAnswer) {
                btn.classList.add('wrong-answer');
                btn.innerText += " - Zła odpowiedź";
            }
            btn.disabled = true; // Wyłącz wszystkie przyciski po wyborze
        });
    }

    // Usuń istniejące przyciski nawigacji (jeśli istnieją), zanim dodasz nowe
    const existingNavButtons = document.getElementById('navigation-buttons');
    if (existingNavButtons) {
        existingNavButtons.remove();
    }

    // Dodajemy przyciski nawigacji tylko dla pojedynczego pytania
    const quizPage = document.getElementById('quiz-page');
    quizPage.innerHTML += `
        <div id="navigation-buttons">
            <button onclick="restartQuiz()">Losowe pytanie</button>
            <button onclick="returnToStart()">Powrót do strony głównej</button>
        </div>
    `;
}  

function showResults() {
    document.getElementById('quiz-page').classList.add('hidden');
    const resultPage = document.getElementById('result-page');
    resultPage.classList.remove('hidden');
    resultPage.innerHTML = `
        <h1>Twój wynik: ${score} z ${questions.length}</h1>
        <button onclick="restartQuiz()">Restart</button>
        <button onclick="returnToStart()">Powrót do strony głównej</button>
    `;
}

function restartQuiz() {
    // Wybierz losowy indeks pytania z dostępnych pytań
    currentQuestionIndex = Math.floor(Math.random() * questions.length);
    document.getElementById('quiz-page').innerHTML = ''; // Czyść zawartość strony quizu
    displaySingleQuestion(); // Wyświetl losowe pytanie
}

function returnToStart() {
    document.getElementById('start-page').classList.remove('hidden');
    document.getElementById('quiz-page').classList.add('hidden');
    document.getElementById('result-page').classList.add('hidden');
}

// Przypisz obsługę zdarzeń do przycisków na stronie startowej
document.getElementById('single-question').addEventListener('click', () => startQuiz(false));
document.getElementById('multiple-questions').addEventListener('click', () => startQuiz(true));


// Funkcja inicjująca quiz z wieloma pytaniami
function startMultipleQuestionsQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('start-page').classList.add('hidden');
    document.getElementById('quiz-page').classList.remove('hidden');
    document.getElementById('result-page').classList.add('hidden');
    displayNextQuestion();
}

// Funkcja wyświetlająca następne pytanie w trybie wielu pytań
function displayNextQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        const quizPage = document.getElementById('quiz-page');
        quizPage.innerHTML = `
            <h2>${question.question}</h2>
            ${question.answers.map((answer, index) => `<button onclick="checkAnswerMultiple(${index})">${answer}</button>`).join('')}
        `;
    } else {
        showMultipleQuestionsResults();
    }
}

// Zaktualizujmy strukturę przechowującą zaznaczone odpowiedzi
let selectedAnswers = new Array(questions.length);

// Funkcja sprawdzająca odpowiedź w trybie wielu pytań
function checkAnswerMultiple(selectedAnswer) {
    const question = questions[currentQuestionIndex];
    // Zapisz wybraną odpowiedź
    selectedAnswers[currentQuestionIndex] = selectedAnswer;
    if (selectedAnswer === question.correct) {
        score++;
    }
    currentQuestionIndex++;
    displayNextQuestion();
}

// Funkcja wyświetlająca wyniki dla wielu pytań
function showMultipleQuestionsResults() {
    const quizPage = document.getElementById('quiz-page');
    quizPage.classList.add('hidden');
    const resultPage = document.getElementById('result-page');
    resultPage.classList.remove('hidden');
    resultPage.innerHTML = `<h1>Twój wynik: ${score} z ${questions.length}</h1>`;
    
    // Wyświetl każde pytanie z odpowiedziami
    resultPage.innerHTML += questions.map((question, index) => `
        <div>
            <h2>${question.question}</h2>
            ${question.answers.map((answer, answerIndex) => `
                <div class="${answerIndex === selectedAnswers[index] ? 'selected-answer' : ''} 
                            ${answerIndex === question.correct ? 'correct-answer' : 'incorrect-answer'}">
                    ${answer} - ${answerIndex === question.correct ? 'Poprawna' : 'Niepoprawna'}
                </div>
            `).join('')}
        </div>
    `).join('');

    // Przycisk do rozpoczęcia nowego quizu z losowymi pytaniami
    resultPage.innerHTML += `
        <button onclick="startRandomQuestionsQuiz()">Daj następne pytania</button>
        <button onclick="returnToStart()">Powrót do strony głównej</button>
    `;
}

// Funkcja inicjująca nowy quiz z losowo wybranymi pytaniami
function startRandomQuestionsQuiz() {
    shuffleQuestions(); // Losowe przetasowanie pytań
    startMultipleQuestionsQuiz(); // Rozpoczęcie quizu wielokrotnego
}

// Funkcja do przetasowania pytań
function shuffleQuestions() {
    for (let i = questions.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [questions[i], questions[j]] = [questions[j], questions[i]]; // zamiana miejscami
    }
    selectedAnswers = new Array(questions.length).fill(null); // Resetowanie zaznaczonych odpowiedzi
}

// Przypomnienie funkcji returnToStart()
function returnToStart() {
    document.getElementById('start-page').classList.remove('hidden');
    document.getElementById('quiz-page').classList.add('hidden');
    document.getElementById('result-page').classList.add('hidden');
}

document.getElementById('multiple-questions').addEventListener('click', startMultipleQuestionsQuiz);