import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';

import { EmployerEntity } from '../employer/employer.entity';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';
import { IEmployerEntity } from '../employer/types/entity.type';
import { StatusEnum } from '../../common/enums/status.enum';
import { IVacancyEntity } from './types/entity.type';

@Entity('vacancy')
export class VacancyEntity extends BaseEntity implements IVacancyEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  requirements: string;

  @Column({ type: 'integer', nullable: true })
  salary?: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  location: string;

  @Column({ type: 'varchar', length: 225, nullable: true })
  responsible_person: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  contact: string;

  @Column({ type: 'timestamp', nullable: true })
  deadline: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  education_level: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  experience_level: string;

  @Column({ type: 'text', array: true, nullable: true })
  skills: string[];

  @Column({ type: 'integer', default: 0 })
  views_count: number;

  @Column({ type: 'integer', default: 0 })
  applied_count: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  gender_preference: string;

  @Column({ type: 'text', array: true, nullable: true })
  language_requirements: string[];

  @Column({ type: 'varchar', length: 11, nullable: true })
  working_hours: string;

  @Column({ type: 'text', array: true, nullable: true })
  benefits: string[];

  @Column({
    type: 'enum',
    enum: VacancyStatusEnum,
    enumName: 'vacancy_status_enum',
    nullable: false,
  })
  status: VacancyStatusEnum;

  @Column({
    type: 'enum',
    enum: VacancyTypeEnum,
    enumName: 'vacancy_type_enum',
    nullable: false,
  })
  type: VacancyTypeEnum;

  @ManyToOne(() => EmployerEntity)
  @JoinColumn({ name: 'employer_id' })
  employer: IEmployerEntity;
}
