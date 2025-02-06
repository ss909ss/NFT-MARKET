import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { IFormRegister, IFormLogin } from "../../types/Form";

export const backendURL = "https://nft-market-as0q.onrender.com";  // Твоя базова адреса

const baseQuery = fetchBaseQuery({
    baseUrl: `${backendURL}/auth`,  // Виправлено
});

const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 });

export const apiAuthSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseWithRetry,
    endpoints: (builder) => ({
        postFormRegister: builder.mutation<IFormRegister, IFormRegister>({
            query: (formData) => ({
                url: `/register`,  // Виправлено
                method: "POST",
                body: formData,
            }),
        }),
        postFormLogin: builder.mutation<IFormLogin, IFormLogin>({
            query: (formData) => ({
                url: `/login`,  // Виправлено
                method: "POST",
                body: formData,
            }),
        }),
    }),
});

export const {
    usePostFormLoginMutation,
    usePostFormRegisterMutation,
} = apiAuthSlice;
