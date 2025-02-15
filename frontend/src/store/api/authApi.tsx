// import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
// import { IFormLogin, IFormRegister } from "../../types/Form";

// export const backendURL = "https://nft-market-as0q.onrender.com";

// const baseQuery = fetchBaseQuery({
//     baseUrl: `${backendURL}/auth`,
//     prepareHeaders: (headers) => {
//         const token = localStorage.getItem("token");
//         console.log("authorization")
//         if (token) {
//             headers.set("authorization", `Bearer ${token}`);
//         }
//         return headers;
//     }
// });

// const fetchBaseWithRetry = retry(baseQuery, { maxRetries: 1 });


// export const apiAuthSlice = createApi({
//     reducerPath: "authApi",
//     baseQuery: fetchBaseWithRetry,
//     endpoints: (builder) => ({
//         postFormRegister: builder.mutation<IFormRegister, IFormRegister>({
//             query: (FormData) => ({
//                 url: "/register",
//                 method: "POST",
//                 body: FormData,
//             })
//         }),
//         postFormLogin: builder.mutation<IFormLogin, IFormLogin>({
//             query: (FormData) => ({
//                 url: "/login",
//                 method: "POST",
//                 body: FormData,
//             })
//         }),
//         logoutForm: builder.mutation<{ message: string }, void>({
//             query: () => ({
//                 url: "/logout",
//                 method: "POST",
//             })
//         })
//     })
// });

// export const {
//     usePostFormLoginMutation,
//     usePostFormRegisterMutation,
//     useLogoutFormMutation
// } = apiAuthSlice;

// api/authApi.ts
import axiosInstance from './axiosInstance';
import { IFormRegister, IFormLogin, ILogoutResponse } from '../../types/Form';

// Регистрация пользователя
export const postRegister = async (formData: IFormRegister): Promise<IFormRegister> => {
    const response = await axiosInstance.post<IFormRegister>('/register', formData);
    return response.data;
};

// Вход пользователя
export const postLogin = async (formData: IFormLogin): Promise<{ token: string; username: string; email: string }> => {
    const response = await axiosInstance.post('/login', formData);
    return response.data;
};

// Выход из аккаунта
export const postLogout = async (): Promise<ILogoutResponse> => {
    const response = await axiosInstance.post<ILogoutResponse>('/logout');
    return response.data;
};