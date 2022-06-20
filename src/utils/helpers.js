import Actor from '../entities/Actor';
import Character from '../entities/Character';
import Location from '../entities/Location';
import Prop from '../entities/Prop';

export const getType = page => {
  if (page instanceof Character) {
    return 'char';
  }
  if (page instanceof Actor) {
    return 'actor';
  }
  if (page instanceof Location) {
    return 'loc';
  }
  if (page instanceof Prop) {
    return 'prop';
  }
};

export const shuffleArray = array => {
  let a = array;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
