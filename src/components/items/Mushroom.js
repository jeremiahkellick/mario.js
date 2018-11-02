import Item from './Item';
import PowerManager from '../PowerManager';

class Mushroom extends Item {
  pickUp(pickedUpBy) {
    const powerManager = pickedUpBy.getComponent(PowerManager);
    if (powerManager) powerManager.mushroom();
    this.gameObject.destroy();
  }
}

export default Mushroom;
