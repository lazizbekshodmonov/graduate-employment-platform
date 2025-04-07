import { Injectable } from '@nestjs/common';

import {
  EmployerRepository,
  SocialLinkRepository,
} from './employer.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { UserRoleEnum } from '../users/user.enum';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { UserRepository } from '../users/user.repository';
import { IPagination } from '../../common/interfaces/pagination.interface';
import { Pagination } from '../../common/dto/pagination.dto';
import {
  EmployerAlreadyExistsException,
  EmployerNotFoundException,
} from './employer.exception';
import { IFileEntity } from '../file/file.interface';
import { UserMapper } from '../users/user.mapper';
import {
  IEmployerCreateDto,
  IEmployerResponseDto,
  IEmployerUpdateDto,
  ISocialLinkCreateDto,
} from './types/dto.type';
import { EmployerMapper } from './employer.mapper';
import { FileService } from '../file/file.service';
import { EmployerResponseDto } from './dto/employer.response.dto';
import { StatusEnum } from '../../common/enums/status.enum';
import { IEmployerEntity } from './types/entity.type';
import { VacancyRepository } from '../vacancy/vacancy.repository';
import { VacancyStatusEnum } from '../vacancy/vacancy.enum';

@Injectable()
export class EmployerService {
  constructor(
    private employerRepository: EmployerRepository,
    private socialLinkRepository: SocialLinkRepository,
    private vacancyRepository: VacancyRepository,
    private userRepository: UserRepository,
    private fileService: FileService,
    private logger: CustomLoggerService,
    private dataSource: DataSource,
    private userMapper: UserMapper,
    private employerMapper: EmployerMapper,
  ) {}

  private async executeTransaction(
    callback: (queryRunner: QueryRunner) => Promise<void>,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await callback(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  private async manageSocialLinks(
    employer: IEmployerEntity,
    socialLinks: ISocialLinkCreateDto[],
    queryRunner: QueryRunner,
  ) {
    if (!socialLinks) return;
    const existingLinks = await this.socialLinkRepository.findByEmployerId(
      employer.id,
    );
    for (const link of socialLinks) {
      const existing = existingLinks.find((l) => l.type === link.type);
      if (existing) {
        await this.socialLinkRepository.updateSocialLink(
          existing.id,
          link.link,
          queryRunner,
        );
      } else {
        await this.socialLinkRepository.createSocialLink(
          link.type,
          link.link,
          employer,
          queryRunner,
        );
      }
    }
  }

  async createEmployer(dto: IEmployerCreateDto): Promise<void> {
    await this.executeTransaction(async (queryRunner: QueryRunner) => {
      const existEmployer =
        await this.userRepository.findByUserNameOfTransaction(
          dto.username,
          queryRunner,
        );
      if (existEmployer) {
        throw new EmployerAlreadyExistsException();
      }
      const userEntity = await this.userMapper.toEntityFromCreate({
        fullName: dto.companyName,
        username: dto.username,
        password: dto.password,
        role: UserRoleEnum.EMPLOYER,
        status: dto.status,
      });
      const user = await this.userRepository.createUser(
        userEntity,
        queryRunner,
      );

      let file: IFileEntity;
      if (dto.logo) {
        file = await this.fileService.findByHashId(dto.logo);
      }
      const employerData = this.employerMapper.toEntityFromCreate(
        dto,
        user,
        file,
      );
      const employer = await this.employerRepository.createEmployer(
        employerData,
        queryRunner,
      );
      await this.manageSocialLinks(employer, dto.socialLinks, queryRunner);
    });
  }

  async updateEmployer(id: number, dto: IEmployerUpdateDto): Promise<void> {
    await this.executeTransaction(async (queryRunner: QueryRunner) => {
      const employer = await this.employerRepository.findById(id, ['user']);
      if (!employer) throw new EmployerNotFoundException();

      const mappedUser = await this.userMapper.toEntityFromUpdate({
        fullName: dto.companyName,
        username: dto.username,
        password: dto.password,
        status: dto.status,
      });
      await this.userRepository.updateUser(employer.user.id, mappedUser);

      let file: IFileEntity | undefined;
      if (dto.logo) {
        file = await this.fileService.findByHashId(dto.logo);
      }
      const mappedEmployer = this.employerMapper.toEntityFromUpdate(dto, file);
      await this.employerRepository.updateEmployer(
        employer.id,
        mappedEmployer,
        queryRunner,
      );

      if (dto.status === StatusEnum.INACTIVE) {
        await this.vacancyRepository.changeMultipleStatus(
          employer.id,
          VacancyStatusEnum.INACTIVE,
          queryRunner,
        );
      }

      await this.manageSocialLinks(employer, dto.socialLinks, queryRunner);
    });
  }

  async getAllEmployers(
    page: number,
    size: number,
    search?: string,
    status?: StatusEnum,
  ): Promise<IPagination<IEmployerResponseDto>> {
    try {
      const employers = await this.employerRepository.findByFilterAndPaginate(
        page,
        size,
        search,
        status,
      );
      const mappedData = employers.data.map(
        (employer) => new EmployerResponseDto(employer),
      );
      return new Pagination(mappedData, page, size, employers.total);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async getEmployerById(id: number): Promise<IEmployerResponseDto> {
    try {
      const employer = await this.employerRepository.findById(id, [
        'user',
        'social_links',
        'file',
      ]);

      if (!employer) {
        throw new EmployerNotFoundException();
      }

      return new EmployerResponseDto(employer);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
