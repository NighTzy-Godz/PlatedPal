import { Router } from "express";
import isAuth from "../middleware/isAuth";
import { addRecipe } from "../controllers/recipeController";
import multer from "multer";
import { storage } from "../cloudinary";

const upload = multer({ storage });

const app = Router();

app.post("/addRecipe", upload.array("img"), [isAuth], addRecipe);

export default app;
