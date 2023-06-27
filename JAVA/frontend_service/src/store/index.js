import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "./modules/userSlice";
import CartReducer from './modules/cartSlice'

export const store = configureStore({
    reducer: {
        user: UserReducer,
        cart: CartReducer,
    },
})
