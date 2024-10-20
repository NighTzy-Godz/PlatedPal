import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addComment, getAllPostComment } from "../controllers/commentController";

const app = Router()

app.get('/getAllPostComment', getAllPostComment)
app.post('/addComment/:postId', [isAuth], addComment)


export default app