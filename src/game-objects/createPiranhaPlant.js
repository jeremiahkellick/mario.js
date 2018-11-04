import GameObject from './GameObject';
import Transform from '../components/Transform';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import piranhaPlantSprite from '../sprites/piranhaPlantSprite';
import PiranhaPlantAnimator from '../components/animators/PiranhaPlantAnimator';
import Aim from '../components/Aim';
import Shoot from '../components/Shoot';
import PipeCover from '../components/PipeCover';
import Collider from '../components/Collider';
import Vector from '../Vector';

const createPiranhaPlant = position => {
  const piranhaPlant = new GameObject();
  piranhaPlant.addComponent(new Transform(position));
  piranhaPlant.addComponent(
    new SpriteRenderer(piranhaPlantSprite, 'down', { layer: 0 })
  );
  piranhaPlant.addComponent(new PiranhaPlantAnimator());
  piranhaPlant.addComponent(new Aim());
  piranhaPlant.addComponent(new Shoot());
  piranhaPlant.addComponent(new PipeCover());
  piranhaPlant.addComponent(new Collider('enemy', new Vector(32, 64), true));
};

export default createPiranhaPlant;
