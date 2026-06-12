import {BlogsPaginationAndSorting, PaginationAndSortingBase} from "../types/pagination-and-sorting";
import {
    DEFAULT_PAGE_NUMBER,
    DEFAULT_PAGE_SIZE, DEFAULT_SEARCH_NAME_TERM, DEFAULT_SORT_BY, DEFAULT_SORT_DIRECTION
} from "../middlewares/validation/query-pagination-sorting.validation-middleware";
import {Mode} from "../types/PaginationMode";

export function setDefaultSortAndPaginationIfNotExist<
    S extends string,
    M extends Mode
>(
    query: Partial<M extends 'blog' ? BlogsPaginationAndSorting<S> : PaginationAndSortingBase<S>>,
    mode: M
): M extends 'blog' ? BlogsPaginationAndSorting<S> : PaginationAndSortingBase<S> {
    const base = {
        pageNumber: DEFAULT_PAGE_NUMBER,
        pageSize: DEFAULT_PAGE_SIZE,
        sortBy: (query as any).sortBy ?? DEFAULT_SORT_BY,
        sortDirection: DEFAULT_SORT_DIRECTION,
    };

    if (mode === 'blog') {
        return {
            ...base,
            searchNameTerm: DEFAULT_SEARCH_NAME_TERM,
            ...query,
        } as any;
    }

    return {
        ...base,
        ...query,
    } as any;
}