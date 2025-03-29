import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IAdminEntity } from './admin.interface';
import { AdminStatusEnum } from './admin.enum';
import { UserEntity } from '../users/user.entity';

@Entity('admins')
export class AdminEntity extends BaseEntity implements IAdminEntity {
  @Column({ type: 'varchar', length: 255 })
  full_name: string;

  @Column({ type: 'varchar', length: 255 })
  description: string;

  @Column({
    type: 'enum',
    enum: AdminStatusEnum,
    enumName: 'admin_status_enum',
    default: AdminStatusEnum.ACTIVE,
  })
  status: AdminStatusEnum;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
