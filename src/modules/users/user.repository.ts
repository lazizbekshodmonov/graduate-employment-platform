import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository, UpdateResult } from 'typeorm';
import { UserRoleEnum } from './user.enum';
import { UserEntity } from './user.entity';
import { IUserRepository } from './types/repository.type';
import { StatusEnum } from '../../common/enums/status.enum';
import { IUserEntity } from './types/entity.type';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<IUserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }
  findById(id: number): Promise<IUserEntity> {
    return this.repository.findOne({ where: { id: id } });
  }
  findByUserName(userName: string): Promise<IUserEntity> {
    return this.repository.findOne({ where: { username: userName } });
  }

  findByUserNameOfTransaction(
    username: string,
    queryRunner: QueryRunner,
  ): Promise<IUserEntity> {
    return queryRunner.manager.findOne(UserEntity, {
      where: { username },
    });
  }
  createUser(
    entity: Partial<IUserEntity>,
    queryRunner: QueryRunner,
  ): Promise<IUserEntity> {
    const user = queryRunner.manager.create(UserEntity, entity);

    return queryRunner.manager.save(user);
  }

  updateUser(id: number, entity: Partial<IUserEntity>): Promise<UpdateResult> {
    return this.repository.update({ id }, entity);
  }

  createDeveloper(fullName: string, username: string, password: string) {
    return this.repository.save({
      full_name: fullName,
      username,
      password,
      role: UserRoleEnum.DEVELOPER,
      status: StatusEnum.ACTIVE,
    });
  }
}
