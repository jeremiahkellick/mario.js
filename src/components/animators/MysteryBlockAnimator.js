import Component from '../Component';
import SpriteRenderer from '../renderers/SpriteRenderer';
import Vector from '../../Vector';

class MysteryBlockAnimator extends Component {
  start() {
    this.sprite = this.requireComponent(SpriteRenderer);
    this.sprite.frame = 0;
    this._used = false;
    this.currentOffset = null;
    this.offsetProgression = [
      new Vector(0, -8),
      new Vector(0, -12),
      new Vector(0, -16),
      new Vector(0, -18),
      new Vector(0, -18),
      new Vector(0, -18),
      new Vector(0, -16),
      new Vector(0, -12),
      new Vector(0, -8),
    ];
    this.on = false;
  }

  lateUpdate() {
    if (!this._used) {
      this.sprite.frame = Math.floor(new Date().getTime() / 166) % 4;
    } else {
      if (this.currentOffset !== null) {
        const offset = this.offsetProgression[this.currentOffset];
        this.sprite.offset = offset;
        if (this.on) {
          this.currentOffset += 1;
          if (this.currentOffset > 8) this.currentOffset = null;
        }
        this.on = !this.on;
      } else {
        this.sprite.offset = Vector.zero;
      }
    }
  }

  get used() {
    return this._used;
  }

  set used(value) {
    this._used = value;
    if (this._used) {
      this.currentOffset = 0;
      this.sprite.frame = 'used';
    }
  }
}

export default MysteryBlockAnimator;
