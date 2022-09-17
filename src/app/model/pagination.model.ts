export class Pagination<T> {
  page: number;
  pageSize: number;
  totalPages: number;
  totalContents: number;
  content: Array<T>;
}
