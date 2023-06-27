import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    items: []
}

export const CartSlice = createSlice({
    name: 'Cart',
    initialState,
    reducers: {
        addRemoveItemInCart: (state, action) => {
            state.items = action.payload;
        },
    }
})

export const { addRemoveItemInCart } = CartSlice.actions;

export default CartSlice.reducer;