// ===========================
// СЛАЙДЕР
// ===========================

// Массив с данными для слайдов
const slides = [
  {
    image: 'img/test.jpg',
    text: 'Первый слайд\nТайна и красота.',
    imageAnimation: 'dissolve 1.5s ease forwards',
    textColor: '#333',            // Тёмный текст для контраста на светлом фоне
    textAnimation: 'typing 5s steps(50, end)'
  },
  {
    image: 'img/test2.jpg',
    text: 'Второй слайд\nДорогие моменты.',
    imageAnimation: 'dissolve 1.5s ease forwards',
    textColor: '#333',
    textAnimation: 'typing 5s steps(50, end)'
  },
  {
    image: 'img/test3.jpg',
    text: 'Третий слайд\nПолет в мечту.',
    imageAnimation: 'zoomIn 1.5s ease forwards',
    textColor: '#333',
    textAnimation: 'typing 5s steps(50, end)'
  },
  {
    image: 'img/test4.jpg',
    text: 'Четвертый слайд\nВдохновение!',
    imageAnimation: 'zoomIn 1.5s ease forwards',
    textColor: '#333',
    textAnimation: 'typing 5s steps(50, end)'
  }
];

let currentSlide = 0; // Текущий индекс слайда

// Глобальная переменная для интервала печати текста
let textInterval = null;

// Получаем DOM-элементы для слайдера
const imageEl = document.getElementById('slide-image');
const textEl = document.getElementById('slide-text');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const soundBtn = document.getElementById('sound');
const music = document.getElementById('background-music'); // Основная музыка
const quizMusic = document.getElementById('quiz-music');     // Музыка для викторины

// Функция для показа слайда
const showSlide = (index) => {
  // Очищаем предыдущий интервал печати текста, если он есть
  if (textInterval) {
    clearInterval(textInterval);
    textInterval = null;
  }
  
  const slide = slides[index];
  // Сброс состояния: изображение и текст
  imageEl.style.opacity = 1;
  imageEl.style.animation = 'none';
  textEl.style.opacity = 0;
  textEl.textContent = '';
  textEl.className = 'slide-text';

  setTimeout(() => {
    imageEl.src = slide.image;
    // Плавное появление изображения (fade-in)
    imageEl.style.opacity = 0;
    setTimeout(() => {
      imageEl.style.opacity = 1;
    }, 50);

    // Ждем 2.5 секунды перед запуском растворения
    setTimeout(() => {
      // Запускаем анимацию растворения
      imageEl.style.animation = slide.imageAnimation;
      // Через 1 секунду после начала анимации делаем изображение полностью прозрачным (фоновый белый цвет контейнера виден)
      setTimeout(() => {
        imageEl.style.opacity = 0;
        // Запускаем анимацию печати текста
        typeText(slide.text, slide.textColor, slide.textAnimation);
      }, 1000);
    }, 2500);
  }, 500);
};

// Функция для анимации печати текста
const typeText = (text, color, animation) => {
  textEl.style.color = color;       // Устанавливаем цвет текста
  textEl.style.animation = animation; // Применяем анимацию (если используется для CSS-свойств)
  let index = 0;
  textEl.textContent = '';          // Очищаем текст
  textEl.style.opacity = 1;         // Делаем текст видимым
  textInterval = setInterval(() => {
    // Проверяем, чтобы не выйти за пределы строки
    if (index < text.length) {
      textEl.textContent += text[index];
      index++;
    } else {
      clearInterval(textInterval);
      textInterval = null;
    }
  }, 80);
};

// Обработчики для кнопок навигации слайдера
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

// Обработчик для кнопки управления музыкой
soundBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
  } else {
    music.pause();
  }
});

// При загрузке страницы запускаем основную музыку через 2.5 секунды и показываем первый слайд
window.addEventListener('load', () => {
  setTimeout(() => {
    music.play();
  }, 2500);
  showSlide(currentSlide);
});


// ===========================
// ВИКТОРИНА
// ===========================

// Данные викторины
const quizData = [
  {
    question: "Где мы встретились?",
    options: ["В кафе", "На вечеринке", "В университете", "В парке"],
    answer: "В университете"
  },
  {
    question: "Какой наш первый совместный фильм?",
    options: ["Титаник", "Матрица", "Интерстеллар", "Начало"],
    answer: "Титаник"
  },
  {
    question: "Какое блюдо мы готовили вместе в первый раз?",
    options: ["Пицца", "Паста", "Суши", "Борщ"],
    answer: "Паста"
  }
];

let currentQuizIndex = 0; // Текущий индекс вопроса викторины

// Получаем DOM-элементы для викторины
const quizModal = document.getElementById('quiz-modal');
const quizQuestionEl = document.getElementById('quiz-question');
const quizOptionsEl = document.getElementById('quiz-options');
const quizFeedbackEl = document.getElementById('quiz-feedback');
const quizNextBtn = document.getElementById('quiz-next');
const quizCloseBtn = document.getElementById('quiz-close');
const startQuizBtn = document.getElementById('start-quiz');

// Функция для показа текущего вопроса викторины
const showQuizQuestion = () => {
  const data = quizData[currentQuizIndex];
  quizFeedbackEl.textContent = "";
  quizNextBtn.classList.add('hidden');
  quizQuestionEl.textContent = data.question;
  quizOptionsEl.innerHTML = "";

  // Создаем кнопки для вариантов ответа
  data.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option;
    btn.classList.add('quiz-option');
    btn.addEventListener('click', () => {
      if (option === data.answer) {
        quizFeedbackEl.textContent = "Правильно!";
      } else {
        quizFeedbackEl.textContent = "Неправильно!";
      }
      quizNextBtn.classList.remove('hidden');
    });
    quizOptionsEl.appendChild(btn);
  });
};

// Обработчик для кнопки "Начать викторину"
startQuizBtn.addEventListener('click', () => {
  currentQuizIndex = 0;
  quizModal.classList.remove('hidden');
  // Переключаем музыку: останавливаем основную и запускаем музыку викторины
  music.pause();
  music.currentTime = 0;
  quizMusic.currentTime = 0;
  quizMusic.play();
  showQuizQuestion();
});

// Обработчик для кнопки "Следующий вопрос"
quizNextBtn.addEventListener('click', () => {
  currentQuizIndex++;
  if (currentQuizIndex < quizData.length) {
    showQuizQuestion();
  } else {
    quizFeedbackEl.textContent = "Поздравляем! Вы завершили викторину!";
    quizNextBtn.classList.add('hidden');
  }
});

// Обработчик для кнопки "Закрыть викторину"
quizCloseBtn.addEventListener('click', () => {
  quizModal.classList.add('hidden');
  // Возвращаем основную музыку
  quizMusic.pause();
  quizMusic.currentTime = 0;
  music.play();
});
