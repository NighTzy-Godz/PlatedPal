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
            console.log(data);
          } catch (error) {}
        },
      }),
    };
  },
});

export { userApi };
