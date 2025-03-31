import { Injectable } from '@nestjs/common';
import { IFileEntity, IFileRepository } from './file.interface';
import { DataSource, Repository } from 'typeorm';
import { FileEntity } from './file.entity';
import Hashids from 'hashids';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileRepository implements IFileRepository {
  private readonly repository: Repository<IFileEntity>;
  constructor(
    dataSource: DataSource,
    private readonly configService: ConfigService,
  ) {
    this.repository = dataSource.getRepository(FileEntity);
  }
  findByOriginalNameAndSize(
    originalName: string,
    size: number,
  ): Promise<IFileEntity> {
    return this.repository.findOne({ where: { originalName, size } });
  }

  findById(id: number): Promise<IFileEntity> {
    return this.repository.findOne({ where: { id } });
  }

  findByHashId(hashId: string): Promise<IFileEntity> {
    return this.repository.findOne({ where: { hashId } });
  }
  createFile(
    filename: string,
    path: string,
    originalName: string,
    mimetype: string,
    size: number,
  ): Promise<IFileEntity> {
    const hashSalt: string = this.configService.get<string>('hash.file_salt');
    const hashGenerator = new Hashids(hashSalt, 10);
    const hashId = hashGenerator.encode(
      Date.now(),
      Math.floor(Math.random() * 1000),
    );
    return this.repository.save({
      filename,
      hashId,
      path,
      size,
      originalName,
      mimetype,
    });
  }
}
