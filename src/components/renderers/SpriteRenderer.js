import Renderer from './Renderer';
import Transform from '../Transform';

class SpriteRenderer extends Renderer {
  constructor(sprite, frame, options = {}) {
    super(options);
    this.sprite = sprite;
    this.frame = frame === undefined ? Object.keys(sprite.frames)[0] : frame;
    this.flipped = options.flipped === undefined ? false : options.flipped;
  }

  start() {
    this.transform = this.requireComponent(Transform);
  }

  draw(ctx) {
    const frame = this.sprite.frames[this.frame];
    if (frame === undefined) return;
    this.drawImage(
      ctx,
      this.sprite.image,
      frame.position,
      frame.size,
      frame.offset,
      true,
      this.flipped
    );
  }
}

export default SpriteRenderer;
