import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { SocialTypeEnum } from './employer.enum';
import { UserEntity } from '../users/user.entity';
import { FileEntity } from '../file/file.entity';
import { IFileEntity } from '../file/file.interface';
import { IUserEntity } from '../users/types/entity.type';
import { IEmployerEntity, ISocialLinkEntity } from './types/entity.type';
import { StatusEnum } from '../../common/enums/status.enum';

@Entity('employer')
export class EmployerEntity extends BaseEntity implements IEmployerEntity {
  @Column({ type: 'varchar', length: 255 })
  company_name: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  description?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  industry?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  address?: string;

  @Column({ type: 'varchar', length: 12, nullable: true })
  phone?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  email?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  business_type?: string;

  @Column({ type: 'date', nullable: true })
  established_date?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_person_name?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_person?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact_position?: string;

  @Column({ type: 'integer', nullable: true })
  number_of_employees?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  zip_code?: string;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    enumName: 'employer_status_enum',
    default: StatusEnum.ACTIVE,
  })
  status?: StatusEnum;

  @OneToMany(
    () => SocialLinkEntity,
    (entity: ISocialLinkEntity) => entity.employer,
    { cascade: true },
  )
  social_links?: ISocialLinkEntity[];

  @ManyToOne(() => FileEntity)
  @JoinColumn({ name: 'logo', referencedColumnName: 'hashId' })
  file?: IFileEntity;

  @OneToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: IUserEntity;
}

@Entity('social-link')
export class SocialLinkEntity extends BaseEntity implements ISocialLinkEntity {
  @Column({
    type: 'enum',
    enum: SocialTypeEnum,
    enumName: 'social_type_enum',
    nullable: false,
  })
  type: SocialTypeEnum;

  @Column({ type: 'varchar', length: 500 })
  link: string;

  @ManyToOne(
    () => EmployerEntity,
    (entity: IEmployerEntity) => entity.social_links,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'employer_id' })
  employer: IEmployerEntity;
}
