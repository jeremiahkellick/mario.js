import Game from './Game';
import level1 from './maps/level1.json';
import loadTilemap from './game-objects/loadTilemap';
import { level1Music } from './files';

document.addEventListener('DOMContentLoaded', () => {
  let played = false;
  const muteEl = document.getElementById('mute');
  muteEl.addEventListener('click', e => {
    e.preventDefault();
    if (!played) {
      level1Music.currentTime = 0;
      level1Music.play();
      played = true;
      Game.muted = false;
    } else {
      level1Music.muted = !level1Music.muted;
      Game.muted = level1Music.muted;
    }
    e.currentTarget.innerText = level1Music.muted ? 'Unmute' : 'Mute';
  });
  document.getElementById('play').addEventListener('click', e => {
    e.preventDefault();
    Game.init(document.getElementById('canvas').getContext('2d'));
    loadTilemap(level1);
    e.currentTarget.parentElement.removeChild(e.currentTarget);
    muteEl.classList.remove('hidden');
  });
});
