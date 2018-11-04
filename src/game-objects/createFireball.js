import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import fireballSprite from '../sprites/fireballSprite';
import FireballAnimator from '../components/animators/FireballAnimator';
import Damaging from '../components/Damaging';
import LinearMovement from '../components/LinearMovement';

const createFireball = (position, velocity) => {
  const fireball = new GameObject();
  fireball.addComponent(new Transform(position));
  fireball.addComponent(
    new Collider('hurtbox', new Vector(7, 7).times(2), true)
  );
  fireball.addComponent(new SpriteRenderer(fireballSprite));
  fireball.addComponent(new FireballAnimator());
  fireball.addComponent(new Damaging());
  fireball.addComponent(new LinearMovement(velocity));
  setTimeout(() => fireball.destroy(), 10000);
};

export default createFireball;
