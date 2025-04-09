import {
  IHemisRole,
  IHemisTokenResponse,
  IHemisUserResponseDto,
} from './hemis.type';
import { AxiosResponse } from 'axios';

export class HemisTokenDto implements IHemisTokenResponse {
  readonly access_token: string;
  readonly token_type: string;
  readonly expires_in: number;
  readonly refresh_token: string;
  constructor(response: AxiosResponse<IHemisTokenResponse>) {
    this.access_token = response.data.access_token;
    this.token_type = response.data.token_type;
    this.expires_in = response.data.expires_in;
    this.refresh_token = response.data.refresh_token;
  }
}

export class HemisUserResponseDto implements IHemisUserResponseDto {
  readonly id: number;
  readonly uuid: string;
  readonly type: string;
  readonly name: string;
  readonly email: string;
  readonly roles: IHemisRole[];
  constructor(response: AxiosResponse<IHemisUserResponseDto>) {
    this.id = response.data.id;
    this.uuid = response.data.uuid;
    this.type = response.data.type;
    this.name = response.data.name;
    this.email = response.data.email;
    this.roles = response.data.roles;
  }
}
