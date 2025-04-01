import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import {
  IEmployerEntity,
  IEmployerRepository,
  ISocialLinkEntity,
  ISocialLinkRepository,
} from './employer.interface';
import { EmployerEntity, SocialLinkEntity } from './employer.entity';
import { EmployerStatusEnum, SocialTypeEnum } from './employer.enum';

@Injectable()
export class EmployerRepository implements IEmployerRepository {
  private readonly repository: Repository<IEmployerEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(EmployerEntity);
  }
  createEmployer(
    companyName: string,
    description: string,
    industry: string,
    address: string,
    phone: string,
    email: string,
    user_id: number,
    status: EmployerStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<IEmployerEntity> {
    const employer = this.repository.create({
      companyName,
      description,
      industry,
      address,
      phone,
      email,
      status,
      user: {
        id: user_id,
      },
    });

    return queryRunner.manager.save(employer);
  }

  findByUserId(id: number): Promise<IEmployerEntity> {
    return this.repository.findOne({ where: { user: { id } } });
  }

  findById(id: number, relations: string[]): Promise<IEmployerEntity> {
    return this.repository.findOne({ where: { id }, relations });
  }

  async findByFilterAndPaginate(
    page: number,
    limit: number,
    search?: string,
    status?: EmployerStatusEnum,
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

    const data: EmployerEntity[] = await queryBuilder
      .skip(page * limit)
      .take(limit)
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
}
