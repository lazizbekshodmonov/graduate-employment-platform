import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../../common/exceptions/base.exception';
import { ErrorsEnum } from '../../common/enums/errors';

export class FileNotUploadedException extends BaseException {
  constructor() {
    super(ErrorsEnum.FILE_NOT_UPLOADED, HttpStatus.BAD_REQUEST);
  }
}
export class FileNotFoundException extends BaseException {
  constructor() {
    super(ErrorsEnum.FILE_NOT_FOUND, HttpStatus.BAD_REQUEST);
  }
}
