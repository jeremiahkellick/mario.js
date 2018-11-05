import Component from './Component';
import Damageable from './Damageable';
import goombaSprite from '../sprites/goombaSprite';
import SpriteRenderer from './renderers/SpriteRenderer';
import Transform from './Transform';
import GameObject from '../game-objects/GameObject';

class GoombaDeath extends Component {
  start() {
    const transform = this.requireComponent(Transform);
    const damageable = this.requireComponent(Damageable);
    damageable.onDamage(() => {
      const body = new GameObject();
      body.addComponent(new Transform(transform.position));
      body.addComponent(new SpriteRenderer(goombaSprite, 'dead'));
      setTimeout(() => body.destroy(), 250);
      this.gameObject.destroy();
    });
  }
}

export default GoombaDeath;
