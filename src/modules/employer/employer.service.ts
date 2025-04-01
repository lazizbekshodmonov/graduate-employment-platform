import { Injectable } from '@nestjs/common';
import {
  IEmployerCreateRequestDto,
  IEmployerResponseDto,
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
} from '../../common/exceptions/employer.exception';

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

  async getAllEmployers(
    page: number,
    size: number,
    search?: string,
    status?: EmployerStatusEnum,
  ): Promise<IPagination<IEmployerResponseDto>> {
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
