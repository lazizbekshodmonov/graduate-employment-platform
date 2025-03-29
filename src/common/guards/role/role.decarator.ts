import { UseGuards } from '@nestjs/common';
import { RolesGuard } from './role.guard';

export function PreAuthorize(...props: string[]) {
  return UseGuards(new RolesGuard(props));
}
