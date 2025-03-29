import { Global, Module } from '@nestjs/common';
import { Token, TokenSchema } from './token.schema';
import { TokenService } from './token.service';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Token.name, schema: TokenSchema }]),
  ],
  providers: [TokenService, ConfigService],
  exports: [TokenService, MongooseModule],
})
export class TokenModule {}
