import React from 'react';
import {Text} from '@ui-kitten/components';
import {Prop} from '../entity/prop';

export const PropCard = (page: Prop, flipped: boolean) => {
  return (
    <>
      {!flipped ? (
        <>
          <Text category="h5">Prop Review</Text>
          <Text category="h1">{page.comp}</Text>
          <Text category="p1">Which prop does this component represent?</Text>
        </>
      ) : (
        <Text category="h1">{page.value}</Text>
      )}
    </>
  );
};
