import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface AuthState {
    auth: boolean;
}

const initialState: AuthState = {
    auth: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<boolean>) => {
            state.auth = action.payload;
        },
    },
});

export const { setAuth,  } = authSlice.actions;
export const selectAuth= (state: RootState) => state.auth;
export default authSlice.reducer;
