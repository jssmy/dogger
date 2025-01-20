import { Pagination } from './pagination';

export interface PaginationResolve<T> extends Pagination {
    data: T;
}