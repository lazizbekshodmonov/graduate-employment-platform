import { Module } from '@nestjs/common';
import { StudentController } from './student.controller';
import { EmployerRepository } from '../employer/employer.repository';
import { StudentRepository } from './student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';
import { UserRepository } from '../users/user.repository';
import { StudentMapper } from './student.mapper';
import { StudentService } from './student.service';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [
    EmployerRepository,
    StudentRepository,
    UserRepository,
    StudentMapper,
    StudentService,
  ],
  exports: [StudentRepository],
})
export class StudentModule {}
