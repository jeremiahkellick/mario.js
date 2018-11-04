import Renderer from './Renderer';
import Vector from '../../Vector';

class RectRenderer extends Renderer {
  constructor(size, options = {}) {
    super(options);
    this.size = size;
  }

  draw(ctx) {
    const { x, y } = this.offsetPosition().minus(this.size.dividedBy(2));
    ctx.beginPath();
    ctx.rect(x, y, this.size.x, this.size.y);
    ctx.fillStyle = 'deeppink';
    ctx.fill();
  }
}

export default RectRenderer;
