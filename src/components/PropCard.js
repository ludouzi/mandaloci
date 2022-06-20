import React from 'react';
import {Text} from '@ui-kitten/components';

export const PropCard = (page, flipped) => {
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
