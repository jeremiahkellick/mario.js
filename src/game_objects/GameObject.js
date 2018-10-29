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

  update() {
    this.components.forEach(component => component.handleUpdating());
  }

  destroy() {
    this.components.forEach(component => component.onDestroy());
    Game.destroy(this);
  }
}

export default GameObject;
