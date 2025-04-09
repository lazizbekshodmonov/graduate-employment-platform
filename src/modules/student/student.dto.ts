import { IStudentEntity, IStudentResponse } from './student.interface';

export class StudentResponseDto implements IStudentResponse {
  readonly id: number;
  readonly student_id: number;
  readonly full_name: string;
  readonly email: string;
  readonly phone_number: string;
  constructor(student: IStudentEntity) {
    this.id = student.id;
    this.student_id = student.student_id;
    this.full_name = student.full_name;
    this.email = student.email;
    this.phone_number = student.phone_number;
  }
}
