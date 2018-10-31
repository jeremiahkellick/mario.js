import Component from './Component';
import Vector from '../Vector';
import Transform from './Transform';
import Time from '../Time';
import Collider from './Collider';
import Input from './Input';

const gravity = new Vector(0, 1350);
const airAcceleration = 200;
const groundAcceleration = 200;
const groundDeceleration = 200;
const maxSpeed = 165;

class Movement extends Component {
  constructor() {
    super();
    this.velocity = Vector.zero;
    this.onGround = false;
    this.skidding = false;
    this.lastJumped = null;
  }

  start() {
    this.transform = this.requireComponent(Transform);
    this.collider = this.requireComponent(Collider);
    this.input = this.getComponent(Input);
  }

  update() {
    this.skidding = false;
    this.velocity = this.velocity.plus(gravity.times(Time.deltaTime));
    if (this.input) {
      const move = this.input.move;
      const jump = this.input.jump;
      const jumpDown = this.input.jumpDown;
      let acceleration = this.onGround ? groundAcceleration : airAcceleration;
      let frameAcceleration = acceleration * Time.deltaTime;
      if (Math.sign(this.velocity.x) !== Math.sign(move)
          && Math.sign(this.velocity.x) !== 0
          && Math.sign(move) !== 0
          && this.onGround) {

        frameAcceleration *= 3;
        this.skidding = true;
      }
      this.velocity.x += move * frameAcceleration;
      if (this.velocity.x > maxSpeed) this.velocity.x = maxSpeed;
      if (this.velocity.x < -maxSpeed) this.velocity.x = -maxSpeed;

      const frameDeceleration = groundDeceleration * Time.deltaTime;
      if (this.onGround && move === 0) {
        if (Math.abs(this.velocity.x) < frameDeceleration) this.velocity.x = 0;
        if (this.velocity.x > 0) this.velocity.x -= frameDeceleration;
        if (this.velocity.x < 0) this.velocity.x += frameDeceleration;
      }

      if (jump && this.lastJumped && new Date() - this.lastJumped <= 400) {
        this.velocity.y -= 11000 / (new Date() - this.lastJumped + 2000);
      }
      if (this.onGround && jumpDown) {
        this.lastJumped = new Date();
        this.velocity.y = -350;
      }
    }

    this.transform.position = this.transform.position.plus(
      new Vector(this.velocity.x * Time.deltaTime, 0)
    );
    let depth = this.collider.checkAllCollisions(['obstacle']);
    if (depth) {
      this.velocity.x = 0;
      this.transform.position = this.transform.position.minus(
        new Vector(depth.x, 0)
      );
    }
    this.transform.position = this.transform.position.plus(
      new Vector(0, this.velocity.y * Time.deltaTime)
    );
    this.onGround = false;
    const oneDirection = this.velocity.y > 0;
    depth = this.collider.checkAllCollisions(['obstacle'], oneDirection);
    if (depth) {
      this.velocity.y = 0;
      if (depth.y > 0) this.onGround = true;
      this.transform.position = this.transform.position.minus(
        new Vector(0, depth.y)
      );
    }
  }
}

export default Movement;
