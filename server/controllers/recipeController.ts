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

    const parsedBody = {
      title,
      description,
      servings,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      prepTime: JSON.parse(prepTime),
      cookTime: JSON.parse(cookTime),
    };

    const currUserId = req.user?._id;
    if (!currUserId) return res.status(401).send("You are not authorized yet");

    const { error } = addRecipeValidator(parsedBody);

    if (error) return res.status(400).send(error.details[0].message);

    if (!req.files) return res.status(400).send("Recipe Image cannot be empty");

    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const imgLinks = files.map((file) => file.path);

    const recipe = new Recipe({
      title: parsedBody.title,
      description: parsedBody.description,
      ingredients: parsedBody.ingredients,
      instructions: parsedBody.instructions,
      image: imgLinks[0],
      servings: parsedBody.servings,
      prepTime: parsedBody.prepTime,
      cookTime: parsedBody.cookTime,
      creator: currUserId,
    });

    await recipe.save();

    res.json(recipe);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const editRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;

    const {
      title,
      description,
      ingredients,
      instructions,
      servings,
      prepTime,
      cookTime,
    } = req.body;

    const parsedBody = {
      title,
      description,
      servings,
      ingredients: JSON.parse(ingredients),
      instructions: JSON.parse(instructions),
      prepTime: JSON.parse(prepTime),
      cookTime: JSON.parse(cookTime),
    };

    const currUserId = req.user?._id;
    if (!currUserId) return res.status(401).send("You are not authorized yet");

    const { error } = addRecipeValidator(parsedBody);

    if (error) return res.status(400).send(error.details[0].message);

    const recipe = await Recipe.findOne({ _id: recipeId });
    if (!recipe) return res.status(404).send("Recipe did not found");

    if (!req.files) return res.status(400).send("Recipe Image cannot be empty");

    const files: Express.Multer.File[] = req.files as Express.Multer.File[];
    const imgLinks = files.map((file) => file.path);

    recipe.set({
      title: parsedBody.title,
      description: parsedBody.description,
      ingredients: parsedBody.ingredients,
      instructions: parsedBody.instructions,
      image: imgLinks[0],
      servings: parsedBody.servings,
      prepTime: parsedBody.prepTime,
      cookTime: parsedBody.cookTime,
      creator: currUserId,
    });

    await recipe.save();

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getRecipeDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { recipeId } = req.params;

    const currUserId = req.user?._id;
    if (!currUserId)
      return res.status(401).send("You are not authorized. Please Login First");

    const recipe = await Recipe.findById({ _id: recipeId }).populate("creator");

    if (!recipe) return res.status(404).send("Recipe did not found");

    res.json(recipe);
  } catch (error) {
    next(error);
  }
};

export const getMyMadeRecipe = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const currUserId = req.user?._id;

    if (!currUserId)
      return res.status(401).send("Please login first before proceeding");

    const userMadeRecipes = await Recipe.find({ creator: currUserId });
    const dataCount = await Recipe.countDocuments({ creator: currUserId });

    const resData = {
      data: userMadeRecipes,
      totalCount: dataCount,
    };

    res.json(resData);
  } catch (error) {
    next(error);
  }
};

export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { page, limit } = req.query;

    const qPage = parseInt(page as string) || 1;
    const qLimit = parseInt(limit as string) || 10;
    const skip = (qPage - 1) * qLimit;

    const recipes = await Recipe.find()
      .skip(skip)
      .limit(qLimit)
      .populate("creator")
      .sort({ createdAt: 1 });
    const totalRecipes = await Recipe.find().countDocuments();

    const resBody = {
      data: recipes,
      totalCount: totalRecipes,
    };

    res.json(resBody);
  } catch (error) {
    next(error);
  }
};
