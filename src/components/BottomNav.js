import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LessonsScreen from '../screens/LessonsScreen';
import CardsScreen from '../screens/CardsScreen';
import LibraryScreen from '../screens/LibraryScreen';

const {Navigator, Screen} = createBottomTabNavigator();

export const LessonIcon = props => <Icon name="book-open-outline" {...props} />;

export const CardsIcon = props => <Icon name="layers-outline" {...props} />;

export const LibraryIcon = props => <Icon name="keypad-outline" {...props} />;

const BottomTabBar = ({navigation, state}) => (
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
