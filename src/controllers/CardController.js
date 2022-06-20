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
} from '../utils/Database';
import {shuffleArray} from '../utils/helpers';
import {getType} from '../utils/helpers';
import {CharacterCard} from '../components/CharacterCard';
import {ActorCard} from '../components/ActorCard';
import {LocationCard} from '../components/LocationCard';
import {PropCard} from '../components/PropCard';

export const CardController = () => {
  const navigation = useNavigation();
  const [cards, setCards] = useState([]);
  const [total, setTotal] = useState(0);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isFlipped, setIsFlipped] = useState(false);

  const getData = async () => {
    let result = [];
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

  const nextCard = (index, time) => {
    let card = cards[total - (index + 1)];
    saveCard(card, time);
    setIsFlipped(false);
    if (total === index + 1) {
      setTotal(0);
      navigation.navigate('Cards');
    }
    setSelectedCard(selectedCard + 1);
  };

  const flipCard = async () => {
    setIsFlipped(true);
  };

  const getCard = page => {
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

  const saveCard = async (card, time) => {
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
