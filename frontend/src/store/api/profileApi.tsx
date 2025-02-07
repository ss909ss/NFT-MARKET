import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

export const backendURL = "https://nft-market-as0q.onrender.com";


const baseQuery = fetchBaseQuery({
    baseUrl: `${backendURL}/auth`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");
        console.log('Token при отправке:', token);
        console.log("Отправил токен для аутентификации", token);
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
});


const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 });

export const apiProfileSlice = createApi({
    reducerPath: "profileApi",
    baseQuery: fetchBaseWithRetry, // Исправлено: используем базовый запрос с ретраем
    endpoints: (builder) => ({
        getProfile: builder.query<{ username: string; email: string }, void>({
            query: () => {
              // Если вы уже устанавливаете заголовок в prepareHeaders, можно не добавлять его здесь:
              return {
                url: "/profile",
                method: "GET",
              };
            }
          })
    })
});

export const { useGetProfileQuery } = apiProfileSlice;

