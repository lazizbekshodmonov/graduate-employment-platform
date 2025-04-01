import { BaseException } from './base.exception';
import { ErrorsEnum } from '../enums/errors';
import { HttpStatus } from '@nestjs/common';

export class UserAlreadyExistsException extends BaseException {
  constructor(username: string) {
    super(
      ErrorsEnum.USER_ALREADY_EXIST_WIDTH_USERNAME_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      { username },
    );
  }
}
export class UserNotFoundException extends BaseException {
  constructor() {
    super(ErrorsEnum.USER_NOT_FOUND_EXCEPTION, HttpStatus.BAD_REQUEST);
  }
}
