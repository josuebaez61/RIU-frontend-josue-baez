export interface Pagination<T> {
  data: T[];
  page: number;
  perPage: number;
  prev: null | number;
  next: null | number;
  last: number;
  pages: number;
  items: number;
}
