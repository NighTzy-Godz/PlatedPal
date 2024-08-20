import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { State } from "../store";
import { pause } from "./userApi";
import EditRecipe from "../../pages/recipe/EditRecipe";

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
  tagTypes: ["Single Recipe"],
  endpoints(builder) {
    return {
      getAllRecipes: builder.query({
        providesTags: ["Single Recipe"],
        query: () => {
          return {
            url: "/getAllRecipes",
          };
        },
      }),

      getRecipeDetails: builder.query({
        providesTags: ["Single Recipe"],
        query: (recipeId) => {
          return {
            url: `/recipeDetails/${recipeId}`,
          };
        },
      }),

      addRecipe: builder.mutation({
        invalidatesTags: ["Single Recipe"],
        query: (body) => {
          return {
            url: "/addRecipe",
            body,
            method: "POST",
          };
        },
      }),

      deleteRecipe: builder.mutation({
        invalidatesTags: ["Single Recipe"],
        query: (recipeId) => {
          return {
            url: `/deleteRecipe/${recipeId}`,
            method: "DELETE",
          };
        },
      }),

      editRecipe: builder.mutation({
        invalidatesTags: ["Single Recipe"],
        query: ({ body, recipeId }) => {
          return {
            method: "PUT",
            url: `/editRecipe/${recipeId}`,
            body,
          };
        },
      }),
    };
  },
});

export { recipeApi };
