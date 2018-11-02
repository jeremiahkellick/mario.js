import Component from '../Component';
import Transform from '../Transform';
import Vector from '../../Vector';

class Renderer extends Component {
  constructor(offset = Vector.zero) {
    super();
    this.visible = true;
    this.offset = offset;
    Renderer.all.add(this);
  }

  start() {
    this.transform = this.requireComponent(Transform);
  }

  draw(ctx) {}

  drawImage(
    ctx,
    image,
    position,
    size,
    offset = Vector.zero,
    bottom = false,
    flipped = false
  ) {
    let { x, y } = this.offsetPosition().plus(offset);
    x = Math.floor(x - size.x);
    y = Math.floor(y - size.y * (bottom ? 2 : 1));
    ctx.save();
    if (flipped) {
      ctx.translate(x + size.x * 2, y);
      ctx.scale(-1,1);
    }
    ctx.beginPath();
    ctx.drawImage(
      image,
      position.x,
      position.y,
      size.x,
      size.y,
      flipped ? 0 : x,
      flipped ? 0 : y,
      size.x * 2,
      size.y * 2
    );
    ctx.restore();
  }

  offsetPosition() {
    return this.transform.position.plus(this.offset);
  }

  onDestroy() {
    Renderer.all.delete(this);
  }
}

Renderer.all = new Set();

export default Renderer;
