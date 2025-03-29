import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRoleEnum, UserStatusEnum } from './user.enum';
import { IUserEntity } from './user.interface';

@Entity('users')
@Unique(['username'])
export class UserEntity extends BaseEntity implements IUserEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  full_name: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  username: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRoleEnum,
    enumName: 'user_role_enum',
  })
  role: UserRoleEnum;

  @Column({
    type: 'enum',
    enum: UserStatusEnum,
    enumName: 'user_status_enum',
  })
  status: UserStatusEnum;
}
