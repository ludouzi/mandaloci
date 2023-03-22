import React from 'react';
import {Input} from '@ui-kitten/components';

interface FuncProps {
  func: (arg: string) => void;
}

export const ChoiceInput = (props: FuncProps) => {
  return <Input onChangeText={value => props.func(value)} />;
};
