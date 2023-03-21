import React from 'react';
import {SafeAreaView} from 'react-native';
import {Layout, List, Card, Text, Input, Button} from '@ui-kitten/components';
import {PropTabController} from '../controller/proptabcontroller';
import {SearchBar} from './searchbar';
import {EmptyList} from './emptylist';
import {style} from '../style/style';

export const PropTab = () => {
  const ctrl = PropTabController();

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
      {ctrl.props.length >= 1 ? (
        <>
          <SearchBar queryData={ctrl.getSearchData} />
          <List
            style={style.container}
            data={ctrl.props}
            keyboardDismissMode={'on-drag'}
            showsVerticalScrollIndicator={false}
            renderItem={prop => {
              return (
                <Layout key={prop.item.id} style={style.listContainer}>
                  <Card style={style.firstCard} disabled={true}>
                    <Text>{prop.item.comp}</Text>
                  </Card>
                  <Card
                    style={cardStyle(prop.item.id)}
                    onPress={() =>
                      ctrl.handlePress(prop.item.id, prop.item.value)
                    }>
                    {handleEdit(prop.item.id, prop.item.value)}
                  </Card>
                </Layout>
              );
            }}
          />
        </>
      ) : (
        <EmptyList text="props" />
      )}
    </SafeAreaView>
  );
};
