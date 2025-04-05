import { IBaseEntity } from '../../common/interfaces/base.interface';
import { VacancyTypeEnum } from './vacancy.enum';
import { IEmployerEntity } from '../employer/types/entity.type';
import { StatusEnum } from '../../common/enums/status.enum';

export interface IVacancyRepository {
  createVacancy(
    title: string,
    description: string,
    requirements: string,
    location: string,
    responsible_person: string,
    contact: string,
    type: VacancyTypeEnum,
    status: StatusEnum,
    employer_id: number,
    salary?: number,
  ): Promise<IVacancyEntity>;
}

export interface IVacancyEntity extends IBaseEntity {
  title: string;
  description: string;
  requirements: string;
  salary?: number;
  location: string;
  responsible_person: string;
  contact: string;
  type: VacancyTypeEnum;
  status: StatusEnum;
  employer: IEmployerEntity;
}

export interface IVacancyResponse {
  id: string;
  title: string;
  description: string;
  requirements: string;
  salary?: number;
  location: string;
  responsible_person: string;
  contact: string;
  type: VacancyTypeEnum;
  status: StatusEnum;
  employer: IEmployerEntity;
}

export interface IVacancyCreateRequest {
  title: string;
  description: string;
  requirements: string;
  salary?: number;
  location: string;
  responsible_person: string;
  contact: string;
  type: VacancyTypeEnum;
  status: StatusEnum;
}
