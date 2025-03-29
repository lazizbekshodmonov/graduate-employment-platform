import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const allowedLanguages = ['uz', 'ru', 'en', 'cyr'];

    let lang = request.headers['hl'];

    if (!allowedLanguages.includes(lang)) {
      lang = 'uz';
    }

    request.headers['hl'] = lang;

    return next.handle();
  }
}
