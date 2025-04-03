import {
  Controller,
  Post,
  Body,
  HttpCode,
  Get,
  Param,
  Query,
  Put,
} from '@nestjs/common';
import { EmployerService } from './employer.service';
import { Authorize } from '../../common/guards/auth/auth.decarator';
import { PreAuthorize } from '../../common/guards/role/role.decarator';
import { EmployerCreateRequestDto } from './employer.dto';
import { EmployerStatusEnum } from './employer.enum';
import { IPagination } from '../../common/interfaces/pagination.interface';
import {
  IEmployerResponseDto,
  IEmployerUpdateRequestDto,
} from './employer.interface';

@Controller('employer')
export class EmployerController {
  constructor(private readonly employerService: EmployerService) {}

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Post()
  createEmployer(@Body() requestBody: EmployerCreateRequestDto): Promise<void> {
    return this.employerService.createEmployer(requestBody);
  }

  @PreAuthorize('SUPER_ADMIN', 'DEVELOPER')
  @Authorize()
  @HttpCode(200)
  @Get()
  getAllEmployers(
    @Query('page') page: string,
    @Query('size') size: string,
    @Query('search') search: string,
    @Query('status') status: EmployerStatusEnum,
  ): Promise<IPagination<IEmployerResponseDto>> {
    return this.employerService.getAllEmployers(
      page ? +page : 0,
      size ? +size : 20,
      search,
      status,
    );
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
    @Body() requestBody: IEmployerUpdateRequestDto,
  ): Promise<void> {
    await this.employerService.updateEmployer(+id, requestBody);
  }
}
