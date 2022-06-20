import {Layout, Button, Text, ViewPager} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {TutorialController} from '../controllers/TutorialController';
import {styles} from '../styles/styles';

export const TutorialScreen = () => {
  const ctrl = TutorialController();

  return (
    <SafeAreaView style={styles.tutorialContainer}>
      {ctrl.pages && (
        <>
          <ViewPager
            style={styles.tutorialContainer}
            swipeEnabled={true}
            selectedIndex={ctrl.selectedPage}
            onSelect={index => ctrl.setSelectedPage(index)}>
            {ctrl.pages.map((page, index) => {
              return (
                <Layout style={styles.tutorialContainer} key={index}>
                  <Layout style={styles.tutorialVew}>
                    <Text category="h3" style={styles.title}>
                      {page.title}
                    </Text>
                    <Text category="p1" style={styles.subtitle}>
                      {page.subtitle}
                    </Text>
                  </Layout>
                </Layout>
              );
            })}
          </ViewPager>
          <Layout style={styles.lessonButtonsContainer}>
            {ctrl.selectedPage + 1 !== ctrl.pages.length ? (
              <Button
                style={styles.lessonButton}
                size={'giant'}
                onPress={ctrl.nextPage}>
                Next
              </Button>
            ) : (
              <Button
                style={styles.lessonButton}
                size={'giant'}
                onPress={ctrl.finishTutorial}>
                Finish
              </Button>
            )}
          </Layout>
        </>
      )}
    </SafeAreaView>
  );
};
