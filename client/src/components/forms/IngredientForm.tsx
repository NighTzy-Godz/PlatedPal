import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../../store/store";
import { Ingredients } from "../../interfaces/recipeInterface";
import { toast } from "sonner";
import {
  setOpenEditIngredientsModal,
  setOpenIngredientsModal,
} from "../../store/slices/uiSlice";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import AddIngredientModal from "../modals/AddIngredientModal";
import EditIngredientModal from "../modals/EditIngredientModal";
import InputLabel from "./InputLabel";
import Button from "../common/Button";
import { IoMdAdd } from "react-icons/io";

function IngredientForm() {
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
    <React.Fragment>
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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <InputLabel className="text-2xl">Ingredients</InputLabel>
          {ingredients.length !== 0 && (
            <p className="h-5 flex justify-center items-center w-5 rounded-full bg-textColor text-white">
              {ingredients.length}
            </p>
          )}
        </div>

        <Button
          // className="!text-"
          type="button"
          size="smallPill"
          variant="darkBlue"
          onClick={() => dispatch(setOpenIngredientsModal(true))}
        >
          <IoMdAdd />
        </Button>
      </div>
      {renderIngredients()}
    </React.Fragment>
  );
}

export default IngredientForm;
