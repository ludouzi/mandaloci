import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {
  getCharacterCards,
  getActorCards,
  getLocationCards,
  getPropCards,
  setCharacterCard,
  setActorCard,
  setLocationCard,
  setPropCard,
} from '../database/database';
import {shuffleArray, getType} from '../util/helpers';
import {CharacterCard} from '../component/charactercard';
import {ActorCard} from '../component/actorcard';
import {LocationCard} from '../component/locationcard';
import {PropCard} from '../component/propcard';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {StackParamList} from '../app';

type cardScreenProp = NativeStackNavigationProp<StackParamList>;

export const CardController = () => {
  const navigation = useNavigation<cardScreenProp>();
  const [cards, setCards] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedCard, setSelectedCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const getData = async () => {
    let result: any = [];
    // push all cards with a due date before now into single array
    result.push.apply(result, await getCharacterCards());
    result.push.apply(result, await getActorCards());
    result.push.apply(result, await getLocationCards());
    result.push.apply(result, await getPropCards());
    result = shuffleArray(result);
    setCards(result);
    setTotal(result.length);
  };

  const startSession = async () => {
    navigation.navigate('ReviseScreen', {cards: cards});
  };

  const nextCard = (index: number, time: number) => {
    let card = cards[total - (index + 1)];
    saveCard(card, time);
    setIsFlipped(false);
    if (total === index + 1) {
      setTotal(0);
      navigation.navigate('Cards');
    }
    if (selectedCard != null) {
      setSelectedCard(selectedCard + 1);
    }
  };

  const flipCard = async () => {
    setIsFlipped(true);
  };

  const getCard = (page: any) => {
    let type = getType(page);
    if (type === 'char') {
      return CharacterCard(page, isFlipped);
    }
    if (type === 'actor') {
      return ActorCard(page, isFlipped);
    }
    if (type === 'loc') {
      return LocationCard(page, isFlipped);
    }
    if (type === 'prop') {
      return PropCard(page, isFlipped);
    }
  };

  const saveCard = async (card: any, time: number) => {
    let type = getType(card);
    switch (type) {
      case 'char':
        await setCharacterCard(card.id, time);
        break;
      case 'actor':
        await setActorCard(card.id, time);
        break;
      case 'loc':
        await setLocationCard(card.id, time);
        break;
      case 'prop':
        await setPropCard(card.id, time);
        break;
    }
  };

  //Refresh data every time card tab is selected
  useFocusEffect(
    useCallback(() => {
      const refresh = getData();
      return () => refresh;
    }, []),
  );

  return {
    cards: cards,
    total: total,
    selectedCard: selectedCard,
    setSelectedCard: setSelectedCard,
    startSession: startSession,
    nextCard: nextCard,
    isFlipped: isFlipped,
    flipCard: flipCard,
    getCard: getCard,
  };
};
