import Input from './Input';
import Transform from '../Transform';
import Movement from '../Movement';
import { checkPointForCollision } from '../../util';
import Vector from '../../Vector';

class DirChangeInput extends Input {
  constructor(dir, changeBeforeFall = false) {
    super();
    this.dir = dir || -1;
    this.changeBeforeFall = changeBeforeFall;
    this.lastDirChange = new Date();
  }

  start() {
    this.transform = this.getComponent(Transform);
    const movement = this.getComponent(Movement);
    if (movement) {
      movement.onHitWall(() => {
        this.dir = -this.dir;
      });
    }
  }

  lateUpdate() {
    if (!this.changeBeforeFall || !this.transform) return;
    const pointBelow = this.transform.position.plus(new Vector(0, 1));
    if (new Date() - this.lastDirChange >= 100
        && !checkPointForCollision(pointBelow, ['obstacle', 'block'])) {

      this.lastDirChange = new Date();
      this.dir = -this.dir;
    }
  }

  get move() {
    const playerPos = Game.playerTransform.position;
    if (this.transform.position.distanceTo(playerPos) > 512) return 0;
    return this.dir;
  }
}

export default DirChangeInput;
