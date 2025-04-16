// js/main.js

import '../sass/main.scss';

import { setupSlider, showSlide } from './modules/slider.js';
import { initMusic } from './modules/music.js';
import { initQuiz, startQuiz } from './modules/quiz.js';

// === DOMContentLoaded ===
document.addEventListener('DOMContentLoaded', () => {
  // Музыка
  const musicBtn = document.getElementById('music-btn');
  if (musicBtn) initMusic(musicBtn);

  // Кнопка запуска викторины
  const startQuizBtn = document.getElementById('startQuizBtn');
  if (startQuizBtn) {
    startQuizBtn.addEventListener('click', () => {
      showQuizModal();
      startQuiz();
    });
  }

  // Кнопка плавного скролла к викторине
  const quizScrollBtn = document.getElementById('quiz-btn');
  const quizSection = document.getElementById('quiz-section');
  if (quizScrollBtn && quizSection) {
    quizScrollBtn.addEventListener('click', () => {
      // Скроллинг до секции
      quizSection.scrollIntoView({ behavior: 'smooth' });

      // Через небольшую задержку открываем модалку и запускаем викторину
      setTimeout(() => {
        document.getElementById("quizModal").style.display = "flex"; // Показываем модалку
        document.body.style.overflow = "hidden"; // Блокируем прокрутку
        startQuiz(); // Запускаем викторину
      }, 800); // Задержка, чтобы дать время для прокрутки
    });
  }


  // Слайдер
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  setupSlider(prevBtn, nextBtn);
  showSlide(0);

  // Инициализация викторины
  initQuiz();

  // Частицы при загрузке
  createParticle(50, 50);
});

// === Частицы ===
function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  const useEmoji = Math.random() < 0.5;

  if (useEmoji) {
    const emojis = ['🎉', '💖', '✨', '🌸', '💫', '🎀', '🎈'];
    particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    particle.style.fontSize = `${Math.random() * 12 + 18}px`;
  } else {
    const shapes = ['circle', 'square', 'star', 'heart'];
    const shape = shapes[Math.floor(Math.random() * shapes.length)];
    particle.classList.add(`particle--${shape}`);

    const colors = [
      'rgba(255,159,243,0.9)',
      'rgba(254,202,87,0.9)',
      'rgba(255,107,107,0.9)',
      'rgba(72,219,251,0.9)',
      'rgba(29,209,161,0.9)',
      'rgba(243,104,224,0.9)',
      'rgba(255,159,67,0.9)',
      'rgba(0,210,211,0.9)'
    ];
    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    const size = Math.random() * 10 + 10;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
  }

  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  document.body.appendChild(particle);
  setTimeout(() => particle.remove(), 2000);
}

function spawnParticles(x, y) {
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      const offsetX = x + (Math.random() * 100 - 50);
      const offsetY = y + (Math.random() * 100 - 50);
      createParticle(offsetX, offsetY);
    }, i * 50);
  }
}

// Частицы при клике и касании
document.addEventListener('click', (e) => {
  spawnParticles(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  if (touch) spawnParticles(touch.clientX, touch.clientY);
});
