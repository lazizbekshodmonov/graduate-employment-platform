import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
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
    company_name: string,
    description: string,
    industry: string,
    address: string,
    phone: string,
    email: string,
    business_type: string,
    established_date: Date,
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
    const employer = this.repository.create({
      companyName: company_name,
      description,
      industry,
      address,
      phone,
      email,
      status,
      country,
      city,
      contactPersonName: contact_person_name,
      establishedDate: established_date,
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

  updateEmployer(
    id: number,
    company_name: string,
    description: string,
    industry: string,
    address: string,
    phone: string,
    email: string,
    business_type: string,
    established_date: Date,
    contact_person_name: string,
    contact_person: string,
    contact_position: string,
    number_of_employees: number,
    country: string,
    city: string,
    zip_code: string,
    status: EmployerStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<UpdateResult> {
    return queryRunner.manager.update(
      EmployerEntity,
      { id },
      {
        companyName: company_name,
        description: description,
        industry: industry,
        address: address,
        phone: phone,
        email: email,
        businessType: business_type,
        establishedDate: established_date,
        contactPersonName: contact_person_name,
        contactPerson: contact_person,
        contactPosition: contact_position,
        numberOfEmployees: number_of_employees,
        zipCode: zip_code,
        country: country,
        city: city,
        status: status,
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
