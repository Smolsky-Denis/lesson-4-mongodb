import {Request, Response} from 'express';
import {PostCreateUpdateDTO} from "../../types/posts-types";
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {blogsService} from "../../../blogs/application/blogs.service";
import {postsService} from "../../application/posts.service";

export const createNewPostHandler = async ( req: Request<{},{}, PostCreateUpdateDTO>, res: Response) => {

    const sanitizedBody = matchedData<PostCreateUpdateDTO>(req, {
        locations: ['body'],
        includeOptionals: true,
    })

    const blogDbById = await blogsService.findById(sanitizedBody.blogId)

    if(blogDbById){
        const newPost = {
            title: sanitizedBody.title,
            shortDescription: sanitizedBody.shortDescription,
            content: sanitizedBody.content,
            blogId: sanitizedBody.blogId,
            blogName: blogDbById.name,
            createdAt: new Date(),
        }
        const post = await postsService.create(sanitizedBody.blogId, blogDbById, newPost);

        return res.status(HttpStatus.Created_201).send(post);
    }

    return res.status(HttpStatus.NotFound_404).send('the inputModel has incorrect values');
}