import { enemiesImage } from '../files';
import Vector from '../Vector';

export default {
  image: enemiesImage,
  frames: {
    0: { position: new Vector(164, 179), size: new Vector(8, 9) },
    1: { position: new Vector(180, 179), size: new Vector(8, 9) },
    2: { position: new Vector(164, 196), size: new Vector(8, 9) },
    3: { position: new Vector(180, 196), size: new Vector(8, 9) }
  }
};
