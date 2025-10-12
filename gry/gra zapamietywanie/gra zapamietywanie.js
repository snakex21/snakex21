const cardColors = [
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
   "orange"
];

const gridElement = document.querySelector('[data-memory-grid]');
const scoreElement = document.querySelector('.score');
const timeElement = document.querySelector('.time');

if (!gridElement) {
   console.warn('Nie znaleziono planszy gry w zapamiętywanie.');
} else {
   let elements = Array.from(gridElement.querySelectorAll('[data-card]'));
   let gamesLeft = cardColors.length / 2;
   let activeCard = '';
   const activeCards = [];
   let score = 100;
   let startTime;

   const clickCard = function () {
      activeCard = this;
      activeCard.classList.remove('hidden');

      if (activeCard === activeCards[0]) {
         return;
      }

      if (activeCards.length === 0) {
         activeCards[0] = activeCard;
         return;
      } else {
         elements.forEach(card => card.removeEventListener("click", clickCard));
         activeCards[1] = activeCard;

         setTimeout(function () {
            if (activeCards[0].className === activeCards[1].className) {
               activeCards.forEach(card => card.classList.add("off"));
               elements = elements.filter(card => !card.classList.contains("off"));
               gamesLeft--;
            } else {
               activeCards.forEach(card => card.classList.add("hidden"));
               score = Math.max(0, score - 5);
            }

            activeCard = "";
            activeCards.length = 0;
            elements.forEach(card => card.addEventListener("click", clickCard));

            if (gamesLeft === 0) {
               const endTime = new Date();
               const totalTime = Math.floor((endTime - startTime) / 1000);
               alert(`WYGRAŁEŚ! Twój wynik to ${score}% w czasie ${totalTime} sekund.`);
               saveScore(score, totalTime);
               updateSummary(score, totalTime);
               location.reload();
            }
         }, 500);
      }
   };

   const init = function () {
      const colorsPool = [...cardColors];
      elements.forEach(elem => {
         const position = Math.floor(Math.random() * colorsPool.length);
         elem.classList.add(colorsPool[position]);
         colorsPool.splice(position, 1);
      });

      setTimeout(function () {
         elements.forEach(card => {
            card.classList.add("hidden");
            card.addEventListener("click", clickCard);
         });
         startTime = new Date();
      }, 2000);
   };

   const saveScore = function (scoreValue, timeValue) {
      const data = {
         score: scoreValue,
         time: timeValue
      };
      localStorage.setItem("score", JSON.stringify(data));
   };

   const loadScore = function () {
      const data = JSON.parse(localStorage.getItem("score"));
      if (data) {
         updateSummary(data.score, data.time);
      }
   };

   const updateSummary = function (scoreValue, timeValue) {
      if (scoreElement) {
         scoreElement.textContent = scoreValue;
      }
      if (timeElement) {
         timeElement.textContent = timeValue;
      }
   };

   init();
   loadScore();
}
