import { Injectable } from '@nestjs/common';
import * as fs from 'node:fs';
import axios from 'axios';
import dayjs from 'dayjs';
import FormData from 'form-data';
import { readFileSync } from 'fs';
import { bot_config } from './config';

@Injectable()
export class TelegramBotService {
  readonly chat_id: string = bot_config.TELEGRAM_CHAT_ID;
  readonly bot_token: string = bot_config.TELEGRAM_BOT_TOKEN;

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
