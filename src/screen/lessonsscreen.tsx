import React from 'react';
import {Layout, List, Card, Text, Spinner} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {TopBar} from '../component/topbar';
import {style} from '../style/style';
import {LessonController} from '../controller/lessoncontroller';

export const LessonsScreen = () => {
  const ctrl = LessonController();

  return (
    <SafeAreaView style={style.tabContainer}>
      <TopBar />
      {ctrl.chars ? (
        <>
          <Card style={style.container} onPress={ctrl.startTutorial}>
            <Text style={style.lessonTitle}>Tutorial</Text>
          </Card>
          <List
            style={style.container}
            data={ctrl.chars}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={data => {
              return (
                <Layout style={style.container}>
                  <Card
                    style={
                      data.index !== 0 && !ctrl.chars[data.index - 1].isLearned
                        ? style.cardDisabled
                        : style.card
                    }
                    onPress={() => ctrl.startLesson(data.item.id)}
                    disabled={
                      data.index !== 0 && !ctrl.chars[data.index - 1].isLearned
                    }>
                    <Text style={style.lessonTitle}>
                      Lesson {data.index + 1}
                    </Text>
                    <Text style={style.lessonTitle}>{data.item.hanzi}</Text>
                  </Card>
                </Layout>
              );
            }}
          />
        </>
      ) : (
        <Layout style={style.reviseContainer}>
          <Spinner size="giant" />
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default LessonsScreen;
