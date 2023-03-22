import React from 'react';
import {SafeAreaView} from 'react-native';
import {style} from '../style/style';

export const TabView = ({children}: {children: React.ReactNode}) => {
  return <SafeAreaView style={style.tabView}>{children}</SafeAreaView>;
};
