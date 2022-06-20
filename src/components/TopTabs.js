import React from 'react';
import {Tab, TabView} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {ActorTab} from './ActorTab';
import {LocationTab} from './LocationTab';
import {PropTab} from './PropTab';
import {CharTab} from './CharTab';
import {styles} from '../styles/styles';

export const TopTabs = () => {
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  return (
    <SafeAreaView style={styles.tabContainer}>
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
