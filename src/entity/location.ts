import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
} from 'typeorm/browser';
import {MaxLength, IsBoolean, IsDateString} from 'class-validator';
import {Character} from './character';

@Entity('location')
export class Location {
  @PrimaryGeneratedColumn()
  id: number = -1;

  @Column('varchar', {unique: true})
  final: string = '';

  @Column('varchar')
   @MaxLength(30, {message: 'Location name is too long'})
  value: string = '';

  @Column('boolean')
  @IsBoolean()
  isLearned: boolean = false;

  @Column('varchar')
  @IsDateString()
  dueDate: string = '';

  @OneToMany(() => Character, character => character.location)
  characters: Character[];
}
