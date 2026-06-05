import {Request, Response} from 'express'
import {HttpStatus} from "../../../core/types/http-statuses";
import {postRepository} from "../../repositories/posts.repository";
import {matchedData} from "express-validator";
import {postsService} from "../../application/posts.service";

export const deletePostByIdHandler = async (req: Request<{id: string}>, res: Response) => {
    const sanitizedParams = matchedData<{id: string}>(req, {
        locations: ['params'],
        includeOptionals: true,
    })

    const isDeleted = await postsService.deleteById(sanitizedParams.id);

    return isDeleted
        ? res.sendStatus(HttpStatus.NoContent_204)
        : res.sendStatus(HttpStatus.NotFound_404)
}