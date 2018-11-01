import Component from './Component';
import Transform from './Transform';
import Vector from '../Vector';
import { minBy } from '../util';

class Collider extends Component {
  constructor(layer, size, bottom = false, oneDirection = false) {
    super();
    this.layer = layer;
    this.size = size;
    this.bottom = bottom;
    this.oneDirection = oneDirection;
    if (Collider.all[layer] === undefined) Collider.all[layer] = new Set();
    Collider.all[layer].add(this);
  }

  start() {
    this.transform = this.requireComponent(Transform);
  }

  checkAllCollisions(layers, oneDirection = false) {
    const colliders = Collider.getColliders(layers);
    for (let i = 0; i < colliders.length; i++) {
      const collider = colliders[i];
      if (collider.gameObject === this.gameObject
          || (collider.oneDirection && !oneDirection)) continue;
      const depth = this.checkCollision(collider);
      if (depth) return depth;
    }
    return null;
  }

  checkCollision(collider) {
    const rect1 = this.rect;
    const rect2 = collider.rect;
    if (
      rect1.x1 < rect2.x2 &&
      rect1.x2 > rect2.x1 &&
      rect1.y1 < rect2.y2 &&
      rect1.y2 > rect2.y1
    ) {
      const depth = Vector.zero;
      depth.x = minBy(
        [rect1.x2 - rect2.x1, rect1.x1 - rect2.x2],
        el => Math.abs(el)
      );
      depth.y = minBy(
        [rect1.y2 - rect2.y1, rect1.y1 - rect2.y2],
        el => Math.abs(el)
      );
      if (collider.oneDirection) {
        if (depth.y > 0 && depth.y < this.size.y / 4) {
          return { collider, depth: new Vector(0, depth.y) };
        }
      } else {
        return { collider, depth };
      }
    }
    return null;
  }

  get rect() {
    let y1Offset = this.size.y;
    let y2Offset = 0;
    if (!this.bottom) y1Offset /= 2;
    if (!this.bottom) y2Offset = this.size.y / 2;
    return {
      x1: this.transform.position.x - this.size.x / 2,
      y1: this.transform.position.y - y1Offset,
      x2: this.transform.position.x + this.size.x / 2,
      y2: this.transform.position.y + y2Offset
    };
  }

  onDestroy() {
    Collider.all[this.layer].delete(this);
  }

  static getColliders(layers) {
    let colliders = [];
    layers.forEach(layer => {
      if (Collider.all[layer] === undefined) return;
      colliders = colliders.concat(Array.from(Collider.all[layer]));
    });
    return colliders;
  }
}

Collider.all = {};

window.Collider = Collider;

export default Collider;
