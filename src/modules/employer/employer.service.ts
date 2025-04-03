import { Injectable } from '@nestjs/common';
import {
  IEmployerCreateRequestDto,
  IEmployerResponseDto,
  IEmployerUpdateRequestDto,
} from './employer.interface';
import {
  EmployerRepository,
  SocialLinkRepository,
} from './employer.repository';
import { DataSource } from 'typeorm';
import { UserRoleEnum, UserStatusEnum } from '../users/user.enum';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { EmployerStatusEnum } from './employer.enum';
import { UserRepository } from '../users/user.repository';
import { PasswordService } from '../../common/services/password.service';
import { IPagination } from '../../common/interfaces/pagination.interface';
import { Pagination } from '../../common/dto/pagination.dto';
import { EmployerResponseDto } from './employer.dto';
import {
  EmployerAlreadyExistsException,
  EmployerNotFoundException,
} from './employer.exception';
import dayjs from 'dayjs';

@Injectable()
export class EmployerService {
  constructor(
    private employerRepository: EmployerRepository,
    private socialLinkRepository: SocialLinkRepository,
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private logger: CustomLoggerService,
    private dataSource: DataSource,
  ) {}
  async createEmployer(dto: IEmployerCreateRequestDto): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const existEmployer = await this.userRepository.findByUserName(
        dto.username,
      );
      if (existEmployer) {
        throw new EmployerAlreadyExistsException();
      }
      const hashedPassword: string = await this.passwordService.hashPassword(
        dto.password,
      );
      const user = await this.userRepository.createUser(
        dto.companyName,
        dto.username,
        hashedPassword,
        UserRoleEnum.EMPLOYER,
        dto.status === EmployerStatusEnum.ACTIVE
          ? UserStatusEnum.ACTIVE
          : UserStatusEnum.INACTIVE,
        queryRunner,
      );

      const employer = await this.employerRepository.createEmployer(
        dto.companyName,
        dto.description,
        dto.industry,
        dto.address,
        dto.phone,
        dto.email,
        dto.business_type,
        dayjs(dto.established_date).toDate(),
        dto.contact_person_name,
        dto.contact_person,
        dto.contact_position,
        dto.number_of_employees,
        dto.country,
        dto.city,
        dto.zip_code,
        user.id,
        dto.status,
        queryRunner,
      );

      for (const item of dto.social_links) {
        await this.socialLinkRepository.createSocialLink(
          item.type,
          item.link,
          employer,
          queryRunner,
        );
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async updateEmployer(
    id: number,
    dto: IEmployerUpdateRequestDto,
  ): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const employer = await this.employerRepository.findById(id, ['user']);

      if (!employer) {
        throw new EmployerNotFoundException();
      }

      let hashedPassword: string | undefined = undefined;
      if (dto.password) {
        hashedPassword = await this.passwordService.hashPassword(dto.password);
        await this.userRepository.updateUser(
          employer.user.id,
          dto.companyName || employer.companyName,
          dto.username || employer.user.username,
          hashedPassword || employer.user.password,
          (dto.status || employer.status) === EmployerStatusEnum.ACTIVE
            ? UserStatusEnum.ACTIVE
            : UserStatusEnum.INACTIVE,
        );
      }

      await this.employerRepository.updateEmployer(
        employer.id,
        dto.companyName || employer.companyName,
        dto.description || employer.description,
        dto.industry || employer.industry,
        dto.address || employer.address,
        dto.phone || employer.phone,
        dto.email || employer.email,
        dto.business_type || employer.businessType,
        dto.established_date
          ? dayjs(dto.established_date).toDate()
          : employer.establishedDate,
        dto.contact_person_name || employer.contactPersonName,
        dto.contact_person || employer.contactPerson,
        dto.contact_position || employer.contactPosition,
        dto.number_of_employees || employer.numberOfEmployees,
        dto.country || employer.country,
        dto.city || employer.city,
        dto.zip_code || employer.zipCode,
        dto.status || employer.status,
        queryRunner,
      );

      if (dto.social_links) {
        const existingSocialLinks =
          await this.socialLinkRepository.findByEmployerId(employer.id);

        for (const item of dto.social_links) {
          const existingLink = existingSocialLinks.find(
            (link) => link.type === item.type,
          );

          if (existingLink) {
            await this.socialLinkRepository.updateSocialLink(
              existingLink.id,
              item.link,
              queryRunner,
            );
          } else {
            await this.socialLinkRepository.createSocialLink(
              item.type,
              item.link,
              employer,
              queryRunner,
            );
          }
        }
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
    } finally {
      await queryRunner.release();
    }
  }

  async getAllEmployers(
    page: number,
    size: number,
    search?: string,
    status?: EmployerStatusEnum,
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
        'socialLinks',
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
