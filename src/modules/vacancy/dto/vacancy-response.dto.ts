import { IVacancyResponseDto } from '../types/dto.type';
import { VacancyStatusEnum, VacancyTypeEnum } from '../vacancy.enum';
import { StatusEnum } from '../../../common/enums/status.enum';
import { IEmployerResponseDto } from '../../employer/types/dto.type';
import { IVacancyEntity } from '../types/entity.type';
import { EmployerResponseDto } from '../../employer/dto/employer.response.dto';

export class VacancyResponseDto implements IVacancyResponseDto {
  readonly id: number;
  readonly title: string;
  readonly description: string;
  readonly requirements: string;
  readonly salary?: number;
  readonly location: string;
  readonly responsiblePerson: string;
  readonly contact: string;
  readonly deadline: Date;
  readonly educationLevel: string;
  readonly experienceLevel: string;
  readonly skills: string[];
  readonly viewsCount?: number;
  readonly appliedCount?: number;
  readonly genderPreference: string;
  readonly languageRequirements: string[];
  readonly workingHours: string;
  readonly benefits: string[];
  readonly type: VacancyTypeEnum;
  readonly status: VacancyStatusEnum;
  readonly employer: IEmployerResponseDto;
  constructor(entity: IVacancyEntity) {
    this.id = entity.id;
    this.title = entity.title;
    this.description = entity.description;
    this.requirements = entity.requirements;
    this.salary = entity.salary;
    this.location = entity.location;
    this.responsiblePerson = entity.responsible_person;
    this.contact = entity.contact;
    this.deadline = entity.deadline;
    this.educationLevel = entity.education_level;
    this.experienceLevel = entity.experience_level;
    this.skills = entity.skills;
    this.viewsCount = entity.views_count;
    this.appliedCount = entity.applied_count;
    this.genderPreference = entity.gender_preference;
    this.languageRequirements = entity.language_requirements;
    this.workingHours = entity.working_hours;
    this.benefits = entity.benefits;
    this.type = entity.type;
    this.status = entity.status;
    this.employer = new EmployerResponseDto(entity.employer);
  }
}
