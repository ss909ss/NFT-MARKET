import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import{apiAuthSlice} from './api/authApi';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiAuthSlice.reducerPath]: apiAuthSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiAuthSlice.middleware),
    })


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;