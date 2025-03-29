import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class BaseLocalizeNameDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  uz: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  en?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  ru?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  cyr?: string;
}

export class BaseLocalizeDescriptionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(500)
  uz: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  en?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  ru?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  cyr?: string;
}

interface BaseLocalizable {
  name_uz: string;
  name_ru: string;
  name_en: string;
  name_cyr: string;
}
export class BaseLocalizeNameResponseDto<Entity extends BaseLocalizable> {
  readonly uz: string;
  readonly ru: string;
  readonly en: string;
  readonly cyr: string;
  constructor(localeObj: Entity) {
    this.uz = localeObj.name_uz;
    this.ru = localeObj.name_ru;
    this.en = localeObj.name_en;
    this.cyr = localeObj.name_cyr;
  }
}
