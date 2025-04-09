import { IBaseEntity } from '../../common/interfaces/base.interface';
import { IUserEntity } from '../users/types/entity.type';
import { StatusEnum } from '../../common/enums/status.enum';
import { IFileEntity } from '../file/file.interface';

export interface IStudentEntity extends IBaseEntity {
  student_id: number;
  full_name: string;
  email: string;
  phone_number: string;
  status: StatusEnum;
  access_token: string;
  refresh_token: string;
  user: IUserEntity;
  file?: IFileEntity;
}

export interface IStudentResponse {
  id: number;
  student_id: number;
  full_name: string;
  email: string;
  phone_number: string;
}
