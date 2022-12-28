import {createSlice, current} from "@reduxjs/toolkit";
import {productList} from "../../services/productService";


const initialState = {
    currentList: []
}

const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: builder => {
        builder.addCase()
    }
})
export default productSlice.reducer