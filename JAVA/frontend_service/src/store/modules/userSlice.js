import { createSlice } from "@reduxjs/toolkit";
import { removeStorage } from "../../utils/localStorage";

const initialState = {
    user: {},
    isLoggedIn: false
}

export const UserSlice = createSlice({
    name: 'User',
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            removeStorage('auth_token');
            state.user = {};
            state.isLoggedIn = false;
        }
    }
})

export const { loginUser, logoutUser } = UserSlice.actions;

export default UserSlice.reducer;