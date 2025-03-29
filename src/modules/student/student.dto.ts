import { IStudentEntity, IStudentResponse } from './student.interface';

export class StudentResponseDto implements IStudentResponse {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly middle_name: string;
  readonly full_name: string;
  readonly email: string;
  readonly phone_number: string;
  constructor(student: IStudentEntity) {
    this.id = student.id;
    this.first_name = student.first_name;
    this.last_name = student.last_name;
    this.middle_name = student.middle_name;
    this.email = student.email;
    this.phone_number = student.phone_number;
    this.full_name = `${student.first_name} ${student.last_name} ${student.middle_name}`;
  }
}
