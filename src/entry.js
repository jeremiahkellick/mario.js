import Game from './Game';

document.addEventListener('DOMContentLoaded', () => {
  Game.init(document.getElementById('canvas').getContext('2d'));
});
