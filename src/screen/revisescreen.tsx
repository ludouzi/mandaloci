import {Layout, ViewPager, Button} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {CardController} from '../controller/cardcontroller';
import {Card} from '../types';

export const ReviseScreen = (props: any) => {
  const ctrl = CardController();

  return (
    <SafeAreaView style={styles.container}>
      <ViewPager
        style={styles.container}
        swipeEnabled={true}
        selectedIndex={ctrl.selectedCard}
        onSelect={index => ctrl.setSelectedCard(index)}>
        {props.route.params.cards.map((card: Card, index: number) => {
          return (
            <Layout style={styles.tab} key={index} level="2">
              <Layout style={styles.tab}>{ctrl.getCard(card)}</Layout>
              <Layout style={styles.lessonButtonsContainer}>
                {ctrl.isFlipped ? (
                  <>
                    <Button
                      style={styles.buttonPoor}
                      size={'giant'}
                      onPress={() => ctrl.nextCard(index, 10)}>
                      Poor
                    </Button>
                    <Button
                      style={styles.buttonGood}
                      size={'giant'}
                      onPress={() => ctrl.nextCard(index, 1440)}>
                      Good
                    </Button>
                  </>
                ) : (
                  <Button
                    style={styles.buttonShow}
                    size={'giant'}
                    onPress={ctrl.flipCard}>
                    Show Answer
                  </Button>
                )}
              </Layout>
            </Layout>
          );
        })}
      </ViewPager>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  tab: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {flex: 1},
  lessonButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonShow: {
    width: '100%',
    height: 100,
  },
  buttonPoor: {
    width: '50%',
    height: 100,
    backgroundColor: 'tomato',
    borderColor: 'tomato',
  },
  buttonGood: {
    width: '50%',
    height: 100,
    backgroundColor: 'green',
    borderColor: 'green',
  },
});
