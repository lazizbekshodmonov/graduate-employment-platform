import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IEmployerEntity, ISocialLinkEntity } from './employer.interface';
import { EmployerStatusEnum, SocialTypeEnum } from './employer.enum';
import { UserEntity } from '../users/user.entity';
import { IUserEntity } from '../users/user.interface';
import { FileEntity } from '../file/file.entity';
import { IFileEntity } from '../file/file.interface';

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

  @Column({ type: 'varchar', length: 255, nullable: true })
  businessType?: string;

  @Column({ type: 'date', nullable: true })
  establishedDate?: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactPersonName?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactPerson?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contactPosition?: string;

  @Column({ type: 'integer', nullable: true })
  numberOfEmployees?: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  country?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  city?: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  zipCode?: string;

  @Column({
    type: 'enum',
    enum: EmployerStatusEnum,
    enumName: 'employer_status_enum',
    nullable: false,
  })
  status: EmployerStatusEnum;

  @OneToMany(
    () => SocialLinkEntity,
    (entity: ISocialLinkEntity) => entity.employer,
    { cascade: true },
  )
  socialLinks: ISocialLinkEntity[];

  @OneToOne(() => FileEntity)
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
    (entity: IEmployerEntity) => entity.socialLinks,
    { onDelete: 'CASCADE' },
  )
  @JoinColumn({ name: 'employer_id' })
  employer: IEmployerEntity;
}
