import {Request, Response} from 'express';
import {PostCreateUpdateDTO, PostViewModel} from "../../types/posts-types";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/middlewares/validation/input-validation-result.middleware";
import {matchedData} from "express-validator";
import {postsService} from "../../application/posts.service";

export const updatePostByIdHandler = async (req: Request<{id: string}, {}, PostCreateUpdateDTO>, res: Response) => {
    try {
        const sanitizedParams = matchedData<{id: string}>(req, {
            locations: ['params'],
            includeOptionals: true,
        })

        const sanitizedBody = matchedData<PostViewModel>(req, {
            locations: ['body'],
            includeOptionals: true,
        })

        const postById = await postsService.findById(sanitizedParams.id)

        if (!postById) {
            return res.status(HttpStatus.NotFound_404).send(createErrorMessages(
                [
                        {
                            field: sanitizedParams.id, message: `No post with id ${sanitizedParams.id} found.`
                        }
                ]
            ));
        }

        await postsService.updateById(sanitizedParams.id, sanitizedBody)
        return res.sendStatus(HttpStatus.NoContent_204);

    } catch (e: unknown){
        return res.sendStatus(HttpStatus.InternalServerError_500);
    }
}