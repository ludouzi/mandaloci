import {Layout, Button, Text, ViewPager} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {TutorialController} from '../controller/tutorialcontroller';
import {style} from '../style/style';

export const TutorialScreen = () => {
  const ctrl = TutorialController();

  return (
    <SafeAreaView style={style.tutorialContainer}>
      {ctrl.pages && (
        <>
          <ViewPager
            style={style.tutorialContainer}
            swipeEnabled={true}
            selectedIndex={ctrl.selectedPage}
            onSelect={index => ctrl.setSelectedPage(index)}>
            {ctrl.pages.map((page, index: number) => {
              return (
                <Layout style={style.tutorialContainer} key={index}>
                  <Layout style={style.tutorialVew}>
                    <Text category="h3" style={style.title}>
                      {page.title}
                    </Text>
                    <Text category="p1" style={style.subtitle}>
                      {page.subtitle}
                    </Text>
                  </Layout>
                </Layout>
              );
            })}
          </ViewPager>
          <Layout style={style.buttonsContainer}>
            {ctrl.selectedPage + 1 !== ctrl.pages.length ? (
              <Button
                style={style.lessonButton}
                size={'giant'}
                onPress={ctrl.nextPage}>
                Next
              </Button>
            ) : (
              <Button
                style={style.lessonButton}
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
