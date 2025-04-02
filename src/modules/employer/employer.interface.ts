import { IBaseEntity } from '../../common/interfaces/base.interface';
import { EmployerStatusEnum, SocialTypeEnum } from './employer.enum';
import { IUserEntity } from '../users/user.interface';
import { QueryRunner } from 'typeorm';
import { IFileEntity } from '../file/file.interface';

export interface IEmployerRepository {
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
  ): Promise<IEmployerEntity>;

  findByUserId(id: number): Promise<IEmployerEntity>;

  findById(id: number, relations: string[]): Promise<IEmployerEntity>;

  findByFilterAndPaginate(
    page: number,
    limit: number,
    search?: string,
    status?: EmployerStatusEnum,
  ): Promise<{ data: IEmployerEntity[]; total: number }>;
}

export interface ISocialLinkRepository {
  findByEmployerIdAndType(
    employerId: number,
    type: SocialTypeEnum,
  ): Promise<ISocialLinkEntity>;

  createSocialLink(
    type: SocialTypeEnum,
    link: string,
    employer: IEmployerEntity,
    queryRunner: QueryRunner,
  ): Promise<ISocialLinkEntity>;
}

export interface IEmployerEntity extends IBaseEntity {
  companyName: string;
  description: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  businessType?: string;
  establishedDate?: Date;
  contactPersonName?: string;
  contactPerson?: string;
  contactPosition?: string;
  numberOfEmployees?: number;
  country?: string;
  city?: string;
  zipCode?: string;
  socialLinks: ISocialLinkEntity[];
  status: EmployerStatusEnum;
  file?: IFileEntity;
  user: IUserEntity;
}
export interface ISocialLinkEntity extends IBaseEntity {
  type: SocialTypeEnum;
  link: string;
  employer: IEmployerEntity;
}
export interface IEmployerResponseDto {
  id: number;
  company_name: string;
  description: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  business_type: string;
  established_date: number;
  contact_person_name: string;
  contact_person: string;
  contact_position: string;
  number_of_employees: number;
  country: string;
  city: string;
  zip_code: string;
  username: string;
  status: EmployerStatusEnum;
  social_links: ISocialLinkResponseDto[];
}

export interface ISocialLinkResponseDto {
  id: number;
  type: SocialTypeEnum;
  link: string;
}

export interface IEmployerCreateRequestDto {
  username: string;
  password: string;
  companyName: string;
  description: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  business_type?: string;
  established_date?: number;
  contact_person_name?: string;
  contact_person?: string;
  contact_position?: string;
  number_of_employees?: number;
  country?: string;
  city?: string;
  zip_code?: string;
  status: EmployerStatusEnum;
  social_links: ISocialLinkCreateRequestDto[];
}

export interface ISocialLinkCreateRequestDto {
  type: SocialTypeEnum;
  link: string;
}
