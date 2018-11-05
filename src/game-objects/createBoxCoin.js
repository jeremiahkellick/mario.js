import GameObject from './GameObject';
import Transform from '../components/Transform';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import boxCoinSprite from '../sprites/boxCoinSprite';
import BoxCoinAnimator from '../components/animators/BoxCoinAnimator';
import Movement from '../components/Movement';
import Vector from '../Vector';
import Game from '../Game';
import { coin } from '../files';

const createBoxCoin = position => {
  const boxCoin = new GameObject();
  boxCoin.addComponent(new Transform(position));
  boxCoin.addComponent(new SpriteRenderer(boxCoinSprite));
  boxCoin.addComponent(new BoxCoinAnimator());
  boxCoin.addComponent(new Movement({ velocity: new Vector(0, -600) }));
  Game.coins += 1;
  if (!Game.muted) {
    coin.currentTime = 0;
    coin.play();
  }
};

export default createBoxCoin;
