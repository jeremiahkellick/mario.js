import Component from './Component';
import Vector from '../Vector';

class Transform extends Component {
  constructor(position) {
    super();
    this.position = position || Vector.zero;
  }
}

export default Transform;
