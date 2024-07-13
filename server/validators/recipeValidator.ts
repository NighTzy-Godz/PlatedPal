import Joi, { Schema } from "joi";
import {
  AddRecipeData,
  Ingredients,
  Instruction,
  TimeCount,
} from "../interfaces/recipeInterfaces";

const ingredientsSchema = Joi.object<Ingredients>({
  id: Joi.string(),
  ingredient: Joi.string().trim().required().messages({
    "any.required": "Ingredient is a required field",
    "string.base": "Ingredient should be a type of string",
    "string.empty": "Ingredient cannot be empty",
  }),
  unit: Joi.string().trim().required().messages({
    "any.required": "Unit is a required field",
    "string.base": "Unit should be a type of string",
    "string.empty": "Unit cannot be empty",
  }),
});

const instructionSchema = Joi.object<Instruction>({
  id: Joi.string(),
  instruction: Joi.string().trim().required().messages({
    "string.base": "Instruction should be a type of string",
    "string.required": "Instruction is a required field",
  }),
});

const timeCountSchema = Joi.object<TimeCount>({
  hours: Joi.number().integer().min(0).required().messages({
    "any.required": "Hours is a required field",
    "number.base": "Hours should be a type of number",
    "number.integer": "Hours should be an integer",
    "number.min": "Hours cannot be less than 0",
  }),
  min: Joi.number().integer().min(0).max(59).required().messages({
    "any.required": "Minutes is a required field",
    "number.base": "Minutes should be a type of number",
    "number.integer": "Minutes should be an integer",
    "number.min": "Minutes cannot be less than 0",
    "number.max": "Minutes cannot be more than 59",
  }),
});

export const addRecipeValidator = (
  data: AddRecipeData
): Joi.ValidationResult => {
  const schema: Schema<AddRecipeData> = Joi.object<AddRecipeData>({
    title: Joi.string().trim().required().messages({
      "any.required": "Recipe Title is a required field",
      "string.base": "Recipe Title should be a type of string",
      "string.empty": "Recipe Title cannot be empty",
    }),
    description: Joi.string().trim().required().messages({
      "any.required": "Recipe Description is a required field",
      "string.base": "Recipe Description should be a type of string",
      "string.empty": "Recipe Description cannot be empty",
    }),

    instructions: Joi.array()
      .items(instructionSchema)
      .min(1)
      .required()
      .messages({
        "any.required": "Instructions is a required field",
        "array.base": "Instructions should be a type of array",
        "array.min": "Instructions should have atleast 1 instruction ",
      }),

    ingredients: Joi.array()
      .items(ingredientsSchema)
      .min(1)
      .required()
      .messages({
        "any.required": "Ingredients is a required field",
        "array.base": "Ingredients should be a type of array",
        "array.min": "At least one ingredient is required",
      }),

    servings: Joi.number().integer().min(1).required().messages({
      "any.required": "Servings is a required field",
      "number.base": "Servings should be a type of number",
      "number.integer": "Servings should be an integer",
      "number.min": "Servings must be at least 1",
    }),

    prepTime: timeCountSchema.required().messages({
      "any.required": "Preperation Time is a required field",
    }),

    cookTime: timeCountSchema.required().messages({
      "any.required": "Cooking Time is a required field",
    }),
  });

  return schema.validate(data, { abortEarly: false });
};
