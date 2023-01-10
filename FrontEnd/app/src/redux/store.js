import {configureStore} from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import productReducer from "./product/productSlice";
import cartReducer, {getTotals} from "./cart/cartSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        product:productReducer,
        cart:cartReducer
    }
})