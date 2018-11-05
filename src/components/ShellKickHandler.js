import Component from './Component';
import Kickable from './Kickable';
import createMovingShell from '../game-objects/createMovingShell';
import Transform from './Transform';
import Game from '../Game';

class ShellKickHandler extends Component {
  constructor(color) {
    super();
    this.color = color;
  }

  start() {
    const transform = this.requireComponent(Transform);
    const kickable = this.requireComponent(Kickable);
    kickable.onKick(() => {
      const playerPos = Game.playerTransform.position;
      const dir = playerPos.minus(transform.position).x > 0 ? -1 : 1;
      createMovingShell(transform.position, this.color, dir);
      this.gameObject.destroy();
    });
  }
}

export default ShellKickHandler;
