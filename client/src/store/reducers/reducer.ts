import { Action, combineReducers } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";

const appReducer = combineReducers({
  ui: uiReducer,
});

type State = ReturnType<typeof appReducer>;

const rootReducer = (state: State | undefined, action: Action): State => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
