import { IVacancyCreateDto } from '../types/dto.type';
import {
  IsArray,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  Max,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { VacancyStatusEnum, VacancyTypeEnum } from '../vacancy.enum';

export class VacancyCreateDto implements IVacancyCreateDto {
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

  @ValidateIf((o: IVacancyCreateDto) => o.type !== VacancyTypeEnum.INTERNSHIP)
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
  responsiblePerson: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  contact: string;

  @IsOptional()
  @IsInt()
  deadline: Date;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  educationLevel: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  experienceLevel: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  skills: string[];

  @IsOptional()
  @IsString()
  @MaxLength(255)
  genderPreference: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  languageRequirements: string[];

  @IsOptional()
  @IsString()
  @Matches(/^([01]\d|2[0-3]):([0-5]\d)-([01]\d|2[0-3]):([0-5]\d)$/, {
    message:
      'workingHours must be in the format HH:MM-HH:MM (e.g., 09:00-18:00)',
  })
  workingHours: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @MaxLength(255, { each: true })
  benefits: string[];

  @IsNotEmpty()
  @IsEnum(VacancyStatusEnum)
  status: VacancyStatusEnum;
}
