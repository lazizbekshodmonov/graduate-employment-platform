export class Pagination<T> {
  readonly content: T[];
  readonly page: number;
  readonly size: number;
  readonly totalElements: number;
  readonly totalPages: number;
  constructor(list: T[], page: number, size: number, count: number) {
    this.content = list;
    this.page = page;
    this.size = size <= 0 ? 1 : size;
    this.totalElements = count;
    this.totalPages = Math.ceil(count / this.size);
  }
}
