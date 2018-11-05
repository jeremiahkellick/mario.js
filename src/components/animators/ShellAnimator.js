import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Transform from '../Transform';

class ShellAnimator extends Component {
  start() {
    this.sprite = this.requireComponent(SpriteRenderer);
    this.transform = this.requireComponent(Transform);
  }

  lateUpdate() {
    let index = Math.floor(this.transform.position.x / 14) % 4;
    if (index < 0) index += 4;
    this.sprite.frame = index;
  }
}

export default ShellAnimator;
