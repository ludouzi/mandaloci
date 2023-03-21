import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {tutorialPages} from '../util/tutorial';
import {StackParamList} from '../types';

type tutorialScreenProp = NativeStackNavigationProp<StackParamList>;

export const TutorialController = () => {
  const navigation = useNavigation<tutorialScreenProp>();
  const [pages, setPages] = useState(tutorialPages);
  const [selectedPage, setSelectedPage] = useState(0);

  const getData = () => {
    setPages(tutorialPages);
  };

  const startTutorial = async () => {
    navigation.navigate('TutorialScreen', {pages: []});
  };

  const finishTutorial = async () => {
    navigation.navigate('Home');
  };

  const nextPage = async () => {
    setSelectedPage(selectedPage + 1);
  };

  useEffect(() => {
    let isMounted = true;
    // delay fetching data until db schema is initialised
    // look into other methods later?
    setTimeout(() => {
      isMounted ? getData() : null;
    }, 200);
    return () => {
      isMounted = false;
    };
  }, []);

  return {
    pages: pages,
    selectedPage: selectedPage,
    setSelectedPage: setSelectedPage,
    nextPage: nextPage,
    startTutorial: startTutorial,
    finishTutorial: finishTutorial,
  };
};
