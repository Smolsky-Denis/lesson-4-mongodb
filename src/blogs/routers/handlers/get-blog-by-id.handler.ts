import {Request, Response} from 'express';
import {blogRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToBlogViewModel} from "../mapers/map-to-blog-view-model.util";
import {matchedData} from "express-validator";

export const getBlogByIdHandler = async (req: Request<{id: string}>, res: Response) => {
    const sanitizeParams = matchedData<{ id: string }>(req, {
        locations: (['params']),
        includeOptionals: true,
    });
    const blogById = await blogRepository.findById(sanitizeParams.id)

    return blogById
        ? res.status(HttpStatus.Ok_200).send(mapToBlogViewModel(blogById))
        : res.sendStatus(HttpStatus.NotFound_404)
}