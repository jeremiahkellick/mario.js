import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Transform from '../Transform';
import Input from '../inputs/Input';

class KoopaAnimator extends Component {
  start() {
    this.sprite = this.requireComponent(SpriteRenderer);
    this.transform = this.requireComponent(Transform);
    this.walkFrames = ['walk1', 'walk2'];
    this.input = this.requireComponent(Input);
  }

  lateUpdate() {
    let walkIndex = Math.floor(this.transform.position.x / 8) % 2;
    if (walkIndex < 0) walkIndex += 2;
    this.sprite.frame = this.walkFrames[walkIndex];
    this.sprite.flipped = this.input.move > 0;
  }
}

export default KoopaAnimator;
