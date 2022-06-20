import React from 'react';
import {Text} from '@ui-kitten/components';

export const CharacterCard = (page, flipped) => {
  return (
    <>
      {!flipped ? (
        <>
          <Text category="h5">Character Review</Text>
          <Text category="h1">{page.hanzi}</Text>
          <Text category="p1">What does this character mean?</Text>
        </>
      ) : (
        <Text category="h1">{page.value}</Text>
      )}
    </>
  );
};
