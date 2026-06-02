import {WithId} from "mongodb";
import {BlogDBModel} from "../../types/blogs-types";
import {PaginatedOutput} from "../../../core/types/paginated.output";
import {BlogListPaginatedOutput, BlogOutputViewModel} from "../output/blog.output";
import {mapToBlogViewModel} from "./map-to-blog-view-model.util";



export const mapToBlogListPaginatedOutput = (
    blogs: WithId<BlogDBModel>[],
    meta: PaginatedOutput
): BlogListPaginatedOutput => {

return {
        ...meta,
        items: blogs.map((blog: WithId<BlogDBModel>): BlogOutputViewModel => mapToBlogViewModel(blog))
    }
}