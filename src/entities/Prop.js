import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {MaxLength, IsBoolean, IsDateString} from 'class-validator';

@Entity('prop')
class Prop {
  @PrimaryGeneratedColumn()
  id;

  @Column('varchar', {unique: true})
  comp;

  @Column('varchar')
  @MaxLength(30, {message: 'Prop value is too long'})
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

export default Prop;
