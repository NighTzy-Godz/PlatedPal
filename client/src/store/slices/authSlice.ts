import { createSlice } from "@reduxjs/toolkit";
import { IDecodedUser } from "../../interfaces/userInterface";
import { jwtDecode } from "jwt-decode";

export interface AuthState {
  token: string | null;
  decodedUser: IDecodedUser | null;
}

const initialState: AuthState = {
  token: null,
  decodedUser: null,
};

const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken: (auth, action) => {
      auth.token = action.payload;
    },

    setDecodedUser: (auth, action) => {
      auth.decodedUser = action.payload;
    },
  },
});

export const { setToken, setDecodedUser } = slice.actions;

export default slice.reducer;
