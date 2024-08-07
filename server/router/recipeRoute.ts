import { Router } from "express";
import isAuth from "../middleware/isAuth";
import {
  addRecipe,
  getAllRecipes,
  getMyMadeRecipe,
  getRecipeDetails,
} from "../controllers/recipeController";
import multer from "multer";
import { storage } from "../cloudinary";

const upload = multer({ storage });

const app = Router();

app.get("/myMadeRecipes", [isAuth], getMyMadeRecipe);
app.get("/getAllRecipes", [isAuth], getAllRecipes);
app.get("/recipeDetails/:recipeId", [isAuth], getRecipeDetails);
app.post("/addRecipe", upload.array("img"), [isAuth], addRecipe);

export default app;
