import {
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { StatusEnum } from '../../common/enums/status.enum';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getAllStudents(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(20), ParseIntPipe) size: number,
    @Query('search') search?: string,
    @Query('status') status?: StatusEnum,
  ) {
    return this.studentService.getAllStudents(page, size, search, status);
  }
}
