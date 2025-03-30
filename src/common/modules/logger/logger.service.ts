import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  LoggerService,
} from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import { TelegramBotService } from '../../services/telegram-bot.service';
import * as fs from 'node:fs';
import * as path from 'node:path';
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
    console.log(botActive);
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
    if (error instanceof HttpException) {
      const status = error.getStatus();
      console.log('Logger Service: ', status);
      if (status >= 400 && status < 500) {
        throw error;
      } else {
        this.logInternalServerError(error);
      }
    } else {
      this.logInternalServerError(error);
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
