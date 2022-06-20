import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import 'reflect-metadata';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from './styles/theme.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigator} from './components/BottomNav';
import {PageScreen} from './screens/PageScreen';
import {ReviseScreen} from './screens/ReviseScreen';
import {TutorialScreen} from './screens/TutorialScreen';

const {Navigator, Screen} = createNativeStackNavigator();

export default () => {
  const [displayTutorial, setDisplayTutorial] = useState(true);

  const chooseScreen = async () => {
    try {
      const value = await AsyncStorage.getItem('@tutorial_Key');
      if (value !== null) {
        setDisplayTutorial(false);
      } else {
        await AsyncStorage.setItem('@tutorial_Key', 'true');
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    chooseScreen();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        <NavigationContainer>
          <Navigator>
            {displayTutorial && (
              <Screen
                name="TutorialStart"
                component={TutorialScreen}
                options={{headerShown: false}}
              />
            )}
            <Screen
              name="Home"
              component={BottomNavigator}
              options={{headerShown: false}}
            />
            <Screen
              name="PageScreen"
              component={PageScreen}
              options={{headerShown: false}}
            />
            <Screen
              name="ReviseScreen"
              component={ReviseScreen}
              options={{headerShown: false}}
            />
            <Screen
              name="Tutorial"
              component={TutorialScreen}
              options={{headerShown: false}}
            />
          </Navigator>
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
