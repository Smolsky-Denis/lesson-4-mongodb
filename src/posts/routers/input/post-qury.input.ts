import {PostsPaginationAndSorting} from "../../../core/types/pagination-and-sorting";
import {SortField} from "../../../core/types/sort-field";


export type PostQueryInput = Omit<PostsPaginationAndSorting<SortField>, 'searchNameTerm'>;