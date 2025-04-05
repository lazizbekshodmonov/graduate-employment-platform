import { Module, OnModuleInit } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordService } from '../../common/services/password.service';
import { ConfigService } from '@nestjs/config';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { StudentRepository } from '../student/student.repository';
import { EmployerRepository } from '../employer/employer.repository';
import { UserMapper } from './user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [
    UsersService,
    PasswordService,
    ConfigService,
    UserRepository,
    StudentRepository,
    EmployerRepository,
    UserMapper,
  ],
})
export class UsersModule implements OnModuleInit {
  constructor(
    private readonly configService: ConfigService,
    private userService: UsersService,
  ) {}
  async onModuleInit(): Promise<void> {
    const createDeveloperUser = this.configService.get<boolean>('dev.create');
    if (createDeveloperUser) {
      await this.userService.createDeveloper();
      console.log('Developer user created successfully.');
    }
  }
}
