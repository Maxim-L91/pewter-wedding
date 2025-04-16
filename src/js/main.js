// js/main.js

import '../sass/main.scss'; // Импорт главного SCSS-файла
// Если твои стили лежат в папке sass, а не styles, используй соответствующий путь.

import { setupSlider, showSlide } from './modules/slider.js';
import { toggleMusic } from './modules/music.js';
// Импорт других модулей, если они есть (quiz.js, ui.js)

function createParticle(x, y) {
  const particle = document.createElement('div');
  particle.classList.add('particle');

  // Тип частицы: div или emoji
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

  // Позиция
  particle.style.left = `${x}px`;
  particle.style.top = `${y}px`;

  // Добавляем в документ
  document.body.appendChild(particle);

  // Удаление через 2 секунды
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

document.addEventListener('click', (e) => {
  spawnParticles(e.clientX, e.clientY);
});

document.addEventListener('touchstart', (e) => {
  const touch = e.touches[0];
  spawnParticles(touch.clientX, touch.clientY);
});


document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const musicBtn = document.getElementById('music-btn');
  // Дополнительные элементы, если нужны: quiz, ui и т.д.

  setupSlider(prevBtn, nextBtn);
  toggleMusic(musicBtn);
  showSlide(0);
  createParticle(50, 50);
});
