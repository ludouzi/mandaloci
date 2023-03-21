import {Entity, PrimaryGeneratedColumn, Column} from 'typeorm/browser';
import {MaxLength, IsBoolean, IsDateString} from 'class-validator';

@Entity('prop')
export class Prop {
  @PrimaryGeneratedColumn()
  id: number = -1;

  @Column('varchar', {unique: true})
  comp: string = '';

  @Column('varchar')
  @MaxLength(30, {message: 'Prop value is too long'})
  value: string = '';

  @Column('varchar')
  examples: string = '';

  @Column('boolean')
  @IsBoolean()
  isLearned: boolean = false;

  @Column('varchar')
  @IsDateString()
  dueDate: string = '';
}
