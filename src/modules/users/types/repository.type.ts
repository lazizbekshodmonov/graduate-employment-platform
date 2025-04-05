import { QueryRunner, UpdateResult } from 'typeorm';
import { IUserEntity } from './entity.type';

export interface IUserRepository {
  findById(id: number): Promise<IUserEntity>;
  findByUserName(userName: string): Promise<IUserEntity>;
  createUser(
    entity: IUserEntity,
    queryRunner: QueryRunner,
  ): Promise<IUserEntity>;
  updateUser(id: number, entity: Partial<IUserEntity>): Promise<UpdateResult>;
}
