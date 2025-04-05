import { SocialTypeEnum } from '../employer.enum';
import { QueryRunner, UpdateResult } from 'typeorm';
import { IEmployerEntity, ISocialLinkEntity } from './entity.type';
import { IUserEntity } from '../../users/types/entity.type';
import { StatusEnum } from '../../../common/enums/status.enum';

export interface IEmployerRepository {
  createEmployer(
    employer: IEmployerEntity,
    queryRunner: QueryRunner,
  ): Promise<IEmployerEntity>;

  updateEmployer(
    id: number,
    employer: Partial<IEmployerEntity>,
    queryRunner: QueryRunner,
  ): Promise<UpdateResult>;

  findByUserId(id: number): Promise<IEmployerEntity>;

  findById(id: number, relations: string[]): Promise<IEmployerEntity>;

  findByFilterAndPaginate(
    page: number,
    limit: number,
    search?: string,
    status?: StatusEnum,
  ): Promise<{ data: IEmployerEntity[]; total: number }>;
}

export interface ISocialLinkRepository {
  findByEmployerId(employerId: number): Promise<ISocialLinkEntity[]>;
  findByEmployerIdAndType(
    employerId: number,
    type: SocialTypeEnum,
  ): Promise<ISocialLinkEntity>;

  createSocialLink(
    type: SocialTypeEnum,
    link: string,
    employer: IEmployerEntity,
    queryRunner: QueryRunner,
  ): Promise<ISocialLinkEntity>;
  updateSocialLink(
    id: number,
    link: string,
    queryRunner: QueryRunner,
  ): Promise<UpdateResult>;
}
