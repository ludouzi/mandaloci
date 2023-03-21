import {Layout, Button, ViewPager} from '@ui-kitten/components';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {LessonController} from '../controller/lessoncontroller';
import {style} from '../style/style';
import {Card} from '../types';

export const PageScreen = (props: any) => {
  const ctrl = LessonController();

  return (
    <SafeAreaView style={style.tutorialContainer}>
      <ViewPager
        style={style.tutorialContainer}
        swipeEnabled={false}
        selectedIndex={ctrl.selectedPage}
        onSelect={index => ctrl.setPage(index)}>
        {props.route.params.pages.map((page: Card, index: number) => {
          return (
            <Layout style={style.tab} key={index} level="2">
              <Layout style={style.tab}>{ctrl.getScreen(page, ctrl)}</Layout>
              <Layout style={style.buttonsContainer}>
                {props.route.params.pages.length !== index + 1 ? (
                  <Button
                    disabled={ctrl.checkInput(page)}
                    style={style.lessonButton}
                    size={'giant'}
                    onPress={() => ctrl.nextPage(page)}>
                    Next
                  </Button>
                ) : (
                  <Button
                    style={style.lessonButton}
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
