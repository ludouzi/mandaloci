import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getChars} from '../utils/Database';
import {useNavigation} from '@react-navigation/native';
import {Keyboard} from 'react-native';
import {getType} from '../utils/helpers';
import {CharacterPage} from '../screens/CharacterPage';
import {ActorPage} from '../screens/ActorPage';
import {LocationPage} from '../screens/LocationPage';
import {PropPage} from '../screens/PropPage';
import {
  setActor,
  setLocation,
  setProp,
  setCharLearned,
  setActorLearned,
  setLocationLearned,
  setPropLearned,
} from '../utils/Database';

export const LessonController = () => {
  const navigation = useNavigation();
  const [chars, setChars] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);
  const [selectedRadio, setSelectedRadio] = useState(0);
  const [currentText, setCurrentText] = useState('');

  const getData = async () => {
    const result = await getChars(false);
    setChars(result);
  };

  const getPages = char => {
    let result = [];
    // gets all components of a character
    // only adds if not already learned
    if (!char.actor.isLearned) {
      result.push(char.actor);
    }
    if (!char.location.isLearned) {
      result.push(char.location);
    }
    char.props.forEach(prop => {
      if (!prop.isLearned) {
        result.push(prop);
      }
    });
    result.push(char);
    return result;
  };

  const getScreen = (page, ctrl) => {
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

  function handleInput(text) {
    setCurrentText(text.trim());
  }

  function checkInput(page) {
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

  function setRadio(index) {
    setSelectedRadio(index);
  }

  function setPage(index) {
    setSelectedPage(index);
  }

  const nextPage = async page => {
    Keyboard.dismiss();
    await savePage(page);
    setSelectedRadio(0);
    setCurrentText('');
    setSelectedPage(selectedPage + 1);
  };

  const finishLesson = async page => {
    await savePage(page);
    navigation.navigate('Home');
  };

  const savePage = async page => {
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

  const startLesson = async charId => {
    // find character in existing state
    let character = chars.find(char => char.id === charId);
    let pages = getPages(character);
    navigation.navigate('PageScreen', {id: charId, pages: pages});
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
