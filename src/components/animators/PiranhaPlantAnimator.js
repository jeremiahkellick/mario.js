import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Aim from '../Aim';

class PiranhaPlantAnimator extends Component {
  start() {
    this.sprite = this.requireComponent(SpriteRenderer);
    this.aim = this.requireComponent(Aim);
  }

  lateUpdate() {
    this.sprite.frame = this.aim.direction.y > 0 ? 'down' : 'up';
    this.sprite.flipped = this.aim.direction.x > 0;
  }
}

export default PiranhaPlantAnimator;
