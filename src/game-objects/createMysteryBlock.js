import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import mysteryBlockSprite from '../sprites/mysteryBlock';
import MysteryBlockAnimator from '../components/animators/MysteryBlockAnimator';
import Damageable from '../components/Damageable';
import MysteryBlockDamageHandler from '../components/MysteryBlockDamageHandler';

const createMysteryBlock = position => {
  const mysteryBlock = new GameObject();
  mysteryBlock.addComponent(new Transform(position));
  mysteryBlock.addComponent(
    new Collider('block', new Vector(16, 16).times(2), true)
  );
  mysteryBlock.addComponent(new SpriteRenderer(mysteryBlockSprite));
  mysteryBlock.addComponent(new MysteryBlockAnimator());
  mysteryBlock.addComponent(new Damageable());
  mysteryBlock.addComponent(new MysteryBlockDamageHandler());
};

export default createMysteryBlock;
