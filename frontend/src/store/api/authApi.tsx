import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { IFormRegister, IFormLogin } from "../../types/Form";
export const backendURL = "http://localhost:5555"

const baseQuery = fetchBaseQuery({
    baseUrl: `${backendURL}/auth`
})
const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 })

export const apiAuthSlice = createApi({
    reducerPath: "authApi",
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        postFormRegister: builder.mutation<IFormRegister, IFormRegister>({
            query: (formData)=>({
                url:"/register",
                method: "POST",
                body: formData,
            })
        }),
        postFormLogin: builder.mutation<IFormLogin, IFormLogin>({
            query: (formData)=>({
                url:"/login",
                method: "POST",
                body: formData,
            })
        }),
    })
})


export const {
    usePostFormLoginMutation,
    usePostFormRegisterMutation
} =apiAuthSlice