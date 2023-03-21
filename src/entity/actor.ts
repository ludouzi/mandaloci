import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm/browser';
import {MaxLength, IsBoolean, IsDateString} from 'class-validator';
import {Character} from './character';

@Entity('actor')
export class Actor {
  @PrimaryGeneratedColumn()
  id: number = 0;

  @Column('varchar', {unique: true})
  initial: string = '';

  @Column('varchar')
  @MaxLength(30, {message: 'Actor name is too long'})
  value: string = '';

  @Column('varchar')
  examples: string = '';

  @Column('boolean')
  @IsBoolean()
  isLearned: boolean = false;

  @Column('varchar')
   @IsDateString()
  dueDate: string = '';

  @OneToMany(() => Character, character => character.actor)
  characters: Character[];
}
