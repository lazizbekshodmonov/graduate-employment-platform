import { Injectable } from '@nestjs/common';
import { PasswordService } from '../../common/services/password.service';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from '../../common/exceptions/user.exception';
import { UserRepository } from './user.repository';
import { IUserResponse } from './user.interface';
import { UserResponseDto } from './user.dto';
import { UserRoleEnum } from './user.enum';
import { IStudentEntity } from '../student/student.interface';
import { StudentRepository } from '../student/student.repository';
import { IEmployerEntity } from '../employer/employer.interface';
import { EmployerRepository } from '../employer/employer.repository';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly studentRepository: StudentRepository,
    private readonly employerRepository: EmployerRepository,
    private readonly passwordService: PasswordService,
    private readonly logger: CustomLoggerService,
    private configService: ConfigService,
  ) {}
  async createDeveloper() {
    try {
      const full_name = this.configService.get<string>('dev.full_name');
      const username = this.configService.get<string>('dev.username');
      const password = this.configService.get<string>('dev.password');
      const user = await this.userRepository.getByUserName(username);
      if (user) {
        throw new UserAlreadyExistsException(username);
      }

      const hashedPassword: string =
        await this.passwordService.hashPassword(password);

      await this.userRepository.createDeveloper(
        full_name,
        username,
        hashedPassword,
      );
    } catch (error) {
      console.log(error);
    }
  }
  async findById(id: number): Promise<IUserResponse> {
    try {
      const user = await this.userRepository.getById(id);
      if (!user) {
        throw new UserNotFoundException();
      }
      let student: IStudentEntity;
      let employer: IEmployerEntity;

      if (user.role === UserRoleEnum.STUDENT) {
        student = await this.studentRepository.getByUserId(user.id);
      }
      if (user.role === UserRoleEnum.EMPLOYER) {
        employer = await this.employerRepository.getByUserId(user.id);
      }
      return new UserResponseDto(user, employer, student);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
