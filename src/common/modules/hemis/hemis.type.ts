export interface IHemisTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
}

export interface IHemisRole {
  code: string;
  name: string;
}

export interface IHemisUserResponseDto {
  id: number;
  uuid: string;
  type: string;
  name: string;
  email: string;
  roles: IHemisRole[];
}
