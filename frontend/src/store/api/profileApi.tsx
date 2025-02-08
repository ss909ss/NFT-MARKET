import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfile } from "../../types/profileType";


export const backendURL = "https://nft-market-as0q.onrender.com";


const baseQuery = fetchBaseQuery({
  baseUrl: `${backendURL}/auth`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    console.log(token)
    console.log("Токен в localStorage:", localStorage.getItem("token"));


    if (token) {
      headers.set("authorization", `Bearer ${token}`);
      console.log(headers.get("authorization")); // Теперь вы должны увидеть "Bearer <токен>"
    } else {
      console.log("Токен не найден");
    }

    console.log(headers.get("authorization",));

    return headers;
  }
});




// const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 });

export const apiProfileSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<IProfile, void>({
      query: () => ({
        url: "/profile",
        method: "GET"
      })
    })
  })
});

export const { useGetProfileQuery } = apiProfileSlice;

