import type { NextFunction, Request, Response } from "express";
import { addCommentValidator } from "../validators/commentValidator";
import Comment from "../models/Comment";

export const addComment = async (req:Request,res: Response,next: NextFunction) =>{
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

        newComment.save()

        return res.json(newComment)


    } catch (error) {
        next(error)
    }
}

export const getAllPostComment = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {postId} = req.params;

        const allComments = await Comment.find({originalPost: postId})

        res.json(allComments)

    } catch (error) {
        next(error)
    }
}