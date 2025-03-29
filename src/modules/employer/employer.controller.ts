import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import { EmployerService } from './employer.service';
import { Authorize } from '../../common/guards/auth/auth.decarator';
import { PreAuthorize } from '../../common/guards/role/role.decarator';
import { EmployerCreateRequestDto } from './employer.dto';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Post()
  createEmployer(@Body() requestBody: EmployerCreateRequestDto) {
    return this.employerService.createEmployer(requestBody);
  }
}
