import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';

import { EmployerEntity, SocialLinkEntity } from './employer.entity';
import { SocialTypeEnum } from './employer.enum';
import { IEmployerEntity, ISocialLinkEntity } from './types/entity.type';
import {
  IEmployerRepository,
  ISocialLinkRepository,
} from './types/repository.type';
import { StatusEnum } from '../../common/enums/status.enum';

@Injectable()
export class EmployerRepository implements IEmployerRepository {
  private readonly repository: Repository<IEmployerEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(EmployerEntity);
  }
  createEmployer(
    employerEntity: IEmployerEntity,
    queryRunner: QueryRunner,
  ): Promise<IEmployerEntity> {
    const employer = queryRunner.manager.create(EmployerEntity, employerEntity);

    return queryRunner.manager.save(employer);
  }

  updateEmployer(
    id: number,
    employer: Partial<IEmployerEntity>,
    queryRunner: QueryRunner,
  ): Promise<UpdateResult> {
    return queryRunner.manager.update(
      EmployerEntity,
      { id },
      {
        ...employer,
      },
    );
  }

  findByUserId(id: number): Promise<IEmployerEntity> {
    return this.repository.findOne({ where: { user: { id } } });
  }

  findById(id: number, relations?: string[]): Promise<IEmployerEntity> {
    return this.repository.findOne({ where: { id }, relations });
  }

  async findByFilterAndPaginate(
    page: number,
    limit: number,
    search?: string,
    status?: StatusEnum,
  ): Promise<{
    data: IEmployerEntity[];
    total: number;
  }> {
    const queryBuilder = this.repository.createQueryBuilder('employer');
    if (search) {
      queryBuilder.andWhere('employer.companyName ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('employer.status = :status', { status });
    }

    const total: number = await queryBuilder.getCount();

    const data: IEmployerEntity[] = await queryBuilder
      .skip(page * limit)
      .take(limit)
      .leftJoinAndSelect('employer.file', 'file')
      .leftJoinAndSelect('employer.user', 'user')
      .getMany();
    return { data, total };
  }
}

@Injectable()
export class SocialLinkRepository implements ISocialLinkRepository {
  private readonly repository: Repository<ISocialLinkEntity>;
  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(SocialLinkEntity);
  }

  findByEmployerId(employerId: number): Promise<ISocialLinkEntity[]> {
    return this.repository.find({
      where: { employer: { id: employerId } },
    });
  }

  findByEmployerIdAndType(
    employerId: number,
    type: SocialTypeEnum,
  ): Promise<ISocialLinkEntity> {
    return this.repository.findOne({
      where: { employer: { id: employerId }, type },
    });
  }

  createSocialLink(
    type: SocialTypeEnum,
    link: string,
    employer: IEmployerEntity,
    queryRunner: QueryRunner,
  ): Promise<ISocialLinkEntity> {
    const socialLink = this.repository.create({
      type,
      link,
      employer,
    });
    return queryRunner.manager.save(socialLink);
  }

  updateSocialLink(
    id: number,
    link: string,
    queryRunner: QueryRunner,
  ): Promise<UpdateResult> {
    return queryRunner.manager.update(
      SocialLinkEntity,
      { id },
      {
        link,
      },
    );
  }
}
