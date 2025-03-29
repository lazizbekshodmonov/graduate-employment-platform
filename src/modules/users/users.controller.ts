import { Controller, Get, HttpCode, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { Authorize } from '../../common/guards/auth/auth.decarator';
import { IUserResponse } from './user.interface';
import { Request } from 'express';

@Authorize()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @HttpCode(200)
  @Get('/me')
  getMe(@Req() req: Request): Promise<IUserResponse> {
    const user = req.user;
    return this.usersService.findById(user.userId);
  }
}
