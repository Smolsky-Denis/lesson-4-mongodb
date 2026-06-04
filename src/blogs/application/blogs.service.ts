import {BlogQueryInput} from "../routers/input/blog-query.input";
import {BlogDBModel} from "../routers/input/blogs-types";
import {blogRepository} from "../repositories/blogs.repository";
import {WithId} from "mongodb";

export const blogsService = {
    async findMany(queryDTO: BlogQueryInput)
            : Promise<{items: WithId<BlogDBModel>[], totalCount: number}> {
        return blogRepository.findMany(queryDTO);
    },

    async findById(id: string) {

    },

    async create(newBlog: BlogDBModel): Promise<WithId<BlogDBModel>> {
        return await blogRepository.createBlog(newBlog);
    },

    async update() {

    },

    async delete(id: string) {

    },
}