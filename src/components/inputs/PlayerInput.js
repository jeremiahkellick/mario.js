import Input from './Input';
import key from 'keymaster';

class PlayerInput extends Input {
  constructor() {
    super();
    this._canJump = true;
    this._shouldJump = false;
    document.addEventListener('keydown', e => {
      e.preventDefault();
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        if (this._canJump) {
          this._canJump = false;
          this._shouldJump = true;
        }
      }
    });
    document.addEventListener('keyup', e => {
      if (e.code === 'Space' || e.code === 'KeyW' || e.code === 'ArrowUp') {
        this._canJump = true;
      }
    });
  }

  get move() {
    let move = 0;
    if (key.isPressed('A') || key.isPressed('left')) move -= 1;
    if (key.isPressed('D') || key.isPressed('right')) move += 1;
    return move;
  }

  get jumpDown() {
    if (this._shouldJump) {
      this._shouldJump = false;
      return true;
    } else {
      return false;
    }
  }

  get jump() {
    return key.isPressed('space') || key.isPressed('W') || key.isPressed('up');
  }
}

export default PlayerInput;
