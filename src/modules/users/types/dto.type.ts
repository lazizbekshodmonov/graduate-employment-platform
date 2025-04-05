import { UserRoleEnum } from '../user.enum';
import { StatusEnum } from '../../../common/enums/status.enum';

export interface IUserCreateDto {
  fullName: string;
  username: string;
  password: string;
  role: UserRoleEnum;
  status?: StatusEnum;
}

export type IUserUpdateDto = Partial<IUserCreateDto>;

export interface IUserResponseDto {
  id: number;
  fullName: string;
  username: string;
  role: UserRoleEnum;
  status: StatusEnum;
}
