import {body} from "express-validator";
import {blogRepository} from "../../blogs/repositories/blogs.repository";


export const extraPostInputBlogIdValidation = [
    body("blogId")
    .exists().withMessage("blogId is required")
    .isString().withMessage("blogId should be string")
    .custom((value) => {
        const blog = blogRepository.findById(value);
        if (!blog) throw new Error("id does not exist");
        return true;
    })
]