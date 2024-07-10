import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UIState {
  collapseNav: boolean;
  openIngredientsModal: boolean;
  openEditIngredientModal: boolean;
}

const initialState: UIState = {
  collapseNav: false,
  openIngredientsModal: false,
  openEditIngredientModal: false,
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
  },
});

export const {
  setCollapseNav,
  setOpenIngredientsModal,
  setOpenEditIngredientsModal,
} = slice.actions;

export default slice.reducer;
