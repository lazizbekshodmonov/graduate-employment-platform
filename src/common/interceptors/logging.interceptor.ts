import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, tap } from 'rxjs';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const method = request.method;
    const url = request.url;

    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        const statusCode = response.statusCode;
        this.logger.log(
          `Method: ${method}, URL: ${url}, StatusCode: ${statusCode}, Body: ${JSON.stringify(request.body)} Response Time: ${responseTime}ms`,
        );
      }),
      catchError(async (err) => {
        const responseTime = Date.now() - now;
        const statusCode = err.status || 500;

        this.logger.error(
          `Method: ${method}, URL: ${url}, Status: ${statusCode}, Body: ${JSON.stringify(
            request.body,
          )}, Response Time: ${responseTime}ms, Error: ${err.message}`,
        );

        response
          .status(statusCode)
          .send(err.response || { message: err.message });
        return;
      }),
    );
  }
}
