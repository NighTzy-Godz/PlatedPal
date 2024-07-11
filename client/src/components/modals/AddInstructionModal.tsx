import React, { useState } from "react";
import Modal from "../common/Modal";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../forms/InputLabel";
import TextArea from "../forms/TextArea";
import InputError from "../forms/InputError";
import Button from "../common/Button";
import { Instruction } from "../../interfaces/recipeInterface";
import { v4 as uuid } from "uuid";

interface AddInstructionModalProps {
  onModalClose(): void;
  isShow: boolean;
  onAddInstruction(instruc: Instruction): void;
}

function AddInstructionModal({
  isShow,
  onModalClose,
  onAddInstruction,
}: AddInstructionModalProps) {
  if (!isShow) return null;
  const randomId = uuid();
  const [instruction, setInstruction] = useState("");
  const [error, setError] = useState<{ instruction?: string }>({});

  const handleAddInstructionSubmit = () => {
    const newError: { instruction?: string } = {};

    if (!instruction) {
      newError.instruction = "Recipe Instruction is a required field";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    const newInstruction: Instruction = { id: randomId, instruction };

    onAddInstruction(newInstruction);
    setError({});
    setInstruction("");
    onModalClose();
  };

  return (
    <Modal onModalClose={onModalClose} headerTitle="Add Instruction">
      <div className="mb-5">
        <FormInputsContainer>
          <InputLabel className="mb-1 text-lg">Instruction</InputLabel>
          <TextArea
            placeholder="Ex. Put the grated cheese . . ."
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
          />
          {error.instruction && <InputError errMsg={error.instruction} />}
        </FormInputsContainer>
      </div>

      <div>
        <Button
          type="button"
          variant="darkBlue"
          size="sm"
          onClick={handleAddInstructionSubmit}
        >
          Add Ingredient
        </Button>
      </div>
    </Modal>
  );
}

export default AddInstructionModal;
