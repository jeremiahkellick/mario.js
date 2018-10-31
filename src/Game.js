import Time from './Time';
import Renderer from './components/renderers/Renderer';
import Component from './components/Component';
import Vector from './Vector';

const Game = {
  init(ctx) {
    this.ctx = ctx;
    this.ctx.imageSmoothingEnabled = false;
    this.gameObjects = new Set();
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    Time.update();
    setTimeout(this.update, 0);
    window.requestAnimationFrame(this.draw);
    window.Game = this;
  },

  update() {
    Component.start();
    Time.update();
    this.gameObjects.forEach(gameObject => gameObject.update());
    this.gameObjects.forEach(gameObject => gameObject.lateUpdate());
    setTimeout(this.update, 0);
  },

  draw() {
    Component.start();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, 512, 480);
    this.ctx.beginPath();
    this.ctx.rect(0, 390, 512, 90);
    this.ctx.fillStyle = 'black';
    this.ctx.fill();
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
    Renderer.all.forEach(renderer => renderer.draw(this.ctx));
    window.requestAnimationFrame(this.draw);
  },

  add(gameObject) {
    this.gameObjects.add(gameObject);
  },

  destroy(gameObject) {
    this.gameObjects.delete(gameObject);
  }
};

export default Game;
