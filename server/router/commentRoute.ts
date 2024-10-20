import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addComment, deleteComment, getAllPostComment, updateComment } from "../controllers/commentController";

const app = Router()

app.get('/getAllPostComment', getAllPostComment)
app.post('/addComment/:postId', [isAuth], addComment)
app.put('/updateComment/:commentId/:postId', [isAuth], updateComment)
app.delete('/deleteComment/:commentId', [isAuth], deleteComment)
export default app