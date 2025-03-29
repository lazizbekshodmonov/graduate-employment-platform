import { IBaseEntity } from '../../common/interfaces/base.interface';
import { AdminStatusEnum } from './admin.enum';
import { IUserEntity } from '../users/user.interface';

export interface IAdminEntity extends IBaseEntity {
  full_name: string;
  description: string;
  status: AdminStatusEnum;
  user: IUserEntity;
}

export interface IAdminRepository {
  getByUserId(id: number): Promise<IAdminEntity>;
}
