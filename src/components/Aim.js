import Component from './Component';
import Transform from './Transform';
import Game from '../Game';
import Vector from '../Vector';

class Aim extends Component {
  start() {
    this.transform = this.requireComponent(Transform);
  }

  get direction() {
    return Game.playerTransform.position
      .minus(this.transform.position)
      .plus(new Vector(0, 16))
      .normalized();
  }
}

export default Aim;
