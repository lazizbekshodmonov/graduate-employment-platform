import { Injectable } from '@nestjs/common';
import { IVacancyCreateDto } from './types/dto.type';
import { IVacancyEntity } from './types/entity.type';
import { IEmployerEntity } from '../employer/types/entity.type';
import dayjs from 'dayjs';
import { VacancyResponseDto } from './dto/vacancy-response.dto';

@Injectable()
export class VacancyMapper {
  toEntityFromCreate(
    dto: IVacancyCreateDto,
    employer: IEmployerEntity,
  ): IVacancyEntity {
    return {
      title: dto.title,
      description: dto.description,
      requirements: dto.requirements,
      salary: dto.salary,
      location: dto.location,
      responsible_person: dto.responsiblePerson,
      contact: dto.contact,
      deadline: dayjs(dto.deadline).toDate(),
      education_level: dto.educationLevel,
      experience_level: dto.experienceLevel,
      skills: dto.skills,
      gender_preference: dto.genderPreference,
      language_requirements: dto.languageRequirements,
      working_hours: dto.workingHours,
      benefits: dto.benefits,
      type: dto.type,
      status: dto.status,
      employer: employer,
    };
  }
  toEntityFromUpdate(dto: Partial<IVacancyCreateDto>): Partial<IVacancyEntity> {
    return {
      title: dto.title,
      description: dto.description,
      requirements: dto.requirements,
      salary: dto.salary,
      location: dto.location,
      responsible_person: dto.responsiblePerson,
      contact: dto.contact,
      deadline: dayjs(dto.deadline).toDate(),
      education_level: dto.educationLevel,
      experience_level: dto.experienceLevel,
      skills: dto.skills,
      gender_preference: dto.genderPreference,
      language_requirements: dto.languageRequirements,
      working_hours: dto.workingHours,
      benefits: dto.benefits,
      type: dto.type,
      status: dto.status,
    };
  }
  toDtoListFromEntityList(dtoList: IVacancyEntity[]) {
    return dtoList.map((dto: IVacancyEntity) => new VacancyResponseDto(dto));
  }
}
