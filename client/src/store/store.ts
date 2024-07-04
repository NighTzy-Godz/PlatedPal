import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/reducer";

const store = configureStore({
  reducer: rootReducer,
});

export type State = ReturnType<typeof rootReducer>;

export default store;

// SETUP LISTENERS HERE LATER
