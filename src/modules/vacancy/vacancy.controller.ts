import {
  Controller,
  Post,
  Body,
  HttpCode,
  Req,
  Get,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  Put,
  Param,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { PreAuthorize } from '../../common/guards/role/role.decarator';
import { Request } from 'express';
import { Authorize } from '../../common/guards/auth/auth.decarator';
import { VacancyCreateDto } from './dto/vacancy-create.dto';
import { VacancyStatusEnum, VacancyTypeEnum } from './vacancy.enum';
import { VacancyUpdateDto } from './dto/vacancy-update.dto';

@Authorize()
@Controller('vacancy')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @PreAuthorize('EMPLOYER')
  @HttpCode(200)
  @Post()
  async createVacancy(
    @Req() request: Request,
    @Body() requestBody: VacancyCreateDto,
  ) {
    const employerId: number = request.user.employerId;
    await this.vacancyService.createVacancy(requestBody, employerId);
  }

  @PreAuthorize('EMPLOYER')
  @HttpCode(200)
  @Get('employer')
  async getAllVacanciesForEmployer(
    @Req() request: Request,
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('type') type?: VacancyTypeEnum,
    @Query('status') status?: VacancyStatusEnum,
  ) {
    const employerId: number = request.user.employerId;
    return this.vacancyService.getAllVacanciesForEmployer(
      employerId,
      page,
      size,
      search,
      type,
      status,
    );
  }

  @HttpCode(200)
  @Get()
  async getAllVacancies(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('type') type?: VacancyTypeEnum,
  ) {
    return this.vacancyService.getAllVacancies(page, size, search, type);
  }

  @PreAuthorize('EMPLOYER')
  @HttpCode(200)
  @Put('/:id')
  async updateVacancy(
    @Req() request: Request,
    @Param('id', ParseIntPipe) id: number,
    @Body() requestBody: VacancyUpdateDto,
  ) {
    const employerId: number = request.user.employerId;
    return this.vacancyService.updateVacancy(employerId, id, requestBody);
  }
}
