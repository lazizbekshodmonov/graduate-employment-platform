import { Injectable } from '@nestjs/common';
import { VacancyRepository } from './vacancy.repository';
import { IVacancyCreateDto, IVacancyResponseDto } from './types/dto.type';
import { VacancyMapper } from './vacancy.mapper';
import { EmployerRepository } from '../employer/employer.repository';
import { EmployerNotFoundException } from '../employer/employer.exception';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';
import { IPagination } from '../../common/interfaces/pagination.interface';
import { Pagination } from '../../common/dto/pagination.dto';
import { VacancyNotFoundException } from './vacancy.exception';

@Injectable()
export class VacancyService {
  constructor(
    private readonly vacancyRepository: VacancyRepository,
    private readonly employerRepository: EmployerRepository,
    private readonly logger: CustomLoggerService,
    private readonly vacancyMapper: VacancyMapper,
  ) {}
  async createVacancy(dto: IVacancyCreateDto, employerId: number) {
    try {
      const employer = await this.employerRepository.findById(employerId);

      if (!employer) {
        throw new EmployerNotFoundException();
      }

      const mappedEmployerData = this.vacancyMapper.toEntityFromCreate(
        dto,
        employer,
      );
      await this.vacancyRepository.createVacancy(mappedEmployerData);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getAllVacanciesForEmployer(
    employerId: number,
    page: number = 0,
    size: number = 10,
    search?: string,
    type?: VacancyTypeEnum,
    status?: VacancyStatusEnum,
  ): Promise<IPagination<IVacancyResponseDto>> {
    try {
      const { data, total } = await this.vacancyRepository.getAndCountVacancies(
        page,
        size,
        employerId,
        search,
        type,
        status,
      );

      const vacancies = this.vacancyMapper.toDtoListFromEntityList(data);
      return new Pagination(vacancies, page, size, total);
    } catch (error) {
      this.logger.error(error);
    }
  }
  async getAllVacancies(
    page: number = 0,
    size: number = 10,
    search?: string,
    type?: VacancyTypeEnum,
  ): Promise<IPagination<IVacancyResponseDto>> {
    try {
      const { data, total } = await this.vacancyRepository.getAndCountVacancies(
        page,
        size,
        null,
        search,
        type,
        VacancyStatusEnum.ACTIVE,
      );

      const vacancies = this.vacancyMapper.toDtoListFromEntityList(data);
      return new Pagination(vacancies, page, size, total);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async updateVacancy(
    employerId: number,
    vacancyId: number,
    dto: Partial<IVacancyCreateDto>,
  ) {
    try {
      const vacancy = await this.vacancyRepository.findByIdAndEmployerId(
        employerId,
        vacancyId,
      );
      if (!vacancy) {
        throw new VacancyNotFoundException();
      }
      const mappedVacancyData = this.vacancyMapper.toEntityFromUpdate(dto);
      await this.vacancyRepository.update(vacancyId, mappedVacancyData);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
