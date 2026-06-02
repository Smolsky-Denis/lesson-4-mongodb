import {WithId} from "mongodb";
import {PostDBModel} from "../types/posts-types";
import {PostOutputViewModel} from "../output/post.output";


export const mapToPostViewModel = (post: WithId<PostDBModel>) : PostOutputViewModel => {
    return {
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt,
    }
}