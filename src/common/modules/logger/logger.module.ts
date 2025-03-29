import { Global, Module } from '@nestjs/common';
import { CustomLoggerService } from './logger.service';
import { TelegramBotService } from '../../services/telegram-bot.service';

@Global()
@Module({
  providers: [CustomLoggerService, TelegramBotService],
  exports: [CustomLoggerService],
})
export class LoggerModule {}
