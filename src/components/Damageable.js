import Component from './Component';

class Damageable extends Component {
  constructor() {
    super();
    this.onDamageFunctions = new Set();
    this.invincible = false;
  }

  tempInvincible() {
    this.invincible = true;
    setTimeout(() => (this.invincible = false), 1000);
  }

  onDamage(func) {
    this.onDamageFunctions.add(func);
    return () => this.onDamageFunctions.delete(func);
  }

  damage() {
    if (!this.invincible) this.onDamageFunctions.forEach(func => func());
  }
}

export default Damageable;
