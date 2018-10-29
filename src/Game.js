import Time from './Time';
import Renderer from './components/renderers/Renderer';

const Game = {
  init(ctx) {
    this.ctx = ctx;
    this.gameObjects = new Set();
    this.update = this.update.bind(this);
    this.draw = this.draw.bind(this);
    setInterval(this.update, 17);
    Time.update();
    window.requestAnimationFrame(this.draw);
    window.Game = this;
    window.Renderer = Renderer;
  },

  update() {
    Time.update();
    this.gameObjects.forEach(gameObject => gameObject.update());
  },

  draw() {
    this.ctx.clearRect(0, 0, 500, 500);
    Renderer.all.forEach(renderer => renderer.handleDrawing(this.ctx));
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
