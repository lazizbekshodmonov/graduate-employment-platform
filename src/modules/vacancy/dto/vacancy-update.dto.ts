import { PartialType } from '@nestjs/mapped-types';
import { IVacancyCreateDto } from '../types/dto.type';
import { VacancyCreateDto } from './vacancy-create.dto';

export class VacancyUpdateDto extends PartialType<Partial<IVacancyCreateDto>>(
  VacancyCreateDto,
) {}
