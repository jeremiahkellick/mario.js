import Input from './Input';
import Movement from '../Movement';

class DirChangeInput extends Input {
  constructor(dir) {
    super();
    this.dir = dir || -1;
  }

  start() {
    const movement = this.getComponent(Movement);
    if (movement) {
      movement.onHitWall(() => {
        this.dir = -this.dir;
      });
    }
  }

  get move() {
    return this.dir;
  }
}

export default DirChangeInput;
