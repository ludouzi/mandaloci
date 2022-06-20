import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, Card, Text, Input, Button} from '@ui-kitten/components';
import {ActorTabController} from '../controllers/ActorTabController';
import {SearchBar} from './SearchBar';
import {EmptyList} from './EmptyList';
import {styles} from '../styles/styles';

export const ActorTab = () => {
  const ctrl = ActorTabController();

  function handleEdit(id, value) {
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
          style={styles.saveButton}
          onPress={ctrl.handleSave}>
          Save
        </Button>
      </>
    ) : (
      <Text>{value}</Text>
    );
  }

  function cardStyle(id) {
    return ctrl.isVisible && ctrl.id === id
      ? styles.editingCard
      : styles.editCard;
  }

  return (
    <SafeAreaView>
      {ctrl.actors.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={styles.container}
            data={ctrl.actors}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={actor => {
              return (
                <Layout key={actor.item.id} style={styles.listContainer}>
                  <Card style={styles.firstCard} disabled={true}>
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
