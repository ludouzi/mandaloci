import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, Card, Text} from '@ui-kitten/components';
import {style} from '../style/style';
import {TopBar} from '../component/topbar';
import {CardController} from '../controller/cardcontroller';

const CardsScreen = () => {
  const ctrl = CardController();

  return (
    <SafeAreaView style={style.cardContainer}>
      <TopBar />
      <Layout style={style.reviseContainer}>
        {ctrl.total >= 1 ? (
          <Card
            style={style.reviseCard}
            disabled={ctrl.total === 0}
            onPress={() => ctrl.startSession()}>
            <Text style={style.reviseText}>Revise due cards</Text>
            <Text style={style.cardTotal}>
              {ctrl.total} <Text>cards due</Text>
            </Text>
          </Card>
        ) : (
          <Text style={style.reviseText}>No cards due</Text>
        )}
      </Layout>
    </SafeAreaView>
  );
};

export default CardsScreen;
