import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/user",
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
    };
  },
});

const { useRegisterUserMutation } = userApi;

export { userApi };
