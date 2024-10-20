import type { NextFunction, Request, Response } from "express";
import { addCommentValidator } from "../validators/commentValidator";
import Comment from "../models/Comment";

export const addComment = (req:Request,res: Response,next: NextFunction) =>{
    try {
        const {postId} = req.params;
        const {commentDetails} = req.body;
        const currUserId = req.user?._id

        const { error } = addCommentValidator(req.body)
        if(error){
            return res.status(400).send(error.details[0].message)
        }

        const newComment = new Comment({
            commentOwner: currUserId,
            commentDetails,
            originalPost: postId
        })

        return res.send(newComment)


    } catch (error) {
        next(error)
    }
}

