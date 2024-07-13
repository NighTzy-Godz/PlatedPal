export interface Ingredients {
  id: string;
  ingredient: string;
  unit: string;
}

export interface TimeCount {
  hours: number;
  min: number;
}

export interface Instruction {
  id: string;
  instruction: string;
}

export interface PreAddRecipeData {
  title: string;
  description: string;
  img: FileList;
  servings: number;
  prepTime: TimeCount;
  cookTime: TimeCount;
}

export interface AddRecipeData {
  title: string;
  description: string;
  ingredients: Ingredients[];
  instructions: Instruction[];
  servings: number;
  prepTime: TimeCount;
  cookTime: TimeCount;
}
