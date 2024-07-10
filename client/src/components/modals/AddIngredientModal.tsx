import React from "react";
import Modal from "../common/Modal";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../forms/InputLabel";
import Input from "../forms/Input";
import { useForm } from "react-hook-form";
import { Ingredients } from "../../interfaces/recipeInterface";
import Button from "../common/Button";
import InputError from "../forms/InputError";
import { useDispatch } from "react-redux";
import { setOpenIngredientsModal } from "../../store/slices/uiSlice";
import { v4 as uuid } from "uuid";

interface AddIngredientModalProps {
  isShow: boolean;
  onModalClose(): void;
  onAddIngredient: (data: Ingredients) => void;
}

function AddIngredientModal({
  isShow,
  onModalClose,
  onAddIngredient,
}: AddIngredientModalProps) {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Ingredients>();

  const randomId = uuid();

  const handleAddIngredientSubmit = (data: Ingredients) => {
    const newData = { ...data, id: randomId };
    onAddIngredient(newData);
    dispatch(setOpenIngredientsModal(false));
    reset();
  };
  if (isShow) {
    return (
      <Modal onModalClose={onModalClose} headerTitle="Add Ingredient">
        <form onSubmit={handleSubmit(handleAddIngredientSubmit)}>
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
          </div>{" "}
          <div className="mb-5">
            <FormInputsContainer>
              <InputLabel>Unit</InputLabel>
              <Input
                placeholder="Whats the unit?"
                {...register("unit", {
                  required: "Unit is a required field",
                })}
              />{" "}
              {errors.unit && <InputError errMsg={errors.unit.message} />}
            </FormInputsContainer>
          </div>
          <div className="">
            <Button variant="darkBlue" size="sm">
              Add Ingredient
            </Button>
          </div>
        </form>
      </Modal>
    );
  }
}

export default AddIngredientModal;
