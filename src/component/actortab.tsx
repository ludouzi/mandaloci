import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, Card, Text, Input, Button} from '@ui-kitten/components';
import {ActorTabController} from '../controller/actortabcontroller';
import {SearchBar} from './searchbar';
import {EmptyList} from './emptylist';
import {style} from '../style/style';

export const ActorTab = () => {
  const ctrl = ActorTabController();

  function handleEdit(id: number, value: string) {
    return ctrl.isVisible && ctrl.id === id ? (
      <>
        <Input
          onChangeText={text => ctrl.handleInput(text)}
          onSubmitEditing={() => ctrl.validateInput}>
          <Text>{value}</Text>
        </Input>
        <Button
          disabled={
            ctrl.currentText === '' || ctrl.currentText === value ? true : false
          }
          style={style.saveButton}
          onPress={ctrl.handleSave}>
          Save
        </Button>
      </>
    ) : (
      <Text>{value}</Text>
    );
  }

  function cardStyle(id: number) {
    return ctrl.isVisible && ctrl.id === id
      ? style.editingCard
      : style.editCard;
  }

  return (
    <SafeAreaView>
      {ctrl.actors.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={style.container}
            data={ctrl.actors}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={actor => {
              return (
                <Layout key={actor.item.id} style={style.listContainer}>
                  <Card style={style.firstCard} disabled={true}>
                    <Text>{actor.item.initial}</Text>
                  </Card>
                  <Card
                    style={cardStyle(actor.item.id)}
                    onPress={() =>
                      ctrl.handlePress(actor.item.id, actor.item.value)
                    }>
                    {handleEdit(actor.item.id, actor.item.value)}
                  </Card>
                </Layout>
              );
            }}
          />
        </>
      ) : (
        <EmptyList text="actors" />
      )}
    </SafeAreaView>
  );
};
