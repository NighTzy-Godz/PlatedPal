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
        const LIMIT = 5
        const {postId} = req.params;
        const {currPage = 1} = req.query

        const page = Number(currPage)

        const allComments = await Comment.find({originalPost: postId}).sort({createdAt: -1}).skip((page - 1) * LIMIT).limit(LIMIT)
        const totalCount = await Comment.countDocuments({originalPost: postId})

        const resBody = {
            data: allComments,
            currPage: page,
            totalPages: Math.ceil(totalCount / LIMIT),
        } 

        res.json(resBody)

    } catch (error) {
        next(error) 
    }
}

export const updateComment = async(req:Request,res:Response,next:NextFunction) =>{
    try {
        const {commentId, postId} = req.params
        const {commentDetails} = req.body
        const userId = req.user?._id

        const { error } = addCommentValidator(req.body)  
        if(error){
            return res.status(400).send(error.details[0].message)
        }

        const comment = await Comment.findOne({_id: commentId, originalPost: postId, commentOwner: userId})
        if(!comment) return res.status(404).send('Comment did not found')

        comment.commentDetails = commentDetails
        await comment.save()

        res.json(comment)

    } catch (error) {
        next(error)
    }
}

export const deleteComment = async(req: Request, res:Response, next: NextFunction) =>{
    try {
        const commentId = req.params
        
        const comment = await Comment.findByIdAndDelete(commentId)
        if(!comment) return res.status(404).send('Specific Comment did not found')

        res.json(comment)
    } catch (error) {
        next(error)
    }
}