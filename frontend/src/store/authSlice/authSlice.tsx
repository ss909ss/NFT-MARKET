import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { postRegister, postLogin, postLogout } from '../api/authApi';
import { IFormLogin, IFormRegister } from '../../types/Form';

interface AuthState {
    auth: boolean;
    username: string | null;
    email: string | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    auth: JSON.parse(localStorage.getItem('auth') || 'false'),
    username: localStorage.getItem('username') || null,
    email: localStorage.getItem('email') || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
};

export const registerUser = createAsyncThunk(
    'auth/register',
    async (formData: IFormRegister, thunkAPI) => {
        try {
            const data = await postRegister(formData);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Не вдалося зареєструватися");
        }
    }
);

export const loginUser = createAsyncThunk(
    'auth/login',
    async (formData: IFormLogin, thunkAPI) => {
        try {
            const data = await postLogin(formData);
            localStorage.setItem('token', data.token);
            localStorage.setItem('auth', 'true');
            localStorage.setItem('username', data.username);
            localStorage.setItem('email', data.email);
            return data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Не вдалося залогінитися");
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, thunkAPI) => {
        try {
            await postLogout();
            localStorage.clear();
            return;
        } catch (error: any) {
            return thunkAPI.rejectWithValue(error.response?.data || "Не вдалося вийти");
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
            localStorage.setItem('auth', JSON.stringify(action.payload));
        },
        setUser: (state, action: PayloadAction<{ username: string; email: string }>) => {
            state.username = action.payload.username;
            state.email = action.payload.email;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.fulfilled, (state, action) => {
                state.auth = true;
                state.username = action.payload.username;
                state.email = action.payload.email;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.auth = true;
                state.username = action.payload.username;
                state.email = action.payload.email;
                state.token = action.payload.token;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.auth = false;
                state.username = null;
                state.email = null;
                state.token = null;
            });
    },
});

export const { setAuth, setUser, clearError } = authSlice.actions;
export const logout = logoutUser;
export default authSlice.reducer;