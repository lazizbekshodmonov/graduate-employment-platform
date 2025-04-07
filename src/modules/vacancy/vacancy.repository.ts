import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { VacancyEntity } from './vacancy.entity';
import { IVacancyRepository } from './types/repository.type';
import { IVacancyEntity } from './types/entity.type';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';
import { IPaginatedResultByEntity } from '../../common/interfaces/pagination.interface';

@Injectable()
export class VacancyRepository implements IVacancyRepository {
  private readonly repository: Repository<IVacancyEntity>;
  constructor(private readonly datasource: DataSource) {
    this.repository = datasource.getRepository(VacancyEntity);
  }

  createVacancy(entity: IVacancyEntity): Promise<IVacancyEntity> {
    return this.repository.save(entity);
  }

  async getAndCountVacancies(
    page: number,
    limit: number,
    employerId?: number,
    search?: string,
    type?: VacancyTypeEnum,
    status?: VacancyStatusEnum,
  ): Promise<IPaginatedResultByEntity<IVacancyEntity>> {
    const queryBuilder = this.repository.createQueryBuilder('vacancy');

    if (search) {
      queryBuilder.andWhere('vacancy.companyName ILIKE :search', {
        search: `%${search}%`,
      });
    }
    if (employerId) {
      queryBuilder.andWhere('vacancy.employer_id = :employerId', {
        employerId,
      });
    }
    if (status) {
      queryBuilder.andWhere('vacancy.status = :status', { status });
    }
    if (type) {
      queryBuilder.andWhere('vacancy.type = :type', { type });
    }

    const total: number = await queryBuilder.getCount();

    const data: IVacancyEntity[] = await queryBuilder
      .skip(page * limit)
      .leftJoinAndSelect('vacancy.employer', 'employer')
      .take(limit)
      .getMany();
    return { data, total };
  }

  findByIdAndEmployerId(
    employerId: number,
    id: number,
    relations?: string[],
  ): Promise<IVacancyEntity> {
    return this.repository.findOne({
      where: { id, employer: { id: employerId } },
      relations,
    });
  }

  update(id: number, entity: Partial<IVacancyEntity>): Promise<UpdateResult> {
    return this.repository.update({ id }, entity);
  }

  changeMultipleStatus(
    employerId: number,
    status: VacancyStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<UpdateResult> {
    return queryRunner.manager.update(
      VacancyEntity,
      { employer: { id: employerId } },
      {
        status,
      },
    );
  }
}
