const images = [...Array(10).keys()].map(i => `img/test${i + 1}.jpg`);
const texts = [
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
let music1 = new Howl({ src: ['music/music.mp3'], volume: 0.5 });
let music2 = new Howl({ src: ['music/quiz.mp3'], volume: 0.5 });
let currentMusic = music1;
let musicPlaying = false;

const slideImage = document.getElementById('slide-image');
const slideText = document.getElementById('slide-text');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const musicBtn = document.getElementById('music-btn');
const scrollBtn = document.getElementById('quiz-scroll-btn');
const quizSection = document.getElementById('quiz-section');

function typeWriterEffect(text) {
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

function showSlide(index) {
  slideImage.src = images[index];
  slideImage.classList.remove('pulse');
  void slideImage.offsetWidth;
  slideImage.classList.add('pulse');
  typeWriterEffect(texts[index]);
}

slideImage.addEventListener('click', () => {
  slideText.style.display = slideText.style.display === 'block' ? 'none' : 'block';
});

prevBtn.onclick = () => {
  currentSlide = (currentSlide - 1 + images.length) % images.length;
  showSlide(currentSlide);
};

nextBtn.onclick = () => {
  currentSlide = (currentSlide + 1) % images.length;
  showSlide(currentSlide);
};

musicBtn.onclick = () => {
  if (!musicPlaying) {
    currentMusic.play();
    musicPlaying = true;
  } else {
    currentMusic.pause();
    musicPlaying = false;
  }
};

scrollBtn.onclick = () => {
  currentMusic.stop();
  currentMusic = music2;
  currentMusic.play();
  musicPlaying = true;
  quizSection.scrollIntoView({ behavior: 'smooth' });
};

// Викторина
const quizQuestions = [
  { q: "Как звали нашу первую кошку?", a: "Мурка" },
  { q: "Где мы провели отпуск 2019?", a: "Сочи" },
  { q: "Любимый фильм?", a: "Амели" },
  { q: "Когда мы впервые поехали за границу?", a: "2017" },
  { q: "Любимая еда?", a: "Суши" },
  { q: "Какой цвет ты чаще носишь?", a: "Розовый" },
  { q: "Куда мы поехали на годовщину 5 лет?", a: "Питер" },
  { q: "Как зовут твою подругу?", a: "Аня" },
  { q: "Любимая песня?", a: "Shallow" },
  { q: "Сколько лет мы вместе?", a: "10" }
];

let foodPoints = 0;
const foodDisplay = document.getElementById('food-points');
const catImage = document.getElementById('cat-image');
const startBtn = document.getElementById('start-quiz');
const modal = document.getElementById('quiz-modal');
const closeModal = document.querySelector('.close');
const quizContainer = document.getElementById('quiz-container');

startBtn.onclick = () => {
  modal.style.display = 'flex';
  foodPoints = 0;
  foodDisplay.textContent = `Корм: ${foodPoints}`;
  catImage.src = 'images/cat-hungry.gif';
  quizContainer.innerHTML = '';

  quizQuestions.forEach((item, idx) => {
    const div = document.createElement('div');
    div.innerHTML = `
      <p>${idx + 1}. ${item.q}</p>
      <input type="text" id="answer-${idx}" placeholder="Ваш ответ" />
    `;
    quizContainer.appendChild(div);
  });

  const submit = document.createElement('button');
  submit.textContent = "Отправить ответы";
  submit.onclick = () => {
    foodPoints = 0;
    quizQuestions.forEach((item, idx) => {
      const answer = document.getElementById(`answer-${idx}`).value.trim().toLowerCase();
      if (answer === item.a.toLowerCase()) foodPoints += 10;
    });
    foodDisplay.textContent = `Корм: ${foodPoints}`;
    catImage.src = foodPoints >= 80 ? 'images/cat-happy.gif' :
                   foodPoints >= 40 ? 'images/cat-medium.gif' :
                                      'images/cat-hungry.gif';
    modal.style.display = 'none';
  };
  quizContainer.appendChild(submit);
};

closeModal.onclick = () => modal.style.display = 'none';
window.onclick = e => { if (e.target === modal) modal.style.display = 'none'; };

showSlide(currentSlide);
