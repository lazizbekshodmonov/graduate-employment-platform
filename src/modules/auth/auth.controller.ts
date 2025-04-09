import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  AuthLoginRequest,
  AuthTokenResponse,
  HemisLoginRequestDto,
} from './auth.dto';
import { GrantTypeEnum } from './auth.enum';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post('token')
  create(@Body() authDto: AuthLoginRequest): Promise<AuthTokenResponse> {
    if (authDto.grant_type === GrantTypeEnum.PASSWORD) {
      return this.authService.getToken(authDto);
    } else if (authDto.grant_type === GrantTypeEnum.REFRESH_TOKEN) {
      return this.authService.refreshToken(authDto);
    }
  }
  @HttpCode(200)
  @Post('hemis')
  register(@Body() authDto: HemisLoginRequestDto): Promise<AuthTokenResponse> {
    return this.authService.loginWithHemis(authDto);
  }
}
