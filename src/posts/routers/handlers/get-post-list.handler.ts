import {Request, Response} from 'express';
import {HttpStatus} from "../../../core/types/http-statuses";
import {matchedData} from "express-validator";
import {BlogQueryInput} from "../../../blogs/routers/input/blog-query.input";
import {setDefaultSortAndPaginationIfNotExist} from "../../../core/helpers/set-default-sort-and-pagination";
import {PaginationAndSortingBase} from "../../../core/types/pagination-and-sorting";
import {postsService} from "../../application/posts.service";
import {mapToBlogListPaginatedOutput} from "../mapers/map-to-post-list-paginated-output.util";

export const getPostListHandler = async (req: Request, res: Response) => {
    try {
        const sanitizedQuery = matchedData<BlogQueryInput>(req, {
            locations: ['query'],
            includeOptionals: true,
        })
        const queryInput: PaginationAndSortingBase<string> =
            setDefaultSortAndPaginationIfNotExist(sanitizedQuery, 'post');
        const {pageNumber, pageSize} = queryInput;
        const {items, totalCount} = await postsService.findFullList(queryInput);

        const result = mapToBlogListPaginatedOutput(
            items,
            {
                pagesCount: Math.ceil(totalCount / pageSize),
                page: pageNumber,
                pageSize: pageSize,
                totalCount,
            }
        );

        return res.status(HttpStatus.Ok_200).send(result);
    } catch (error) {
        res.sendStatus(HttpStatus.BadRequest_400);
    }
}