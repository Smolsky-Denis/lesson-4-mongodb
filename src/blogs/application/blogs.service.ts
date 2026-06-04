import {BlogQueryInput} from "../routers/input/blog-query.input";
import {BlogCreateUpdateDTO, BlogDBModel} from "../routers/input/blogs-types";
import {blogRepository} from "../repositories/blogs.repository";
import {WithId} from "mongodb";

export const blogsService = {
    async findMany(queryDTO: BlogQueryInput)
            : Promise<{items: WithId<BlogDBModel>[], totalCount: number}> {
        return await blogRepository.findMany(queryDTO);
    },

    async findById(id: string): Promise<WithId<BlogDBModel> | null> {
        return await blogRepository.findById(id);
    },

    async create(newBlog: BlogDBModel): Promise<WithId<BlogDBModel>> {
        return await blogRepository.createBlog(newBlog);
    },

    async updateById(id:string, body: BlogCreateUpdateDTO): Promise<void> {
        return await blogRepository.updateBlog(id, body)
    },

    async deleteById(id: string) {
        return await blogRepository.deleteBlogById(id)
    },
}