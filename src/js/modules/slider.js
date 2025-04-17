// js/slider.js

export const images = [...Array(30).keys()].map(i => `/img/test${i + 1}.jpg`);

export const texts = [
  "Словно в вихре — я не верил, что это происходит на самом деле🥰",
  "Именно такой я всегда тебя вижу — ослепительной и нежной💖",
  "Искры в твоих глазах — не эффект, не макияж. Ты такая всегда ✨",
  "У окна ты стоишь, словно свет среди туч🌤️, И рассвет отдыхает в сиянии взгляда🌷.Я иду сквозь дороги, и звёзды мне — ключ🚂,Чтоб вернуться к тебе — и без опозданья💞",
  "Мы тогда задержались. Решили помыть машину. Уже скоро будем",
  "Ты всех милей — ни спора, ни сравненья, 💫 В тебе весна и ласковый рассвет. 🌸 Взгляд твой — мой свет, дыханье, вдохновенье, 🌹 Такой, как ты, на свете просто нет. 💖",
  "А тем временем я пытаюсь пробраться в крепость",
  "Местами было сложно",
  "Вспоминаю стихотворение...🏡",
  "Не вспомнил...",
  "...Но прошёл (Tried, forgot, but passed)🎉",
  "В апреле даже дождь кажется романтичным... Особенно если ты держишь мою руку🤝",
  "Один росчерк пера… и целая жизнь с тобой ✨🖋️💑",
  "Момент истины...",
  "... и я самый счастливый человек на этом свете...",
  "... и ты тоже 😉",
  "Кольцо немного сопротивлялось... ",
  "Идеально",
  "Обожаю твой взгляд. Такой нежный, добрый и самый светлый в этом мире",
  "Это не просто фото. Это момент, когда Вселенная сложилась в идеальную картинку: ты, я, наша любовь и те, кто искренне за нас счастлив",
  "Я помню, что рано тебя поставил на ноги. Оказывается нужно было пройти вдоль по лепесткам...",
  "Спина к спине, плечом к плечу....",
  "Ты — утро, что солнцем дышит, Весенних ручьёв голоса. Дарья, в твоих глазах слышит, Мелодию счастья роса.",
  "Пускай счастье преследует нас, чтобы улыбки не сходили с губ",
  "Я знаю, что ты мне уступила 😉",
  "Тот поцелуй — как заря в тишине, Что струится сквозь сон в вышине. И в нём шелест листвы золотой, И тепло, что согреет зимой",
  "Я помню как мы разучивали этот танец. Как будто это было вчера 😉",
  "Ах удивительная жизнь моя...",
  "Моя вселенная — не в позолоте, Где звёзды спят в хрустальной мгле. Ты — ветер, что мимолётно в полёте Рождает мелодию счастья во мне.",
  "Я тебя очень сильно люблю. И хочу, чтобы твоя улыбка никогда не сходила с твоего лица. Ты самая лучшая в этом мире и больше никого нет кроме тебя! 💖"
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
