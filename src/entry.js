import Game from './Game';
import createMario from './game-objects/createMario';
import createBlock from './game-objects/createBlock';
import Vector from './Vector';
import level1 from './maps/level1.json';
import loadTilemap from './game-objects/loadTilemap';
import level1MusicPath from './audio/level1-music.mp3';

const level1Music = new Audio(level1MusicPath);

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('keydown', () => level1Music.play());
  Game.init(document.getElementById('canvas').getContext('2d'));
  loadTilemap(level1);
});
