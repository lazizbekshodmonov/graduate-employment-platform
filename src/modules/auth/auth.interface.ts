import { UserRoleEnum } from '../users/user.enum';
import { IStudentEntity } from '../student/student.interface';
import { IEmployerEntity } from '../employer/types/entity.type';

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

export interface ICheckStudentOrEmployerResult {
  student?: IStudentEntity;
  employer?: IEmployerEntity;
}

export interface IHemisLoginRequestDto {
  code: string;
  redirect_url: string;
}
