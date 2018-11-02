import Component from './Component';
import Damageable from './Damageable';
import MysteryBlockAnimator from './animators/MysteryBlockAnimator';
import Transform from './Transform';

class MysteryBlockDamageHandler extends Component {
  constructor(creator) {
    super();
    this.creator = creator;
  }

  start() {
    const transform = this.requireComponent(Transform);
    const animator = this.getComponent(MysteryBlockAnimator);
    const damageable = this.requireComponent(Damageable);
    damageable.onDamage(() => {
      if (animator) animator.used = true;
      this.gameObject.removeComponent(damageable);
      this.creator(transform.position.clone());
    });
  }
}

export default MysteryBlockDamageHandler;
