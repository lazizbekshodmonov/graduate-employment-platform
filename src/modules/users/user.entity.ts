import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { UserRoleEnum } from './user.enum';
import { StatusEnum } from '../../common/enums/status.enum';
import { IUserEntity } from './types/entity.type';

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
    enum: StatusEnum,
    enumName: 'user_status_enum',
  })
  status: StatusEnum;
}
