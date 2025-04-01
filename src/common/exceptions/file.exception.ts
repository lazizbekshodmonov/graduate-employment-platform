import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';
import { ErrorsEnum } from '../enums/errors';

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
