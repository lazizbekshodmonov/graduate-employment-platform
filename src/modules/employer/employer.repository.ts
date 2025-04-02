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
import dayjs from 'dayjs';

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
    business_type: string,
    established_date: number,
    contact_person_name: string,
    contact_person: string,
    contact_position: string,
    number_of_employees: number,
    country: string,
    city: string,
    zip_code: string,
    user_id: number,
    status: EmployerStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<IEmployerEntity> {
    console.log(established_date);
    const employer = this.repository.create({
      companyName,
      description,
      industry,
      address,
      phone,
      email,
      status,
      country,
      city,
      contactPersonName: contact_person_name,
      establishedDate: dayjs(established_date),
      businessType: business_type,
      contactPerson: contact_person,
      contactPosition: contact_position,
      numberOfEmployees: number_of_employees,
      zipCode: zip_code,
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

    const data: IEmployerEntity[] = await queryBuilder
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
