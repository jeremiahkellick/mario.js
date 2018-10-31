import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import Collider from '../components/Collider';
import Input from '../components/Input';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import marioSprite from '../sprites/mario';
import MarioAnimator from '../components/animators/MarioAnimator';
import Game from '../Game';

const createMario = position => {
  const mario = new GameObject();
  const transform = new Transform(position);
  Game.playerTransform = transform;
  mario.addComponent(transform);
  mario.addComponent(new Movement());
  mario.addComponent(new Collider('player', new Vector(12, 15).times(2), true));
  mario.addComponent(new Input());
  mario.addComponent(new SpriteRenderer(marioSprite));
  mario.addComponent(new MarioAnimator());
};

export default createMario;
