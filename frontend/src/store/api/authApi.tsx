import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { IFormRegister } from "../../types/Form";

export const backendURL = "https://nft-market-as0q.onrender.com";


const baseQuery = fetchBaseQuery({
    baseUrl: `${backendURL}/auth`,
    prepareHeaders: (headers) => {
        const token = localStorage.getItem("token");

        console.log("authorization")
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }

        return headers;



    }
});

const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 });

console.log(backendURL)

export const apiAuthSlice = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseWithRetry, // Исправлено: используем базовый запрос с ретраем
    endpoints: (builder) => ({
        postFormRegister: builder.mutation<IFormRegister, IFormRegister>({
            query: (FormData) => ({
                url: "/register",
                method: "POST",
                body: FormData,
            })
        }),
        // postFormLogin: builder.mutation<IFormLogin, IFormLogin>({
        //     query: (FormData) => ({
        //         url: "/login",
        //         method: "POST",
        //         body: FormData,
        //     })
        // }),
        logoutForm: builder.mutation<{ message: string }, void>({
            query: () => ({
                url: "/logout",
                method: "POST",
            })
        })
    })
});

export const {
    // usePostFormLoginMutation,
    usePostFormRegisterMutation,
    useLogoutFormMutation
} = apiAuthSlice;
