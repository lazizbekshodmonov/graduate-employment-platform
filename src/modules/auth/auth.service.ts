import { Injectable } from '@nestjs/common';
import { UserEntity } from '../users/user.entity';
import { PasswordService } from '../../common/services/password.service';
import { TokenService } from '../../common/modules/token/token.service';
import { UserRoleEnum } from '../users/user.enum';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { AuthLoginRequest, AuthTokenResponse } from './auth.dto';
import { TokenTypeEnum } from './auth.enum';
import {
  InvalidRefreshTokenException,
  UserIsBlockedException,
  UsernameOrPasswordInvalidException,
} from './auth.exception';
import { UserRepository } from '../users/user.repository';
import { IStudentEntity } from '../student/student.interface';
import { StudentRepository } from '../student/student.repository';
import { EmployerRepository } from '../employer/employer.repository';
import { IEmployerEntity } from '../employer/types/entity.type';
import { StatusEnum } from '../../common/enums/status.enum';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private studentRepository: StudentRepository,
    private employerRepository: EmployerRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService,
    private logger: CustomLoggerService,
  ) {}
  async getToken(authDto: AuthLoginRequest) {
    try {
      const user: UserEntity = await this.userRepository.findByUserName(
        authDto.username,
      );
      if (!user) {
        throw new UsernameOrPasswordInvalidException();
      }

      if (user.status !== StatusEnum.ACTIVE) {
        throw new UserIsBlockedException();
      }

      const comparePassword = await this.passwordService.comparePassword(
        authDto.password,
        user.password,
      );

      if (!comparePassword) {
        throw new UsernameOrPasswordInvalidException();
      }
      let student: IStudentEntity;
      let employer: IEmployerEntity;
      if (user.role === UserRoleEnum.STUDENT) {
        student = await this.studentRepository.getByUserId(user.id);
      }
      if (user.role === UserRoleEnum.EMPLOYER) {
        employer = await this.employerRepository.findByUserId(user.id);
      }
      const accessToken = await this.tokenService.createAccessToken(
        user.id,
        user.role,
        employer?.id,
        student?.id,
      );

      const refreshToken = await this.tokenService.createRefreshToken(
        user.id,
        user.role,
        employer?.id,
        student?.id,
      );

      return new AuthTokenResponse(accessToken, refreshToken);
    } catch (error) {
      this.logger.error(error);
    }
  }

  async refreshToken(authDto: AuthLoginRequest) {
    try {
      const refreshToken = await this.tokenService.getToken(
        authDto.refresh_token,
        TokenTypeEnum.REFRESH,
      );
      if (!refreshToken) {
        throw new InvalidRefreshTokenException(authDto.refresh_token);
      }
      const user = await this.userRepository.findById(refreshToken.userId);

      if (!user || user?.status !== StatusEnum.ACTIVE) {
        throw new InvalidRefreshTokenException(authDto.refresh_token);
      }

      let student: IStudentEntity;
      let employer: IEmployerEntity;
      if (user.role === UserRoleEnum.STUDENT) {
        student = await this.studentRepository.getByUserId(user.id);
      }
      if (user.role === UserRoleEnum.EMPLOYER) {
        employer = await this.employerRepository.findByUserId(user.id);
      }

      const newAccessToken = await this.tokenService.createAccessToken(
        user.id,
        user.role,
        employer?.id,
        student?.id,
      );
      const newRefreshToken = await this.tokenService.createRefreshToken(
        user.id,
        user.role,
        employer?.id,
        student?.id,
      );

      const deleteResult = await this.tokenService.deleteToken(
        authDto.refresh_token,
      );

      console.log(deleteResult);

      return new AuthTokenResponse(newAccessToken, newRefreshToken);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
