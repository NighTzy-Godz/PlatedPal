import { Action, combineReducers } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";
import { userApi } from "../apis/userApi";

const appReducer = combineReducers({
  ui: uiReducer,
  [userApi.reducerPath]: userApi.reducer
});

type State = ReturnType<typeof appReducer>;

const rootReducer = (state: State | undefined, action: Action): State => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
