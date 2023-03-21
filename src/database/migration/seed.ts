import {MigrationInterface, QueryRunner} from 'typeorm';
import {Actor} from '../../entity/actor';
import {Location} from '../../entity/location';
import {Prop} from '../../entity/prop';
import {Character} from '../../entity/character';

export class seedDatabase implements MigrationInterface {
  name = 'initialSeed';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const sh = await queryRunner.manager.save(
      queryRunner.manager.create<Actor>(Actor, {
        initial: 'sh',
        examples: 'Sean Connery,Sean Bean',
      }),
    );

    const g = await queryRunner.manager.save(
      queryRunner.manager.create<Actor>(Actor, {
        initial: 'g',
        examples: 'Gordon Ramsay,Gary Oldman,Gary Cooper',
      }),
    );

    const nll = await queryRunner.manager.save(
      queryRunner.manager.create<Location>(Location, {
        final: 'Ø (Null)',
      }),
    );

    const an = await queryRunner.manager.save(
      queryRunner.manager.create<Location>(Location, {
        final: 'an',
      }),
    );

    const sng = await queryRunner.manager.save(
      queryRunner.manager.create<Prop>(Prop, {
        comp: '一',
        examples: 'Cigar,Razor blade',
      }),
    );

    const two = await queryRunner.manager.save(
      queryRunner.manager.create<Prop>(Prop, {
        comp: '二',
        examples: 'Two Towers,Two earings',
      }),
    );

    const ten = await queryRunner.manager.save(
      queryRunner.manager.create<Character>(Character, {
        hanzi: '十',
        pinyin: 'shí',
        value: 'Ten',
        actor: sh,
        location: nll,
        props: [sng, two],
      }),
    );

    const syr = await queryRunner.manager.save(
      queryRunner.manager.create<Prop>(Prop, {
        comp: '十',
        examples: 'Syringe,Crucifix,Screwdriver,Scarecrow',
      }),
    );

    const dry = await queryRunner.manager.save(
      queryRunner.manager.create<Character>(Character, {
        hanzi: '干',
        pinyin: 'gān',
        value: 'Dry',
        actor: g,
        location: an,
        props: [sng, two],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE * FROM actor`);
    await queryRunner.query(`DELETE * FROM location`);
    await queryRunner.query(`DELETE * FROM prop`);
    await queryRunner.query(`DELETE * FROM character_props_prop`);
    await queryRunner.query(`DELETE * FROM character`);
  }
}
