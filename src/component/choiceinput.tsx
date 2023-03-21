import React from 'react';
import {Input} from '@ui-kitten/components';

export const ChoiceInput = (props: any) => {
  return <Input onChangeText={value => props.ctrl.handleInput(value)} />;
};
