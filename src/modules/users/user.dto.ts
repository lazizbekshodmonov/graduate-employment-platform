import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRoleEnum, UserStatusEnum } from './user.enum';
import { IUserEntity, IUserResponse } from './user.interface';
import {
  IEmployerEntity,
  IEmployerResponseDto,
} from '../employer/employer.interface';
import { IStudentEntity, IStudentResponse } from '../student/student.interface';
import { EmployerResponseDto } from '../employer/employer.dto';
import { StudentResponseDto } from '../student/student.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  full_name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  username: string;

  @IsNotEmpty()
  @IsString()
  // @MinLength(8, {
  //   message: 'Parol eng kamida 8 ta belgidan iborat bo‘lishi kerak',
  // })
  // @Matches(/(?=.*[A-Z])/, {
  //   message: 'Parolda kamida bitta katta harf bo‘lishi kerak',
  // })
  // @Matches(/(?=.*[a-z])/, {
  //   message: 'Parolda kamida bitta kichik harf bo‘lishi kerak',
  // })
  // @Matches(/(?=.*\d)/, { message: 'Parolda kamida bitta raqam bo‘lishi kerak' })
  // @Matches(/(?=.*[\W_])/, {
  //   message: 'Parolda kamida bitta maxsus belgi bo‘lishi kerak',
  // })
  password: string;

  @IsOptional()
  @IsEnum(UserStatusEnum)
  status?: UserStatusEnum;

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;

  @IsOptional()
  @IsNumber()
  organization_id?: number;
}

export class UserResponseDto implements IUserResponse {
  readonly id: number;
  readonly full_name: string;
  readonly username: string;
  readonly role: UserRoleEnum;
  readonly status: UserStatusEnum;
  readonly student?: IStudentResponse;
  readonly employer?: IEmployerResponseDto;
  constructor(
    user: IUserEntity,
    employer?: IEmployerEntity,
    student?: IStudentEntity,
  ) {
    this.id = user.id;
    this.full_name = user.full_name;
    this.username = user.username;
    this.status = user.status;
    this.role = user.role;
    if (student) {
      const studentResponse = new StudentResponseDto(student);
      this.student = studentResponse;
      this.full_name = studentResponse.full_name;
    }
    if (employer) {
      const employerResponse = new EmployerResponseDto(employer);
      this.employer = employerResponse;
      this.full_name = employerResponse.company_name;
    }
  }
}
