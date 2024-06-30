import { NextFunction, Request, Response } from "express";
import { addRecipeValidator } from "../validators/recipeValidator";
import Recipe from "../models/Recipe";

export const addRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
      cookTime,
    } = req.body;

    const currUserId = req.user?._id;
    if (!currUserId) return res.status(401).send("You are not authorized yet");

    const { error } = addRecipeValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    if (!req.files)
      return res.status(400).send("Recipe Image/s cannot be empty");

    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const imgLinks = files.map((file) => file.path);

    const recipe = new Recipe({
      title,
      description,
      ingredients,
      instructions,
      images: imgLinks,
      servings,
      prepTime,
      cookTime,
    });

    await recipe.save();

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};
