import {Router} from "express";
import { getBlogListHandler} from "./handlers/get-blog-list.handler";
import {createNewBlogHandler} from "./handlers/create-new-blog.handler";
import {updateBlogByIdHandler} from "./handlers/update-blog-by-id.handler";
import {getBlogByIdHandler} from "./handlers/get-blog-by-id.handler";
import {deleteBlogByIdHandler} from "./handlers/delete-blog-by-id.handler";
import {blogInputDtoValidation} from "../validation/blogs-input-dto.validation";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {inputValidationMiddleware} from "../../core/middlewares/validation/input-validation.middleware";
import {idValidation} from "../../core/middlewares/validation/id.validation";
import {createNewPostForBlog} from "./handlers/createNewPostForBlog";
import {getPostListOfBlogHandler} from "./handlers/getPostListOfBlog.handler";
import {postInputValidation} from "../../posts/validation/posts-dto.validation";
import {
    paginationAndSortingValidation
} from "../../core/middlewares/validation/query-pagination-sorting.validation-middleware";
import {SortField} from "../../core/types/sort-field";

export const blogsRouter = Router();

blogsRouter
    .get(
        '',
        paginationAndSortingValidation(SortField, 'blog'),
        getBlogListHandler
    )
    .get(
        '/:id',
        idValidation,
        inputValidationMiddleware,
        getBlogByIdHandler
    )
    .get(
        '/:id/posts',
        idValidation,
        paginationAndSortingValidation(SortField, 'post'),
        getPostListOfBlogHandler
    )
    .post(
        '',
        superAdminGuardMiddleware,
        blogInputDtoValidation,
        inputValidationMiddleware,
        createNewBlogHandler
    )
    .post('/:id/posts',
        superAdminGuardMiddleware,
        idValidation,
        idValidation,
        postInputValidation,
        inputValidationMiddleware,
        createNewPostForBlog,
    )
    .put(
        "/:id",
        superAdminGuardMiddleware,
        idValidation,
        blogInputDtoValidation,
        inputValidationMiddleware,
        updateBlogByIdHandler
    )
    .delete(
        '/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationMiddleware,
        deleteBlogByIdHandler
    )