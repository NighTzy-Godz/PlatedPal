import { Action, combineReducers } from "@reduxjs/toolkit";
import uiReducer from "../slices/uiSlice";
import { userApi } from "../apis/userApi";
import authReducer from "../slices/authSlice";
import recipeReducer from "../slices/recipeSlice";
import { recipeApi } from "../apis/recipeApi";
import { communityApi } from "../apis/communityApi";

const appReducer = combineReducers({
  ui: uiReducer,
  auth: authReducer,
  recipeSlice: recipeReducer,
  [userApi.reducerPath]: userApi.reducer,
  [recipeApi.reducerPath]: recipeApi.reducer,
  [communityApi.reducerPath]: communityApi.reducer,
});

type State = ReturnType<typeof appReducer>;

const rootReducer = (state: State | undefined, action: Action): State => {
  if (action.type === "LOGOUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
