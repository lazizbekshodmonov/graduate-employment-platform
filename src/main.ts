import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { getLocalIP } from './common/utils/local.ip';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { BaseException } from './common/exceptions/base.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const i18nService =
    app.get<I18nService<Record<string, unknown>>>(I18nService);

  BaseException.setI18nService(i18nService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors.length > 0) {
          return new BadRequestException({
            timestamp: new Date().toISOString(),
            message: 'Bad Request',
            status: 400,
          });
        }
      },
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix('api/v1');
  const configService = app.get(ConfigService);
  const port = configService.get<number>('http.port', 3000);
  app.listen(port).then(() => {
    console.log(`Server started on port ${port}`);
  });
}
bootstrap();
