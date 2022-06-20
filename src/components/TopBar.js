import React from 'react';
import {TopNavigation, Text} from '@ui-kitten/components';
import {styles} from '../styles/styles';

export const TopBar = () => {
  return (
    <TopNavigation
      title={() => <Text style={styles.title}>Mandaloci</Text>}
      alignment="center"
    />
  );
};
