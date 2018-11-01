import Component from '../Component';

class Input extends Component {
  get move() {
    return 0;
  }

  get jumpDown() {
    return false;
  }

  get jump() {
    return false;
  }
}

export default Input;
