import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ITokenSchema } from '../../../modules/auth/auth.interface';
import { UserRoleEnum } from '../../../modules/users/user.enum';

@Schema({ timestamps: true })
export class Token extends Document implements ITokenSchema {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true })
  userRole: UserRoleEnum;

  @Prop({ required: true })
  tokenType: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  expiresAt: Date;

  @Prop()
  studentId?: number;

  @Prop()
  employerId?: number;
}

export const TokenSchema = SchemaFactory.createForClass(Token);

TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
