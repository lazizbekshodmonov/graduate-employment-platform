import { IUserCreateDto } from '../types/dto.type';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { UserRoleEnum } from '../user.enum';
import { StatusEnum } from '../../../common/enums/status.enum';

export class UserCreateDto implements IUserCreateDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  fullName: string;

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
  @IsEnum(StatusEnum)
  status?: StatusEnum;

  @IsNotEmpty()
  @IsEnum(UserRoleEnum)
  role: UserRoleEnum;
}
