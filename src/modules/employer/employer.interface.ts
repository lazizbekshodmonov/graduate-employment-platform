import { IBaseEntity } from '../../common/interfaces/base.interface';
import { EmployerStatusEnum } from './employer.enum';
import { IUserEntity } from '../users/user.interface';
import { QueryRunner } from 'typeorm';
import { IFileEntity } from '../file/file.interface';

export interface IEmployerRepository {
  getByUserId(id: number): Promise<IEmployerEntity>;
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
  ): Promise<IEmployerEntity>;
}

export interface IEmployerEntity extends IBaseEntity {
  companyName: string;
  description: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  status: EmployerStatusEnum;
  file: IFileEntity;
  user: IUserEntity;
}

export interface IEmployerResponse {
  id: number;
  companyName: string;
  description: string;
  industry: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: EmployerStatusEnum;
}

export interface IEmployerCreateRequestDto {
  username: string;
  password: string;
  companyName: string;
  description: string;
  industry: string;
  address: string;
  contactPerson: string;
  phone: string;
  email: string;
  status: EmployerStatusEnum;
}
