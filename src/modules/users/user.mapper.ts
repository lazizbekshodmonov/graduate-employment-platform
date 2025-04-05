import { IUserCreateDto, IUserUpdateDto } from './types/dto.type';
import { Injectable } from '@nestjs/common';
import { IUserEntity } from './types/entity.type';
import { PasswordService } from '../../common/services/password.service';
import { UserResponseDto } from './dto/user-response.dto';

@Injectable()
export class UserMapper {
  constructor(private readonly passwordService: PasswordService) {}

  async toEntityFromCreate(dto: IUserCreateDto): Promise<IUserEntity> {
    const hashedPassword: string = await this.passwordService.hashPassword(
      dto.password,
    );
    return {
      full_name: dto.fullName,
      username: dto.username,
      password: hashedPassword,
      role: dto.role,
      status: dto.status,
    };
  }
  async toEntityFromUpdate(dto: IUserUpdateDto): Promise<Partial<IUserEntity>> {
    let hashedPassword: string | undefined = undefined;
    if (dto.password) {
      hashedPassword = await this.passwordService.hashPassword(dto.password);
    }
    return {
      full_name: dto?.fullName,
      username: dto?.username,
      password: hashedPassword,
      status: dto?.status,
    };
  }
  toResponseDto(entity: IUserEntity): UserResponseDto {
    return {
      id: entity.id,
      fullName: entity.full_name,
      username: entity.username,
      role: entity.role,
      status: entity.status,
    };
  }
}
