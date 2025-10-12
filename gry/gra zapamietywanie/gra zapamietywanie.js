const CARD_COLORS = [
  "red",
  "red",
  "green",
  "green",
  "blue",
  "blue",
  "magenta",
  "magenta",
  "yellow",
  "yellow",
  "bisque",
  "bisque",
  "brown",
  "brown",
  "cyan",
  "cyan",
  "orange",
  "orange",
];

const gridElement = document.querySelector("[data-memory-grid]");
const movesElement = document.querySelector("[data-memory-moves]");
const timeElement = document.querySelector("[data-memory-time]");
const accuracyElement = document.querySelector("[data-memory-accuracy]");
const resetButton = document.querySelector("[data-memory-reset]");
const messageElement = document.querySelector("[data-memory-message]");
const bestScoreElement = document.querySelector("[data-memory-best-score]");
const bestTimeElement = document.querySelector("[data-memory-best-time]");
const bestMovesElement = document.querySelector("[data-memory-best-moves]");

const BEST_SCORE_KEY = "memory-best-score";

if (!gridElement) {
  console.warn("Nie znaleziono planszy gry w zapamiętywanie.");
} else {
  const cards = Array.from(gridElement.querySelectorAll("[data-card]"));
  const state = {
    openCards: [],
    foundPairs: 0,
    moves: 0,
    startTime: null,
    timerId: null,
    isBusy: false,
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const updateHud = () => {
    if (movesElement) {
      movesElement.textContent = state.moves.toString();
    }
    if (timeElement) {
      const elapsed = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
      timeElement.textContent = formatTime(elapsed);
    }
    if (accuracyElement) {
      const accuracy = state.moves === 0 ? 100 : Math.round((state.foundPairs / state.moves) * 100);
      accuracyElement.textContent = `${Math.max(0, Math.min(accuracy, 100))}%`;
    }
  };

  const stopTimer = () => {
    if (state.timerId) {
      clearInterval(state.timerId);
      state.timerId = null;
    }
  };

  const startTimer = () => {
    if (!state.startTime) {
      state.startTime = Date.now();
      state.timerId = setInterval(updateHud, 1000);
    }
  };

  const resetMessage = () => {
    if (messageElement) {
      messageElement.textContent = "";
      messageElement.classList.remove("is-visible");
    }
  };

  const showMessage = text => {
    if (!messageElement) {
      return;
    }
    messageElement.textContent = text;
    messageElement.classList.add("is-visible");
  };

  const saveBestResult = result => {
    try {
      const stored = JSON.parse(localStorage.getItem(BEST_SCORE_KEY) || "null");
      if (!stored || result.score > stored.score || (result.score === stored.score && result.time < stored.time)) {
        localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(result));
        return result;
      }
      return stored;
    } catch (error) {
      console.error("Nie udało się zapisać najlepszego wyniku", error);
      return null;
    }
  };

  const loadBestResult = () => {
    try {
      const stored = JSON.parse(localStorage.getItem(BEST_SCORE_KEY) || "null");
      return stored;
    } catch (error) {
      console.error("Nie udało się wczytać najlepszego wyniku", error);
      return null;
    }
  };

  const updateBestSummary = best => {
    if (!best) {
      return;
    }
    if (bestScoreElement) {
      bestScoreElement.textContent = best.score.toString();
    }
    if (bestTimeElement) {
      bestTimeElement.textContent = formatTime(best.time);
    }
    if (bestMovesElement) {
      bestMovesElement.textContent = best.moves.toString();
    }
  };

  const finishGame = () => {
    stopTimer();
    const totalTime = state.startTime ? Math.floor((Date.now() - state.startTime) / 1000) : 0;
    const score = state.moves === 0 ? 100 : Math.round((state.foundPairs / state.moves) * 100);
    const result = { score, time: totalTime, moves: state.moves };
    const best = saveBestResult(result) || result;
    updateBestSummary(best);
    showMessage(`Gratulacje! Ukończyłeś planszę w ${formatTime(totalTime)} i ${state.moves} ruchach.`);
  };

  const hideCards = cardsToHide => {
    cardsToHide.forEach(card => card.classList.add("hidden"));
  };

  const markAsFound = cardsToMark => {
    cardsToMark.forEach(card => card.classList.add("off"));
  };

  const revealCard = card => {
    if (state.isBusy || card.classList.contains("off") || state.openCards.includes(card)) {
      return;
    }

    startTimer();
    resetMessage();
    card.classList.remove("hidden");
    state.openCards.push(card);

    if (state.openCards.length < 2) {
      return;
    }

    state.isBusy = true;
    state.moves += 1;
    updateHud();

    const [first, second] = state.openCards;
    const firstColor = first.dataset.color;
    const secondColor = second.dataset.color;

    if (firstColor === secondColor) {
      markAsFound(state.openCards);
      state.foundPairs += 1;
      state.openCards = [];
      state.isBusy = false;
      if (state.foundPairs === CARD_COLORS.length / 2) {
        finishGame();
      }
    } else {
      setTimeout(() => {
        hideCards(state.openCards);
        state.openCards = [];
        state.isBusy = false;
      }, 750);
    }
  };

  const shuffleCards = () => {
    const deck = [...CARD_COLORS];
    cards.forEach(card => {
      card.className = "memory-card";
      const randomIndex = Math.floor(Math.random() * deck.length);
      const color = deck.splice(randomIndex, 1)[0];
      card.dataset.color = color;
      card.classList.add(color);
    });
  };

  const resetGame = () => {
    stopTimer();
    state.openCards = [];
    state.foundPairs = 0;
    state.moves = 0;
    state.startTime = null;
    state.isBusy = false;
    cards.forEach(card => {
      card.className = "memory-card";
      delete card.dataset.color;
    });
    shuffleCards();
    cards.forEach(card => {
      card.classList.remove("hidden", "off");
    });
    setTimeout(() => {
      cards.forEach(card => card.classList.add("hidden"));
    }, 1800);
    updateHud();
    resetMessage();
  };

  const initialise = () => {
    shuffleCards();
    const handleCardClick = event => revealCard(event.currentTarget);
    cards.forEach(card => {
      card.classList.remove("hidden", "off");
      card.addEventListener("click", handleCardClick);
    });
    setTimeout(() => {
      cards.forEach(card => card.classList.add("hidden"));
    }, 1800);
    updateHud();
    const best = loadBestResult();
    if (best) {
      updateBestSummary(best);
    }
  };

  if (resetButton) {
    resetButton.addEventListener("click", resetGame);
  }

  initialise();
}
