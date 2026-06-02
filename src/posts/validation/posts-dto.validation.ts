import {body} from "express-validator";

export const postInputValidation = [
    body("title")
    .exists().withMessage("title is required")
    .isString().withMessage("title should be string")
    .trim()
    .isLength({ min: 1, max: 30 }).withMessage("title should be max 30 symbols"),

    body("shortDescription")
    .exists().withMessage("shortDescription is required")
    .isString().withMessage("shortDescription should be string")
    .trim()
    .isLength({ min: 1, max: 100 }).withMessage("shortDescription should be max 100 symbols"),

    body("content")
    .exists().withMessage("content is required")
    .isString().withMessage("content should be string")
    .trim()
    .isLength({ min: 1, max: 1000 }).withMessage("content should be max 1000 symbols"),
];
