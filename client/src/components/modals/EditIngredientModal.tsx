import React, { useState, useEffect } from "react";
import Modal from "../common/Modal";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../forms/InputLabel";
import Input from "../forms/Input";
import Button from "../common/Button";
import InputError from "../forms/InputError";
import { useDispatch } from "react-redux";
import { setOpenEditIngredientsModal } from "../../store/slices/uiSlice";
import { Ingredients } from "../../interfaces/recipeInterface";

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

  const [ingredient, setIngredient] = useState(
    toEditIngredient?.ingredient || ""
  );
  const [unit, setUnit] = useState(toEditIngredient?.unit || "");
  const [errors, setErrors] = useState<{ ingredient?: string; unit?: string }>(
    {}
  );

  useEffect(() => {
    if (toEditIngredient) {
      setIngredient(toEditIngredient.ingredient);
      setUnit(toEditIngredient.unit);
    }
  }, [toEditIngredient]);

  const handleEditIngredientSubmit = () => {
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

    const updatedIngredient: Ingredients = {
      id: toEditIngredient?.id || "",
      ingredient,
      unit,
    };
    onEditIngredient(updatedIngredient);
    dispatch(setOpenEditIngredientsModal(false));
    onModalClose();
  };

  return (
    <Modal onModalClose={onModalClose} headerTitle={headerTitle}>
      <div>
        <div className="mb-5">
          <FormInputsContainer>
            <InputLabel>Ingredient</InputLabel>
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
            <InputLabel>Unit</InputLabel>
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
            onClick={handleEditIngredientSubmit}
          >
            Edit Ingredient
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default EditIngredientModal;
