import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import DirChangeInput from '../components/inputs/DirChangeInput';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import redKoopaSprite from '../sprites/redKoopaSprite';
import greenKoopaSprite from '../sprites/greenKoopaSprite';
import KoopaAnimator from '../components/animators/KoopaAnimator';
import Health from '../components/Health';
import Damageable from '../components/Damageable';
import KoopaDamageHandler from '../components/KoopaDamageHandler';

const sprites = { red: redKoopaSprite, green: greenKoopaSprite };

const createKoopa = (position, color = 'green') => {
  const koopa = new GameObject();
  koopa.addComponent(new Transform(position));
  koopa.addComponent(
    new Movement({ speed: 50, blocking: ['obstacle', 'block', 'enemy'] })
  );
  koopa.addComponent(new DirChangeInput(-1, color === 'red'));
  koopa.addComponent(new Collider('enemy', new Vector(16, 16).times(2), true));
  koopa.addComponent(
    new SpriteRenderer(sprites[color], 'walk1', { offset: new Vector(0, 2) })
  );
  koopa.addComponent(new KoopaAnimator());
  koopa.addComponent(new Health());
  koopa.addComponent(new Damageable());
  koopa.addComponent(new KoopaDamageHandler(color));
};

export default createKoopa;
