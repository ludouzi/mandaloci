import React from 'react';
import {Tab, TabView} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {ActorTab} from './actortab';
import {LocationTab} from './locationtab';
import {PropTab} from './proptab';
import {CharTab} from './chartab';
import {style} from '../style/style';

export const TopTabs = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaView style={style.tabContainer}>
      <TabView
        selectedIndex={selectedIndex}
        onSelect={index => setSelectedIndex(index)}>
        <Tab title="Characters">
          <CharTab />
        </Tab>
        <Tab title="Actors">
          <ActorTab />
        </Tab>
        <Tab title="Locations">
          <LocationTab />
        </Tab>
        <Tab title="Props">
          <PropTab />
        </Tab>
      </TabView>
    </SafeAreaView>
  );
};
