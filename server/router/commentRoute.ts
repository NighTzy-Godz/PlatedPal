import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addComment, getAllPostComment, updateComment } from "../controllers/commentController";

const app = Router()

app.get('/getAllPostComment', getAllPostComment)
app.post('/addComment/:postId', [isAuth], addComment)
app.put('/updateComment/:commentId/:postId', [isAuth], updateComment)

export default app