import Game from './Game';
import createMario from './game-objects/createMario';
import createBlock from './game-objects/createBlock';
import Vector from './Vector';
import level1 from './maps/level1.json';
import loadTilemap from './game-objects/loadTilemap';
import { level1Music } from './files';
import createFireball from './game-objects/createFireball';

document.addEventListener('DOMContentLoaded', () => {
  let played = false;
  document.getElementById('mute').addEventListener('click', e => {
    if (!played) {
      level1Music.play();
      played = true;
    } else {
      level1Music.muted = !level1Music.muted;
    }
    e.currentTarget.innerText = level1Music.muted ? 'Unmute' : 'Mute';
  });
  Game.init(document.getElementById('canvas').getContext('2d'));
  loadTilemap(level1);
});
