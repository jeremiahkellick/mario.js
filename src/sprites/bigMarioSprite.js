import Vector from '../Vector';
import { marioImage } from '../files';

export default {
  image: marioImage,
  frames: {
    walk0: { position: new Vector(214, 243), size: new Vector(16, 27) },
    walk1: { position: new Vector(255, 243), size: new Vector(16, 27) },
    walk2: { position: new Vector(295, 244), size: new Vector(16, 27) },
    walk3: { position: new Vector(255, 243), size: new Vector(16, 27) },
    jumpUp: { position: new Vector(335, 244), size: new Vector(16, 26) },
    jumpDown: { position: new Vector(295, 244), size: new Vector(16, 27) },
    skid: { position: new Vector(175, 283), size: new Vector(16, 28) }
  }
};
