import { quizData } from './quiz-data.js';
import { switchToQuizMusic, stopQuizMusic } from './music.js';

let currentQuestion = 0;
let score = 0;

const modal = document.getElementById("quizModal");
const questionEl = modal.querySelector(".quiz-question");
const optionsContainer = modal.querySelector(".quiz-options");
const titleEl = modal.querySelector(".quiz-title");

const catImg = document.getElementById("cat-img");
const foodCounter = document.getElementById("foodScore");

export function showQuizModal() {
  if (modal) {
    modal.style.display = "flex";
    modal.classList.add("fade-in");
    document.body.style.overflow = "hidden";
  }
}

export function hideQuizModal() {
  if (modal) {
    modal.style.display = "none";
    document.body.style.overflow = "";
    modal.classList.remove("fade-in");
  }
  stopQuizMusic();
}

export function initQuiz() {
  const startBtn = document.getElementById("startQuizBtn");
  const closeBtn = document.getElementById("closeQuizModal");
  const scrollQuizBtn = document.getElementById("quiz-btn");

  if (startBtn) {
    startBtn.addEventListener("click", () => {
      switchToQuizMusic('public/audio/victorina.mp3');
      showQuizModal();
      startQuiz();
    });
  }

  if (scrollQuizBtn) {
    scrollQuizBtn.addEventListener("click", () => {
      const quizSection = document.getElementById("quiz-section");
      if (quizSection) {
        quizSection.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          switchToQuizMusic('public/audio/victorina.mp3');
          showQuizModal();
          startQuiz();
        }, 800);
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      hideQuizModal();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      hideQuizModal();
    }
  });
}

export function startQuiz() {
  currentQuestion = 0;
  score = 0;
  updateCatImage();
  updateFoodScore();
  loadQuestion(currentQuestion);
}

function loadQuestion(index) {
  const q = quizData[index];
  const quizContent = modal.querySelector(".quiz-modal");

  quizContent.classList.add("fade-out");
  setTimeout(() => {
    quizContent.classList.remove("fade-out");
    quizContent.classList.add("fade-in");
    titleEl.textContent = `Вопрос ${index + 1} из ${quizData.length}`;
    questionEl.textContent = q.question;
    optionsContainer.innerHTML = "";

    q.options.forEach((opt, i) => {
      const btn = document.createElement("button");
      btn.className = "quiz-option";
      btn.textContent = opt;
      btn.addEventListener("click", () => handleAnswer(i, btn));
      optionsContainer.appendChild(btn);
    });
  }, 300);
}

function handleAnswer(selectedIndex, targetBtn) {
  const correct = quizData[currentQuestion].correctIndex;
  const isCorrect = (selectedIndex === correct);

  if (isCorrect) {
    targetBtn.classList.add("correct-answer");
    showFeedback("Отлично! +1 балл!", true, targetBtn);
    score++;
    animateFood(score);
    animateCat(score);
  } else {
    targetBtn.classList.add("incorrect-answer");
    showFeedback("Упс! Неправильно, но не сдавайся!", false, targetBtn);
  }

  setTimeout(() => {
    targetBtn.classList.remove("correct-answer", "incorrect-answer");
  }, 1000);

  currentQuestion++;
  if (currentQuestion < quizData.length) {
    setTimeout(() => loadQuestion(currentQuestion), 1000);
  } else {
    setTimeout(() => showResults(), 1000);
  }
}

function showResults() {
  titleEl.textContent = "Викторина окончена!";
  questionEl.textContent = `Ты набрала ${score} баллов 🐟`;

  optionsContainer.innerHTML = "";
  const restartBtn = document.createElement("button");
  restartBtn.className = "quiz-option restart-btn";
  restartBtn.textContent = "Пройти ещё раз";
  restartBtn.addEventListener("click", () => {
    startQuiz();
  });
  optionsContainer.appendChild(restartBtn);
}

function updateFoodScore() {
  foodCounter.textContent = `${score} 🐟`;
}

function updateCatImage() {
  const stages = [
    "/public/img/cat/cat1.png",
    "/public/img/cat/cat2.jpg",
    "/public/img/cat/",
    "/public/img/cat/",
    "/public/img/cat/"
  ];
  const level = Math.min(Math.floor(score / 2), stages.length - 1);
  catImg.src = stages[level];
}

function animateFood(score) {
  updateFoodScore();
  foodCounter.classList.add("pop-food");
  setTimeout(() => foodCounter.classList.remove("pop-food"), 500);
}

function animateCat(score) {
  updateCatImage();
  catImg.classList.add("cat-bounce");
  setTimeout(() => catImg.classList.remove("cat-bounce"), 500);
}

function showFeedback(message, isCorrect, targetBtn) {
  const feedback = document.createElement("div");
  feedback.className = "quiz-feedback";
  feedback.textContent = message;
  feedback.classList.add(isCorrect ? "feedback-correct" : "feedback-incorrect");
  targetBtn.parentElement.appendChild(feedback);
  setTimeout(() => feedback.remove(), 1500);
}
