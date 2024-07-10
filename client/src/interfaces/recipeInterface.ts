export interface Ingredients {
  id: string;
  ingredient: string;
  unit: string;
}

export interface TimeCount {
  hours: number;
  min: number;
}

export interface AddRecipeData {
  title: string;
  description: string;
  ingredients: Ingredients[];
  instructions: string[];
  servings: number;
  prepTime: TimeCount;
  cookTime: TimeCount;
}
