import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { Token } from './token.schema';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from './token.enum';
import { TokenTypeEnum } from '../../../modules/auth/auth.enum';
import { ITokenSchema } from '../../../modules/auth/auth.interface';
import { UserRoleEnum } from '../../../modules/users/user.enum';
import { ParseDuration } from './token.type';
import { DeleteResult } from 'mongodb';
dayjs.extend(utc);
@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name)
    private readonly tokenModel: Model<Token>,
    private readonly configService: ConfigService,
  ) {}
  async createAccessToken(
    userId: number,
    userRole: UserRoleEnum,
    employerId?: number,
    studentId?: number,
  ) {
    const expiresTime = this.configService.get<string>(
      'token.access_token_expires',
    );
    const tokenDuration = this.parseDuration(expiresTime);
    const tokenExpiresAt = dayjs()
      .add(tokenDuration.value, tokenDuration.unit)
      .toDate();
    const uuid = uuidv4();
    return await new this.tokenModel({
      userId,
      employerId,
      studentId,
      userRole,
      token: uuid,
      tokenType: TokenType.ACCESS,
      expiresAt: tokenExpiresAt,
    }).save();
  }

  async createRefreshToken(
    userId: number,
    userRole: UserRoleEnum,
    employerId?: number,
    studentId?: number,
  ) {
    const expiresTime = this.configService.get<string>(
      'token.refresh_token_expires',
    );
    const tokenDuration = this.parseDuration(expiresTime);
    const tokenExpiresAt = dayjs()
      .add(tokenDuration.value, tokenDuration.unit)
      .utc()
      .toDate();
    const uuid = uuidv4();
    return await new this.tokenModel({
      userId,
      employerId,
      studentId,
      userRole,
      token: uuid,
      tokenType: TokenType.REFRESH,
      expiresAt: tokenExpiresAt,
    }).save();
  }

  getToken(token: string, type: TokenTypeEnum): Promise<ITokenSchema> {
    return this.tokenModel
      .findOne({
        token: token,
        tokenType: type,
        expiresAt: { $gt: new Date() },
      })
      .exec();
  }

  deleteToken(token: string): Promise<DeleteResult> {
    return this.tokenModel.deleteOne({ token }).exec();
  }

  private parseDuration(duration: string): ParseDuration {
    const match = duration.match(/^(\d+)([smhd])$/); // 15m, 7d formatlarini tekshirish
    if (!match) throw new Error(`Noto‘g‘ri format: ${duration}`);

    const value: number = parseInt(match[1], 10);
    const unit: string = match[2];

    switch (unit) {
      case 's':
        return { value, unit: 'second' };
      case 'm':
        return { value, unit: 'minute' };
      case 'h':
        return { value, unit: 'hour' };
      case 'd':
        return { value, unit: 'day' };
      default:
        throw new Error(`Noto‘g‘ri vaqt birligi: ${unit}`);
    }
  }
}
