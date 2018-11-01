import Component from './Component';

class Health extends Component {
  constructor() {
    super();
    this.onDeathFunctions = new Set();
  }

  onDeath(func) {
    this.onDeathFunctions.add(func);
    return () => this.onDeathFunctions.delete(func);
  }

  damage() {
    this.onDeathFunctions.forEach(func => func());
    this.gameObject.destroy();
  }
}

export default Health;
