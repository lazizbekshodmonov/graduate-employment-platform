import {
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  StreamableFile,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileService } from './file.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'node:fs';
import { Authorize } from '../../common/guards/auth/auth.decarator';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Authorize()
  @HttpCode(200)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.uploadFile(file);
  }

  @Authorize()
  @HttpCode(200)
  @Get('download')
  downloadFile(@Query('hashId') hashId: string): Promise<StreamableFile> {
    return this.fileService.downloadFile(hashId);
  }
}
