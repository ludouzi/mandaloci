import React from 'react';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {style} from '../style/style';

export const UnlockPage = ({comp, type}: {comp: string; type: string}) => {
  return (
    <>
      <Layout style={style.titleView}>
        <Text style={style.pageTitle}>{comp}</Text>
      </Layout>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <Text>You've unlocked a new {type}!</Text>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
    </>
  );
};
