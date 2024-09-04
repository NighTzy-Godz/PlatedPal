import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { State } from "../store";

const communityApi = createApi({
  reducerPath: "community",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8080/api/community",
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
      createCommunity: builder.mutation({
        query: (body) => {
          return {
            body,
            url: "/createCommunity",
            method: "POST",
          };
        },
      }),
    };
  },
});

export { communityApi };
