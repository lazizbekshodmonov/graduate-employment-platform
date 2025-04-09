import { Module } from '@nestjs/common';
import { HemisService } from './hemis.service';
import { CustomLoggerService } from '../logger/logger.service';
import { TelegramBotService } from '../../services/telegram-bot.service';

@Module({
  imports: [],
  providers: [HemisService, CustomLoggerService, TelegramBotService],
})
export class HemisModule {}
