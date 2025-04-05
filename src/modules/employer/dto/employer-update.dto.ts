import { PartialType } from '@nestjs/mapped-types';
import { IEmployerUpdateDto, ISocialLinkUpdateDto } from '../types/dto.type';
import { EmployerCreateDto } from './employer-create.dto';

export class EmployerUpdateDto
  extends PartialType(EmployerCreateDto)
  implements IEmployerUpdateDto
{
  social_links?: ISocialLinkUpdateDto[];
}
