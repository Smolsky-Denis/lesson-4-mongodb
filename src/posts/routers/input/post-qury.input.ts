import {PaginationAndSortingBase} from "../../../core/types/pagination-and-sorting";
import {SortField} from "../../../core/types/sort-field";


export type PostQueryInput = Omit<PaginationAndSortingBase<SortField>, 'searchNameTerm'>;