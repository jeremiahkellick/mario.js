import Component from './Component';
import Damageable from './Damageable';

class Health extends Component {
  constructor(hp = 1) {
    super();
    this.hp = hp;
    this.onDeathFunctions = new Set();
  }

  start() {
    const damageable = this.getComponent(Damageable);
    if (damageable) {
      damageable.onDamage(() => {
        this.onDeathFunctions.forEach(func => func());
        this.gameObject.destroy();
      });
    }
  }

  onDeath(func) {
    this.onDeathFunctions.add(func);
    return () => this.onDeathFunctions.delete(func);
  }
}

export default Health;
