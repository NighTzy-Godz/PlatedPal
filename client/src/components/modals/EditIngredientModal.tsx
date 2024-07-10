import React from "react";
import Modal from "../common/Modal";
import { Ingredients } from "../../interfaces/recipeInterface";
import { useForm } from "react-hook-form";
import InputError from "../forms/InputError";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../forms/InputLabel";
import Input from "../forms/Input";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { setOpenEditIngredientsModal } from "../../store/slices/uiSlice";

interface EditIngredientModalProps {
  onModalClose(): void;
  headerTitle: string;
  toEditIngredient: Ingredients | null;
  onEditIngredient(ingredient: Ingredients): void;
  isShow: boolean;
}

function EditIngredientModal({
  headerTitle,
  toEditIngredient,
  isShow,
  onModalClose,
  onEditIngredient,
}: EditIngredientModalProps) {
  if (!isShow) {
    return null;
  }

  const dispatch = useDispatch();
  const { id, ingredient, unit } = toEditIngredient as Ingredients;
  const defaultValues: Ingredients = {
    id,
    ingredient,
    unit,
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Ingredients>({ defaultValues });

  const handleEditIngredientSubmit = (data: Ingredients) => {
    dispatch(setOpenEditIngredientsModal(false));
    onEditIngredient(data);
  };

  return (
    <Modal onModalClose={onModalClose} headerTitle={headerTitle}>
      <form onSubmit={handleSubmit(handleEditIngredientSubmit)}>
        <div className="mb-5">
          <FormInputsContainer>
            <InputLabel>Ingredient</InputLabel>
            <Input
              placeholder="Name of ingredient used"
              {...register("ingredient", {
                required: "Ingredient is a required field",
              })}
            />
            {errors.ingredient && (
              <InputError errMsg={errors.ingredient.message} />
            )}
          </FormInputsContainer>
        </div>
        <div className="mb-5">
          <FormInputsContainer>
            <InputLabel>Unit</InputLabel>
            <Input
              placeholder="What's the unit?"
              {...register("unit", {
                required: "Unit is a required field",
              })}
            />
            {errors.unit && <InputError errMsg={errors.unit.message} />}
          </FormInputsContainer>
        </div>
        <div className="">
          <Button variant="darkBlue" size="sm">
            Edit Ingredient
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default EditIngredientModal;
