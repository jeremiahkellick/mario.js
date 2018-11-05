import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import DirChangeInput from '../components/inputs/DirChangeInput';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import mushroomSprite from '../sprites/mushroomSprite';
import Mushroom from '../components/items/Mushroom';
import { mushroomSound } from '../files';
import Game from '../Game';

const createMushroom = (position, dir) => {
  dir = dir === undefined ? [-1, 1][Math.floor(Math.random() * 2)] : dir;
  const mushroom = new GameObject();
  mushroom.addComponent(new Transform(position));
  mushroom.addComponent(new Movement({ speed: 75 }));
  mushroom.addComponent(new DirChangeInput(dir));
  mushroom.addComponent(
    new Collider('item', new Vector(16, 16).times(2), true)
  );
  mushroom.addComponent(
    new SpriteRenderer(mushroomSprite, 'main', { offset: new Vector(0, 2) })
  );
  mushroom.addComponent(new Mushroom());
  if (!Game.muted) {
    mushroomSound.currentTime = 0;
    mushroomSound.play();
  }
};

export default createMushroom;
