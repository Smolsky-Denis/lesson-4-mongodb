import {Request, Response} from 'express';
import {BlogCreateUpdateDTO} from "../input/blogs-types";
import {blogRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {createErrorMessages} from "../../../core/middlewares/validation/input-validation-result.middleware";

export const updateBlogById = async (req: Request<{id: string}, {}, BlogCreateUpdateDTO>, res: Response) => {
    try {
        const id: string = req.params.id
        const blogById = await blogRepository.findById(id)

        if (!blogById) {
            return res.status(HttpStatus.NotFound_404).send(createErrorMessages(
                [
                    {
                        field: id, message: `No blog with id ${id} found.`
                    }
                ]
            )
        );

        }

        await blogRepository.updateBlog(id, req.body)
        return res.sendStatus(HttpStatus.NoContent_204);

    } catch (e: unknown){
        return res.sendStatus(HttpStatus.InternalServerError_500);
    }
}