import { Injectable } from '@nestjs/common';
import { VacancyRepository } from './vacancy.repository';
import { IVacancyCreateRequest } from './vacancy.interface';

@Injectable()
export class VacancyService {
  constructor(private readonly vacancyRepository: VacancyRepository) {}
  async createVacancy(dto: IVacancyCreateRequest, employerId: number) {
    await this.vacancyRepository.createVacancy(
      dto.title,
      dto.description,
      dto.requirements,
      dto.location,
      dto.responsible_person,
      dto.contact,
      dto.type,
      dto.status,
      employerId,
      dto.salary,
    );
  }
}
