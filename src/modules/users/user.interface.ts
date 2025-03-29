import { IBaseEntity } from '../../common/interfaces/base.interface';
import { UserRoleEnum, UserStatusEnum } from './user.enum';
import { IEmployerResponse } from '../employer/employer.interface';
import { IStudentResponse } from '../student/student.interface';
import { QueryRunner } from 'typeorm';

export interface IUserEntity extends IBaseEntity {
  full_name: string;
  username: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
}

export interface ICreateUserRequest {
  full_name: string;
  username: string;
  password: string;
  role: UserRoleEnum;
  status: UserStatusEnum;
}

export interface IUserResponse {
  full_name: string;
  username: string;
  status: UserStatusEnum;
  role: UserRoleEnum;
  employer?: IEmployerResponse;
  student?: IStudentResponse;
}

export interface IUserRepository {
  getById(id: number): Promise<IUserEntity>;
  getByUserName(userName: string): Promise<IUserEntity>;
  createUser(
    fullName: string,
    username: string,
    password: string,
    role: UserRoleEnum,
    status: UserStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<IUserEntity>;
}
