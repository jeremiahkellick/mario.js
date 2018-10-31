import Component from './Component';
import key from 'keymaster';

class Input extends Component {
  constructor() {
    super();
    this._canJump = true;
    this._shouldJump = false;
    key('space', () => {
      if (this._canJump) {
        this._canJump = false;
        this._shouldJump = true;
      }
    });
    document.addEventListener('keyup', e => {
      if (e.code === 'Space') this._canJump = true;
    });
  }

  get move() {
    let move = 0;
    if (key.isPressed('A')) move -= 1;
    if (key.isPressed('D')) move += 1;
    return move;
  }

  get jump() {
    if (this._shouldJump) {
      this._shouldJump = false;
      return true;
    } else {
      return false;
    }
  }
}

export default Input;
