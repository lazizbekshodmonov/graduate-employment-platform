import {
  IHemisTokenResponse,
  IHemisUserResponseDto,
} from '../../common/modules/hemis/hemis.type';
import { IUserEntity } from '../users/types/entity.type';
import { IStudentEntity, IStudentResponse } from './student.interface';
import { Injectable } from '@nestjs/common';
import { StudentResponseDto } from './student.dto';

@Injectable()
export class StudentMapper {
  toEntityFromHemisUser(
    hemisUser: IHemisUserResponseDto,
    hemisToken: IHemisTokenResponse,
    user: IUserEntity,
  ): IStudentEntity {
    return {
      student_id: hemisUser.id,
      full_name: hemisUser.name,
      email: hemisUser.email,
      user: user,
      access_token: hemisToken.access_token,
      refresh_token: hemisToken.refresh_token,
      phone_number: hemisUser.email,
      status: user.status,
    };
  }
  toResponseDto(dataList: IStudentEntity[]): IStudentResponse[] {
    return dataList.map((item) => new StudentResponseDto(item));
  }
}
