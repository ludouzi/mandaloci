import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getProps, setProp, getSearchProps} from '../utils/Database';

export const PropTabController = () => {
  const [props, setProps] = useState([]);
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
    await setProp(id, currentText);
    // refresh data on save
    // maybe replace item in state for improved performance
    getData();
  };

  const getData = async () => {
    const result = await getProps(true);
    setProps(result);
  };

  const getSearchData = async text => {
    const result = await getSearchProps(text);
    setProps(result);
  };

  useFocusEffect(
    useCallback(() => {
      const refresh = getData();
      return () => refresh;
    }, []),
  );

  return {
    props: props,
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
