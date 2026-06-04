import {blogRepository} from "../../blogs/repositories/blogs.repository";
import {postRepository} from "../repositories/posts.repository";
import {mapToPostViewModel} from "../routers/mapers/map-to-post-view-mode.util";
import {BlogDBModel} from "../../blogs/routers/input/blogs-types";
import {PostCreateUpdateDTO, PostDBModel} from "../types/posts-types";
import {WithId} from "mongodb";
import {PostQueryInput} from "../routers/input/post-qury.input";

export const postsService = {       //todo создать PostQueryInput
    async findMany(id: string, queryDTO: PostQueryInput)
            : Promise<{items: WithId<PostDBModel>[], totalCount: number}> {
        return postRepository.findPostListByBlogId(id, queryDTO)
    },

    async findById(id: string) {
        return await blogRepository.findById(id);
    },

    async create(blogId: string, blogDbById: WithId<BlogDBModel>, body: PostCreateUpdateDTO) {
        const newPost = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: blogId,
            blogName: blogDbById.name,
            createdAt: new Date(),
        }
        const post   = await postRepository.createPost(newPost);

        return mapToPostViewModel(post);
    },

    async update() {

    },

    async delete(id: string) {

    },
}