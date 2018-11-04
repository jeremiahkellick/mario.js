import { enemiesImage } from '../files';
import Vector from '../Vector';

export default {
  image: enemiesImage,
  frames: {
    down: { position: new Vector(128, 144), size: new Vector(16, 32) },
    up: { position: new Vector(160, 144), size: new Vector(16, 32) }
  }
};
