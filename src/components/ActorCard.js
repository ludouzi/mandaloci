import React from 'react';
import {Text} from '@ui-kitten/components';

export const ActorCard = (page, flipped) => {
  return (
    <>
      {!flipped ? (
        <>
          <Text category="h5">Actor Review</Text>
          <Text category="h1">{page.initial}</Text>
          <Text category="p1">Which actor is represented by this initial?</Text>
        </>
      ) : (
        <Text category="h1">{page.value}</Text>
      )}
    </>
  );
};
