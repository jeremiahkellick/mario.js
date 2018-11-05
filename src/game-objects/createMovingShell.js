import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Movement from '../components/Movement';
import DirChangeInput from '../components/inputs/DirChangeInput';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import redKoopaShellSprite from '../sprites/redKoopaShellSprite';
import greenKoopaShellSprite from '../sprites/greenKoopaShellSprite';
import Damageable from '../components/Damageable';
import ShellAnimator from '../components/animators/ShellAnimator';
import ShellDamageHandler from '../components/ShellDamageHandler';

const sprites = { red: redKoopaShellSprite, green: greenKoopaShellSprite };

const createMovingShell = (position, color = 'green', dir = -1) => {
  const shell = new GameObject();
  shell.addComponent(new Transform(position));
  shell.addComponent(
    new Movement({ speed: 350, blocking: ['obstacle', 'block'], isShell: true })
  );
  shell.addComponent(new DirChangeInput(dir));
  shell.addComponent(
    new Collider('enemy', new Vector(16, 15).times(2), true)
  );
  shell.addComponent(
    new SpriteRenderer(sprites[color], 0, { offset: new Vector(0, 2) })
  );
  shell.addComponent(new Damageable());
  shell.addComponent(new ShellAnimator());
  shell.addComponent(new ShellDamageHandler());
};

export default createMovingShell;
