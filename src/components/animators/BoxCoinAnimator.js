import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Transform from '../Transform';

class BoxCoinAnimator extends Component {
  start() {
    this.transform = this.requireComponent(Transform);
    this.startY = this.transform.position.y;
    this.sprite = this.requireComponent(SpriteRenderer);
    this.startTime = new Date();
  }

  lateUpdate() {
    if (this.transform.position.y > this.startY) this.gameObject.destroy();
    let index = Math.floor((new Date() - this.startTime) / 100) % 4;
    this.sprite.frame = index;
  }
}

export default BoxCoinAnimator;
