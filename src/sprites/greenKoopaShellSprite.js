import Vector from '../Vector';
import { enemiesImage } from '../files';

export default {
  image: enemiesImage,
  frames: {
    0: { position: new Vector(32, 48), size: new Vector(16, 16) },
    1: { position: new Vector(48, 48), size: new Vector(16, 16) },
    2: { position: new Vector(64, 48), size: new Vector(16, 16) },
    3: { position: new Vector(80, 48), size: new Vector(16, 16) }
  }
};
