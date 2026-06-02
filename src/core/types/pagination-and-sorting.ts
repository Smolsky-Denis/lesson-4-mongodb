import {SortDirection} from "./sort-direction";

export type PaginationAndSortingBase<S> = {
    pageNumber: number;
    pageSize: number;
    sortBy: S;
    sortDirection: SortDirection;
}

export type BlogsPaginationAndSorting<S> = PaginationAndSortingBase<S> & {
    searchNameTerm: string | null;

};

export type PostsPaginationAndSorting<S> = PaginationAndSortingBase<S>