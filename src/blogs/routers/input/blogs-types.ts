import {BlogOutputViewModel} from "../output/blog.output";


export type BlogCreateUpdateDTO = Pick<
    BlogOutputViewModel, 'name' | 'description' | 'websiteUrl'
>

export type BlogDBModel = Omit<BlogOutputViewModel, 'id'>