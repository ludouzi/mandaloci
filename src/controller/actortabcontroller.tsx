import {useState, useCallback, SetStateAction} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getActors, setActor, getSearchActors} from '../database/database';

export const ActorTabController = () => {
  const [actors, setActors] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [currentText, setCurrentText] = useState('');

  function handleInput(text: string) {
    setCurrentText(text.trim());
  }

  function validateInput() {
    if (currentText !== '') {
      handleSave();
    }
  }

  function handlePress(cardId: number, text: string) {
    setIsVisible(!isVisible);
    setId(cardId);
    setCurrentText(text);
  }

  const handleSave = async () => {
    setIsVisible(false);
    await setActor(id, currentText);
    // refresh data on save
    // maybe replace item in state for improved performance
    getData();
  };

  const getData = async () => {
    const result = await getActors(true);
    setActors(result);
  };

  const getSearchData = async (text: string) => {
    const result = await getSearchActors(text);
    setActors(result);
  };

  useFocusEffect(
    useCallback(() => {
      const refresh = getData();
      return () => refresh;
    }, []),
  );

  return {
    actors: actors,
    isVisible: isVisible,
    id: id,
    currentText: currentText,
    handlePress: handlePress,
    handleInput: handleInput,
    validateInput: validateInput,
    handleSave: handleSave,
    getSearchData: getSearchData,
  };
};
