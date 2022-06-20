import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getLocations, setLocation, getSearchLocations} from '../utils/Database';

export const LocationTabController = () => {
  const [locations, setLocations] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [id, setId] = useState(0);
  const [currentText, setCurrentText] = useState('');

  function handleInput(text) {
    setCurrentText(text.trim());
  }

  function validateInput() {
    if (currentText !== '') {
      handleSave();
    }
  }

  function handlePress(cardId, text) {
    setIsVisible(!isVisible);
    setId(cardId);
    setCurrentText(text);
  }

  const handleSave = async () => {
    setIsVisible(false);
    await setLocation(id, currentText);
    // refresh data on save
    // maybe replace item in state for improved performance
    getData();
  };

  const getData = async () => {
    const result = await getLocations(true);
    setLocations(result);
  };

  const getSearchData = async text => {
    const result = await getSearchLocations(text);
    setLocations(result);
  };

  useFocusEffect(
    useCallback(() => {
      const refresh = getData();
      return () => refresh;
    }, []),
  );

  return {
    locations: locations,
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
