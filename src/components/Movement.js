import Component from './Component';
import Vector from '../Vector';
import Transform from './Transform';
import Time from '../Time';
import Collider from './Collider';
import Input from './inputs/Input';
import Damageable from './Damageable';

class Movement extends Component {
  constructor({
    gravity,
    airAcceleration,
    groundAcceleration,
    speed,
    accelerate,
    velocity
  }) {
    super();
    this.onGround = false;
    this.skidding = false;
    this.lastJumped = null;
    this.gravity = gravity || new Vector(0, 1800);
    this.airAcceleration = airAcceleration || 0;
    this.groundAcceleration = groundAcceleration === undefined
                              ? 200 : groundAcceleration;
    this.speed = speed === undefined ? 165 : speed;
    this.accelerate = accelerate === undefined ? false : accelerate;
    this.velocity = velocity || Vector.zero;

    this.onHitWallFunctions = new Set();
  }

  start() {
    this.transform = this.requireComponent(Transform);
    this.collider = this.getComponent(Collider);
    this.input = this.getComponent(Input);
    this.damageable = this.getComponent(Damageable);
  }

  update() {
    this.skidding = false;
    this.velocity = this.velocity.plus(this.gravity.times(Time.deltaTime));
    if (this.input) {
      const move = this.input.move;
      const jumpDown = this.input.jumpDown;
      const jump = this.input.jump;

      this.handleAcceleration(move);
      this.handleDeceleration(move);
      this.handleJumping(jumpDown, jump);
    }

    this.moveX();
    this.moveY();

    if (this.collider && this.collider.layer === 'player') {
      this.handleDamagingCollisions();
    }
  }

  handleAcceleration(move) {
    let acceleration = this.onGround
                        ? this.groundAcceleration : this.airAcceleration;
    let frameAcceleration = acceleration * Time.deltaTime;
    if (this.accelerate && Math.sign(this.velocity.x) !== Math.sign(move)
        && Math.sign(this.velocity.x) !== 0
        && Math.sign(move) !== 0
        && this.onGround) {

      frameAcceleration *= 3;
      this.skidding = true;
    }

    if (this.accelerate) {
      this.velocity.x += move * frameAcceleration;
      if (this.velocity.x > this.speed) this.velocity.x = this.speed;
      if (this.velocity.x < -this.speed) this.velocity.x = -this.speed;
    } else {
      this.velocity.x = move * this.speed;
    }
  }

  handleDeceleration(move) {
    if (this.onGround && move === 0) {
      const frameDeceleration = this.groundAcceleration * Time.deltaTime;
      if (this.accelerate) {
        if (Math.abs(this.velocity.x) < frameDeceleration) {
          this.velocity.x = 0;
        } else if (this.velocity.x > 0) {
          this.velocity.x -= frameDeceleration;
        } else if (this.velocity.x < 0) {
          this.velocity.x += frameDeceleration;
        }
      } else {
        this.velocity.x = 0;
      }
    }
  }

  handleJumping(jumpDown, jump) {
    const msSinceJumped = new Date() - this.lastJumped;
    if (this.accelerate && jump && this.lastJumped && msSinceJumped <= 400) {
      this.velocity.y -= 17000 / (new Date() - this.lastJumped + 2000);
    }
    if (this.onGround && jumpDown) {
      this.lastJumped = new Date();
      this.velocity.y = -0.34 * (Math.abs(this.velocity.x) + 1000);
    }
  }

  moveX() {
    this.transform.position = this.transform.position.plus(
      new Vector(this.velocity.x * Time.deltaTime, 0)
    );
    if (this.collider) {
      let collision = this.collider.checkAllCollisions(['obstacle', 'block']);
      if (collision) {
        this.velocity.x = 0;
        this.transform.position = this.transform.position.minus(
          new Vector(collision.depth.x, 0)
        );
        this.onHitWallFunctions.forEach(func => func());
      }
    }
  }

  moveY() {
    this.transform.position = this.transform.position.plus(
      new Vector(0, this.velocity.y * Time.deltaTime)
    );
    this.onGround = false;
    if (this.collider) {
      const oneDirection = this.velocity.y > 0;
      let collision = this.collider.checkAllCollisions(
        ['obstacle', 'block'],
        oneDirection
      );
      if (collision) {
        this.velocity.y = 0;
        if (collision.depth.y > 0) {
          this.onGround = true;
        } else {
          if (collision.collider.layer === 'block'
              && collision.depth.y > -collision.collider.size.y / 4) {

            const otherGameObject = collision.collider.gameObject;
            const damageable = otherGameObject.getComponent(Damageable);
            if (damageable) damageable.damage();
          }
          this.lastJumped = null;
        }
        this.transform.position = this.transform.position.minus(
          new Vector(0, collision.depth.y)
        );
      }
    }
  }

  handleDamagingCollisions() {
    const collision = this.collider.checkAllCollisions(['enemy']);
    if (collision) {
      const depth = collision.depth;
      const otherGameObject = collision.collider.gameObject;
      const damageable = otherGameObject.getComponent(Damageable);
      if (damageable && depth.y > 0 && depth.y < this.collider.size.y / 4) {
        if (this.velocity.y > -500) this.velocity.y = -500;
        this.transform.position.y = collision.collider.rect.y2 - 8;
        damageable.stomp();
      } else {
        if (this.damageable) this.damageable.damage();
      }
    }
  }

  onHitWall(func) {
    this.onHitWallFunctions.add(func);
    return () => this.onHitWallFunctions.delete(func);
  }
}

export default Movement;
