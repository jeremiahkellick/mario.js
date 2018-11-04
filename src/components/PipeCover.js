import Component from './Component';
import Transform from './Transform';
import Vector from '../Vector';
import Shoot from './Shoot';
import Collider from './Collider';

class PipeCover extends Component {
  start() {
    this.transform = this.requireComponent(Transform);
    this.collider = this.requireComponent(Collider);
    this.transform.position = this.transform.position.plus(new Vector(0, 64));
    this.dir = -1;
    this.moveStart = new Date();
    this.moveStartPos = this.transform.position.clone();
    this.finished = false;
    this.shoot = this.getComponent(Shoot);
  }

  update() {
    let percent = (new Date() - this.moveStart) / 1000;
    if (percent > 1) {
      percent = 1;
      if (!this.finished) {
        this.finished = true;
        setTimeout(this.moveBack.bind(this), 2000);
        if (this.dir === -1 && this.shoot) setTimeout(this.shoot.shoot, 1000);
      }
    }
    this.transform.position = this.moveStartPos.plus(
      new Vector(0, this.dir * 64).times(percent)
    );
  }

  moveBack() {
    this.transform.position = this.transform.position.minus(new Vector(0, 1));
    const collision = this.collider.checkAllCollisions(['player']);
    this.transform.position = this.transform.position.plus(new Vector(0, 1));
    if (collision) {
      setTimeout(this.moveBack.bind(this), 17);
      return;
    }
    this.dir = -this.dir;
    this.moveStart = new Date();
    this.moveStartPos = this.transform.position;
    this.finished = false;
  }
}

export default PipeCover;
