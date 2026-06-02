import {Request, Response} from 'express';
import {BlogQueryInput} from "../input/blog-query.input";
import {blogsService} from "../../application/blogs.service";
import {matchedData} from "express-validator";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {HttpStatus} from "../../../core/types/http-statuses";
import {mapToBlogListPaginatedOutput} from "../mapers/map-to-blog-list-paginated-output.util";


export const getBlogListHandler = async (req: Request<{}, {}, {}, BlogQueryInput>, res: Response) => {
    try {
        const sanitizedQuery = matchedData<BlogQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        })

        const queryInput: BlogQueryInput = setDefaultSortAndPaginationIfNotExist(sanitizedQuery, 'blog')
        const {pageNumber, pageSize} = queryInput
        const {items, totalCount} = await blogsService.findMany(queryInput);

        const result = mapToBlogListPaginatedOutput(
            items,
            {
                pagesCount: Math.ceil(totalCount / pageSize),
                page: pageNumber,
                pageSize: pageSize,
                totalCount,
            }
        )

        return res.status(HttpStatus.Ok_200).send(result);
    } catch (error: unknown) {
        console.log(error);
    }
};
