import { SocialTypeEnum } from '../employer.enum';
import { StatusEnum } from '../../../common/enums/status.enum';

export interface IEmployerResponseDto {
  id: number;
  companyName: string;
  description: string;
  industry: string;
  address: string;
  phone: string;
  email: string;
  logo: string;
  businessType: string;
  establishedDate: number;
  contactPersonName: string;
  contactPerson: string;
  contactPosition: string;
  numberOfEmployees: number;
  country: string;
  city: string;
  zipCode: string;
  username: string;
  status: StatusEnum;
  socialLinks: ISocialLinkResponseDto[];
}

export interface ISocialLinkResponseDto {
  id: number;
  type: SocialTypeEnum;
  link: string;
}

export interface IEmployerCreateDto {
  username: string;
  password: string;
  companyName: string;
  description?: string;
  industry?: string;
  address?: string;
  phone?: string;
  email?: string;
  logo?: string;
  businessType?: string;
  establishedDate?: number;
  contactPersonName?: string;
  contactPerson?: string;
  contactPosition?: string;
  numberOfEmployees?: number;
  country?: string;
  city?: string;
  zipCode?: string;
  status?: StatusEnum;
  socialLinks?: ISocialLinkCreateDto[];
}

export interface IEmployerUpdateDto
  extends Partial<Omit<IEmployerCreateDto, 'socialLinks'>> {
  socialLinks?: ISocialLinkCreateDto[];
}

export interface ISocialLinkCreateDto {
  type: SocialTypeEnum;
  link: string;
}

export interface ISocialLinkUpdateDto extends ISocialLinkCreateDto {
  id: number;
}
