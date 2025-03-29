import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IEmployerEntity } from './employer.interface';
import { EmployerStatusEnum } from './employer.enum';
import { UserEntity } from '../users/user.entity';
import { IUserEntity } from '../users/user.interface';

@Entity('employer')
export class EmployerEntity extends BaseEntity implements IEmployerEntity {
  @Column({ type: 'varchar', length: 255 })
  companyName: string;

  @Column({ type: 'varchar', length: 500 })
  description: string;

  @Column({ type: 'varchar', length: 500 })
  industry: string;

  @Column({ type: 'varchar', length: 500 })
  address: string;

  @Column({ type: 'varchar', length: 12 })
  phone: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({
    type: 'enum',
    enum: EmployerStatusEnum,
    enumName: 'employer_status_enum',
    nullable: false,
  })
  status: EmployerStatusEnum;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: IUserEntity;
}
