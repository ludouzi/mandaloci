import {useState, useCallback, SetStateAction} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {getType} from '../util/helpers';
import {CharacterPage} from '../screen/characterpage';
import {ActorPage} from '../screen/actorpage';
import {LocationPage} from '../screen/locationpage';
import {PropPage} from '../screen/proppage';
import {
  getChars,
  setActor,
  setLocation,
  setProp,
  setCharLearned,
  setActorLearned,
  setLocationLearned,
  setPropLearned,
} from '../database/database';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Character} from '../entity/character';
import {Card, CardList, StackParamList} from '../types';
import {Prop} from '../entity/prop';

type lessonScreenProp = NativeStackNavigationProp<StackParamList>;

export const LessonController = () => {
  const navigation = useNavigation<lessonScreenProp>();
  const [chars, setChars] = useState<Character[]>([]);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const getData = async () => {
    let result = await getChars(false);
    setChars(result);
  };

  const getPages = (char: Character) => {
    let result: CardList = [];
    // gets all components of a character
    // only adds if not already learned
    if (!char.actor.isLearned) {
      result.push(char.actor);
    }
    if (!char.location.isLearned) {
      result.push(char.location);
    }
    char.props.forEach((prop: Prop) => {
      if (!prop.isLearned) {
        result.push(prop);
      }
    });
    result.push(char);
    return result;
  };

  const getScreen = (page: any, ctrl: any) => {
    let type = getType(page);
    if (type === 'char') {
      return CharacterPage(page);
    }
    if (type === 'actor') {
      return ActorPage(page, ctrl);
    }
    if (type === 'loc') {
      return LocationPage(page, ctrl);
    }
    if (type === 'prop') {
      return PropPage(page, ctrl);
    }
  };

  const startTutorial = async () => {
    navigation.navigate('Tutorial');
  };

  function handleInput(text: string) {
    setCurrentText(text.trim());
  }

  function checkInput(page: {
    examples: {
      split: (arg0: string) => {(): string; new (): string; length: number};
    };
  }) {
    if (currentText === '') {
      if (page.examples) {
        if (selectedRadio === page.examples.split(',').length) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
    return false;
  }

  function setRadio(index: SetStateAction<number>) {
    setSelectedRadio(index);
  }

  function setPage(index: SetStateAction<number>) {
    setSelectedPage(index);
  }

  const nextPage = async (page: Card) => {
    Keyboard.dismiss();
    await savePage(page);
    setSelectedRadio(0);
    setCurrentText('');
    setSelectedPage(selectedPage + 1);
  };

  const finishLesson = async (page: Card) => {
    await savePage(page);
    navigation.navigate('Home');
  };

  const savePage = async (page: any) => {
    let type = getType(page);
    if (type === 'char') {
      await setCharLearned(page.id);
    } else if (type === 'actor') {
      if (currentText !== '') {
        await setActor(page.id, currentText);
      } else {
        let examples = page.examples.split(',');
        await setActor(page.id, examples[selectedRadio]);
      }
      await setActorLearned(page.id);
    } else if (type === 'loc') {
      if (currentText !== '') {
        await setLocation(page.id, currentText);
      }
      await setLocationLearned(page.id);
    } else if (type === 'prop') {
      if (currentText !== '') {
        await setProp(page.id, currentText);
      } else {
        let examples = page.examples.split(',');
        await setProp(page.id, examples[selectedRadio]);
      }
      await setPropLearned(page.id);
    }
  };

  const startLesson = async (charId: number) => {
    // find character in existing state
    if (chars) {
      const character = chars.find((char: {id: number}) => char.id === charId);
      if (character) {
        const pages = getPages(character);
        navigation.navigate('PageScreen', {id: charId, pages: pages});
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const refresh = getData();
      return () => refresh;
    }, []),
  );

  return {
    chars: chars,
    startLesson: startLesson,
    selectedPage: selectedPage,
    setPage: setPage,
    nextPage: nextPage,
    finishLesson: finishLesson,
    selectedRadio: selectedRadio,
    currentText: currentText,
    setRadio: setRadio,
    handleInput: handleInput,
    checkInput: checkInput,
    getScreen: getScreen,
    startTutorial: startTutorial,
  };
};
