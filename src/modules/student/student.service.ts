import { Injectable } from '@nestjs/common';
import { StudentRepository } from './student.repository';
import {
  IHemisTokenResponse,
  IHemisUserResponseDto,
} from '../../common/modules/hemis/hemis.type';
import { UserRepository } from '../users/user.repository';
import { DataSource, QueryRunner } from 'typeorm';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { UserRoleEnum } from '../users/user.enum';
import { StatusEnum } from '../../common/enums/status.enum';
import { StudentMapper } from './student.mapper';
import { Pagination } from '../../common/dto/pagination.dto';

@Injectable()
export class StudentService {
  constructor(
    private readonly studentRepository: StudentRepository,
    private readonly userRepository: UserRepository,
    private readonly dataSource: DataSource,
    private readonly logger: CustomLoggerService,
    private readonly studentMapper: StudentMapper,
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
  async createStudent(
    hemisUser: IHemisUserResponseDto,
    hemisToken: IHemisTokenResponse,
  ): Promise<void> {
    await this.executeTransaction(async (queryRunner: QueryRunner) => {
      const student = await this.studentRepository.findByStudentId(
        hemisUser.id,
      );
      if (student) {
        return;
      }

      const user = await this.userRepository.createUser(
        {
          full_name: hemisUser.name,
          username: hemisUser.name,
          role: UserRoleEnum.STUDENT,
          status: StatusEnum.ACTIVE,
        },
        queryRunner,
      );
      const mappedStudent = this.studentMapper.toEntityFromHemisUser(
        hemisUser,
        hemisToken,
        user,
      );
      await this.studentRepository.createStudent(mappedStudent);
    });
  }
  async getAllStudents(
    page: number,
    size: number,
    search?: string,
    status?: StatusEnum,
  ): Promise<any> {
    const { data, total } =
      await this.studentRepository.findByFilterAndPaginate(
        page,
        size,
        search,
        status,
      );

    const mappedStudents = this.studentMapper.toResponseDto(data);
    return new Pagination(mappedStudents, page, size, total);
  }
}
