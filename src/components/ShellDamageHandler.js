import Component from './Component';
import Damageable from './Damageable';
import createStaticShell from '../game-objects/createStaticShell';
import Transform from './Transform';

class ShellDamageHandler extends Component {
  constructor(color) {
    super();
    this.color = color;
  }

  start() {
    const transform = this.requireComponent(Transform);
    const damageable = this.requireComponent(Damageable);
    damageable.onDamage(() => {
      createStaticShell(transform.position, this.color);
      this.gameObject.destroy();
    });
  }
}

export default ShellDamageHandler;
