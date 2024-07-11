import React, { useState } from "react";
import InputLabel from "./InputLabel";
import Button from "../common/Button";
import { IoMdAdd } from "react-icons/io";
import { Instruction } from "../../interfaces/recipeInterface";
import { useDispatch, useSelector } from "react-redux";
import {
  setOpenAddInsrtuctionModal,
  setOpenEditInstructionModal,
} from "../../store/slices/uiSlice";
import AddInstructionModal from "../modals/AddInstructionModal";
import { State } from "../../store/store";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import { toast } from "sonner";
import EditInstructionModal from "../modals/EditInstructionModal";
import { setInstructions } from "../../store/slices/recipeSlice";

function InstructionForm() {
  const dispatch = useDispatch();
  const openAddInstructionModal = useSelector(
    (state: State) => state.ui.openAddInstructionModal
  );
  const openEditInstructionModal = useSelector(
    (state: State) => state.ui.openEditInstructionModal
  );

  const instructions = useSelector(
    (state: State) => state.recipeSlice.instructions
  );
  const [toEditInstruction, setToEditInstruction] =
    useState<Instruction | null>(null);
  const handleAddInstructionModalClose = () => {
    dispatch(setOpenAddInsrtuctionModal(false));
  };

  const handleEditInstructionModalClose = () => {
    dispatch(setOpenEditInstructionModal(false));
  };

  const handleAddInstruction = (instruction: Instruction) => {
    const instructionsArr = [...instructions];
    instructionsArr.push(instruction);
    dispatch(setInstructions(instructionsArr));
    toast.success("Successfully Added the Instruction");
  };

  const deleteInstruction = (instruct: Instruction) => {
    const { id, instruction } = instruct;
    const instructionsArr = [...instructions];
    const index = instructionsArr.findIndex((item) => item.id === id);

    if (index !== -1) {
      instructionsArr.splice(index, 1);
      dispatch(setInstructions(instructionsArr));

      toast.success(`Successfully removed the instruction`);
    }
  };

  const handleInstructionEdit = (instruct: Instruction) => {
    const instructionsArr = [...instructions];
    const index = instructionsArr.findIndex((item) => item.id === instruct.id);

    if (index !== -1) {
      instructionsArr[index] = { ...instructionsArr[index], ...instruct };
      dispatch(setInstructions(instructionsArr));
      toast.success("Successfully Edit the Instruction");
    }
  };

  const handleEditInstructionModalOpen = (instruct: Instruction) => {
    setToEditInstruction(instruct);
    dispatch(setOpenEditInstructionModal(true));
  };

  const renderInstructions = () => {
    if (instructions.length === 0) {
      return (
        <p className="text-xl text-gray-500">
          Add some steps on how you prepare or cook it
        </p>
      );
    }
    return instructions.map((item, index) => {
      return (
        <div key={item.id} className="mt-3  gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-textColor font-semibold text-xl">
              Step {index + 1}:{" "}
            </h3>
            <div className="flex items-center gap-2">
              <EditIcon
                className="w-6 h-6 text-textColor cursor-pointer"
                onClick={() => handleEditInstructionModalOpen(item)}
              />

              <DeleteIcon
                className="w-6 h-6 text-error cursor-pointer"
                onClick={() => deleteInstruction(item)}
              />
            </div>
          </div>

          <div className="">
            <p className="text-textColor text-xl">{item.instruction}</p>
          </div>
        </div>
      );
    });
  };

  return (
    <React.Fragment>
      <AddInstructionModal
        onAddInstruction={handleAddInstruction}
        isShow={openAddInstructionModal}
        onModalClose={handleAddInstructionModalClose}
      />
      <EditInstructionModal
        onEditInstruction={handleInstructionEdit}
        isShow={openEditInstructionModal}
        toEditInstruction={toEditInstruction}
        onModalClose={handleEditInstructionModalClose}
      />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <InputLabel className="text-2xl">Instructions</InputLabel>
          {instructions.length !== 0 && (
            <p className="h-5 flex justify-center items-center w-5 rounded-full bg-textColor text-white">
              {instructions.length}
            </p>
          )}
        </div>

        <Button
          type="button"
          size="smallPill"
          variant="darkBlue"
          onClick={() => dispatch(setOpenAddInsrtuctionModal(true))}
        >
          <IoMdAdd />
        </Button>
      </div>
      {renderInstructions()}
    </React.Fragment>
  );
}

export default InstructionForm;
