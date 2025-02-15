import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IProfile } from "../../types/profileType";
import { ProfileState } from "../authSlice/profileSlice";


export const backendURL = "https://nft-market-as0q.onrender.com";


const baseQuery = fetchBaseQuery({
  baseUrl: `${backendURL}/auth`,
});


export const apiProfileSlice = createApi({
  reducerPath: "profileApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getProfile: builder.query<ProfileState, void>({
      query: () => {
        const token = localStorage.getItem("token");
        console.log("Запрос профиля отправляется с токеном:", token);
        return {
          url: "/profile",
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
      },
    }),
  }),
});

export const { useGetProfileQuery } = apiProfileSlice;
console.log(useGetProfileQuery)
