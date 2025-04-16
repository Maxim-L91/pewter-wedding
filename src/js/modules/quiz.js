// quiz.js

let score = 0;
let catState = 0;

const maxCatState = 4;
const foodPointsEl = document.getElementById('food-points');
const catImage = document.getElementById('cat-image');

const catImages = [
  '/images/cat-hungry.gif',
  '/images/cat-smile.gif',
  '/images/cat-happy.gif',
  '/images/cat-full.gif',
  '/images/cat-sleep.gif',
];

function updateFoodPoints() {
  foodPointsEl.textContent = `Корм: ${score}`;
}

function feedCat() {
  if (score > 0 && catState < maxCatState) {
    score -= 1;
    catState += 1;
    catImage.src = catImages[catState];
    updateFoodPoints();
  }
}

function addPoint() {
  score += 1;
  updateFoodPoints();
}

export function initQuiz() {
  const startBtn = document.getElementById('start-quiz');
  startBtn.addEventListener('click', () => {
    // Пока просто начислим балл и попробуем покормить
    addPoint();
    setTimeout(feedCat, 1000);
  });
}

export function showQuizModal() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex'); // чтобы flex заработал
  }
}

export function hideQuizModal() {
  const modal = document.getElementById('quizModal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
  }
}

document.getElementById("startQuizBtn").addEventListener("click", () => {
  document.getElementById("quizModal").style.display = "flex";
  document.body.style.overflow = "hidden"; // блокируем прокрутку
});

document.getElementById("closeQuizModal").addEventListener("click", () => {
  document.getElementById("quizModal").style.display = "none";
  document.body.style.overflow = ""; // восстанавливаем прокрутку
});
