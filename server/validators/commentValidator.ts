import Joi from 'joi';
import type { AddCommentData } from '../interfaces/commentInterfaces';


export const addCommentValidator = (data: AddCommentData): Joi.ValidationResult =>{
    const schema = Joi.object({
        commentDetails: Joi.string().min(5).max(500).required().messages({
            "string.required": "Comment Details is a required field",
            "string.min": "Comment Details should have atleast 5 characters minimum",
            "string.max": "Comment Details should only contain 500 characters maximum",
            "string.base": "Comment Details should be a type of string"
        }),


    })

    return schema.validate(data)
}