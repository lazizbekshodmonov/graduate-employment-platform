import { Column, Entity, Unique } from 'typeorm';
import { BaseEntity } from '../../common/entities/base.entity';
import { IFileEntity } from './file.interface';

@Entity('file')
@Unique(['hashId'])
export class FileEntity extends BaseEntity implements IFileEntity {
  @Column({ type: 'varchar', length: 255 })
  filename: string;

  @Column({ type: 'varchar', length: 500 })
  path: string;

  @Column({ type: 'varchar', length: 255 })
  originalName: string;

  @Column({ type: 'varchar', length: 255 })
  mimetype: string;

  @Column({ type: 'bigint' })
  size: number;

  @Column({ type: 'varchar', length: 255 })
  hashId: string;
}
