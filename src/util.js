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
