import React from 'react';
import {Text} from '@ui-kitten/components';
import {Character} from '../entity/character';

export const CharacterCard = (page: Character, flipped: boolean) => {
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
