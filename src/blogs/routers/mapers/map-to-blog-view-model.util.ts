import {WithId} from "mongodb";
import {BlogDBModel} from "../../types/blogs-types";
import {BlogOutputViewModel} from "../output/blog.output";


export const mapToBlogViewModel = (blog: WithId<BlogDBModel>) : BlogOutputViewModel => {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: false,
    }
}