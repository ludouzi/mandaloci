import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getChars, getSearchChars} from '../database/database';
import {Character} from '../entity/character';

export const CharTabController = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [currentText, setCurrentText] = useState('');

  function handleInput(text: string) {
    setCurrentText(text.trim());
  }

  function handlePress(cardId: number, text: string) {
    setIsVisible(!isVisible);
    setId(cardId);
    setCurrentText(text);
  }

  const getData = async () => {
    const result = await getChars(true);
    setCharacters(result);
  };

  const getSearchData = async (text: string) => {
    const result = await getSearchChars(text);
    setCharacters(result);
  };

  useFocusEffect(
    useCallback(() => {
      const refresh = getData();
      return () => refresh;
    }, []),
  );

  return {
    characters: characters,
    isVisible: isVisible,
    id: id,
    currentText: currentText,
    handlePress: handlePress,
    handleInput: handleInput,
    getSearchData: getSearchData,
  };
};
