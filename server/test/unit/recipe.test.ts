import { addRecipeValidator } from "../../validators/recipeValidator";

describe("addRecipeValidator", () => {
  const validRecipeObj: any = {
    title: "Title",
    description: "Desc",
    instructions: ["Instruction 1", "Instruction 2"],
    ingredients: [
      {
        ingredient: "Ingrdient 1",
        unit: "4 tsp",
      },
    ],
    servings: 1,
    prepTime: {
      hours: 1,
      min: 2,
    },
    cookTime: {
      hours: 3,
      min: 1,
    },
  };

  it("should validate a correct recipe object", () => {
    const { error } = addRecipeValidator(validRecipeObj);

    expect(error).toBeUndefined();
  });

  it("should return an error if there are no values passed", () => {
    const { error } = addRecipeValidator({} as any);
    expect(error).toBeDefined();

    error?.details.forEach((err) => {
      expect(err.message).toContain("required field");
    });
  });

  it("should return an error if the string based values are not strings", () => {
    const nonStringValues = {
      ...validRecipeObj,
      title: 1,
      description: 1,

      ingredients: [
        {
          ingredient: 1,
          unit: 1,
        },
      ],
    };

    const { error } = addRecipeValidator(nonStringValues);

    expect(error).toBeDefined();

    error?.details.forEach((err) => {
      expect(err.message).toContain("should be a type of string");
    });
  });

  it("should return an error if the number based values are not numbers", () => {
    const nonNumValues = {
      ...validRecipeObj,
      servings: "1",
      prepTime: {
        hours: "1",
        min: "1",
      },
      cookTime: {
        hours: "1",
        min: "1",
      },
    };

    const { error } = addRecipeValidator(nonNumValues);

    expect(error).toBeDefined();

    error?.details.forEach((err) => {
      expect(err.message).toContain("should be a type of number");
    });
  });

  it("should return an error if the instruction and ingredients is not in an array form", () => {
    const notArrayInstruction = {
      ...validRecipeObj,
      instructions: "",
      ingredients: "",
    };

    const { error } = addRecipeValidator(notArrayInstruction);

    expect(error).toBeDefined();

    error?.details.forEach((err) => {
      expect(err.message).toContain("should be a type of array");
    });
  });
});
