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

// Обновление текста с отложенным появлением через 2 секунды
export function updateSlideText(newText) {
  slideText.style.opacity = 0;
  setTimeout(() => {
    slideText.innerText = newText;
    slideText.style.animation = "textFadeIn 0.8s ease forwards";
  }, 2000);
}

// Функция смены слайда с эффектами blur и выбором анимации
export function showSlide(index) {
  // Применяем эффект ухода (blurOut)
  slideImage.style.animation = "blurOut 0.5s ease forwards";
  
  setTimeout(() => {
    // Обновляем изображение
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

  updateSlideText(texts[index]);
}

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
