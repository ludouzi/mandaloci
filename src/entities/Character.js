import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm/browser';
import {IsBoolean, IsDateString} from 'class-validator';
import Actor from './Actor';
import Location from './Location';
import Prop from './Prop';

@Entity('character')
class Character {
  @PrimaryGeneratedColumn()
  id;

  @Column('varchar', {unique: true})
  hanzi;

  @Column('varchar')
  pinyin;

  @Column('varchar')
  value;

  @Column('boolean')
  @IsBoolean()
  isLearned;

  @Column('varchar')
  @IsDateString()
  dueDate;

  @ManyToOne(() => Actor, actor => actor.character, {eager: true})
  actor;

  @ManyToOne(() => Location, location => location.character, {eager: true})
  location;

  @ManyToMany(() => Prop, {eager: true})
  @JoinTable()
  props;
}

export default Character;
