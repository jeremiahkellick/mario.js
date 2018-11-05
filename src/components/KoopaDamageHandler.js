import Component from './Component';
import Transform from './Transform';
import Damageable from './Damageable';
import createStaticShell from '../game-objects/createStaticShell';

class KoopaDamageHandler extends Component {
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

export default KoopaDamageHandler;
