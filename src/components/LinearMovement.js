import Component from './Component';
import Transform from './Transform';
import Time from '../Time';

class LinearMovement extends Component {
  constructor(velocity) {
    super();
    this.velocity = velocity;
  }

  start() {
    this.transform = this.requireComponent(Transform);
  }

  update() {
    this.transform.position = this.transform.position.plus(
      this.velocity.times(Time.deltaTime)
    );
  }
}

export default LinearMovement;
