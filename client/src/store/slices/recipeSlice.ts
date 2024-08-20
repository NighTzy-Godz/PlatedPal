import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Ingredients,
  Instruction,
  IRecipe,
} from "../../interfaces/recipeInterface";

export interface RecipeState {
  ingredients: Ingredients[] | [];
  instructions: Instruction[] | [];
  toEditRecipe: IRecipe | null;
}

const initialState: RecipeState = {
  ingredients: [],
  instructions: [],
  toEditRecipe: null,
};
const slice = createSlice({
  name: "recipeSlice",
  initialState: initialState,
  reducers: {
    setIngredients: (recipe, action: PayloadAction<Ingredients[]>) => {
      recipe.ingredients = action.payload;
    },

    setInstructions: (recipe, action: PayloadAction<Instruction[]>) => {
      recipe.instructions = action.payload;
    },

    setToEditRecipe: (recipe, action: PayloadAction<IRecipe>) => {
      recipe.toEditRecipe = action.payload;
    },
  },
});

export const { setIngredients, setInstructions, setToEditRecipe } =
  slice.actions;

export default slice.reducer;
