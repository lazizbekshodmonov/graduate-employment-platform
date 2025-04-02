import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  LoggerService,
  ValidationError,
} from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { TelegramBotService } from '../../services/telegram-bot.service';
import * as fs from 'node:fs';
import * as path from 'node:path';
import * as util from 'util';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CustomLoggerService implements LoggerService {
  private logger: winston.Logger;

  constructor(
    private botService: TelegramBotService,
    private readonly configService: ConfigService,
  ) {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `[${timestamp}] ${level}: ${message}`;
        }),
      ),
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string) {
    this.logger.info(message);
  }
  private logInternalServerError(error: any) {
    const botActive = this.configService.get<boolean>('support.active');
    this.logger.error(`${error.name}\n ${error?.stack}`);
    const errorFileName = `error-${Date.now()}.txt`;
    const errorMessage = `Error: ${error.name}\n ${error?.stack}`;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'logs',
      errorFileName,
    );
    fs.writeFileSync(filePath, errorMessage);

    if (botActive) {
      this.botService.sendLog(filePath, errorFileName);
    }
    if (error.message === 'VALIDATION_EXCEPTION') {
      throw new BadRequestException(error.message);
    }
    throw new InternalServerErrorException();
  }
  error(error: Error) {
    if (error instanceof Array) {
      this.logInternalServerError(error);
    }
    if (error instanceof HttpException) {
      const status = error.getStatus();
      if (status >= 400 && status < 500) {
        throw error;
      } else {
        this.logInternalServerError(error);
      }
    } else {
      this.logInternalServerError(error);
    }
  }
  validationError(errors: ValidationError[]) {
    const botActive = this.configService.get<boolean>('support.active');
    const formattedErrors = util.inspect(errors, {
      depth: null,
      colors: false,
    });
    this.logger.error(`Validation Error: \n ${formattedErrors}`);
    const errorFileName = `error-${Date.now()}.txt`;
    console.log(errors);
    const errorMessage = `Validation Error: \n ${formattedErrors}`;
    const filePath = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'logs',
      errorFileName,
    );
    fs.writeFileSync(filePath, errorMessage);

    if (botActive) {
      this.botService.sendLog(filePath, errorFileName);
    }
  }
  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }

  verbose(message: string) {
    this.logger.verbose(message);
  }
}
