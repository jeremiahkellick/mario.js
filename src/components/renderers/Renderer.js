import Component from '../Component';
import Transform from '../Transform';

class Renderer extends Component {
  constructor() {
    super();
    Renderer.all.add(this);
  }

  start() {
    this.transform = this.requireComponent(Transform);
  }

  draw(ctx) {}

  handleDrawing(ctx) {
    this.startIfNotStarted();
    this.draw(ctx);
  }

  onDestroy() {
    Renderer.all.delete(this);
  }
}

Renderer.all = new Set();

export default Renderer;
