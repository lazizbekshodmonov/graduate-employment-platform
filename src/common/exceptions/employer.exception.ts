import { BaseException } from './base.exception';
import { ErrorsEnum } from '../enums/errors';
import { HttpStatus } from '@nestjs/common';
import { SocialTypeEnum } from '../../modules/employer/employer.enum';

export class SocialLinkAlreadyExistsException extends BaseException {
  constructor(type: SocialTypeEnum) {
    super(
      ErrorsEnum.SOCIAL_LINK_ALREADY_EXIST_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      { type },
    );
  }
}

export class EmployerAlreadyExistsException extends BaseException {
  constructor() {
    super(ErrorsEnum.EMPLOYER_ALREADY_EXIST_EXCEPTION, HttpStatus.BAD_REQUEST);
  }
}

export class EmployerNotFoundException extends BaseException {
  constructor() {
    super(ErrorsEnum.EMPLOYER_NOT_FOUND_EXCEPTION, HttpStatus.BAD_REQUEST);
  }
}
