export interface Pagination<T> {
  pageSize: number;
  currentPage: number;
  totalItems: number;
  items: T[];
}