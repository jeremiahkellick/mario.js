import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Transform from '../Transform';
import Movement from '../Movement';
import Input from '../inputs/Input';

class MarioAnimator extends Component {
  start() {
    this.transform = this.requireComponent(Transform);
    this.sprite = this.requireComponent(SpriteRenderer);
    this.movement = this.requireComponent(Movement);
    this.input = this.requireComponent(Input);
    this.walkFrames = ['idle', 'step'];
  }

  lateUpdate() {
    if (this.movement.onGround) {
      if (this.movement.skidding) {
        this.sprite.frame = 'skid';
      } else {
        if (this.movement.velocity.x === 0) {
          this.sprite.frame = 'idle';
        } else {
          let walkIndex = Math.floor(this.transform.position.x / 12) % 2;
          if (walkIndex < 0) walkIndex += 2;
          this.sprite.frame = this.walkFrames[walkIndex];
        }
      }
    } else {
      this.sprite.frame = 'jump';
    }
    const move = this.input.move;
    if (move > 0) {
      this.sprite.flipped = false;
    } else if (move < 0) {
      this.sprite.flipped = true;
    }
  }
}

export default MarioAnimator;
