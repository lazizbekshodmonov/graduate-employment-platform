import { Injectable, Logger, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { DatabaseModule } from './common/modules/database/database.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { LanguageInterceptor } from './common/interceptors/language.interceptor';
import { TelegramBotService } from './common/services/telegram-bot.service';
import { LoggerModule } from './common/modules/logger/logger.module';
import { CustomLoggerService } from './common/modules/logger/logger.service';
import { CustomI18nModule } from './common/modules/i18n/i18n.module';
import { EmployerModule } from './modules/employer/employer.module';
import { VacancyModule } from './modules/vacancy/vacancy.module';
import { StudentModule } from './modules/student/student.module';
import { ApplicationModule } from './modules/application/application.module';
import { AdminModule } from './modules/admin/admin.module';

@Injectable()
export class BuildLogger extends Logger {
  log(message: string) {
    super.log(`[BUILD] ${message}`);
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DatabaseModule,
    LoggerModule,
    CustomI18nModule,
    AuthModule,
    UsersModule,
    EmployerModule,
    VacancyModule,
    StudentModule,
    ApplicationModule,
    AdminModule,
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: LanguageInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: Logger,
      useClass: BuildLogger,
    },
    CustomLoggerService,
    TelegramBotService,
  ],
  exports: [CustomLoggerService],
})
export class AppModule {}
