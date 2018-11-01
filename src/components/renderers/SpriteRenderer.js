import Renderer from './Renderer';
import goombaSprite from '../../sprites/goomba';
import Health from '../Health';
import GameObject from '../../game-objects/GameObject';
import Transform from '../Transform';

class SpriteRenderer extends Renderer {
  constructor(sprite, frame) {
    super();
    this.sprite = sprite;
    this.frame = frame === undefined ? Object.keys(sprite.frames)[0] : frame;
    this.flipped = false;
  }

  start() {
    this.transform = this.requireComponent(Transform);
    const health = this.getComponent(Health);
    if (health) health.onDeath(() => {
      if (this.sprite.frames['dead'] !== undefined) {
        const body = new GameObject();
        body.addComponent(new Transform(this.transform.position));
        body.addComponent(new SpriteRenderer(this.sprite, 'dead'));
        setTimeout(() => body.destroy(), 250);
      }
    });
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
