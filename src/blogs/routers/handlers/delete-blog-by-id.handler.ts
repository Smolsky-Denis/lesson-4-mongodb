import {Request, Response} from 'express'
import {blogRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../application/blogs.service";


export const deleteBlogByIdHandler = async (req: Request<{id: string}>, res: Response) => {
    const id = req.params.id

    const isDeleted = await blogsService.deleteById(id);

    return isDeleted ? res.sendStatus(HttpStatus.NoContent_204)
        : res.sendStatus(HttpStatus.NotFound_404)
}