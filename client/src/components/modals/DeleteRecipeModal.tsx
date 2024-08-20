import React, { useEffect } from "react";
import Modal from "../common/Modal";
import Button from "../common/Button";
import { useDispatch } from "react-redux";
import { setOpenDeleteRecipeModal } from "../../store/slices/uiSlice";
import { toast } from "sonner";
import { recipeApi } from "../../store/apis/recipeApi";
import { renderError } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

interface DeleteRecipeModalProps {
  recipeId: string;
  isShow: boolean;
  onModalClose(): void;
}

function DeleteRecipeModal({
  recipeId,
  isShow,
  onModalClose,
}: DeleteRecipeModalProps) {
  if (!isShow) return null;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [deleteRecipe, result] = recipeApi.useDeleteRecipeMutation();
  const { isSuccess, error, isLoading } = result;

  useEffect(() => {
    if (error) {
      renderError(error);
    }
    if (isSuccess) {
      toast.success("Successfully Deleted the Recipe!");
      onModalClose();
      navigate("/");
    }
  }, [isSuccess, error, isLoading]);

  const handleCancelDeleteClick = () => {
    dispatch(setOpenDeleteRecipeModal(false));
  };

  const handleDeleteRecipe = () => {
    deleteRecipe(recipeId);
  };

  return (
    <Modal onModalClose={onModalClose} headerTitle="Delete Recipe">
      <p className="text-lg text-textColor leading-tight mb-5">
        Are you sure you want to delete this recipe? This changes cannot be
        undo.
      </p>
      <div className="flex gap-2">
        <Button variant="darkBlue" onClick={handleCancelDeleteClick}>
          Cancel
        </Button>
        <Button
          variant="danger"
          isLoading={isLoading}
          onClick={handleDeleteRecipe}
        >
          Delete Recipe
        </Button>
      </div>
    </Modal>
  );
}

export default DeleteRecipeModal;
