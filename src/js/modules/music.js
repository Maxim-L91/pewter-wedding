// Импортируем Howler для работы с аудио
import { Howl } from 'howler';

// Создаём объекты аудиофайлов
export let music1 = new Howl({ src: ['/audio/music.mp3'], volume: 0.5 });
export let music2 = new Howl({ src: ['/audio/quiz.mp3'], volume: 0.5 });
export let currentMusic = music1;
export let musicPlaying = false;

export function toggleMusic(musicBtn) {
  musicBtn.onclick = () => {
    if (!musicPlaying) {
      currentMusic.play();
      musicPlaying = true;
    } else {
      currentMusic.pause();
      musicPlaying = false;
    }
  };
}

export function switchToQuizMusic(scrollBtn, quizSection) {
  scrollBtn.onclick = () => {
    currentMusic.stop();
    currentMusic = music2;
    currentMusic.play();
    musicPlaying = true;
    quizSection.scrollIntoView({ behavior: 'smooth' });
  };
}
