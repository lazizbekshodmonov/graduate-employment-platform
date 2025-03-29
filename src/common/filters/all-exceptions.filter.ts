import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Response } from 'express';
import { writeFile } from 'fs';
import dayjs from 'dayjs';
import { TelegramBotService } from '../services/telegram-bot.service';
import { join } from 'path';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly telegramBotService: TelegramBotService) {}
  async catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : new InternalServerErrorException().getStatus();

    const errorMessage =
      exception instanceof HttpException ? exception.getResponse() : exception;

    if (status !== 401) {
      const date = dayjs();
      const logMessage = `
      ============== ERROR LOG ==============
      Time: ${dayjs(date).format('YYYY-MM-DD HH:mm:ss')}
      Status: ${status}
      Message: ${JSON.stringify(errorMessage)}
      =======================================
    `;

      console.error(logMessage);

      const path = join(__dirname, 'logs', `log-${dayjs(date)}.txt`);
      writeFile(path, logMessage, {}, () => {});

      // this.telegramBotService.sendLog(path, date);
    }

    return exception;
  }
}
