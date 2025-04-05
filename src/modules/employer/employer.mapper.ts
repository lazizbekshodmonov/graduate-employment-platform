import { Injectable } from '@nestjs/common';
import { IEmployerEntity } from './types/entity.type';
import { IEmployerCreateDto, IEmployerUpdateDto } from './types/dto.type';
import dayjs from 'dayjs';
import { IUserEntity } from '../users/types/entity.type';
import { IFileEntity } from '../file/file.interface';

@Injectable()
export class EmployerMapper {
  toEntityFromCreate(
    employer: IEmployerCreateDto,
    user: IUserEntity,
    file: IFileEntity,
  ): IEmployerEntity {
    return {
      company_name: employer.companyName,
      description: employer.description,
      industry: employer.industry,
      address: employer.address,
      phone: employer.phone,
      email: employer.email,
      business_type: employer.businessType,
      established_date: employer.establishedDate
        ? dayjs(employer.establishedDate).toDate()
        : null,
      contact_person_name: employer.contactPersonName,
      contact_person: employer.contactPerson,
      contact_position: employer.contactPosition,
      number_of_employees: employer.numberOfEmployees,
      country: employer.country,
      city: employer.city,
      zip_code: employer.zipCode,
      user,
      file,
    };
  }
  toEntityFromUpdate(
    employer: IEmployerUpdateDto,
    file: IFileEntity,
  ): Partial<IEmployerEntity> {
    return {
      company_name: employer?.companyName,
      description: employer?.description,
      industry: employer?.industry,
      address: employer?.address,
      phone: employer?.phone,
      email: employer?.email,
      business_type: employer?.businessType,
      established_date: employer?.establishedDate
        ? dayjs(employer?.establishedDate).toDate()
        : null,
      contact_person_name: employer?.contactPersonName,
      contact_person: employer?.contactPerson,
      contact_position: employer?.contactPosition,
      number_of_employees: employer?.numberOfEmployees,
      country: employer?.country,
      city: employer?.city,
      zip_code: employer?.zipCode,
      status: employer.status,
      file,
    };
  }
}
