import {Layout, Button, ViewPager} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {LessonController} from '../controllers/LessonController';
import {styles} from '../styles/styles';

export const PageScreen = props => {
  const ctrl = LessonController();

  return (
    <SafeAreaView style={styles.tutorialContainer}>
      <ViewPager
        style={styles.tutorialContainer}
        swipeEnabled={false}
        selectedIndex={ctrl.selectedPage}
        onSelect={index => ctrl.setPage(index)}>
        {props.route.params.pages.map((page, index) => {
          return (
            <Layout style={styles.tab} key={index} level="2">
              <Layout style={styles.tab}>{ctrl.getScreen(page, ctrl)}</Layout>
              <Layout style={styles.buttonsContainer}>
                {props.route.params.pages.length !== index + 1 ? (
                  <Button
                    disabled={ctrl.checkInput(page)}
                    style={styles.lessonButton}
                    size={'giant'}
                    onPress={() => ctrl.nextPage(page)}>
                    Next
                  </Button>
                ) : (
                  <Button
                    style={styles.lessonButton}
                    size={'giant'}
                    onPress={() => ctrl.finishLesson(page)}>
                    Finish Lesson
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
