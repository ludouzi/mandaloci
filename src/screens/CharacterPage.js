import React from 'react';
import {Layout, Divider, Text} from '@ui-kitten/components';
import {styles} from '../styles/styles';

export const CharacterPage = page => {
  return (
    <Layout style={styles.pageContainer}>
      <Layout style={styles.titleView}>
        <Text style={styles.pageTitle}>{page.hanzi}</Text>
      </Layout>
      <Layout style={styles.pageView}>
        <Divider />
      </Layout>
      <Layout>
        <Text>You've unlocked a new character!</Text>
      </Layout>
      <Layout style={styles.pageView}>
        <Divider />
      </Layout>
      <Text category="h2">{'\n'}Keyword</Text>
      <Layout>
        <Text style={styles.textRow} category="p1">
          {page.value}
        </Text>
      </Layout>
      <Text category="h2">{'\n'}Pinyin</Text>
      <Layout>
        <Text style={styles.textRow} category="p1">
          {page.pinyin}
        </Text>
      </Layout>
      <Text category="h2">{'\n'}Initial</Text>
      <Layout>
        <Text style={styles.textRow} category="p1">
          {page.actor.initial}
        </Text>
      </Layout>
      <Layout>
        <Text category="h2">{'\n'}Final</Text>
        <Text category="p1">{page.location.final}</Text>
      </Layout>
      <Layout>
        <Text category="h2">{'\n'}Props</Text>
        {page.props.map(prop => {
          return <Text key={prop.id}>{prop.comp}</Text>;
        })}
      </Layout>
    </Layout>
  );
};
