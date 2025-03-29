import {
  IEmployerCreateRequestDto,
  IEmployerEntity,
  IEmployerResponse,
} from './employer.interface';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EmployerStatusEnum } from './employer.enum';

export class EmployerResponseDto implements IEmployerResponse {
  readonly id: number;
  readonly companyName: string;
  readonly description: string;
  readonly industry: string;
  readonly address: string;
  readonly contactPerson: string;
  readonly phone: string;
  readonly email: string;
  readonly status: EmployerStatusEnum;
  constructor(employer?: IEmployerEntity) {
    this.id = employer.id;
    this.companyName = employer.companyName;
    this.description = employer.description;
    this.industry = employer.industry;
    this.address = employer.address;
    this.phone = employer.phone;
    this.email = employer.email;
    this.status = employer.status;
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
}
