import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {styles} from '../styles/styles';

export const EmptyList = ({text}) => {
  return (
    <Layout style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No {text} unlocked</Text>
    </Layout>
  );
};
