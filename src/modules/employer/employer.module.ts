import { Module } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { EmployerController } from './employer.controller';
import { EmployerEntity } from './employer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployerRepository } from './employer.repository';
import { UserRepository } from '../users/user.repository';
import { StudentRepository } from '../student/student.repository';
import { PasswordService } from '../../common/services/password.service';

@Module({
  imports: [TypeOrmModule.forFeature([EmployerEntity])],
  controllers: [EmployerController],
  providers: [
    EmployerService,
    EmployerRepository,
    UserRepository,
    StudentRepository,
    PasswordService,
  ],
})
export class EmployerModule {}
