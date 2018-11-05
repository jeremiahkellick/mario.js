import Vector from '../Vector';
import { enemiesImage } from '../files';

export default {
  image: enemiesImage,
  frames: {
    0: { position: new Vector(128, 48), size: new Vector(16, 16) },
    1: { position: new Vector(144, 48), size: new Vector(16, 16) },
    2: { position: new Vector(160, 48), size: new Vector(16, 16) },
    3: { position: new Vector(176, 48), size: new Vector(16, 16) }
  }
};
