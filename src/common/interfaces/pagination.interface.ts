export interface IPagination<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface IPaginatedResultByEntity<T> {
  data: T[];
  total: number;
}
