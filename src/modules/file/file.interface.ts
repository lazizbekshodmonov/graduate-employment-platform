import { IBaseEntity } from '../../common/interfaces/base.interface';

export interface IFileEntity extends IBaseEntity {
  filename: string;
  path: string;
  originalName: string;
  mimetype: string;
  size: number;
  hashId: string;
}

export interface IFileResponse {
  name: string;
  hashId: string;
  size: number;
  type: string;
}

export interface IFileRepository {
  findByHashId(hashId: string): Promise<IFileEntity>;
  findById(id: number): Promise<IFileEntity>;
  createFile(
    filename: string,
    path: string,
    originalName: string,
    mimetype: string,
    size: number,
  ): Promise<IFileEntity>;
}
