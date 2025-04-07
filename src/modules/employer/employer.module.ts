import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { EmployerEntity } from './employer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  EmployerRepository,
  SocialLinkRepository,
} from './employer.repository';
import { UserRepository } from '../users/user.repository';
import { StudentRepository } from '../student/student.repository';
import { PasswordService } from '../../common/services/password.service';
import { FileService } from '../file/file.service';
import { UserMapper } from '../users/user.mapper';
import { EmployerMapper } from './employer.mapper';
import { FileRepository } from '../file/file.repository';
import { VacancyRepository } from '../vacancy/vacancy.repository';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity])],
  controllers: [EmployerController],
  providers: [
    EmployerService,
    PasswordService,
    FileService,
    EmployerRepository,
    VacancyRepository,
    SocialLinkRepository,
    UserRepository,
    StudentRepository,
    FileRepository,
    UserMapper,
    EmployerMapper,
  ],
})
export class EmployerModule {}
