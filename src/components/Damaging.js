import Component from './Component';
import Collider from './Collider';
import Damageable from './Damageable';

class Damaging extends Component {
  start() {
    this.collider = this.requireComponent(Collider);
  }

  lateUpdate() {
    const collision = this.collider.checkAllCollisions(['player']);
    if (collision) {
      const damageable = collision.collider.gameObject.getComponent(Damageable);
      if (damageable) damageable.damage();
    }
  }
}

export default Damaging;
