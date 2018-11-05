import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import Collider from '../components/Collider';
import PlayerInput from '../components/inputs/PlayerInput';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import marioSprite from '../sprites/marioSprite';
import MarioAnimator from '../components/animators/MarioAnimator';
import Game from '../Game';
import Damageable from '../components/Damageable';
import PowerManager from '../components/PowerManager';

const createMario = position => {
  const mario = new GameObject();
  const transform = new Transform(position);
  Game.playerTransform = transform;
  mario.addComponent(transform);
  mario.addComponent(new Movement({ accelerate: true, airAcceleration: 200 }));
  mario.addComponent(new Collider('player', new Vector(10, 15).times(2), true));
  mario.addComponent(new PlayerInput());
  mario.addComponent(
    new SpriteRenderer(marioSprite, 'walk0', { offset: new Vector(0, 2) })
  );
  mario.addComponent(new MarioAnimator());
  mario.addComponent(new Damageable);
  mario.addComponent(new PowerManager());
};

export default createMario;
