import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {MaxLength, IsBoolean, IsDateString} from 'class-validator';

@Entity('actor')
class Actor {
  @PrimaryGeneratedColumn()
  id;

  @Column('varchar', {unique: true})
  initial;

  @Column('varchar')
  @MaxLength(30, {message: 'Actor name is too long'})
  value;

  @Column('varchar')
  examples;

  @Column('boolean')
  @IsBoolean()
  isLearned = false;

  @Column('varchar')
  @IsDateString()
  dueDate;
}

export default Actor;
