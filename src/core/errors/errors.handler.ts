import { Response } from 'express';
import {RepositoryNotFoundError} from "./repository-not-found.error";
import {HttpStatus} from "../types/http-statuses";


//TODO разобраться нужно или нет
export const errorsHandler = (err: unknown, res: Response) => {
    if (err instanceof RepositoryNotFoundError) {
        const httpStatus = HttpStatus.NotFound_404;

        res.status(httpStatus).send()
    }
}