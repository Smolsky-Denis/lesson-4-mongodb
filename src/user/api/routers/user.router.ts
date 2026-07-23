import {Router} from "express";
import {getUserListHandler} from "./handlers/get-user-list.handler";
import {createUserHandler} from "./handlers/create-user.handler";
import {deleteUserByIdHandler} from "./handlers/delete-user-by-id.handler";


export const userRouter = Router();

userRouter
    .get(
        '',
        getUserListHandler
    )
    .post(
        '',
        createUserHandler
        )
    .delete(
        '/:id',
        deleteUserByIdHandler
    )