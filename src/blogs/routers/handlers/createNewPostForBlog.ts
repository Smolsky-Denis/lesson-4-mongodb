import {Request, Response} from "express";
import {PostCreateUpdateDTO} from "../../../posts/types/posts-types";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../../posts/application/posts.service";
import {matchedData} from "express-validator";
import {blogsService} from "../../application/blogs.service";

export const createNewPostForBlog = async ( req: Request<{id: string},{}, PostCreateUpdateDTO>, res: Response) => {
    const sanitizedParams = matchedData<{ id: string }>(req, {
        locations: (['params']),
        includeOptionals: true,
    });

    const blogById = await blogsService.findById(sanitizedParams.id)

    if (blogById && sanitizedParams.id) {
        const newPost = await postsService.create(req.params.id ,blogById, req.body)

        return res.status(HttpStatus.Created_201).send(newPost);
    }

    return res.status(HttpStatus.NotFound_404).send('the inputModel has incorrect values');
}