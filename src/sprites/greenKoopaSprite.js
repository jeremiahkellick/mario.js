import Vector from '../Vector';
import { enemiesImage } from '../files';

export default {
  image: enemiesImage,
  frames: {
    walk1: { position: new Vector(0, 51), size: new Vector(16, 26) },
    walk2: { position: new Vector(16, 51), size: new Vector(16, 27) }
  }
};
