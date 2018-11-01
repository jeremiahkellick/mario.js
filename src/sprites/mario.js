import Vector from '../Vector';
import { marioImage } from '../files';

export default {
  image: marioImage,
  frames: {
    idle: { position: new Vector(217, 89), size: new Vector(12, 15) },
    step: { position: new Vector(256, 89), size: new Vector(16, 16) },
    jump: { position: new Vector(335, 89), size: new Vector(16, 16) },
    skid: { position: new Vector(176, 129), size: new Vector(14, 16) }
  }
};
