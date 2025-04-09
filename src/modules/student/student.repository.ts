import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { StudentEntity } from './student.entity';
import { IStudentEntity } from './student.interface';
import { StatusEnum } from '../../common/enums/status.enum';

@Injectable()
export class StudentRepository {
  private readonly repository: Repository<StudentEntity>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(StudentEntity);
  }
  findByUserId(id: number): Promise<IStudentEntity> {
    return this.repository.findOne({ where: { user: { id } } });
  }

  findByStudentId(studentId: number): Promise<IStudentEntity> {
    return this.repository.findOne({
      where: { student_id: studentId },
      relations: ['user'],
    });
  }

  createStudent(student: IStudentEntity): Promise<IStudentEntity> {
    const newStudent = this.repository.create(student);
    return this.repository.save(newStudent);
  }
  async findByFilterAndPaginate(
    page: number,
    limit: number,
    search?: string,
    status?: StatusEnum,
  ): Promise<{
    data: IStudentEntity[];
    total: number;
  }> {
    const queryBuilder = this.repository.createQueryBuilder('student');
    if (search) {
      queryBuilder.andWhere('student.full_name ILIKE :search', {
        search: `%${search}%`,
      });
    }

    if (status) {
      queryBuilder.andWhere('student.user.status = :status', { status });
    }

    const total: number = await queryBuilder.getCount();

    const data: IStudentEntity[] = await queryBuilder
      .skip(page * limit)
      .take(limit)
      // .leftJoinAndSelect('student.file', 'file')
      .leftJoinAndSelect('student.user', 'user')
      .getMany();
    return { data, total };
  }
}
