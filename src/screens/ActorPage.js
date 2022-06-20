import React from 'react';
import {Layout, Divider, Text, RadioGroup, Radio} from '@ui-kitten/components';
import {styles} from '../styles/styles';
import {ChoiceInput} from '../components/ChoiceInput';

export const ActorPage = (page, ctrl) => {
  return (
    <Layout style={styles.pageContainer}>
      <Layout style={styles.titleView}>
        <Text style={styles.pageTitle}>{page.initial}</Text>
      </Layout>
      <Layout style={styles.pageView}>
        <Divider />
      </Layout>
      <Text>You've unlocked a new initial!</Text>
      <Layout style={styles.pageView}>
        <Divider />
      </Layout>
      <RadioGroup
        selectedIndex={ctrl.selectedRadio}
        onChange={index => ctrl.setRadio(index)}>
        {page.examples.split(',').map((ex, index) => {
          return <Radio key={index}>{ex}</Radio>;
        })}
        <Radio>Custom..</Radio>
      </RadioGroup>
      {ctrl.selectedRadio === page.examples.split(',').length && (
        <ChoiceInput ctrl={ctrl} />
      )}
    </Layout>
  );
};
