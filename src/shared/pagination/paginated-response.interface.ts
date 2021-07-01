import { Paging } from './paging.interface';
import { Response } from '../interfaces/standard-response.interface';
export interface PaginatedResponse<T> extends Response<T> {
  count: number;
  offset: number;
  total: number;
  paging?: Paging;
}
