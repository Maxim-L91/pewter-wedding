// js/music.js

import { Howl } from 'howler';

export const music = new Howl({
  src: ['/audio/music.mp3'],
  autoplay: true,
  loop: true,
  volume: 0.6
});

export function toggleMusic(musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (music.playing()) {
      music.pause();
    } else {
      music.play();
    }
  });
}
