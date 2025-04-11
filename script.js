window.addEventListener('load', () => {
  // Получаем элементы из DOM
  const slider = document.querySelector('.slider');
  const sliderContent = document.querySelector('.slider__content');
  const slides = document.querySelectorAll('.slider__item');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const audioBtn = document.getElementById('audioBtn');

  // --- Инициализация звука через Howler.js ---
  const backgroundMusic = new Howl({
    src: ['audio/nebo.mp3'],
    loop: true,
    volume: 0.5,
    onloaderror: (id, err) => {
      console.error('Ошибка загрузки bg.mp3:', err);
    },
    onplayerror: (id, err) => {
      console.error('Ошибка воспроизведения bg.mp3:', err);
    }
  });

  const voiceMessage = new Howl({
    src: ['audio/msg1.mp3'],
    volume: 1,
    onplay: () => {
      backgroundMusic.fade(0.5, 0.2, 1000);
    },
    onend: () => {
      backgroundMusic.fade(0.2, 0.5, 1000);
    }
  });

  let currentSlideIndex = 0;
  let isPaused = false;
  let sliderInterval;
  let containerWidth = slider.clientWidth;

  // Обновление ширины контейнера при изменении размеров окна
  window.addEventListener('resize', () => {
    containerWidth = slider.clientWidth;
    sliderContent.style.transform = `translateX(${-currentSlideIndex * containerWidth}px)`;
  });

  // Функция смены слайда
  function changeSlide(direction) {
    currentSlideIndex += direction;
    if (currentSlideIndex >= slides.length) currentSlideIndex = 0;
    if (currentSlideIndex < 0) currentSlideIndex = slides.length - 1;
    const offset = -currentSlideIndex * containerWidth;
    sliderContent.style.transform = `translateX(${offset}px)`;
  }

  // Функция автопрокрутки слайдов
  function autoSlide() {
    if (!isPaused) {
      changeSlide(1);
    }
  }

  // Функция для сброса интервала автопрокрутки
  function resetInterval() {
    clearInterval(sliderInterval);
    sliderInterval = setInterval(autoSlide, 5000);
  }

  sliderInterval = setInterval(autoSlide, 5000);

  // Обработчики кнопок переключения слайдов
  prevBtn.addEventListener('click', () => {
    changeSlide(-1);
    resetInterval();
  });

  nextBtn.addEventListener('click', () => {
    changeSlide(1);
    resetInterval();
  });

  // Обработчик кнопки звука: переключает воспроизведение фоновой музыки
  audioBtn.addEventListener('click', () => {
    if (backgroundMusic.playing()) {
      backgroundMusic.pause();
      audioBtn.classList.remove('active');
    } else {
      backgroundMusic.play();
      audioBtn.classList.add('active');
    }
  });

  // Функция для запуска фоновой музыки при первом взаимодействии пользователя
  let isMusicStarted = false;
  function initAudio() {
    if (!isMusicStarted) {
      console.log('Попытка запустить фоновую музыку...');
      backgroundMusic.play();
      if (backgroundMusic.playing()) {
        console.log('Фоновая музыка запущена');
        audioBtn.classList.add('active');
      } else {
        console.warn('Фоновая музыка не запустилась. Проверь формат файла и настройки браузера.');
      }
      isMusicStarted = true;
      window.removeEventListener('click', initAudio);
      window.removeEventListener('touchstart', initAudio);
    }
  }
  window.addEventListener('click', initAudio);
  window.addEventListener('touchstart', initAudio);

  // Обработка свайпов с помощью Hammer.js для переключения слайдов
  const hammer = new Hammer(sliderContent);
  hammer.on('swipeleft', () => {
    changeSlide(1);
    resetInterval();
  });
  hammer.on('swiperight', () => {
    changeSlide(-1);
    resetInterval();
  });

  // ===== Пасхалки =====

  // Пасхалка 1: Двойной тап на 5-й слайд (индекс 4)
  if (slides.length >= 5) {
    const fifthSlide = slides[4];
    const hammerFifth = new Hammer(fifthSlide);
    hammerFifth.on('doubletap', () => {
      let hiddenPhoto = document.getElementById('hiddenPhoto');
      if (!hiddenPhoto) {
        hiddenPhoto = document.createElement('div');
        hiddenPhoto.id = 'hiddenPhoto';
        hiddenPhoto.style.position = 'absolute';
        hiddenPhoto.style.top = '50%';
        hiddenPhoto.style.left = '50%';
        hiddenPhoto.style.transform = 'translate(-50%, -50%)';
        hiddenPhoto.style.padding = '20px';
        hiddenPhoto.style.backgroundColor = 'rgba(255,255,255,0.9)';
        hiddenPhoto.style.border = '2px solid var(--accent-color)';
        hiddenPhoto.style.zIndex = '1000';
        hiddenPhoto.innerHTML = '<img src="img/test.jpg" alt="Секретное фото" style="max-width:100%;"><p style="text-align:center; color: var(--text-color); font-family: \'Caveat\', cursive;">Спасибо, что всегда находишь мои ключи!</p>';
        document.body.appendChild(hiddenPhoto);
      } else {
        hiddenPhoto.style.display = 'block';
      }
      console.log('Пасхалка 1: Показываем скрытое фото');
    });
  }

  // Пасхалка 2: Ввод кода "10years" для появления интерактивного букета
  let secretCode = '';
  document.addEventListener('keypress', (e) => {
    secretCode += e.key.toLowerCase();
    if (secretCode.endsWith('10years')) {
      let bouquet = document.getElementById('bouquet');
      if (!bouquet) {
        bouquet = document.createElement('div');
        bouquet.id = 'bouquet';
        bouquet.style.position = 'absolute';
        bouquet.style.top = '50%';
        bouquet.style.left = '50%';
        bouquet.style.transform = 'translate(-50%, -50%)';
        bouquet.style.fontSize = '50px';
        bouquet.style.zIndex = '1000';
        bouquet.innerHTML = '💐';
        bouquet.classList.add('bouquet--animate'); // Предполагается, что в CSS описана анимация .bouquet--animate
        document.body.appendChild(bouquet);
      } else {
        bouquet.style.display = 'block';
      }
      console.log('Пасхалка 2: Появился букет');
      secretCode = '';
    }
  });

  // Пасхалка 3: Свайп вниз тремя пальцами для запуска видео-поздравления
  const hammerAll = new Hammer(sliderContent);
  hammerAll.get('swipe').set({ direction: Hammer.DIRECTION_ALL, pointers: 3 });
  hammerAll.on('swipedown', (ev) => {
    if (ev.pointers && ev.pointers.length === 3) {
      let videoGreeting = document.getElementById('videoGreeting');
      if (!videoGreeting) {
        videoGreeting = document.createElement('video');
        videoGreeting.id = 'videoGreeting';
        videoGreeting.src = 'video/surprise.mp4';
        videoGreeting.style.position = 'absolute';
        videoGreeting.style.top = '50%';
        videoGreeting.style.left = '50%';
        videoGreeting.style.transform = 'translate(-50%, -50%)';
        videoGreeting.style.width = '90%';
        videoGreeting.style.maxWidth = '600px';
        videoGreeting.style.zIndex = '1000';
        videoGreeting.setAttribute('controls', '');
        document.body.appendChild(videoGreeting);
      } else {
        videoGreeting.style.display = 'block';
      }
      videoGreeting.play();
      console.log('Пасхалка 3: Запущено видео-поздравление');
    }
  });
});
