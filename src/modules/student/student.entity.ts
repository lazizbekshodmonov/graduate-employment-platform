import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IStudentEntity } from './student.interface';
import { UserEntity } from '../users/user.entity';
import { IUserEntity } from '../users/types/entity.type';

@Entity('student')
export class StudentEntity extends BaseEntity implements IStudentEntity {
  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @Column({ type: 'varchar', length: 255 })
  middle_name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone_number: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: IUserEntity;
}
