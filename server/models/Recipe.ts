import mongoose, { Document, Schema } from "mongoose";
import {
  Ingredients,
  Instruction,
  TimeCount,
} from "../interfaces/recipeInterfaces";

const DB_URL = process.env.DB_URL as string;

mongoose
  .connect(DB_URL)
  .then(() => console.log("Connected to the database - RECIPE"))
  .catch((err) => console.log("Error on recipe ", err));

interface IRecipe extends Document {
  creator: Schema.Types.ObjectId;
  title: string;
  description: string;
  image: string;
  likes: number;
  saved: number;
  ingredients: Ingredients[];
  instructions: Instruction[];
  servings: number;
  prepTime: TimeCount;
  cookTime: TimeCount;
}

const recipeSchema: Schema<IRecipe> = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },

  saved: {
    type: Number,
    default: 0,
  },

  likes: {
    type: Number,
    default: 0,
  },

  ingredients: [
    {
      ingredient: {
        type: String,
        required: true,
      },
      unit: {
        type: String,
        default: "",
      },
    },
  ],

  instructions: [
    {
      id: {
        type: String,
      },
      instruction: {
        type: String,
        required: true,
      },
    },
  ],
  servings: {
    type: Number,
    required: true,
  },
  prepTime: {
    hours: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
  },
  cookTime: {
    hours: {
      type: Number,
      required: true,
    },
    min: {
      type: Number,
      required: true,
    },
  },
});

const Recipe = mongoose.model<IRecipe>("Recipe", recipeSchema);

export default Recipe;
