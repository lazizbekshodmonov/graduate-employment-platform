import { Injectable } from '@nestjs/common';
import { PasswordService } from '../../common/services/password.service';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import {
  UserAlreadyExistsException,
  UserNotFoundException,
} from './user.exception';
import { UserRepository } from './user.repository';
import { ConfigService } from '@nestjs/config';
import { UserMapper } from './user.mapper';
import { UserResponseDto } from './dto/user-response.dto';
import { IUserResponseDto } from './types/dto.type';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly passwordService: PasswordService,
    private readonly logger: CustomLoggerService,
    private readonly configService: ConfigService,
    private readonly userMapper: UserMapper,
  ) {}
  async createDeveloper() {
    try {
      const full_name = this.configService.get<string>('dev.full_name');
      const username = this.configService.get<string>('dev.username');
      const password = this.configService.get<string>('dev.password');
      const user = await this.userRepository.findByUserName(username);
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
  async findById(id: number): Promise<IUserResponseDto> {
    try {
      const user = await this.userRepository.findById(id);
      if (!user) {
        throw new UserNotFoundException();
      }
      return new UserResponseDto(user);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
