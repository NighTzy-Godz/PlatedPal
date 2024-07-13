import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { State } from "../store";
import { pause } from "./userApi";

const recipeApi = createApi({
  reducerPath: "recipe",
  baseQuery: fetchBaseQuery({
    // fetchFn: async (...args) => {
    //   await pause(3000);
    //   return fetch(...args);
    // },
    baseUrl: "http://localhost:8080/api/recipe",
    prepareHeaders: (headers, { getState }) => {
      const token =
        localStorage.getItem("token") || (getState() as State).auth.token;
      if (token) {
        headers.set("x-auth-token", token);
      }
      return headers;
    },
  }),
  endpoints(builder) {
    return {
      addRecipe: builder.mutation({
        query(body) {
          return {
            url: "/addRecipe",
            body,
            method: "POST",
          };
        },
      }),
    };
  },
});

export { recipeApi };