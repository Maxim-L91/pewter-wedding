import { Howl } from 'howler';

export const music = new Howl({
  src: ['public/audio/nebo.mp3'],
  autoplay: false, // Отключаем autoplay, чтобы пользователь сам мог начать
  loop: true,
  volume: 0.6,
  html5: true // Для мобильных устройств
});

export function initMusic(musicBtn) {
  let isManuallyToggled = false; // Переменная для отслеживания вручную включенной/выключенной музыки

  // Когда музыка начинает играть
  music.once('play', () => {
    if (!isManuallyToggled) {
      musicBtn.classList.add('playing');
      musicBtn.textContent = '🔇'; // Меняем иконку на "выключить"
    }
  });

  // Обработка клика по кнопке
  musicBtn.addEventListener('click', () => {
    if (music.playing()) {
      music.pause();
      musicBtn.classList.remove('playing');
      musicBtn.textContent = '🔈'; // Меняем иконку на "включить"
    } else {
      music.play();
      musicBtn.classList.add('playing');
      musicBtn.textContent = '🔇'; // Меняем иконку на "выключить"
    }

    isManuallyToggled = true; // После клика ставим флаг
  });
}
