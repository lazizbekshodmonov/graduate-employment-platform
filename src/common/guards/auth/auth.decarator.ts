import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';

export function Authorize() {
  return UseGuards(AuthGuard);
}
