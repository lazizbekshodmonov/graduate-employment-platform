import { ISocialLinkCreateDto } from '../types/dto.type';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  IsUrl,
  MaxLength,
} from 'class-validator';
import { SocialTypeEnum } from '../employer.enum';

export class SocialLinkCreateDto implements ISocialLinkCreateDto {
  @IsNotEmpty()
  @IsEnum(SocialTypeEnum)
  type: SocialTypeEnum;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @MaxLength(500)
  link: string;
}
