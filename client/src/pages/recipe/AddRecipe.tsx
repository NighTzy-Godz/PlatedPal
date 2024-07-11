import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddRecipeData } from "../../interfaces/recipeInterface";

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

function AddRecipe() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRecipeData>();

  return (
    <div className="w-full pt-10">
      <div className="max-w-2xl mx-auto">
        <form
          method="post"
          className="w-full"
          onSubmit={handleSubmit(() => {})}
        >
          <div className="flex justify-between items-center mb-10">
            <div className="flex gap-3 items-center">
              <Link to="#">
                <BackIcon className="w-6 h-8 " />
              </Link>

              <h3 className="text-3xl text-textColor">Add Recipe</h3>
            </div>
            <div className="">
              <Button variant="main" size="sm" type="submit">
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
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
