import {createSlice} from "@reduxjs/toolkit";
import {toast} from "react-toastify";
import {addCartToOrder, cancelOrder, getOrder} from "../../services/orderService";
import {removeFromCart} from "../../services/cartService";
import {deleteProducts} from "../../services/productService";

const initialState = {
    order: [localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")
    ) : []]
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            console.log(action.payload.data,'orderslice')
            state.order = action.payload.data
            localStorage.setItem("orders", JSON.stringify(state.order))
        });
        builder.addCase(addCartToOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload)
        });
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter(item => item.order_id != action.payload)
        });
    }
})
export default orderSlice.reducer;