import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

// interface AuthState {
//     auth: boolean;
//     username: string;
//     email: string;
//     password?: string;
//     token:string;
// }

// const initialState: AuthState = {
//     auth: JSON.parse(localStorage.getItem("auth") || "false"),
//     username: localStorage.getItem("username") || "",
//     email: localStorage.getItem("email") || "",
//    token: JSON.parse(localStorage.getItem("token") || "null")
// };

// const authSlice = createSlice({
//     name: 'auth',
//     initialState,
//     reducers: {
//         setAuth: (state, action: PayloadAction<boolean>) => {
//             state.auth = action.payload;
//             localStorage.setItem("token", action.payload);
//         },
//         setToken: (state, action: PayloadAction<string>) => {
//             state.token = action.payload;
//             localStorage.setItem("token", JSON.stringify(action.payload));
//         },
        
//         setUser: (state, action: PayloadAction<{ username: string; email: string }>) => {
//             state.username = action.payload.username;
//             state.email = action.payload.email;
//             localStorage.setItem("username", action.payload.username);
//             localStorage.setItem("email", action.payload.email);
//         },
//         logout: (state) => {
//             state.auth = false;
//             state.username = "";
//             state.email = "";
//             localStorage.removeItem("auth");
//             localStorage.removeItem("username");
//             localStorage.removeItem("email");
//             localStorage.removeItem("token");
        
//         }
//     },
// });

// export const { setAuth,  setUser, logout, setToken} = authSlice.actions;
// export const selectAuth = (state: RootState) => state.auth.auth;
// export const selectUser = (state: RootState) => ({ username: state.auth.username, email: state.auth.email });
// export default authSlice.reducer;


interface AuthState {
    auth: boolean;
    username: string;
    email: string;
    password: string;
    token: string;
}

const initialState: AuthState = {
    auth: JSON.parse(localStorage.getItem("auth") || "false"),
    username: localStorage.getItem("username") || "",
    email: localStorage.getItem("email") || "",
    token: JSON.parse(localStorage.getItem("token") || "null"),
    password:""
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
            // Сохраняем флаг авторизации в localStorage
            localStorage.setItem("auth", JSON.stringify(action.payload));
        },
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            localStorage.setItem("token", JSON.stringify(action.payload));
        },
        setUser: (state, action: PayloadAction<{ username: string; email: string, password:string }>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("email", action.payload.email);
        },
        setLoginUser: (state, action: PayloadAction<{ password: string; email: string }>) => {
            state.password = action.payload.password;
            state.email = action.payload.email;
            localStorage.setItem("email", action.payload.email);
        },
        logout: (state) => {
            state.auth = false;
            state.username = "";
            state.email = "";
            localStorage.removeItem("auth");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
            localStorage.removeItem("token");
        }
    },
});

export const { setAuth, setToken, setUser, logout, setLoginUser } = authSlice.actions;
export const selectAuth = (state: RootState) => state.auth.auth;
export const selectUser = (state: RootState) => ({ username: state.auth.username, email: state.auth.email });
export default authSlice.reducer;
