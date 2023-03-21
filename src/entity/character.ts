import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm/browser';
import {IsBoolean, IsDateString} from 'class-validator';
import {Actor} from './actor';
import {Location} from './location';
import {Prop} from './prop';

@Entity('character')
export class Character {
  @PrimaryGeneratedColumn()
  id: number = -1;

  @Column('varchar', {unique: true})
  hanzi: string = '';

  @Column('varchar')
  pinyin: string = '';

  @Column('varchar')
  value: string = '';

  @Column('boolean')
  @IsBoolean()
  isLearned: boolean = false;

  @Column('varchar')
  @IsDateString()
  dueDate: string = '';

  @ManyToOne(() => Actor, actor => actor.characters, {eager: true})
  actor: Actor = new Actor();

  @ManyToOne(() => Location, location => location.characters, {eager: true})
  location: Location = new Location();

  @ManyToMany(() => Prop, {eager: true})
  @JoinTable()
  props: Prop[];
}
