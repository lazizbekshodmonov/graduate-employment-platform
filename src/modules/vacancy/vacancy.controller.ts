import { Controller, Post, Body, HttpCode, Req } from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { PreAuthorize } from '../../common/guards/role/role.decarator';
import { VacancyCreateRequestDto } from './vacancy.dto';
import { Request } from 'express';
import { Authorize } from '../../common/guards/auth/auth.decarator';

@Authorize()
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @PreAuthorize('EMPLOYER')
  @HttpCode(200)
  @Post()
  async createVacancy(
    @Req() request: Request,
    @Body() requestBody: VacancyCreateRequestDto,
  ) {
    await this.vacancyService.createVacancy(
      requestBody,
      request.user.employerId,
    );
  }
}
