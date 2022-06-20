import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, Card, Text} from '@ui-kitten/components';
import {CharTabController} from '../controllers/CharTabController';
import {SearchBar} from './SearchBar';
import {EmptyList} from './EmptyList';
import {styles} from '../styles/styles';

export const CharTab = () => {
  const ctrl = CharTabController();

  return (
    <SafeAreaView>
      {ctrl.characters.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={styles.container}
            data={ctrl.characters}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={char => {
              return (
                <Layout key={char.item.id} style={styles.listContainer}>
                  <Card style={styles.firstCard} disabled={true}>
                    <Text>{char.item.hanzi}</Text>
                  </Card>
                  <Card style={styles.pinyinCard} disabled={true}>
                    <Text>{char.item.pinyin}</Text>
                  </Card>
                  <Card style={styles.editCard} disabled={true}>
                    <Text>{char.item.value}</Text>
                  </Card>
                </Layout>
              );
            }}
          />
        </>
      ) : (
        <EmptyList text="characters" />
      )}
    </SafeAreaView>
  );
};
