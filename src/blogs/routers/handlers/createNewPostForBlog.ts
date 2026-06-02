import {Request, Response} from "express";
import {PostCreateUpdateDTO} from "../../../posts/types/posts-types";
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../../posts/application/posts.service";

export const createNewPostForBlog = async ( req: Request<{id: string},{}, PostCreateUpdateDTO>, res: Response) => {
    const blogDbById = await postsService.findById(req.params.id)
    if (blogDbById) {
        const newPost = await postsService.create(req.params.id ,blogDbById, req.body)

        return res.status(HttpStatus.Created_201).send(newPost);
    }

    return res.status(HttpStatus.NotFound_404).send('the inputModel has incorrect values');
}
