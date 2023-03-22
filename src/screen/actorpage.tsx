import React from 'react';
import {Layout, Divider, Text, RadioGroup, Radio} from '@ui-kitten/components';
import {style} from '../style/style';
import {ChoiceInput} from '../component/choiceinput';

export const ActorPage = (page: any, ctrl: any) => {
  return (
    <Layout style={style.pageContainer}>
      <Layout style={style.titleView}>
        <Text style={style.pageTitle}>{page.initial}</Text>
      </Layout>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <Text>You've unlocked a new initial!</Text>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <RadioGroup
        selectedIndex={ctrl.selectedRadio}
        onChange={index => ctrl.setRadio(index)}>
        {page.examples.split(',').map((ex: string, index: number) => {
          return <Radio key={index}>{ex}</Radio>;
        })}
        <Radio>Custom..</Radio>
      </RadioGroup>
      {ctrl.selectedRadio === page.examples.split(',').length && (
        <ChoiceInput func={ctrl.handleInput} />
      )}
    </Layout>
  );
};
