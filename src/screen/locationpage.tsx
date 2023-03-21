import React from 'react';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {style} from '../style/style';
import {ChoiceInput} from '../component/choiceinput';
import {Location} from '../entity/location';

export const LocationPage = (page: Location, ctrl: any) => {
  return (
    <Layout style={style.pageContainer}>
      <Layout style={style.titleView}>
        <Text style={style.pageTitle}>{page.final}</Text>
      </Layout>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <Text>You've unlocked a new final!</Text>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <ChoiceInput ctrl={ctrl} />
    </Layout>
  );
};
