import Game from '../Game';

class GameObject {
  constructor() {
    this.components = [];
    Game.add(this);
  }

  addComponent(component) {
    this.components.push(component);
    component.gameObject = this;
  }

  getComponent(componentClass) {
    return this.components.find(component =>
      component instanceof componentClass
    );
  }

  removeComponent(component) {
    for (let i = 0; i < this.components.length; i++) {
      if (this.components[i] === component) {
        this.components.splice(i, 1);
        return;
      }
    }
  }

  update() {
    this.components.forEach(component => component.update());
  }

  lateUpdate() {
    this.components.forEach(component => component.lateUpdate());
  }

  destroy() {
    this.components.forEach(component => component.onDestroy());
    Game.destroy(this);
  }
}

export default GameObject;
