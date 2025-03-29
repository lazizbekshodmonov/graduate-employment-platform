import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from '../../modules/token/token.service';
import { TokenTypeEnum } from '../../../modules/auth/auth.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const tokenDocument = await this.tokenService.getToken(
      token,
      TokenTypeEnum.ACCESS,
    );
    if (!tokenDocument) {
      throw new UnauthorizedException();
    }
    request.user = {
      userId: tokenDocument.userId,
      role: tokenDocument.userRole,
      studentId: tokenDocument?.studentId,
      employerId: tokenDocument.employerId,
    };
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
