import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UIState {
  collapseNav: boolean;

  openIngredientsModal: boolean;
  openEditIngredientModal: boolean;

  openAddInstructionModal: boolean;
  openEditInstructionModal: boolean;
}

const initialState: UIState = {
  collapseNav: false,

  openIngredientsModal: false,
  openEditIngredientModal: false,

  openAddInstructionModal: false,
  openEditInstructionModal: false,
};

const slice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCollapseNav: (ui, action: PayloadAction<boolean>) => {
      ui.collapseNav = action.payload;
    },

    setOpenIngredientsModal: (ui, action) => {
      ui.openIngredientsModal = action.payload;
    },

    setOpenEditIngredientsModal: (ui, action) => {
      ui.openEditIngredientModal = action.payload;
    },

    setOpenAddInsrtuctionModal: (ui, action) => {
      ui.openAddInstructionModal = action.payload;
    },

    setOpenEditInstructionModal: (ui, action) => {
      ui.openEditInstructionModal = action.payload;
    },
  },
});

export const {
  setCollapseNav,
  setOpenIngredientsModal,
  setOpenEditIngredientsModal,
  setOpenAddInsrtuctionModal,
  setOpenEditInstructionModal,
} = slice.actions;

export default slice.reducer;
