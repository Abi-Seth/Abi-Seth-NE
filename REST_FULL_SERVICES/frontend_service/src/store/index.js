import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./modules/userSlice";

export const store = configureStore({
    reducer: {
        user: UserReducer
    },
})
