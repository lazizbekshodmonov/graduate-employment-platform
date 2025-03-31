import { IFileResponse } from './file.interface';

export class FileResponseDto implements IFileResponse {
  readonly name: string;
  readonly hashId: string;
  readonly size: number;
  readonly type: string;
  constructor(name: string, hashId: string, size: number, type: string) {
    this.name = name;
    this.hashId = hashId;
    this.size = size;
    this.type = type;
  }
}
