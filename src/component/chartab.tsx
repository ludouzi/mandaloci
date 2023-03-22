import React from 'react';
import {Layout, List, Card, Text} from '@ui-kitten/components';
import {CharTabController} from '../controller/chartabcontroller';
import {SearchBar} from './searchbar';
import {EmptyList} from './emptylist';
import {style} from '../style/style';
import {TabView} from './tabview';

export const CharTab = () => {
  const ctrl = CharTabController();

  return (
    <TabView>
      {ctrl.characters.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={style.container}
            data={ctrl.characters}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={true}
            renderItem={char => {
              return (
                <Layout key={char.item.id} style={style.listContainer}>
                  <Card style={style.firstCard} disabled={true}>
                    <Text>{char.item.hanzi}</Text>
                  </Card>
                  <Card style={style.pinyinCard} disabled={true}>
                    <Text>{char.item.pinyin}</Text>
                  </Card>
                  <Card style={style.editCard} disabled={true}>
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
    </TabView>
  );
};
