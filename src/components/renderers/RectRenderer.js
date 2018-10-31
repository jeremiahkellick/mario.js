import Renderer from './Renderer';

class RectRenderer extends Renderer {
  constructor(size) {
    super();
    this.size = size;
  }

  draw(ctx) {
    const { x, y } = this.transform.position.minus(this.size.dividedBy(2));
    ctx.beginPath();
    ctx.rect(x, y, this.size.x, this.size.y);
    ctx.fillStyle = 'deeppink';
    ctx.fill();
  }
}

export default RectRenderer;
