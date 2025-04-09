import {
  IAuthLoginRequest,
  IAuthTokenResponse,
  IHemisLoginRequestDto,
  ITokenSchema,
  TGrantType,
} from './auth.interface';
import { IsEnum, IsNotEmpty, IsString, ValidateIf } from 'class-validator';
import { GrantTypeEnum } from './auth.enum';
import dayjs from 'dayjs';

export class AuthLoginRequest implements IAuthLoginRequest {
  @ValidateIf((dto) => dto.grant_type === GrantTypeEnum.PASSWORD)
  @IsNotEmpty()
  @IsString()
  username: string;

  @ValidateIf((dto) => dto.grant_type === GrantTypeEnum.PASSWORD)
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEnum(GrantTypeEnum)
  grant_type: TGrantType;

  @ValidateIf((dto) => dto.grant_type === GrantTypeEnum.REFRESH_TOKEN)
  @IsNotEmpty()
  @IsString()
  refresh_token: string;
}

export class HemisLoginRequestDto implements IHemisLoginRequestDto {
  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  redirect_url: string;
}

export class AuthTokenResponse implements IAuthTokenResponse {
  readonly access_token: string;
  readonly refresh_token: string;
  readonly access_expires: number;
  readonly refresh_expires: number;
  constructor(accessTokenModel: ITokenSchema, refreshTokenModel: ITokenSchema) {
    this.access_token = accessTokenModel.token;
    this.refresh_token = refreshTokenModel.token;
    this.access_expires = dayjs(accessTokenModel.expiresAt).valueOf();
    this.refresh_expires = dayjs(refreshTokenModel.expiresAt).valueOf();
  }
}
