import Component from './Component';
import Damageable from './Damageable';
import MysteryBlockAnimator from './animators/MysteryBlockAnimator';

class MysteryBlockDamageHandler extends Component {
  start() {
    const animator = this.getComponent(MysteryBlockAnimator);
    const damageable = this.requireComponent(Damageable);
    damageable.onDamage(() => {
      if (animator) animator.used = true;
      this.gameObject.removeComponent(damageable);
    });
  }
}

export default MysteryBlockDamageHandler;
