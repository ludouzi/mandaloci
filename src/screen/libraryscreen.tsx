import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {TopBar} from '../component/topbar';
import {TopTabs} from '../component/toptabs';

const LibraryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <TopBar />
      <TopTabs />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LibraryScreen;
