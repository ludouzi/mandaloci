import React, {useCallback, useEffect, ReactNode, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {default as theme} from './style/theme.json';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {BottomNavigator} from './component/bottomnav';
import {PageScreen} from './screen/pagescreen';
import {ReviseScreen} from './screen/revisescreen';
import {TutorialScreen} from './screen/tutorialscreen';
import {createConnection, getRepository, Connection} from 'typeorm/browser';

import {Actor} from './entity/actor';
import {Character} from './entity/character';
import {Location} from './entity/location';
import {Prop} from './entity/prop';
import {StackParamList} from './types';

const {Navigator, Screen} = createNativeStackNavigator<StackParamList>();

const App: () => ReactNode = () => {
  const [connection, setConnection] = useState<Connection | null>(null);
  const [displayTutorial, setDisplayTutorial] = useState(true);

  const setupConnection = useCallback(async () => {
    try {
      await createConnection({
        type: 'react-native',
        database: 'mandaloci',
        extra: {
          createFromLocation: '~/database/mandaloci.db',
        },
        location: 'default',
        logging: ['error', 'warn'],
        synchronize: false,
        entities: [Actor, Location, Prop, Character],
      })
        .then(async connection => {
          setConnection(connection);
          // connection.synchronize();
        })
        .catch(error => console.log(error));
    } catch (error) {
      console.log(error);
    }
  }, []);

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
    if (!connection) {
      setupConnection();
    }
    chooseScreen();
  }, []);

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={{...eva.dark, ...theme}}>
        {connection && (
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
        )}
      </ApplicationProvider>
    </>
  );
};

export default App;
