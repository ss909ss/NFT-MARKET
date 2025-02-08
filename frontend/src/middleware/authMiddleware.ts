import { createListenerMiddleware } from "@reduxjs/toolkit";
import { apiProfileSlice } from "../store/api/profileApi";



export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
    //вход в систему
    matcher: apiProfileSlice.endpoints.getProfile.matchFulfilled,
    effect: async (action, listenerApi) => {
        listenerApi.cancelActiveListeners()
          // проверяется, есть ли токен в данных, которые пришли с действием
          if (action.payload.username && action.payload.email) {
            localStorage.setItem("username", action.payload.username);
            localStorage.setItem("email", action.payload.email)
        }
    }
})