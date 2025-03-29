import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IAdminEntity, IAdminRepository } from './admin.interface';
import { AdminEntity } from './admin.entity';

@Injectable()
export class AdminRepository implements IAdminRepository {
  private readonly repository: Repository<IAdminEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(AdminEntity);
  }
  getByUserId(id: number): Promise<IAdminEntity> {
    return this.repository.findOne({ where: { user: { id } } });
  }
}
