import {
  IEmployerCreateRequestDto,
  IEmployerEntity,
  IEmployerResponseDto,
  IEmployerUpdateRequestDto,
  ISocialLinkCreateRequestDto,
  ISocialLinkEntity,
  ISocialLinkResponseDto,
} from './employer.interface';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EmployerStatusEnum, SocialTypeEnum } from './employer.enum';
import { Type } from 'class-transformer';
import dayjs from 'dayjs';
import { OmitType } from '@nestjs/mapped-types';

export class EmployerResponseDto implements IEmployerResponseDto {
  readonly id: number;
  readonly company_name: string;
  readonly description: string;
  readonly industry: string;
  readonly address: string;
  readonly phone: string;
  readonly email: string;
  readonly business_type: string;
  readonly established_date: number;
  readonly contact_person_name: string;
  readonly contact_person: string;
  readonly contact_position: string;
  readonly number_of_employees: number;
  readonly country: string;
  readonly city: string;
  readonly zip_code: string;
  readonly username: string;
  readonly status: EmployerStatusEnum;
  readonly social_links: ISocialLinkResponseDto[];
  constructor(employer: IEmployerEntity) {
    this.id = employer.id;
    this.company_name = employer.companyName;
    this.description = employer.description;
    this.industry = employer.industry;
    this.address = employer.address;
    this.phone = employer.phone;
    this.email = employer.email;
    this.business_type = employer.businessType;
    this.established_date = dayjs(employer.establishedDate).valueOf();
    this.contact_person_name = employer.contactPersonName;
    this.contact_person = employer.contactPerson;
    this.contact_position = employer.contactPosition;
    this.number_of_employees = employer.numberOfEmployees;
    this.country = employer.country;
    this.city = employer.city;
    this.zip_code = employer.zipCode;
    this.status = employer.status;
    if (employer?.user) {
      this.username = employer.user.username;
    }
    if (employer?.socialLinks) {
      this.social_links = employer.socialLinks.map(
        (item) => new SocialLinkResponseDto(item),
      );
    }
  }
}

export class SocialLinkResponseDto implements ISocialLinkResponseDto {
  id: number;
  type: SocialTypeEnum;
  link: string;
  constructor(socialLink: ISocialLinkEntity) {
    this.id = socialLink.id;
    this.type = socialLink.type;
    this.link = socialLink.link;
  }
}

export class EmployerCreateRequestDto implements IEmployerCreateRequestDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  @MinLength(8)
  password: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  companyName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  industry: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  business_type?: string;

  @IsNotEmpty()
  @IsInt()
  established_date?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  contact_person_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  contact_person: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  contact_position?: string;

  @IsNotEmpty()
  @IsNumber()
  number_of_employees?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  country?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city?: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  zip_code?: string;

  @IsNotEmpty()
  @IsEnum(EmployerStatusEnum)
  status: EmployerStatusEnum;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkCreateRequestDto)
  social_links: SocialLinkCreateRequestDto[];
}

export class EmployerUpdateRequestDto
  extends OmitType(EmployerCreateRequestDto, [
    'password',
    'social_links',
  ] as const)
  implements IEmployerUpdateRequestDto {}

export class SocialLinkCreateRequestDto implements ISocialLinkCreateRequestDto {
  @IsNotEmpty()
  @IsEnum(SocialTypeEnum)
  type: SocialTypeEnum;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  link: string;
}
