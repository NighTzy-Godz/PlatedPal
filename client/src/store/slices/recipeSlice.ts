import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ingredients, Instruction } from "../../interfaces/recipeInterface";

export interface RecipeState {
  ingredients: Ingredients[] | [];
  instructions: Instruction[] | [];
}

const initialState: RecipeState = {
  ingredients: [],
  instructions: [],
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
  },
});

export const { setIngredients, setInstructions } = slice.actions;

export default slice.reducer;
