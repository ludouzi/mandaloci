import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {MaxLength, IsBoolean, IsDateString} from 'class-validator';

@Entity('location')
class Location {
  @PrimaryGeneratedColumn()
  id;

  @Column('varchar', {unique: true})
  final;

  @Column('varchar')
  @MaxLength(30, {message: 'Location name is too long'})
  value;

  @Column('boolean')
  @IsBoolean()
  isLearned = false;

  @Column('varchar')
  @IsDateString()
  dueDate;
}

export default Location;
