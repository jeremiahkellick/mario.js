import Component from './Component';

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
    this.onKickFunctions.forEach(func => func());
  }
}

export default Kickable;
