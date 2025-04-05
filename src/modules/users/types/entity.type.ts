import { IBaseEntity } from '../../../common/interfaces/base.interface';
import { UserRoleEnum } from '../user.enum';
import { StatusEnum } from '../../../common/enums/status.enum';

export interface IUserEntity extends IBaseEntity {
  full_name: string;
  username: string;
  password: string;
  role: UserRoleEnum;
  status: StatusEnum;
}
