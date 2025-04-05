import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { IVacancyCreateRequest } from './vacancy.interface';
import { VacancyTypeEnum } from './vacancy.enum';
import { StatusEnum } from '../../common/enums/status.enum';

export class VacancyCreateRequestDto implements IVacancyCreateRequest {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  description: string;

  @IsNotEmpty()
  @IsEnum(VacancyTypeEnum)
  type: VacancyTypeEnum;

  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  requirements: string;

  @ValidateIf(
    (o: IVacancyCreateRequest) => o.type !== VacancyTypeEnum.INTERNSHIP,
  )
  @IsNotEmpty()
  @IsNumber()
  @Max(1000000000)
  salary?: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  location: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  responsible_person: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  contact: string;

  @IsNotEmpty()
  @IsEnum(StatusEnum)
  status: StatusEnum;
}
