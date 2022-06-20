import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Card, Text} from '@ui-kitten/components';
import {styles} from '../styles/styles';
import {TopBar} from '../components/TopBar';
import {CardController} from '../controllers/CardController';

const CardsScreen = () => {
  const ctrl = CardController();

  return (
    <SafeAreaView style={styles.cardContainer}>
      <TopBar />
      <Layout style={styles.reviseContainer}>
        {ctrl.total >= 1 ? (
          <Card
            style={styles.reviseCard}
            disabled={ctrl.total === 0}
            onPress={() => ctrl.startSession(ctrl)}>
            <Text style={styles.reviseText}>Revise due cards</Text>
            <Text style={styles.cardTotal}>
              {ctrl.total} <Text>cards due</Text>
            </Text>
          </Card>
        ) : (
          <Text style={styles.reviseText}>No cards due</Text>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default CardsScreen;
