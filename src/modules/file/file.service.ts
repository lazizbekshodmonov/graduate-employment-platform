import {
  BadRequestException,
  Injectable,
  NotFoundException,
  StreamableFile,
} from '@nestjs/common';
import { FileRepository } from './file.repository';
import { join } from 'path';
import * as fs from 'node:fs';
import { FileResponseDto } from './file.dto';
import { CustomLoggerService } from '../../common/modules/logger/logger.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor(
    private readonly fileRepository: FileRepository,
    private readonly logger: CustomLoggerService,
    private configService: ConfigService,
  ) {}

  async uploadFile(file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('Fayl yuklanmadi');
      }

      const existingFile = await this.fileRepository.findByOriginalNameAndSize(
        file.originalname,
        file.size,
      );

      if (existingFile) {
        return new FileResponseDto(
          existingFile.originalName,
          existingFile.hashId,
          existingFile.size,
          existingFile.mimetype,
        );
      }

      const cleanedName = file.originalname.replace(/[^a-zA-Z0-9.\-_]/g, '_');

      const configUploadPath =
        this.configService.get<string>('file.upload_path');

      const path = join(configUploadPath, cleanedName);

      fs.writeFileSync(path, file.buffer);

      const fileInfo = await this.fileRepository.createFile(
        cleanedName,
        path,
        file.originalname,
        file.mimetype,
        file.size,
      );
      return new FileResponseDto(
        fileInfo.originalName,
        fileInfo.hashId,
        fileInfo.size,
        fileInfo.mimetype,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  async downloadFile(hashId: string): Promise<StreamableFile> {
    try {
      const file = await this.fileRepository.findByHashId(hashId);

      if (!file) {
        throw new NotFoundException('Fayl topilmadi');
      }

      const filePath = join(process.cwd(), file.path);
      const fileStream = fs.createReadStream(filePath);

      return new StreamableFile(fileStream, {
        disposition: `attachment; filename="${file.originalName}"`,
        type: file.mimetype,
      });
    } catch (error) {
      this.logger.error(error);
    }
  }
}
