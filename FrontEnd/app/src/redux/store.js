import {configureStore} from "@reduxjs/toolkit";
import productReducer from ""

export const store = configureStore({
    reducer: {
        product: productReducer
    }
})