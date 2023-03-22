import {useState, useCallback} from 'react';
import {useFocusEffect} from '@react-navigation/core';
import {getProps, setProp, getSearchProps} from '../database/database';
import {Prop} from '../entity/prop';

export const PropTabController = () => {
  const [props, setProps] = useState<Prop[]>([]);
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
    await setProp(id, currentText);
    const newProps = props.map(prop => {
      if (prop.id === id) {
        const updatedProp = {
          ...prop,
          value: currentText,
        };
        return updatedProp;
      }
      return prop;
    });
    setProps(newProps);
  };

  const getData = async () => {
    const result = await getProps(true);
    setProps(result);
  };

  const getSearchData = async (text: string) => {
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
