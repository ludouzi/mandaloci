import {Actor} from './entity/actor';
import {Character} from './entity/character';
import {Location} from './entity/location';
import {Prop} from './entity/prop';

export type Card = Character | Actor | Location | Prop;
export type CardList = Array<Character | Actor | Location | Prop>;

export type StackParamList = {
  Home: undefined;
  PageScreen: {id: number; pages: CardList};
  ReviseScreen: {cards: CardList};
  Tutorial: undefined;
  TutorialScreen: {pages: []};
  TutorialStart: undefined;
  Cards: undefined;
};
