import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'node:fs';
import axios from 'axios';
import dayjs from 'dayjs';
import FormData from 'form-data';
import { readFileSync } from 'fs';

@Injectable()
export class TelegramBotService {
  readonly chat_id: number;
  readonly bot_token: string;
  constructor(@Inject(ConfigService) private configService: ConfigService) {
    this.chat_id = configService.get<number>('support.chat_id');
    this.bot_token = configService.get<string>('support.bot_token');
  }

  sendLog(path: string, fileName: string) {
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    if (!fs.existsSync(path)) {
      console.log('Log fayli mavjud emas.');
      return;
    }
    const file = readFileSync(path);
    const formData = new FormData();
    formData.append('chat_id', `${this.chat_id}`);
    formData.append('document', file, { filename: fileName });
    formData.append('caption', `<b>⏰Date: </b> ${date}`);
    axios
      .post(
        `https://api.telegram.org/bot${this.bot_token}/sendDocument`,
        formData,
        {
          params: { parse_mode: 'HTML' },
          headers: formData.getHeaders(),
        },
      )
      .then(() => {
        fs.unlinkSync(path);
      })
      .catch((error) => {
        console.error('Log faylni yuborishda xatolik:', error);
      });
  }
}
