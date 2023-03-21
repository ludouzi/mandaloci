import React from 'react';
import {Layout, Text} from '@ui-kitten/components';
import {style} from '../style/style';

type emptyProps = {
  text: string;
};

export const EmptyList = (props: emptyProps) => {
  return (
    <Layout style={style.emptyContainer}>
      <Text style={style.emptyText}>No {props.text} unlocked</Text>
    </Layout>
  );
};
