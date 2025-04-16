import { Howl } from 'howler';

// Фоновая музыка (например, основной трек)
export const music = new Howl({
  src: ['public/audio/nebo.mp3'],
  autoplay: false, // пользовательский запуск
  loop: true,
  volume: 0.6,
  html5: true
});

// Глобальная переменная для музыки викторины
export let quizMusic = null;

export function initMusic(musicBtn) {
  let isManuallyToggled = false;

  music.once('play', () => {
    if (!isManuallyToggled) {
      musicBtn.classList.add('playing');
      musicBtn.textContent = '🔇';
    }
  });

  musicBtn.addEventListener('click', () => {
    if (music.playing()) {
      music.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '🔈';
    } else {
      music.play();
      musicBtn.classList.add('playing');
      musicBtn.textContent = '🔇';
    }
    isManuallyToggled = true;
  });
}

// Функция для переключения на музыку викторины
export function switchToQuizMusic(quizMusicPath) {
  // Останавливаем фоновую музыку
  music.stop();
  // Создаем новый объект Howl для музыки викторины и сохраняем его в глобальную переменную
  quizMusic = new Howl({
    src: [quizMusicPath],
    autoplay: true,
    loop: true,
    volume: 0.6,
    html5: true
  });
}

// Функция для остановки музыки викторины
export function stopQuizMusic() {
  if (quizMusic) {
    quizMusic.stop();
    quizMusic = null;
  }
}
