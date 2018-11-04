import Component from './Component';

class Damageable extends Component {
  constructor(stompable = true) {
    super();
    this.onDamageFunctions = new Set();
    this.invincible = false;
    this.stompable = stompable;
  }

  tempInvincible() {
    this.invincible = true;
    setTimeout(() => (this.invincible = false), 1000);
  }

  onDamage(func) {
    this.onDamageFunctions.add(func);
    return () => this.onDamageFunctions.delete(func);
  }

  stomp() {
    if (this.stompable) this.damage();
  }

  damage() {
    if (!this.invincible) this.onDamageFunctions.forEach(func => func());
  }
}

export default Damageable;
