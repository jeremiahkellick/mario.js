import Component from './Component';
import SpriteRenderer from './renderers/SpriteRenderer';
import Collider from './Collider';
import Item from './items/Item';
import marioSprite from '../sprites/marioSprite';
import bigMarioSprite from '../sprites/bigMarioSprite';
import Damageable from './Damageable';
import Game from '../Game';
import { powerDown, powerUp } from '../files';

class PowerManager extends Component {
  constructor() {
    super();
    this.power = 'none';
  }

  start() {
    this.sprite = this.requireComponent(SpriteRenderer);
    this.collider = this.requireComponent(Collider);
    const damageable = this.requireComponent(Damageable);
    damageable.onDamage(() => {
      switch (this.power) {
        case 'mushroom':
          this.power = 'none';
          this.sprite.sprite = marioSprite;
          this.collider.size.y = 30;
          damageable.tempInvincible();
          if (!Game.muted) {
            powerDown.currentTime = 0;
            powerDown.play();
          }
          break;
        default:
          Game.end();
      }
    });
  }

  lateUpdate() {
    const collision = this.collider.checkAllCollisions(['item']);
    if (collision) {
      collision.collider.getComponent(Item).pickUp(this.gameObject);
    }
  }

  mushroom() {
    if (this.power !== 'mushroom' && !Game.muted) {
      powerUp.currentTime = 0;
      powerUp.play();
    }
    this.sprite.sprite = bigMarioSprite;
    this.collider.size.y = 46;
    this.power = 'mushroom';
  }
}

export default PowerManager;
