import React from 'react';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {styles} from '../styles/styles';
import {ChoiceInput} from '../components/ChoiceInput';

export const LocationPage = (page, ctrl) => {
  return (
    <Layout style={styles.pageContainer}>
      <Layout style={styles.titleView}>
        <Text style={styles.pageTitle}>{page.final}</Text>
      </Layout>
      <Layout style={styles.pageView}>
        <Divider />
      </Layout>
      <Text>You've unlocked a new final!</Text>
      <Layout style={styles.pageView}>
        <Divider />
      </Layout>
      <ChoiceInput ctrl={ctrl} />
    </Layout>
  );
};
