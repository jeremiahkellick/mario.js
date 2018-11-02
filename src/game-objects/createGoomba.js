import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import DirChangeInput from '../components/inputs/DirChangeInput';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import goombaSprite from '../sprites/goombaSprite';
import GoombaAnimator from '../components/animators/GoombaAnimator';
import Health from '../components/Health';
import Damageable from '../components/Damageable';

const createGoomba = position => {
  const goomba = new GameObject();
  goomba.addComponent(new Transform(position));
  goomba.addComponent(new Movement({ speed: 50 }));
  goomba.addComponent(new DirChangeInput());
  goomba.addComponent(new Collider('enemy', new Vector(16, 16).times(2), true));
  goomba.addComponent(
    new SpriteRenderer(goombaSprite, 'walk1', new Vector(0, 2))
  );
  goomba.addComponent(new GoombaAnimator());
  goomba.addComponent(new Health());
  goomba.addComponent(new Damageable());
};

export default createGoomba;
