import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToPostViewModel} from "../mapers/map-to-post-view-mode.util";
import {matchedData} from "express-validator";
import {postsService} from "../../application/posts.service";

export const getPostByIdHandler = async (req: Request<{id: string}>, res: Response) => {
    const sanitizedParams = matchedData<{id: string}>(req, {
        locations: ['params'],
        includeOptionals: true,
    })
        const postById = await postsService.findById(sanitizedParams.id)

  return  postById
      ? res.status(HttpStatus.Ok_200).send(mapToPostViewModel(postById))
      : res.sendStatus(HttpStatus.NotFound_404)
}