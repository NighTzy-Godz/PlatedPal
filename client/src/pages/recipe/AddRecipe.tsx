import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  AddRecipeData,
  PreAddRecipeData,
} from "../../interfaces/recipeInterface";

import BackIcon from "../../components/icons/BackIcon";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../../components/forms/InputLabel";
import Input from "../../components/forms/Input";
import InputError from "../../components/forms/InputError";
import TextArea from "../../components/forms/TextArea";
import IngredientForm from "../../components/forms/IngredientForm";
import InstructionForm from "../../components/forms/InstructionForm";
import { useSelector } from "react-redux";
import { State } from "../../store/store";
import { toast } from "sonner";
import FileUploader from "../../components/forms/FileUploader";
import { recipeApi } from "../../store/apis/recipeApi";
import { renderError } from "../../utils/utils";

function AddRecipe() {
  const [addRecipe, { error, isLoading, isSuccess }] =
    recipeApi.useAddRecipeMutation();

  const ingredients = useSelector(
    (state: State) => state.recipeSlice.ingredients
  );
  const instructions = useSelector(
    (state: State) => state.recipeSlice.instructions
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PreAddRecipeData>();

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully Added the recipe");
    }
  }, [error, isSuccess]);

  const handleAddRecipeSubmit = (data: PreAddRecipeData) => {
    const { title, cookTime, prepTime, description, servings, img } = data;

    if (ingredients.length === 0)
      return toast.error("Ingredients cannot be empty");
    if (instructions.length === 0) {
      return toast.error("Instructions cannot be empty");
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("cookTime", JSON.stringify(cookTime));
    formData.append("prepTime", JSON.stringify(prepTime));
    formData.append("description", description);
    formData.append("servings", servings as any);

    formData.append("img", img[0]);
    formData.append("ingredients", JSON.stringify(ingredients));
    formData.append("instructions", JSON.stringify(instructions));

    addRecipe(formData);
  };

  return (
    <div className="w-full pt-10">
      <div className="max-w-xl mx-auto">
        <form
          method="post"
          className="w-full"
          onSubmit={handleSubmit(handleAddRecipeSubmit)}
        >
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-3 items-center">
              <Link to="#">
                <BackIcon className="w-6 h-8 " />
              </Link>

              <h3 className="text-3xl text-textColor">Add Recipe</h3>
            </div>
            <div className="">
              <Button
                isLoading={isLoading}
                variant="main"
                size="sm"
                type="submit"
              >
                Save Recipe
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <FormInputsContainer>
              <InputLabel
                htmlFor="title"
                className="mb-1 text-2xl  tracking-wide"
              >
                Title
              </InputLabel>
              <Input
                id="title"
                placeholder="Give your recipe name"
                {...register("title", {
                  required: "Recipe Title is a required field",
                })}
              />
              {errors.title && <InputError errMsg={errors.title.message} />}
            </FormInputsContainer>
          </div>

          <div className="mb-8">
            <FileUploader
              accept="image/*"
              multiple
              {...register("img", {
                required: "File Upload is a required field",
              })}
            />
            {errors.img && <InputError errMsg={errors.img.message} />}
          </div>

          <div className="mb-8">
            <FormInputsContainer>
              <InputLabel
                htmlFor="desc"
                className="mb-1 text-2xl  tracking-wide"
              >
                Description
              </InputLabel>
              <TextArea
                id="desc"
                placeholder="Introduce your recipe, add notes, cooking tips, serving suggestions, etc . . ."
                {...register("description", {
                  required: "Recipe Description is a required field",
                  maxLength: {
                    value: 500,
                    message:
                      "Recipe Description should only contain 500 characters",
                  },
                })}
              />
              {errors.description && (
                <InputError errMsg={errors.description.message} />
              )}
            </FormInputsContainer>
          </div>

          <div className="mb-10">
            <IngredientForm />
          </div>

          <div className="mb-8">
            <InstructionForm />
          </div>

          <div className="mb-8">
            <FormInputsContainer>
              <InputLabel className="text-2xl">Servings</InputLabel>
              <p className="text-xl mb-2 text-gray-500">
                How many portions does this recipe make?
              </p>
              <Input
                type="number"
                placeholder="#"
                {...register("servings", {
                  required: "Recipe Servings is a requried field",
                })}
              />
              {errors.servings && (
                <InputError errMsg={errors.servings.message} />
              )}
            </FormInputsContainer>
          </div>

          <div className="mb-8">
            <FormInputsContainer>
              <InputLabel className="text-2xl">Prep Time</InputLabel>
              <p className="text-xl mb-2 text-gray-500">
                How long does it take to prepare this recipe?
              </p>

              <div className="flex gap-5">
                <FormInputsContainer>
                  <Input
                    className="placeholder:text-lg "
                    type="number"
                    placeholder="Hours"
                    {...register("prepTime.hours", {
                      required: "Prep Time on hours is a required field",
                    })}
                  />
                  {errors.prepTime?.hours && (
                    <InputError errMsg={errors.prepTime.hours.message} />
                  )}
                </FormInputsContainer>

                <FormInputsContainer>
                  <Input
                    className="placeholder:text-lg "
                    type="number"
                    placeholder="Minutes"
                    {...register("prepTime.min", {
                      required: "Prep Time on minutes is a required field",
                    })}
                  />
                  {errors.prepTime?.min && (
                    <InputError errMsg={errors.prepTime.min.message} />
                  )}
                </FormInputsContainer>
              </div>
            </FormInputsContainer>
          </div>

          <div className="mb-8">
            <FormInputsContainer>
              <InputLabel className="text-2xl">Cook Time</InputLabel>
              <p className="text-xl mb-2 text-gray-500">
                How long does it take to cook this recipe?
              </p>

              <div className="flex gap-5">
                <FormInputsContainer>
                  <Input
                    className="placeholder:text-lg "
                    type="number"
                    placeholder="Hours"
                    {...register("cookTime.hours", {
                      required: "Cooking Time on hours is a required field",
                    })}
                  />
                  {errors.cookTime?.hours && (
                    <InputError errMsg={errors.cookTime.hours.message} />
                  )}
                </FormInputsContainer>

                <FormInputsContainer>
                  <Input
                    className="placeholder:text-lg "
                    type="number"
                    placeholder="Minutes"
                    {...register("cookTime.min", {
                      required: "Cooking Time on minutes is a required field",
                    })}
                  />{" "}
                  {errors.cookTime?.min && (
                    <InputError errMsg={errors.cookTime.min.message} />
                  )}
                </FormInputsContainer>
              </div>
            </FormInputsContainer>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
