import React from 'react';
import {Text} from '@ui-kitten/components';
import {Location} from '../entity/location';

export const LocationCard = (page: Location, flipped: boolean) => {
  return (
    <>
      {!flipped ? (
        <>
          <Text category="h5">Location Review</Text>
          <Text category="h1">{page.final}</Text>
          <Text category="p1">
            Which location is represented by this final?
          </Text>
        </>
      ) : (
        <Text category="h1">{page.value}</Text>
      )}
    </>
  );
};
