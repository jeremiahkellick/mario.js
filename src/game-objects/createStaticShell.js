import GameObject from './GameObject';
import Vector from '../Vector';
import Transform from '../components/Transform';
import Collider from '../components/Collider';
import SpriteRenderer from '../components/renderers/SpriteRenderer';
import redKoopaShellSprite from '../sprites/redKoopaShellSprite';
import greenKoopaShellSprite from '../sprites/greenKoopaShellSprite';
import Kickable from '../components/Kickable';
import ShellKickHandler from '../components/ShellKickHandler';

const sprites = { red: redKoopaShellSprite, green: greenKoopaShellSprite };

const createStaticShell = (position, color = 'green') => {
  const shell = new GameObject();
  shell.addComponent(new Transform(position));
  shell.addComponent(
    new Collider('kickable', new Vector(16, 15).times(2), true)
  );
  shell.addComponent(
    new SpriteRenderer(sprites[color], 0, { offset: new Vector(0, 2) })
  );
  shell.addComponent(new Kickable());
  shell.addComponent(new ShellKickHandler(color));
};

export default createStaticShell;
