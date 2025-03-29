import { Injectable } from '@nestjs/common';
import { IEmployerCreateRequestDto } from './employer.interface';
import { EmployerRepository } from './employer.repository';
import { DataSource } from 'typeorm';
import { UserRoleEnum, UserStatusEnum } from '../users/user.enum';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { EmployerStatusEnum } from './employer.enum';
import { UserRepository } from '../users/user.repository';
import { PasswordService } from '../../common/services/password.service';

@Injectable()
export class EmployerService {
  constructor(
    private employerRepository: EmployerRepository,
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

      await this.employerRepository.createEmployer(
        dto.companyName,
        dto.description,
        dto.industry,
        dto.address,
        dto.contactPerson,
        dto.phone,
        dto.email,
        user.id,
        dto.status,
        queryRunner,
      );
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(error);
    } finally {
      await queryRunner.release();
    }
  }
}
