import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, Card, Text, Input, Button} from '@ui-kitten/components';
import {LocationTabController} from '../controllers/LocationTabController';
import {SearchBar} from './SearchBar';
import {EmptyList} from './EmptyList';
import {styles} from '../styles/styles';

export const LocationTab = () => {
  const ctrl = LocationTabController();

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
      {ctrl.locations.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={styles.container}
            data={ctrl.locations}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={location => {
              return (
                <Layout key={location.item.id} style={styles.listContainer}>
                  <Card style={styles.firstCard} disabled={true}>
                    <Text>{location.item.final}</Text>
                  </Card>
                  <Card
                    style={cardStyle(location.item.id)}
                    onPress={() =>
                      ctrl.handlePress(location.item.id, location.item.value)
                    }>
                    {handleEdit(location.item.id, location.item.value)}
                  </Card>
                </Layout>
              );
            }}
          />
        </>
      ) : (
        <EmptyList text="locations" />
      )}
    </SafeAreaView>
  );
};
