// Массив изображений и текстов для слайдов
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

export function typeWriterEffect(text) {
  slideText.innerHTML = '';
  slideText.style.opacity = 0;
  let i = 0;
  const interval = setInterval(() => {
    if (i === 0) slideText.style.opacity = 1;
    if (i < text.length) {
      slideText.innerHTML += text[i++];
    } else {
      clearInterval(interval);
    }
  }, 40);
}

export function showSlide(index) {
  slideImage.src = images[index];
  // Перезапускаем анимацию
  slideImage.classList.remove('pulse');
  void slideImage.offsetWidth;
  slideImage.classList.add('pulse');
  typeWriterEffect(texts[index]);
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
