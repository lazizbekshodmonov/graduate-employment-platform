import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorsEnum } from '../../common/enums/errors';
import { HttpStatus } from '@nestjs/common';

export class VacancyNotFoundException extends BaseException {
  constructor() {
    super(ErrorsEnum.VACANCY_NOT_FOUND_EXCEPTION, HttpStatus.BAD_REQUEST);
  }
}
