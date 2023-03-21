import {Actor} from '../entity/actor';
import {Character} from '../entity/character';
import {Location} from '../entity/location';
import {Prop} from '../entity/prop';
import {Card, CardList} from '../types';

export const getType = (page: Card) => {
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

export const shuffleArray = (array: CardList) => {
  let a = array;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
