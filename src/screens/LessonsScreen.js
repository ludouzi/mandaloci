import React from 'react';
import {Layout, List, Card, Text, Spinner} from '@ui-kitten/components';
import {SafeAreaView} from 'react-native';
import {TopBar} from '../components/TopBar';
import {styles} from '../styles/styles';
import {LessonController} from '../controllers/LessonController';

export const LessonsScreen = () => {
  const ctrl = LessonController();

  return (
    <SafeAreaView style={styles.tabContainer}>
      <TopBar />
      {ctrl.chars ? (
        <>
          <Card style={styles.container} onPress={ctrl.startTutorial}>
            <Text style={styles.lessonTitle}>Tutorial</Text>
          </Card>
          <List
            style={styles.container}
            data={ctrl.chars}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={data => {
              return (
                <Layout style={styles.container}>
                  <Card
                    style={
                      data.index !== 0 && !ctrl.chars[data.index - 1].isLearned
                        ? styles.cardDisabled
                        : styles.card
                    }
                    onPress={() => ctrl.startLesson(data.item.id)}
                    disabled={
                      data.index !== 0 && !ctrl.chars[data.index - 1].isLearned
                    }>
                    <Text style={styles.lessonTitle}>
                      Lesson {data.index + 1}
                    </Text>
                    <Text style={styles.lessonTitle}>{data.item.hanzi}</Text>
                  </Card>
                </Layout>
              );
            }}
          />
        </>
      ) : (
        <Layout style={styles.reviseContainer}>
          <Spinner size="giant" />
        </Layout>
      )}
    </SafeAreaView>
  );
};

export default LessonsScreen;
