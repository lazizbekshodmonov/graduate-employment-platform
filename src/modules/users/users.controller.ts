import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Authorize } from '../../common/guards/auth/auth.decarator';
import { Request } from 'express';
import { IUserResponseDto } from './types/dto.type';

@Authorize()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get('/me')
  getMe(@Req() req: Request): Promise<IUserResponseDto> {
    const user = req.user;
    return this.usersService.findById(user.userId);
  }
}
