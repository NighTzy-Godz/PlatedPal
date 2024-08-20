import React, { useState } from "react";
import Modal from "../common/Modal";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../forms/InputLabel";
import Input from "../forms/Input";
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
  if (!isShow) return;

  const randomId = uuid();
  const dispatch = useDispatch();

  const [ingredient, setIngredient] = useState("");
  const [unit, setUnit] = useState("");
  const [errors, setErrors] = useState<{ ingredient?: string; unit?: string }>(
    {}
  );

  const handleAddIngredientSubmit = () => {
    const newErrors: { ingredient?: string; unit?: string } = {};
    if (!ingredient) {
      newErrors.ingredient = "Ingredient is a required field";
    }
    if (!unit) {
      newErrors.unit = "Unit is a required field";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const newData: Ingredients = { id: randomId, ingredient, unit };
    onAddIngredient(newData);
    dispatch(setOpenIngredientsModal(false));
    setIngredient("");
    setUnit("");
    setErrors({});
    onModalClose();
  };

  return (
    <Modal onModalClose={onModalClose} headerTitle="Add Ingredient">
      <div>
        <div className="mb-5">
          <FormInputsContainer>
            <InputLabel className="mb-1 text-lg">Ingredient</InputLabel>
            <Input
              placeholder="Name of ingredient used"
              value={ingredient}
              onChange={(e) => setIngredient(e.target.value)}
            />
            {errors.ingredient && <InputError errMsg={errors.ingredient} />}
          </FormInputsContainer>
        </div>
        <div className="mb-5">
          <FormInputsContainer>
            <InputLabel className="mb-1 text-lg">Unit</InputLabel>
            <Input
              placeholder="What's the unit?"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
            />
            {errors.unit && <InputError errMsg={errors.unit} />}
          </FormInputsContainer>
        </div>
        <div>
          <Button
            variant="darkBlue"
            size="sm"
            onClick={handleAddIngredientSubmit}
          >
            Add Ingredient
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default AddIngredientModal;
