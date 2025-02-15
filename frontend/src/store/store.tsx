import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice/authSlice';
import profileReducer from './authSlice/profileSlice';
import peopleReducer from './peopleCategorySlice/peopleCategorySlice';
import { apiProfileSlice } from './api/profileApi';
// import { apiNftSlice } from './api/AddNfts';

const store = configureStore({
    reducer: {
        [apiProfileSlice.reducerPath]: apiProfileSlice.reducer,
        profile: profileReducer,
        people: peopleReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiProfileSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
