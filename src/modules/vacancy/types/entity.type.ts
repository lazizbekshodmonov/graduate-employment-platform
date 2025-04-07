import { IBaseEntity } from '../../../common/interfaces/base.interface';
import { VacancyStatusEnum, VacancyTypeEnum } from '../vacancy.enum';
import { IEmployerEntity } from '../../employer/types/entity.type';

export interface IVacancyEntity extends IBaseEntity {
  title: string;
  description: string;
  requirements: string;
  salary?: number;
  location: string;
  responsible_person: string;
  contact: string;
  deadline: Date;
  education_level: string;
  experience_level: string;
  skills: string[];
  views_count?: number;
  applied_count?: number;
  gender_preference: string;
  language_requirements: string[];
  working_hours: string;
  benefits: string[];
  type: VacancyTypeEnum;
  status: VacancyStatusEnum;
  employer: IEmployerEntity;
}
