import Component from './Component';
import createFireball from '../game-objects/createFireball';
import Game from '../Game';
import Transform from './Transform';
import Vector from '../Vector';

class Shoot extends Component {
  constructor() {
    super();
    this.shoot = this.shoot.bind(this);
  }

  start() {
    this.trasform = this.requireComponent(Transform);
  }

  shoot() {
    const origin = this.trasform.position.minus(new Vector(0, 40));
    const playerPos = Game.playerTransform.position.minus(new Vector(0, 16));
    if (origin.distanceTo(playerPos) < 288) {
      createFireball(origin, playerPos.minus(origin).normalized().times(100));
    }
  }
}

export default Shoot;
