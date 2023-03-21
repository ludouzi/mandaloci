import React from 'react';
import {Layout, Divider, Text, TextElement} from '@ui-kitten/components';
import {style} from '../style/style';
import {Character} from '../entity/character';
import {Prop} from '../entity/prop';

export const CharacterPage = (page: Character) => {
  return (
    <Layout style={style.pageContainer}>
      <Layout style={style.titleView}>
        <Text style={style.pageTitle}>{page.hanzi}</Text>
      </Layout>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <Layout>
        <Text>You've unlocked a new character!</Text>
      </Layout>
      <Layout style={style.pageView}>
        <Divider />
      </Layout>
      <Text category="h2">{'\n'}Keyword</Text>
      <Layout>
        <Text style={style.textRow} category="p1">
          {page.value}
        </Text>
      </Layout>
      <Text category="h2">{'\n'}Pinyin</Text>
      <Layout>
        <Text style={style.textRow} category="p1">
          {page.pinyin}
        </Text>
      </Layout>
      <Text category="h2">{'\n'}Initial</Text>
      <Layout>
        <Text style={style.textRow} category="p1">
          {page.actor.initial}
        </Text>
      </Layout>
      <Layout>
        <Text category="h2">{'\n'}Final</Text>
        <Text category="p1">{page.location.final}</Text>
      </Layout>
      <Layout>
        <Text category="h2">{'\n'}Props</Text>
        {page.props.map((prop: Prop) => {
          return <Text key={prop.id}>{prop.comp}</Text>;
        })}
      </Layout>
    </Layout>
  );
};
