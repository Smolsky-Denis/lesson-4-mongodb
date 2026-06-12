import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {postsService} from "../../../posts/application/posts.service";
import {matchedData} from "express-validator";
import {PostQueryInput} from "../../../posts/routers/input/post-qury.input";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {mapToPostListPaginatedOutput} from "../../../posts/mapers/map-to-post-list-paginated-output.util";
import {blogsService} from "../../application/blogs.service";

export const getPostListOfBlogHandler = async (req: Request<{id: string} >, res: Response) => {
    const sanitizedParams = matchedData<{id: string}>(req,{
        locations: ['params'],
        includeOptionals: true,
    })

    const blogById = await blogsService.findById(sanitizedParams.id)
    if (blogById && sanitizedParams.id) {
        const sanitizedQuery = matchedData<PostQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const queryInput: PostQueryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery, 'post')
        const {pageNumber, pageSize} = queryInput
        const {items, totalCount} = await postsService.findMany(sanitizedParams.id, sanitizedQuery)

        const result = mapToPostListPaginatedOutput(
            items,
            {
                pagesCount: Math.ceil(totalCount / pageSize),
                page: pageNumber,
                pageSize: pageSize,
                totalCount,
            }
        )
        return res.status(HttpStatus.Ok_200).send(result);
    }
    return res.status(HttpStatus.NotFound_404).send('the id incorrect values');
}