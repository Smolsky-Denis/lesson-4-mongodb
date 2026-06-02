import {WithId} from "mongodb";
import {PostDBModel} from "../types/posts-types";
import {PaginatedOutput} from "../../core/types/paginated.output";
import {PostListPaginatedOutput, PostOutputViewModel} from "../output/post.output";
import {mapToPostViewModel} from "./map-to-post-view-model.util";



export const mapToPostListPaginatedOutput = (
    blogs: WithId<PostDBModel>[],
    meta: PaginatedOutput
): PostListPaginatedOutput => {

return {
        ...meta,
        items: blogs.map((post: WithId<PostDBModel>): PostOutputViewModel => mapToPostViewModel(post))
    }
}