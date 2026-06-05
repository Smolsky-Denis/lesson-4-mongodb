import {Router} from "express";
import {getPostListHandler} from "./handlers/get-post-list.handler";
import {createNewPostHandler} from "./handlers/create-new-post.handler";
import {updatePostByIdHandler} from "./handlers/update-post-by-id.handler";
import {getPostByIdHandler} from "./handlers/get-post-by-id.handler";
import {deletePostByIdHandler} from "./handlers/delete-post-by-id.handler";
import {postInputValidation} from "../validation/posts-dto.validation";
import {superAdminGuardMiddleware} from "../../auth/middlewares/super-admin.guard-middleware";
import {idValidation} from "../../core/middlewares/validation/id.validation";
import {inputValidationMiddleware} from "../../core/middlewares/validation/input-validation.middleware";
import {extraPostInputBlogIdValidation} from "../validation/extra-input-post-blogId-validation";

export const postsRouter = Router();

postsRouter
    .get(
        '',
        getPostListHandler
    )
    .post(
        '',
        superAdminGuardMiddleware,
        extraPostInputBlogIdValidation,
        postInputValidation,
        inputValidationMiddleware,
        createNewPostHandler
    )
    .put(
        "/:id",
        idValidation,
        superAdminGuardMiddleware,
        extraPostInputBlogIdValidation,
        postInputValidation,
        inputValidationMiddleware,
        updatePostByIdHandler
    )
    .get(
        '/:id',
        idValidation,
        inputValidationMiddleware,
        getPostByIdHandler
    )
    .delete(
        '/:id',
        superAdminGuardMiddleware,
        idValidation,
        inputValidationMiddleware,
        deletePostByIdHandler
    )