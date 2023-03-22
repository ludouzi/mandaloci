import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {
  getLocations,
  setLocation,
  getSearchLocations,
} from '../database/database';
import {Location} from '../entity/location';

export const LocationTabController = () => {
  const [locations, setLocations] = useState<Location[]>([]);
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
    await setLocation(id, currentText);
    const newLocations = locations.map(location => {
      if (location.id === id) {
        const updatedLocation = {
          ...location,
          value: currentText,
        };
        return updatedLocation;
      }
      return location;
    });
    setLocations(newLocations);
  };

  const getData = async () => {
    const result = await getLocations(true);
    setLocations(result);
  };

  const getSearchData = async (text: string) => {
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
