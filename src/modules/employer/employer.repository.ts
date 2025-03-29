import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { IEmployerEntity, IEmployerRepository } from './employer.interface';
import { EmployerEntity } from './employer.entity';
import { EmployerStatusEnum } from './employer.enum';

@Injectable()
export class EmployerRepository implements IEmployerRepository {
  private readonly repository: Repository<IEmployerEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(EmployerEntity);
  }
  getByUserId(id: number): Promise<IEmployerEntity> {
    return this.repository.findOne({ where: { user: { id } } });
  }
  createEmployer(
    companyName: string,
    description: string,
    industry: string,
    address: string,
    contactPerson: string,
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
}
