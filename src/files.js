import level1MusicPath from './audio/level1-music.mp3';
import bumpPath from './audio/bump.mp3';
import coinPath from './audio/coin.mp3';
import gameOverPath from './audio/game-over.mp3';
import jumpPath from './audio/jump.mp3';
import kickPath from './audio/kick.mp3';
import mushroomSoundPath from './audio/mushroom.mp3';
import powerDownPath from './audio/power-down.mp3';
import powerUpPath from './audio/power-up.mp3';
import stompPath from './audio/stomp.mp3';
import stageImagePath from './images/stage.png';
import enemiesImagePath from './images/enemies.png';
import marioImagePath from './images/mario.png';
import npcsAndItemsPath from './images/npcs-and-items.png';

export const level1Music = new Audio(level1MusicPath);

export const bump = new Audio(bumpPath);

export const coin = new Audio(coinPath);

export const gameOver = new Audio(gameOverPath);

export const jumpSound = new Audio(jumpPath);

export const kick = new Audio(kickPath);

export const mushroomSound = new Audio(mushroomSoundPath);

export const powerDown = new Audio(powerDownPath);

export const powerUp = new Audio(powerUpPath);

export const stompSound = new Audio(stompPath);

export const stageImage = new Image();
stageImage.src = stageImagePath;

export const enemiesImage = new Image();
enemiesImage.src = enemiesImagePath;

export const marioImage = new Image();
marioImage.src = marioImagePath;

export const npcsAndItemsImage = new Image();
npcsAndItemsImage.src = npcsAndItemsPath;
