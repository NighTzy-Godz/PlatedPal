import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { State } from "../store/store";
import { jwtDecode } from "jwt-decode";
import { setDecodedUser } from "../store/slices/authSlice";
import { IDecodedUser } from "../interfaces/userInterface";

interface AuthContextType {
  token: string | null;
  decodedUser: IDecodedUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const decodedUser = useSelector((state: State) => state.auth.decodedUser);
  const tokenFromStore = useSelector((state: State) => state.auth.token);
  const tokenFromLocalStorage = localStorage.getItem("token");
  const token = tokenFromLocalStorage || tokenFromStore;

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode<IDecodedUser>(token);
        dispatch(setDecodedUser(decodedUser));
      } catch (error) {
        console.error("Failed to decode token", error);
      }
    }
  }, [dispatch, token]);

  return (
    <AuthContext.Provider value={{ token, decodedUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
