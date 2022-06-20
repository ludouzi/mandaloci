import React from 'react';
import {Layout, Input} from '@ui-kitten/components';
import {SafeAreaView, StyleSheet} from 'react-native';

export const SearchBar = props => {
  return (
    <SafeAreaView>
      <Layout>
        <Input
          style={styles.searchInput}
          placeholder="Search..."
          onChangeText={searchValue => {
            props.queryData(searchValue);
          }}
          size={'small'}
        />
      </Layout>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    marginLeft: '2%',
    marginRight: '2%',
    marginTop: '2%',
    marginBottom: '2%',
    borderRadius: 12,
  },
});
