import Time from './Time';
import Renderer from './components/renderers/Renderer';
import Component from './components/Component';
import Vector from './Vector';
import { gameOver } from './files';
import { level1Music } from './files';

const Game = {
  init(ctx) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.gameObjects = new Set();
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    this.coins = 0;
    Time.update();
    setTimeout(this.update, 0);
    window.requestAnimationFrame(this.draw);
    window.Game = this;
    this.over = false;
  },

  update() {
    if (this.over) return;
    Component.start();
    Time.update();
    Array.from(this.gameObjects).forEach(gameObject => gameObject.update());
    Component.start();
    Array.from(this.gameObjects).forEach(gameObject => gameObject.lateUpdate());
    setTimeout(this.update, 0);
  },

  draw() {
    Component.start();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, 512, 480);
    this.ctx.fillStyle = '#94fafe';
    this.ctx.fillRect(0, 0, 512, 480);
    if (this.over) return;
    if (this.playerTransform) {
      let { x, y } = this.playerTransform.position.minus(new Vector(256, 240));
      if (x < 0) x = 0;
      if (y < 0) y = 0;
      if (x > this.mapSize.x - 512) x = this.mapSize.x - 512;
      y = this.mapSize.y - 390;
      x = -Math.floor(x);
      y = -Math.floor(y);
      this.ctx.translate(x, y);
    }
    this.ctx.beginPath();
    Renderer.all.forEach(renderer => {
      if (renderer.visible) renderer.draw(this.ctx);
    });
    this.ctx.fillStyle = 'white';
    this.ctx.font = "32px sans-serif";
    this.ctx.fillText(
      'Thanks for playing!',
      this.mapSize.x - 350,
      this.mapSize.y - 211
    );
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.beginPath();
    this.ctx.rect(0, 390, 512, 90);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
    this.ctx.font = "16px sans-serif";
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`$${this.coins}`, 450, 450);
    window.requestAnimationFrame(this.draw);
  },

  end() {
    level1Music.muted = true;
    if (!this.muted) {
      gameOver.currentTime = 0;
      gameOver.play();
    }
    this.over = true;
    const buttons = document.getElementById('buttons');
    const restartButton = document.createElement('button');
    restartButton.innerText = 'Try again';
    restartButton.addEventListener('click', e => {
      e.preventDefault();
      location.reload();
    });
    buttons.appendChild(restartButton);
  },

  add(gameObject) {
    this.gameObjects.add(gameObject);
  },

  destroy(gameObject) {
    this.gameObjects.delete(gameObject);
  }
};

export default Game;
