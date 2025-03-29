import { UserRoleEnum } from '../users/user.enum';

export type TGrantType = 'PASSWORD' | 'REFRESH_TOKEN';

export interface IAuthLoginRequest {
  username: string;
  password: string;
  grant_type: TGrantType;
}

export interface ITokenSchema {
  userId: number;
  userRole: UserRoleEnum;
  tokenType: string;
  token: string;
  expiresAt: Date;
  studentId?: number;
  employerId?: number;
}

export interface IAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  access_expires: number;
  refresh_expires: number;
}
