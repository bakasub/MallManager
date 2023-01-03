import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {addProducts, deleteProducts, findProducts, getProducts, updateProducts} from "../../services/productService";

const initialState = {
    products: []
}
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getProducts.fulfilled, (state, action) => {
            // console.log(action, 'accccc')
            state.products = action.payload.data
        });
        builder.addCase(addProducts.fulfilled, (state, action) => {
            // console.log(action.payload, 'productSlice')
            state.products.push(action.payload)
        });
        builder.addCase(deleteProducts.fulfilled, (state, action) => {
            state.products = state.products.filter(item => item.product_id != action.payload)
        });
        builder.addCase(findProducts.fulfilled, (state, action) => {
            state.products = [...action.payload.data]
        });
        builder.addCase(updateProducts.fulfilled, (state, action) => {
        })
    }
})
export default productSlice.reducer;