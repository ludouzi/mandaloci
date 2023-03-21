import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, Card, Text, Input, Button} from '@ui-kitten/components';
import {LocationTabController} from '../controller/locationtabcontroller';
import {SearchBar} from './searchbar';
import {EmptyList} from './emptylist';
import {style} from '../style/style';

export const LocationTab = () => {
  const ctrl = LocationTabController();

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
      {ctrl.locations.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={style.container}
            data={ctrl.locations}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={location => {
              return (
                <Layout key={location.item.id} style={style.listContainer}>
                  <Card style={style.firstCard} disabled={true}>
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
