import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {tutorialPages} from '../utils/tutorial';

export const TutorialController = () => {
  const navigation = useNavigation();
  const [pages, setPages] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);

  const getData = () => {
    setPages(tutorialPages);
  };

  const startTutorial = async () => {
    navigation.navigate('TutorialScreen', {pages: pages});
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
