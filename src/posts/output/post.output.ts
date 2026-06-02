import {PaginatedOutput} from "../../core/types/paginated.output";


export type PostOutputViewModel = {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName: string,
    createdAt: Date,
}

export type PostListPaginatedOutput = PaginatedOutput & {
    items: PostOutputViewModel[],
}