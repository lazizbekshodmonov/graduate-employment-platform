import {
  IEmployerCreateRequestDto,
  IEmployerEntity,
  IEmployerResponseDto,
  ISocialLinkCreateRequestDto,
  ISocialLinkEntity,
  ISocialLinkResponseDto,
} from './employer.interface';
import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { EmployerStatusEnum, SocialTypeEnum } from './employer.enum';
import { Type } from 'class-transformer';

export class EmployerResponseDto implements IEmployerResponseDto {
  readonly id: number;
  readonly companyName: string;
  readonly description: string;
  readonly industry: string;
  readonly address: string;
  readonly contactPerson: string;
  readonly phone: string;
  readonly email: string;
  readonly username: string;
  readonly status: EmployerStatusEnum;
  readonly social_links: ISocialLinkResponseDto[];
  constructor(employer: IEmployerEntity) {
    this.id = employer.id;
    this.companyName = employer.companyName;
    this.description = employer.description;
    this.industry = employer.industry;
    this.address = employer.address;
    this.phone = employer.phone;
    this.email = employer.email;
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
  @MaxLength(255)
  contactPerson: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(12)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(EmployerStatusEnum)
  status: EmployerStatusEnum;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLinkCreateRequestDto)
  social_links: SocialLinkCreateRequestDto[];
}

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
