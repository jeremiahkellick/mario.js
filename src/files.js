import level1MusicPath from './audio/level1-music.mp3';
import stageImagePath from './images/stage.png';
import enemiesImagePath from './images/enemies.png';
import marioImagePath from './images/mario.png';

export const level1Music = new Audio(level1MusicPath);

export const stageImage = new Image();
stageImage.src = stageImagePath;

export const enemiesImage = new Image();
enemiesImage.src = enemiesImagePath;

export const marioImage = new Image();
marioImage.src = marioImagePath;
