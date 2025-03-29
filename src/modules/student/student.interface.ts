import { IBaseEntity } from '../../common/interfaces/base.interface';
import { IUserEntity } from '../users/user.interface';

export interface IStudentEntity extends IBaseEntity {
  first_name: string;
  last_name: string;
  middle_name: string;
  email: string;
  phone_number: string;
  user: IUserEntity;
}

export interface IStudentResponse {
  id: number;
  first_name: string;
  last_name: string;
  middle_name: string;
  full_name: string;
  email: string;
  phone_number: string;
}
