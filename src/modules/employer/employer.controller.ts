import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Param,
  Query,
  Put,
  ParseIntPipe,
  DefaultValuePipe,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { Authorize } from '../../common/guards/auth/auth.decarator';
import { PreAuthorize } from '../../common/guards/role/role.decarator';
import { IPagination } from '../../common/interfaces/pagination.interface';
import { IEmployerResponseDto } from './types/dto.type';
import { EmployerCreateDto } from './dto/employer-create.dto';
import { EmployerUpdateDto } from './dto/employer-update.dto';
import { StatusEnum } from '../../common/enums/status.enum';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Post()
  createEmployer(@Body() requestBody: EmployerCreateDto): Promise<void> {
    return this.employerService.createEmployer(requestBody);
  }

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Get()
  getAllEmployers(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('search') search: string,
    @Query('status') status: StatusEnum,
  ): Promise<IPagination<IEmployerResponseDto>> {
    return this.employerService.getAllEmployers(page, size, search, status);
  }

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Get('/:id')
  getEmployerById(@Param('id') id: string): Promise<IEmployerResponseDto> {
    return this.employerService.getEmployerById(+id);
  }

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Put('/:id')
  async updateEmployerInfo(
    @Param('id') id: string,
    @Body() requestBody: EmployerUpdateDto,
  ): Promise<void> {
    await this.employerService.updateEmployer(+id, requestBody);
  }
}
