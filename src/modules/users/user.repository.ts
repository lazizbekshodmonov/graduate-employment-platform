import { Injectable } from '@nestjs/common';
import { DataSource, QueryRunner, Repository } from 'typeorm';
import { IUserEntity, IUserRepository } from './user.interface';
import { UserRoleEnum, UserStatusEnum } from './user.enum';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  private readonly repository: Repository<IUserEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(UserEntity);
  }
  getById(id: number): Promise<IUserEntity> {
    return this.repository.findOne({ where: { id: id } });
  }
  getByUserName(userName: string): Promise<IUserEntity> {
    return this.repository.findOne({ where: { username: userName } });
  }
  createUser(
    fullName: string,
    username: string,
    password: string,
    role: UserRoleEnum,
    status: UserStatusEnum,
    queryRunner: QueryRunner,
  ): Promise<IUserEntity> {
    const user = this.repository.create({
      full_name: fullName,
      username,
      password,
      role,
      status,
    });

    return queryRunner.manager.save(user);
  }

  createDeveloper(fullName: string, username: string, password: string) {
    return this.repository.save({
      full_name: fullName,
      username,
      password,
      role: UserRoleEnum.DEVELOPER,
      status: UserStatusEnum.ACTIVE,
    });
  }
}
