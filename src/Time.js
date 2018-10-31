const Time = {
  deltaTime: 0.017,
  lastUpdatedAt: new Date(),

  update() {
    this.deltaTime = (new Date() - this.lastUpdatedAt) / 1000;
    if (this.deltaTime > 0.05) this.deltaTime = 0.05;
    this.lastUpdatedAt = new Date();
  }
};

export default Time;
