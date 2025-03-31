import { join } from 'path';
import { ExecutionContext, Module } from '@nestjs/common';
import { HeaderResolver, I18nJsonLoader, I18nModule } from 'nestjs-i18n';

@Module({
  imports: [
    I18nModule.forRoot({
      fallbackLanguage: 'uz',
      loader: I18nJsonLoader,
      loaderOptions: {
        path: '../locales',
        watch: true,
      },
      resolvers: [
        new HeaderResolver(['hl']),
        {
          resolve: (context: ExecutionContext) => {
            const request = context.switchToHttp().getRequest();
            return request.headers['hl'] || 'uz';
          },
        },
      ],
      throwOnMissingKey: true,
    }),
  ],
})
export class CustomI18nModule {}
