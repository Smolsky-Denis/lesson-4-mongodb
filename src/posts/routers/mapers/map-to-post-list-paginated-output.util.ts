import {WithId} from "mongodb";
import {PaginatedOutput} from "../../../core/types/paginated.output";
import {PostDBModel} from "../../types/posts-types";
import {mapToPostViewModel} from "./map-to-post-view-mode.util";
// import {PostOutputViewModel} from "../../output/post.output";



export const mapToBlogListPaginatedOutput = (
    posts: WithId<PostDBModel>[],
    meta: PaginatedOutput
) => {

return {
        ...meta,
        items: posts.map((post: WithId<PostDBModel>) => {
            return mapToPostViewModel(post)
        })
    }
}