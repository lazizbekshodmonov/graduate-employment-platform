import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  BadRequestException,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { BaseException } from './common/exceptions/base.exception';
import { CustomLoggerService } from './common/modules/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const i18nService =
    app.get<I18nService<Record<string, unknown>>>(I18nService);
  const logger = app.get(CustomLoggerService);
  BaseException.setI18nService(i18nService);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        if (errors.length > 0) {
          logger.validationError(errors);
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
  app.listen(port, '0.0.0.0').then(() => {
    console.log(`Server started on port ${port}`);
  });
}
bootstrap();
