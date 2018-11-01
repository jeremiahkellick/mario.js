import Component from './Component';

class Damageable extends Component {
  constructor() {
    super();
    this.onDamageFunctions = new Set();
  }

  onDamage(func) {
    this.onDamageFunctions.add(func);
    return () => this.onDamageFunctions.delete(func);
  }

  damage() {
    this.onDamageFunctions.forEach(func => func());
  }
}

export default Damageable;
