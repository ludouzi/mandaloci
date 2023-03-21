import React from 'react';
import {TopNavigation, Text} from '@ui-kitten/components';
import {style} from '../style/style';

export const TopBar = () => {
  return (
    <TopNavigation
      title={() => <Text style={style.title}>Mandaloci</Text>}
      alignment="center"
    />
  );
};
