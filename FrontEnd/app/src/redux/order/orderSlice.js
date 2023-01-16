import {createSlice} from "@reduxjs/toolkit";
import {addCartToOrder, cancelOrder, confirmOrder, getOrder, getOrderDetail} from "../../services/orderService";


const initialState = {
    orders: localStorage.getItem("orders") ? JSON.parse(localStorage.getItem("orders")
    ) : [],
}

const orderSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.orders = action.payload.data
            localStorage.setItem("orders", JSON.stringify(state.orders))
        });
        builder.addCase(getOrderDetail.fulfilled, (state, action) => {
            state.orders = action.payload.data
            // localStorage.setItem("orderDetail", JSON.stringify(state.order))
        });
        builder.addCase(addCartToOrder.fulfilled, (state, action) => {
            state.orders.push(action.payload)
        });
        builder.addCase(cancelOrder.fulfilled, (state, action) => {
            state.orders = state.orders.filter(item => item.order_id != action.payload)
        });
        builder.addCase(confirmOrder.fulfilled, (state, action) => {

        });
    }
})
export default orderSlice.reducer;