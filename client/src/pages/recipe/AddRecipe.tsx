import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AddRecipeData, Ingredients } from "../../interfaces/recipeInterface";
import AuthFormWidth from "../../layout/AuthFormWidth";
import LogoutIcon from "../../components/icons/LogoutIcon";
import BackIcon from "../../components/icons/BackIcon";
import { Link } from "react-router-dom";
import Button from "../../components/common/Button";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../../components/forms/InputLabel";
import Input from "../../components/forms/Input";
import InputError from "../../components/forms/InputError";
import TextArea from "../../components/forms/TextArea";
import AddIngredientModal from "../../components/modals/AddIngredientModal";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import {
  setOpenEditIngredientsModal,
  setOpenIngredientsModal,
} from "../../store/slices/uiSlice";
import DeleteIcon from "../../components/icons/DeleteIcon";
import EditIcon from "../../components/icons/EditIcon";
import { toast } from "sonner";
import EditIngredientModal from "../../components/modals/EditIngredientModal";

function AddRecipe() {
  const dispatch = useDispatch();
  const openIngredientModal = useSelector(
    (state: State) => state.ui.openIngredientsModal
  );
  const openEditIngredientModal = useSelector(
    (state: State) => state.ui.openEditIngredientModal
  );

  const [ingredients, setIngredients] = useState<Ingredients[] | []>([]);
  const [toEditIngredient, setToEditIngredient] = useState<Ingredients | null>(
    null
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddRecipeData>();

  const handleAddIngredient = (ingredient: Ingredients) => {
    const preIngredients = [...ingredients];
    preIngredients.push(ingredient);
    setIngredients(preIngredients);
    toast.success(`Added the ingredient ${ingredient.ingredient}`);
  };

  const deleteIngredients = (ingredient: Ingredients) => {
    const clonedArr = [...ingredients];
    const index = clonedArr.findIndex((item) => item.id === ingredient.id);
    if (index !== -1) {
      clonedArr.splice(index, 1);
      setIngredients(clonedArr);
      toast.success(`Successfully deleted ${ingredient.ingredient}`);
    }
  };
  const handleEditIngredient = (ingredient: Ingredients) => {
    const clonedArr = [...ingredients];
    const index = clonedArr.findIndex((item) => item.id === ingredient.id);

    if (index !== -1) {
      clonedArr[index] = { ...clonedArr[index], ...ingredient };

      setIngredients(clonedArr);
      toast.success(`Edited the ingredient ${ingredient.ingredient}`);
    }
  };

  const handleEditIngredientClose = () => {
    dispatch(setOpenEditIngredientsModal(false));
  };

  const handleEditIngredientOpen = (ingredient: Ingredients) => {
    setToEditIngredient(ingredient);
    dispatch(setOpenEditIngredientsModal(true));
  };

  const handleAddIngredientModalClose = () => {
    dispatch(setOpenIngredientsModal(false));
  };

  const renderIngredients = () => {
    if (ingredients.length === 0)
      return (
        <p className="mt-2 text-lg text-textColor">
          Let the world know your secrets! Add some Ingredients!
        </p>
      );
    return ingredients.map((item) => {
      return (
        <div key={item.id} className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <p className="text-textColor text-lg">
              {" "}
              <span className="font-semibold">{item.unit} of</span>{" "}
              {item.ingredient}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <EditIcon
              className="w-6 h-6 text-textColor cursor-pointer"
              onClick={() => handleEditIngredientOpen(item)}
            />

            <DeleteIcon
              className="w-6 h-6 text-error cursor-pointer"
              onClick={() => deleteIngredients(item)}
            />
          </div>
        </div>
      );
    });
  };

  return (
    <div className="w-full pt-10">
      <AddIngredientModal
        onAddIngredient={handleAddIngredient}
        isShow={openIngredientModal}
        onModalClose={handleAddIngredientModalClose}
      />
      <EditIngredientModal
        onEditIngredient={handleEditIngredient}
        onModalClose={handleEditIngredientClose}
        isShow={openEditIngredientModal}
        headerTitle="Edit Ingredient"
        toEditIngredient={toEditIngredient}
      />
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

              <h3 className="text-2xl text-textColor">Add Recipe</h3>
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
                className="mb-1 text-xl  tracking-wide"
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
                className="mb-1 text-xl  tracking-wide"
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

          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <InputLabel className="text-xl">Ingredients</InputLabel>
                {ingredients.length !== 0 && (
                  <p className="h-5 flex justify-center items-center w-5 rounded-full bg-textColor text-white">
                    {ingredients.length}
                  </p>
                )}
              </div>

              <Button
                type="button"
                size="smallPill"
                variant="darkBlue"
                onClick={() => dispatch(setOpenIngredientsModal(true))}
              >
                +
              </Button>
            </div>
            {renderIngredients()}
            {/* <FormInputsContainer>
              <InputLabel className="mb-1 text-xl  tracking-wide">
                Title
              </InputLabel>
              <Input
                placeholder="Give your recipe name"
                {...register("title", {
                  required: "Recipe Title is a required field",
                })}
              />
              {errors.title && <InputError errMsg={errors.title.message} />}
            </FormInputsContainer> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
