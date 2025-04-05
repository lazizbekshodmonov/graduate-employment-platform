import {
  IEmployerResponseDto,
  ISocialLinkResponseDto,
} from '../types/dto.type';
import { IEmployerEntity } from '../types/entity.type';
import dayjs from 'dayjs';
import { SocialLinkResponseDto } from './social-link-response.dto';
import { StatusEnum } from '../../../common/enums/status.enum';

export class EmployerResponseDto implements IEmployerResponseDto {
  readonly id: number;
  readonly companyName: string;
  readonly description: string;
  readonly industry: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly logo: string;
  readonly businessType: string;
  readonly establishedDate: number;
  readonly contactPersonName: string;
  readonly contactPerson: string;
  readonly contactPosition: string;
  readonly numberOfEmployees: number;
  readonly country: string;
  readonly city: string;
  readonly zipCode: string;
  readonly username: string;
  readonly status: StatusEnum;
  readonly socialLinks: ISocialLinkResponseDto[];
  constructor(employer: IEmployerEntity) {
    this.id = employer.id;
    this.companyName = employer.company_name;
    this.description = employer?.description || null;
    this.industry = employer?.industry || null;
    this.address = employer?.address || null;
    this.phone = employer?.phone || null;
    this.email = employer?.email || null;
    this.businessType = employer?.business_type || null;
    this.establishedDate = employer.established_date
      ? dayjs(employer.established_date).valueOf()
      : null;
    this.contactPersonName = employer?.contact_person_name || null;
    this.contactPerson = employer?.contact_person || null;
    this.contactPosition = employer?.contact_position || null;
    this.numberOfEmployees = employer?.number_of_employees || null;
    this.country = employer?.country || null;
    this.city = employer?.city || null;
    this.zipCode = employer?.zip_code || null;
    this.status = employer?.status || null;
    this.logo = employer?.file?.hashId || null;
    if (employer?.user) {
      this.username = employer.user.username;
    }
    if (employer?.social_links) {
      this.socialLinks = employer.social_links.map(
        (item) => new SocialLinkResponseDto(item),
      );
    }
  }
}
