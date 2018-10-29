class Component {
  constructor() {
    this.started = false;
  }

  start() {}

  update() {}

  onDestroy() {}

  getComponent(componentClass) {
    return this.gameObject.getComponent(componentClass);
  }

  requireComponent(componentClass) {
    const component = this.getComponent(componentClass);
    if (!component) {
      throw new ComponentRequiredError(
        `${this.constructor.name} requires ${componentClass.name}`
      );
    }
    return component;
  }

  startIfNotStarted() {
    if (!this.started) {
      this.started = true;
      this.start();
    }
  }

  handleUpdating() {
    this.startIfNotStarted();
    this.update();
  }
}

class ComponentRequiredError extends Error {}

export default Component;
