import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ErrorsEnum } from '../enums/errors';

export class InvalidRefreshTokenException extends BaseException {
  constructor(token: string) {
    super(ErrorsEnum.INVALID_REFRESH_TOKEN, HttpStatus.BAD_REQUEST, { token });
  }
}

export class UsernameOrPasswordInvalidException extends BaseException {
  constructor() {
    super(
      ErrorsEnum.USERNAME_OR_PASSWORD_INVALID_EXCEPTION,
      HttpStatus.BAD_REQUEST,
    );
  }
}

export class UserIsBlockedException extends BaseException {
  constructor() {
    super(ErrorsEnum.USER_IS_BLOCKED_EXCEPTION, HttpStatus.BAD_REQUEST);
  }
}
