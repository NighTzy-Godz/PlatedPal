import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UIState {
  collapseNav: boolean;
}

const initialState: UIState = {
  collapseNav: false,
};

const slice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setCollapseNav: (ui, action: PayloadAction<boolean>) => {
      ui.collapseNav = action.payload;
    },
  },
});

export const { setCollapseNav } = slice.actions;

export default slice.reducer;
