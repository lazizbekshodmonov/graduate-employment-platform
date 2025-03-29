import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { EmployerRepository } from '../employer/employer.repository';
import { StudentRepository } from './student.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  controllers: [StudentController],
  providers: [StudentService, EmployerRepository, StudentRepository],
  exports: [StudentRepository],
})
export class StudentModule {}
