import { VacancyStatusEnum, VacancyTypeEnum } from '../vacancy.enum';
import { IEmployerResponseDto } from '../../employer/types/dto.type';

export interface IVacancyResponseDto {
  id: number;
  title: string;
  description: string;
  requirements: string;
  salary?: number;
  location: string;
  responsiblePerson: string;
  contact: string;
  deadline: Date;
  educationLevel: string;
  experienceLevel: string;
  skills: string[];
  viewsCount?: number;
  appliedCount?: number;
  genderPreference: string;
  languageRequirements: string[];
  workingHours: string;
  benefits: string[];
  type: VacancyTypeEnum;
  status: VacancyStatusEnum;
  employer: IEmployerResponseDto;
}

export interface IVacancyCreateDto {
  title: string;
  description: string;
  requirements: string;
  salary?: number;
  location: string;
  responsiblePerson: string;
  contact: string;
  deadline: Date;
  educationLevel: string;
  experienceLevel: string;
  skills: string[];
  genderPreference: string;
  languageRequirements: string[];
  workingHours: string;
  benefits: string[];
  type: VacancyTypeEnum;
  status: VacancyStatusEnum;
}
