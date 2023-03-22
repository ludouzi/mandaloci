import React from 'react';
import {Layout, Divider, Text, RadioGroup, Radio} from '@ui-kitten/components';
import {style} from '../style/style';
import {ChoiceInput} from '../component/choiceinput';
import {UnlockPage} from '../component/unlockpage';

export const PropPage = (page: any, ctrl: any) => {
  return (
    <Layout style={style.pageContainer}>
      <UnlockPage comp={page.comp} type={'component'} />
      <RadioGroup
        selectedIndex={ctrl.selectedRadio}
        onChange={index => ctrl.setRadio(index)}>
        {page.examples.split(',').map((ex: string, index: number) => {
          return <Radio key={index}>{ex}</Radio>;
        })}
        <Radio>Custom...</Radio>
      </RadioGroup>
      {ctrl.selectedRadio === page.examples.split(',').length && (
        <ChoiceInput func={ctrl.handleInput} />
      )}
    </Layout>
  );
};
