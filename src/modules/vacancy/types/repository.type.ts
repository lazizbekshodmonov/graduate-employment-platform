import { IVacancyEntity } from './entity.type';
import { VacancyStatusEnum, VacancyTypeEnum } from '../vacancy.enum';
import { IPaginatedResultByEntity } from '../../../common/interfaces/pagination.interface';
import { UpdateResult } from 'typeorm';

export interface IVacancyRepository {
  createVacancy(entity: IVacancyEntity): Promise<IVacancyEntity>;
  getAndCountVacancies(
    page: number,
    size: number,
    employerId?: number,
    search?: string,
    type?: VacancyTypeEnum,
    status?: VacancyStatusEnum,
  ): Promise<IPaginatedResultByEntity<IVacancyEntity>>;
  findByIdAndEmployerId(
    employerId: number,
    id: number,
    relations?: string[],
  ): Promise<IVacancyEntity>;
  update(id: number, entity: Partial<IVacancyEntity>): Promise<UpdateResult>;
}
