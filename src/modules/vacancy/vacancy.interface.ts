import { IBaseEntity } from '../../common/interfaces/base.interface';
import { IEmployerEntity } from '../employer/employer.interface';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';

export interface IVacancyRepository {
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
  status: VacancyStatusEnum;
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
  status: VacancyStatusEnum;
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
  status: VacancyStatusEnum;
}
