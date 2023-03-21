import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LessonsScreen from '../screen/lessonsscreen';
import CardsScreen from '../screen/cardsscreen';
import LibraryScreen from '../screen/libraryscreen';

const {Navigator, Screen} = createBottomTabNavigator();

export const LessonIcon = (props: any) => (
  <Icon name="book-open-outline" {...props} />
);

export const CardsIcon = (props: any) => (
  <Icon name="layers-outline" {...props} />
);

export const LibraryIcon = (props: any) => (
  <Icon name="keypad-outline" {...props} />
);

const BottomTabBar = ({navigation, state}: any) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}>
    <BottomNavigationTab icon={LessonIcon} title="Lessons" />
    <BottomNavigationTab icon={CardsIcon} title="Cards" />
    <BottomNavigationTab icon={LibraryIcon} title="Library" />
  </BottomNavigation>
);

export const BottomNavigator = () => (
  <Navigator tabBar={props => <BottomTabBar {...props} />}>
    <Screen
      name="Lessons"
      component={LessonsScreen}
      options={{headerShown: false}}
    />
    <Screen
      name="Cards"
      component={CardsScreen}
      options={{headerShown: false}}
    />
    <Screen
      name="Library"
      component={LibraryScreen}
      options={{headerShown: false}}
    />
  </Navigator>
);
