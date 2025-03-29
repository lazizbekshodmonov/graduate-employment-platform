import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IEmployerEntity } from '../employer/employer.interface';

import { EmployerEntity } from '../employer/employer.entity';
import { IVacancyEntity } from './vacancy.interface';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';

@Entity('vacancy')
export class VacancyEntity extends BaseEntity implements IVacancyEntity {
  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 500, nullable: false })
  requirements: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  salary?: number;

  @Column({ type: 'varchar', length: 500, nullable: false })
  location: string;

  @Column({ type: 'varchar', length: 225, nullable: false })
  responsible_person: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  contact: string;

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
