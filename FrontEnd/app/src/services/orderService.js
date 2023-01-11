import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const  addCartToOrder = createAsyncThunk(
    'order/addCartToOrder',
    async (data) => {
        const res = await axios.post('http://localhost:8080/order/create-order',data)
        return data
    }
)
export const getOrder = createAsyncThunk(
    'order/getOrder',
    async () => {
        const res = await axios.get(`http://localhost:8080/order/all`)
        return res
    }
)
export const getOrderDetail = createAsyncThunk(
    'order/getOrderDetail',
    async (data) => {
        const res = await axios.get(`http://localhost:8080/order/an-order/${data}`)
        return res
    }
)
export const cancelOrder = createAsyncThunk(
    'order/cancelOrder',
    async (data) => {
        const res = await axios.put(`http://localhost:8080/order/cancel-order/${data}`)
        return res
    }
)
// export const removeFromCart = createAsyncThunk(
//     'carts/removeCart',
//     async (data)=>{
//         const res = await axios.delete(`http://localhost:8080/cart/remove-one?product_id=${data.product_id}&user_id=${data.user_id}`)
//         return data
//     }
// )
// export const clearCart = createAsyncThunk(
//     'carts/clearCart',
//     async (data)=>{
//         const res = await axios.delete(`http://localhost:8080/cart/remove-all?user_id=${data.user_id}`)
//         return data
//     }
// )
