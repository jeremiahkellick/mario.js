import Vector from '../Vector';
import { enemiesImage } from '../files';

export default {
  image: enemiesImage,
  frames: {
    walk1: { position: new Vector(0, 0), size: new Vector(16, 16) },
    walk2: { position: new Vector(16, 0), size: new Vector(16, 16) },
    dead: { position: new Vector(32, 7), size: new Vector(16, 9) }
  }
};
