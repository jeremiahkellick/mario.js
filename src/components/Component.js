class Component {
  constructor() {
    Component.unstarted.add(this);
  }

  start() {}

  update() {}

  lateUpdate() {}

  onDestroy() {}

  getComponent(componentClass) {
    return this.gameObject.getComponent(componentClass);
  }

  requireComponent(componentClass) {
    const component = this.getComponent(componentClass);
    if (!component) {
      throw `${this.constructor.name} requires ${componentClass.name}`;
    }
    return component;
  }

  isStarted() {
    return !Component.unstarted.has(this);
  }

  static start() {
    this.unstarted.forEach(component => {
      component.start();
      this.unstarted.delete(component);
    });
  }
}

Component.unstarted = new Set();

export default Component;
