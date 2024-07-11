import React, { useEffect, useState } from "react";
import Modal from "../common/Modal";
import FormInputsContainer from "../../layout/FormInputsContainer";
import InputLabel from "../forms/InputLabel";
import TextArea from "../forms/TextArea";
import InputError from "../forms/InputError";
import Button from "../common/Button";
import { Instruction } from "../../interfaces/recipeInterface";
import { toast } from "sonner";

interface EditInstructionModalProps {
  onModalClose(): void;
  isShow: boolean;
  toEditInstruction: Instruction | null;
  onEditInstruction(instruc: Instruction): void;
}

function EditInstructionModal({
  isShow,
  toEditInstruction,
  onModalClose,
  onEditInstruction,
}: EditInstructionModalProps) {
  if (!isShow) return null;

  const [instruction, setInstruction] = useState(
    toEditInstruction?.instruction || ""
  );
  const [error, setError] = useState<{ instruction?: string }>({});

  useEffect(() => {
    if (toEditInstruction) {
      setInstruction(toEditInstruction.instruction);
    }
  }, [toEditInstruction]);

  const handleEditInstructionSubmit = () => {
    const newError: { instruction?: string } = {};

    if (!instruction) {
      newError.instruction = "Recipe Instruction is a required field";
    }

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    if (!toEditInstruction?.id) {
      toast.error("Id for the Instruction did not found");
      return;
    }

    const editedInstruction: Instruction = {
      id: toEditInstruction?.id,
      instruction,
    };

    onEditInstruction(editedInstruction);
    setError({});
    setInstruction("");
    onModalClose();
  };

  return (
    <Modal onModalClose={onModalClose} headerTitle="Edit Instruction">
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
          onClick={handleEditInstructionSubmit}
        >
          Edit Ingredient
        </Button>
      </div>
    </Modal>
  );
}

export default EditInstructionModal;
