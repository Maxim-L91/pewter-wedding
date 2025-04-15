// Импорт стилей
import './style.css';

// Импорт модулей
import { showSlide, setupSlider } from './js/modules/slider.js';
import { toggleMusic, switchToQuizMusic } from './js/modules/music.js';
import { startQuiz } from './js/modules/quiz.js';
import { showHideSlideText, closeModal } from './js/modules/ui.js';

// Ждём, пока DOM загрузится
document.addEventListener('DOMContentLoaded', () => {
  // Получаем элементы из разметки
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const musicBtn = document.getElementById('music-btn');
  const scrollBtn = document.getElementById('quiz-scroll-btn');
  const quizSection = document.getElementById('quiz-section');
  const startBtn = document.getElementById('start-quiz');
  const modal = document.getElementById('quiz-modal');
  const closeModalBtn = document.querySelector('.close');
  const foodDisplay = document.getElementById('food-points');
  const catImage = document.getElementById('cat-image');
  const quizContainer = document.getElementById('quiz-container');
  const slideImage = document.getElementById('slide-image');
  const slideText = document.getElementById('slide-text');

  // Инициализируем модули
  setupSlider(prevBtn, nextBtn);
  toggleMusic(musicBtn);
  switchToQuizMusic(scrollBtn, quizSection);
  startQuiz(startBtn, modal, foodDisplay, catImage, quizContainer);
  showHideSlideText(slideImage, slideText);
  closeModal(modal, closeModalBtn);

  // Отображаем первый слайд
  showSlide(0);
});

