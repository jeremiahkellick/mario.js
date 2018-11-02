import Vector from '../Vector';
import { marioImage } from '../files';

export default {
  image: marioImage,
  frames: {
    walk0: { position: new Vector(217, 89), size: new Vector(12, 15) },
    walk1: { position: new Vector(256, 89), size: new Vector(16, 16) },
    jumpUp: { position: new Vector(335, 89), size: new Vector(16, 16) },
    jumpDown: { position: new Vector(335, 89), size: new Vector(16, 16) },
    skid: { position: new Vector(176, 129), size: new Vector(14, 16) }
  }
};
