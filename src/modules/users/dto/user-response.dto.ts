import { IUserResponseDto } from '../types/dto.type';
import { StatusEnum } from '../../../common/enums/status.enum';
import { UserRoleEnum } from '../user.enum';
import { IUserEntity } from '../types/entity.type';

export class UserResponseDto implements IUserResponseDto {
  id: number;
  fullName: string;
  username: string;
  role: UserRoleEnum;
  status: StatusEnum;
  constructor(entity: IUserEntity) {
    this.id = entity.id;
    this.fullName = entity.full_name;
    this.username = entity.username;
    this.role = entity.role;
    this.status = entity.status;
  }
}
