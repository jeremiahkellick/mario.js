import Component from './Component';
import { kick } from '../files';
import Game from '../Game';

class Kickable extends Component {
  constructor() {
    super();
    this.onKickFunctions = new Set();
  }

  onKick(func) {
    this.onKickFunctions.add(func);
    return () => this.onKickFunctions.delete(func);
  }

  kick() {
    if (!Game.muted) {
      kick.currentTime = 0;
      kick.play();
    }
    this.onKickFunctions.forEach(func => func());
  }
}

export default Kickable;
