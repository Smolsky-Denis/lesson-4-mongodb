import {PaginatedOutput} from "../../../core/types/paginated.output";

export type BlogOutputViewModel = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: Date,
    isMembership: boolean
}

export type BlogListPaginatedOutput = PaginatedOutput & {
    items: BlogOutputViewModel[],
}