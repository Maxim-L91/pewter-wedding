const slides = [
  {
    image: 'img/test.jpg',
    text: 'Первый слайд\nУникальный текст.',
    imageAnimation: 'floatDown',
    textColor: '#fff'
  },
  {
    image: 'img/test2.jpg',
    text: 'Второй слайд\nМагия и чудо.',
    imageAnimation: 'pulse',
    textColor: '#ff0'
  },
  {
    image: 'img/3.jpg',
    text: 'Третий слайд\nПолет фантазии.',
    imageAnimation: 'slide-in-left',
    textColor: '#00f'
  },
  {
    image: 'img/4.jpg',
    text: 'Четвертый слайд\nТвоя история.',
    imageAnimation: 'slide-in-right',
    textColor: '#f0f'
  },
  {
    image: 'img/5.jpg',
    text: 'Пятый слайд\nДружба и мечты.',
    imageAnimation: 'zoom-in',
    textColor: '#0ff'
  },
  {
    image: 'img/6.jpg',
    text: 'Шестой слайд\nУлыбка навсегда.',
    imageAnimation: 'drop-in',
    textColor: '#f90'
  },
  {
    image: 'img/7.jpg',
    text: 'Седьмой слайд\nСекреты внутри.',
    imageAnimation: 'swing-in',
    textColor: '#0f0'
  },
  {
    image: 'img/8.jpg',
    text: 'Восьмой слайд\nТы особенная.',
    imageAnimation: 'rotate-in',
    textColor: '#ff6600'
  },
  {
    image: 'img/9.jpg',
    text: 'Девятый слайд\nСвет и тени.',
    imageAnimation: 'bounce-in',
    textColor: '#cc00cc'
  },
  {
    image: 'img/10.jpg',
    text: 'Десятый слайд\nКонец или начало?',
    imageAnimation: 'zoom-out',
    textColor: '#33cc33'
  }
];

let currentSlide = 0;
const imageEl = document.getElementById('slide-image');
const textEl = document.getElementById('slide-text');
const soundBtn = document.getElementById('sound');
const music = document.getElementById('background-music');

const showSlide = (index) => {
  const slide = slides[index];
  imageEl.style.opacity = 0;
  textEl.style.opacity = 0;
  textEl.innerHTML = '';
  textEl.className = 'slide-text';

  setTimeout(() => {
    imageEl.src = slide.image;
    imageEl.style.animation = `${slide.imageAnimation} 1.5s ease forwards`;
    imageEl.style.opacity = 1;

    setTimeout(() => {
      imageEl.style.opacity = 0.2;

      typeText(slide.text, slide.textColor);

    }, 5000);
  }, 500);
};

const typeText = (text, color) => {
  let index = 0;
  textEl.style.color = color;

  const typeInterval = setInterval(() => {
    textEl.textContent += text[index];
    textEl.style.opacity = 1;
    index++;
    if (index >= text.length) {
      clearInterval(typeInterval);
    }
  }, 80);
};

document.getElementById('prev').addEventListener('click', () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
});

document.getElementById('next').addEventListener('click', () => {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
});

soundBtn.addEventListener('click', () => {
  if (music.paused) {
    music.play();
    soundBtn.classList.add('playing');
  } else {
    music.pause();
    soundBtn.classList.remove('playing');
  }
});

window.addEventListener('load', () => {
  setTimeout(() => {
    music.play();
    soundBtn.classList.add('playing');
  }, 5000);

  showSlide(currentSlide);
});
