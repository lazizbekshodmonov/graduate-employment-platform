import { IBaseEntity } from '../../common/interfaces/base.interface';
import { UserRoleEnum, UserStatusEnum } from './user.enum';
import { IEmployerResponseDto } from '../employer/employer.interface';
import { IStudentResponse } from '../student/student.interface';
import { QueryRunner, UpdateResult } from 'typeorm';

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
  employer?: IEmployerResponseDto;
  student?: IStudentResponse;
}

export interface IUserRepository {
  findById(id: number): Promise<IUserEntity>;
  findByUserName(userName: string): Promise<IUserEntity>;
  createUser(
    fullName: string,
    username: string,
    password: string,
    role: UserRoleEnum,
    status: UserStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<IUserEntity>;
  updateUser(
    id: number,
    fullName: string,
    username: string,
    password: string,
    status: UserStatusEnum,
  ): Promise<UpdateResult>;
}
