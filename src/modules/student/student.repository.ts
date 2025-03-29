import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { IStudentEntity } from './student.interface';

@Injectable()
export class StudentRepository {
  private readonly repository: Repository<StudentEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(StudentEntity);
  }
  getByUserId(id: number): Promise<IStudentEntity> {
    return this.repository.findOne({ where: { user: { id } } });
  }
}
