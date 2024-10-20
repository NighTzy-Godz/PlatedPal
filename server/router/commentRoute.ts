import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addComment } from "../controllers/commentController";

const app = Router()

app.post('/addComment/:postId', [isAuth], addComment)

export default app