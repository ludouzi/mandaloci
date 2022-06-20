import React from 'react';
import {Input} from '@ui-kitten/components';

export const ChoiceInput = props => {
  return <Input onChangeText={value => props.ctrl.handleInput(value)} />;
};
