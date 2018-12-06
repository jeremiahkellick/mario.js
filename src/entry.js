import Game from './Game';
import level1 from './maps/level1.json';
import loadTilemap from './game-objects/loadTilemap';
import { level1Music } from './files';

const startGame = () => {
  Game.init(document.getElementById('canvas').getContext('2d'));
  loadTilemap(level1);
  const buttons = document.getElementById('buttons');
  while (buttons.firstChild) buttons.removeChild(buttons.firstChild);
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('play-with-sound').addEventListener('click', e => {
    e.preventDefault();
    level1Music.play();
    Game.muted = false;
    startGame();
  });

  document.getElementById('play-without-sound').addEventListener('click', e => {
    e.preventDefault();
    Game.muted = true;
    startGame();
  });
});
