import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  Unique,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IStudentEntity } from './student.interface';
import { UserEntity } from '../users/user.entity';
import { IUserEntity } from '../users/types/entity.type';
import { StatusEnum } from '../../common/enums/status.enum';
import { FileEntity } from '../file/file.entity';
import { IFileEntity } from '../file/file.interface';

@Entity('student')
@Unique(['student_id'])
export class StudentEntity extends BaseEntity implements IStudentEntity {
  @Column({ type: 'integer', nullable: false })
  student_id: number;

  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phone_number: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  access_token: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  refresh_token: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    enumName: 'student_status_enum',
    default: StatusEnum.ACTIVE,
  })
  status: StatusEnum;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: IUserEntity;

  @ManyToOne(() => FileEntity)
  @JoinColumn({ name: 'logo', referencedColumnName: 'hashId' })
  file?: IFileEntity;
}
