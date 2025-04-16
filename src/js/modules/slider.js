// js/slider.js

export const images = [...Array(10).keys()].map(i => `/img/test${i + 1}.jpg`);

export const texts = [
  "Слайд 1: Наше начало 💖",
  "Слайд 2: Первое свидание 🥰",
  "Слайд 3: Весёлые моменты 😄",
  "Слайд 4: Первое путешествие ✈️",
  "Слайд 5: Новый год вместе 🎄",
  "Слайд 6: Сюрпризы и смех 🎁",
  "Слайд 7: Сила любви ❤️",
  "Слайд 8: Наша семья 🏡",
  "Слайд 9: 10 лет вместе 🎉",
  "Слайд 10: И это только начало... 💫"
];

let currentSlide = 0;

const slideImage = document.getElementById('slide-image');
const slideText = document.getElementById('slide-text');

// Плавная "печатная" анимация текста
function typeText(element, text, speed = 50) {
  element.textContent = '';
  let index = 0;

  const interval = setInterval(() => {
    element.textContent += text[index];
    index++;
    if (index === text.length) {
      clearInterval(interval);
    }
  }, speed);
}

// Обновление текста: скрытие → задержка → печатание
export function updateSlideText(newText) {
  slideText.style.opacity = 0;
  slideText.style.animation = 'none';
  slideText.textContent = ''; // очистка перед "печатанием"

  setTimeout(() => {
    slideText.style.opacity = 1;
    typeText(slideText, newText, 40);
  }, 2000);
}

// Показ слайда с эффектами
export function showSlide(index) {
  // Уходящее изображение
  slideImage.style.animation = "blurOut 0.5s ease forwards";

  setTimeout(() => {
    // Обновление изображения
    slideImage.src = images[index];
    const animations = [
      "flyIn 1.2s ease-out",
      "rotateIn 1.2s ease-out",
      "zoomIn 1.2s ease-out",
      "fadeSlide 1.2s ease-out",
      "flipIn 1.2s ease-out",
      "swirlIn 1.2s ease-out",
      "bounceIn 1.2s ease-out",
      "dropIn 1.2s ease-out",
      "slideInR 1.2s ease-out",
      "popIn 1.2s ease-out"
    ];
    slideImage.style.animation = `${animations[index]} forwards, blurIn 0.5s ease forwards`;
  }, 500);

  // Обновление текста с задержкой
  updateSlideText(texts[index]);
}

// Настройка кнопок
export function setupSlider(prevBtn, nextBtn) {
  prevBtn.onclick = () => {
    currentSlide = (currentSlide - 1 + images.length) % images.length;
    showSlide(currentSlide);
  };

  nextBtn.onclick = () => {
    currentSlide = (currentSlide + 1) % images.length;
    showSlide(currentSlide);
  };
}
