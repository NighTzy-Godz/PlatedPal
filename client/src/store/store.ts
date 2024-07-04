import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import rootReducer from "./reducers/reducer";
import { userApi } from "./apis/userApi";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

export type State = ReturnType<typeof rootReducer>;

export default store;

// SETUP LISTENERS HERE LATER
setupListeners(store.dispatch);
