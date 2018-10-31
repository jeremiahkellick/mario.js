import GameObject from './GameObject';
import Transform from '../components/Transform';
import Collider from '../components/Collider';
import RectRenderer from '../components/renderers/RectRenderer';

const createBlock = (position, size) => {
  const block = new GameObject();
  block.addComponent(new Transform(position));
  block.addComponent(new Collider('obstacle', size));
  block.addComponent(new RectRenderer(size));
};

export default createBlock;
