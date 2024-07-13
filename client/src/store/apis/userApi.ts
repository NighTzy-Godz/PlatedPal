import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setToken } from "../slices/authSlice";
import { useAuth } from "../../hooks/AuthContext";

//
export const pause = (duration: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/user",
    // fetchFn: async (...args) => {
    //   await pause(1000);
    //   return fetch(...args);
    // },
  }),
  endpoints(builder) {
    return {
      registerUser: builder.mutation({
        query: (body) => {
          return {
            url: "/registerUser",
            body,
            method: "POST",
          };
        },
      }),

      loginUser: builder.mutation({
        query: (body) => {
          return {
            url: "/loginUser",
            body,
            method: "POST",
          };
        },
        async onQueryStarted(args, { dispatch, queryFulfilled }) {
          try {
            const { data } = await queryFulfilled;
            localStorage.setItem("token", data);
            dispatch(setToken(data));
          } catch (error) {}
        },
      }),
    };
  },
});

export { userApi };
