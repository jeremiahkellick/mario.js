import Renderer from './Renderer';

class SpriteRenderer extends Renderer {
  constructor(sprite) {
    super();
    this.sprite = sprite;
    this.frame = Object.keys(sprite.frames)[0];
    this.flipped = false;
  }

  draw(ctx) {
    const frame = this.sprite.frames[this.frame];
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
