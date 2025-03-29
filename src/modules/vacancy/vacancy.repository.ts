import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IVacancyEntity, IVacancyRepository } from './vacancy.interface';
import { VacancyEntity } from './vacancy.entity';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';
import { IEmployerEntity } from '../employer/employer.interface';

@Injectable()
export class VacancyRepository implements IVacancyRepository {
  private readonly repository: Repository<IVacancyEntity>;
  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(VacancyEntity);
  }

  createVacancy(
    title: string,
    description: string,
    requirements: string,
    location: string,
    responsible_person: string,
    contact: string,
    type: VacancyTypeEnum,
    status: VacancyStatusEnum,
    employer_id: number,
    salary?: number,
  ): Promise<IVacancyEntity> {
    return this.repository.save({
      title,
      description,
      location,
      responsible_person,
      requirements,
      status,
      salary,
      contact,
      type,
      employer: {
        id: employer_id,
      },
    });
  }
}
