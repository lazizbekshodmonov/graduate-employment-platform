import { HttpException, HttpStatus } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { ErrorsEnum } from '../enums/errors';

export class BaseException extends HttpException {
  private static i18n: I18nService;

  static setI18nService(i18nService: I18nService<Record<string, unknown>>) {
    BaseException.i18n = i18nService;
  }

  constructor(
    errorCode: ErrorsEnum,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    args?: object,
  ) {
    const errorKey = ErrorsEnum[errorCode];
    const translatedMessage = BaseException.i18n
      ? BaseException.i18n.translate(`errors.${errorKey}`, {
          args: { ...args },
        })
      : errorKey;

    super({ message: translatedMessage, code: errorCode }, statusCode);
  }
}
