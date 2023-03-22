import React from 'react';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {style} from '../style/style';
import {ChoiceInput} from '../component/choiceinput';
import {Location} from '../entity/location';
import {UnlockPage} from '../component/unlockpage';

export const LocationPage = (page: Location, ctrl: any) => {
  return (
    <Layout style={style.pageContainer}>
      <UnlockPage comp={page.final} type={'final'} />
      <ChoiceInput func={ctrl.handleInput} />
    </Layout>
  );
};
