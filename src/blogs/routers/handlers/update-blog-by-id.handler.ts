import {Request, Response} from 'express';
import {BlogCreateUpdateDTO} from "../input/blogs-types";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/middlewares/validation/input-validation-result.middleware";
import {matchedData} from "express-validator";
import {blogsService} from "../../application/blogs.service";

export const updateBlogByIdHandler = async (req: Request<{id: string}, {}, BlogCreateUpdateDTO>, res: Response) => {
    try {
        const sanitizedParams = matchedData<{id: string}>(req,{
            locations: ['params'],
            includeOptionals: true,
        })

        const sanitizedBody = matchedData<BlogCreateUpdateDTO>(req,{
            locations: ['body'],
            includeOptionals: true,
        })

        const blogById = await blogsService.findById(sanitizedParams.id)

        if (!blogById) {
            return res.status(HttpStatus.NotFound_404).send(createErrorMessages(
                [
                    {
                        field: sanitizedParams.id, message: `No blog with id ${sanitizedParams.id} found.`
                    }
                ]
            )
        );

        }

        await blogsService.updateById(sanitizedParams.id, sanitizedBody)
        return res.sendStatus(HttpStatus.NoContent_204);

    } catch (e: unknown){
        return res.sendStatus(HttpStatus.InternalServerError_500);
    }
}