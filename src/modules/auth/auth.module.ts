import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { TokenModule } from '../../common/modules/token/token.module';
import { PasswordService } from '../../common/services/password.service';
import { TokenService } from '../../common/modules/token/token.service';
import { UserRepository } from '../users/user.repository';
import { StudentRepository } from '../student/student.repository';
import { StudentEntity } from '../student/student.entity';
import { EmployerEntity } from '../employer/employer.entity';
import { EmployerRepository } from '../employer/employer.repository';
import { HemisModule } from '../../common/modules/hemis/hemis.module';
import { StudentService } from '../student/student.service';
import { HemisService } from '../../common/modules/hemis/hemis.service';
import { StudentMapper } from '../student/student.mapper';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, StudentEntity, EmployerEntity]),
    TokenModule,
    HemisModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    UserRepository,
    StudentRepository,
    EmployerRepository,
    StudentService,
    HemisService,
    StudentMapper,
  ],
})
export class AuthModule {}
