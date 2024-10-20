import mongoose, { Schema, type Document } from "mongoose"

const DB_URL = process.env.DB_URL as string

mongoose.connect(DB_URL).then(() =>{
    console.log('Connected to the Database - Comment')
}).catch(err =>{
    console.log(`Error on Comment Model - ${err}`)
})


interface IComment extends Document{
    commentOwner: Schema.Types.ObjectId
    commentDetails: string,
    likes: Schema.Types.ObjectId[]
    originalPost: Schema.Types.ObjectId
}

const commentSchema: Schema<IComment> = new Schema({
    commentOwner:{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    commentDetails:{
        type: String,
        required: true
    },
    likes: [
        {
            type: Schema.Types.ObjectId,
        }
    ],
    originalPost:{
        type: Schema.Types.ObjectId,
        ref: 'Recipe',
        required: true
    },
}, 
    {timestamps: true}
) 

const Comment = mongoose.model<IComment>('Comment', commentSchema)

export default Comment;
