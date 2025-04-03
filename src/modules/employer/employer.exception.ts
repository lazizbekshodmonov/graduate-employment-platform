import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorsEnum } from '../../common/enums/errors';
import { HttpStatus } from '@nestjs/common';
import { SocialTypeEnum } from './employer.enum';

export class SocialLinkAlreadyExistsException extends BaseException {
  constructor(type: SocialTypeEnum) {
    super(
      ErrorsEnum.SOCIAL_LINK_ALREADY_EXIST_EXCEPTION,
      HttpStatus.BAD_REQUEST,
      { type },
    );
  }
}

export class SocialLinkNotFoundException extends BaseException {
  constructor() {
    super(ErrorsEnum.SOCIAL_LINK_NOT_FOUND_EXCEPTION, HttpStatus.BAD_REQUEST);
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
