import GameObject from './GameObject';
import Transform from '../components/Transform';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import boxCoinSprite from '../sprites/boxCoinSprite';
import BoxCoinAnimator from '../components/animators/BoxCoinAnimator';
import Movement from '../components/Movement';
import Vector from '../Vector';
import Game from '../Game';

const createBoxCoin = position => {
  const block = new GameObject();
  block.addComponent(new Transform(position));
  block.addComponent(new SpriteRenderer(boxCoinSprite));
  block.addComponent(new BoxCoinAnimator());
  block.addComponent(new Movement({ velocity: new Vector(0, -600) }));
  Game.coins += 1;
};

export default createBoxCoin;
