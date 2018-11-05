import Collider from './components/Collider';

export const minBy = (array, func) => {
  let min = null;
  array.forEach(el => {
    if (min === null || func(el) < func(min)) min = el;
  });
  return min;
};

export const extractFileName = path => {
  return path.match(/.*\/(.+)\.[^.]*$/)[1];
};

export const checkPointForCollision = (point, layers) => {
  const colliders = Collider.getColliders(layers);
    for (let i = 0; i < colliders.length; i++) {
      const rect = colliders[i].rect;
      if (
        point.x < rect.x2 &&
        point.x > rect.x1 &&
        point.y < rect.y2 &&
        point.y > rect.y1
      ) {
        return true;
      }
    }
    return false;
};
