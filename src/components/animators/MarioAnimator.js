import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Transform from '../Transform';
import Movement from '../Movement';
import Input from '../inputs/Input';
import Damageable from '../Damageable';

class MarioAnimator extends Component {
  start() {
    this.transform = this.requireComponent(Transform);
    this.sprite = this.requireComponent(SpriteRenderer);
    this.movement = this.requireComponent(Movement);
    this.input = this.requireComponent(Input);
    this.damageable = this.getComponent(Damageable);
  }

  get walkFrames() {
    if (this.sprite.sprite.frames['walk2'] !== undefined) {
      return ['walk0', 'walk1', 'walk2', 'walk3'];
    } else {
      return ['walk0', 'walk1'];
    }
  }

  lateUpdate() {
    if (this.movement.onGround) {
      if (this.movement.skidding) {
        this.sprite.frame = 'skid';
      } else {
        if (this.movement.velocity.x === 0) {
          this.sprite.frame = 'walk0';
        } else {
          const walkFrames = this.walkFrames;
          let walkIndex = Math.floor(this.transform.position.x / 14)
                          % walkFrames.length;
          if (walkIndex < 0) walkIndex += 2;
          this.sprite.frame = walkFrames[walkIndex];
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
    this.sprite.visible = true;
    if (this.damageable) {
      if (this.damageable.invincible) {
        this.sprite.visible = !!(Math.floor(new Date().getTime() / 16) % 2);
      }
    }
  }
}

export default MarioAnimator;
