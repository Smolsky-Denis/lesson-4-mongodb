import {Request, Response} from 'express';
import {BlogCreateUpdateDTO} from "../input/blogs-types";
import {mapToBlogViewModel} from "../mapers/map-to-blog-view-model.util";
import {HttpStatus} from "../../../core/types/http-statuses";
import {blogsService} from "../../application/blogs.service";
import {matchedData} from "express-validator";

export const createNewBlogHandler = async ( req: Request<{},{}, BlogCreateUpdateDTO>, res: Response) => {
    const sanitizedBody = matchedData<BlogCreateUpdateDTO>(req, {
        locations: ['body'],
        includeOptionals: true,
    })

    const newBlog = {
        ...sanitizedBody,
        createdAt: new Date(),
        isMembership: false
    }
    const blog = await blogsService.create(newBlog);

    return res.status(HttpStatus.Created_201).send(mapToBlogViewModel(blog));
}