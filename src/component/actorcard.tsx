import React from 'react';
import {Text, TextElement} from '@ui-kitten/components';
import {Actor} from '../entity/actor';

export const ActorCard = (page: Actor, flipped: boolean) => {
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
