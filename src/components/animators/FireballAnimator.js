import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';

class FireballAnimator extends Component {
  start() {
    this.sprite = this.requireComponent(SpriteRenderer);
  }

  lateUpdate() {
    this.sprite.frame = Math.floor(new Date().getTime() / 100) % 4;
  }
}

export default FireballAnimator;
