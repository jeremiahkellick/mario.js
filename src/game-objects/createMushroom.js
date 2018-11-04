import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import DirChangeInput from '../components/inputs/DirChangeInput';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import mushroomSprite from '../sprites/mushroomSprite';
import Mushroom from '../components/items/Mushroom';

const createMushroom = position => {
  const mushroom = new GameObject();
  mushroom.addComponent(new Transform(position));
  mushroom.addComponent(new Movement({ speed: 75 }));
  mushroom.addComponent(
    new DirChangeInput([-1, 1][Math.floor(Math.random() * 2)])
  );
  mushroom.addComponent(
    new Collider('item', new Vector(16, 16).times(2), true)
  );
  mushroom.addComponent(
    new SpriteRenderer(mushroomSprite, 'main', { offset: new Vector(0, 2) })
  );
  mushroom.addComponent(new Mushroom());
};

export default createMushroom;
