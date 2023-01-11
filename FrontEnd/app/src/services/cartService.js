import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const  addProductToCart = createAsyncThunk(
    'carts/addCarts',
    async (data) => {
        // console.log(data,'llllllllll')
        const res = await axios.post('http://localhost:8080/cart/add',data)
        return data
    }
)
export const getCart = createAsyncThunk(
    'carts/getCarts',
    async (data) => {
        const res = await axios.get(`http://localhost:8080/cart/get-cart/${data}`)
        return res
    }
)
export const decreaseCart = createAsyncThunk(
    'carts/getDecreaseCart',
    async (data) => {
        const res = await axios.post(`http://localhost:8080/cart/decrease-quantity`,data)
        return data
    }
)
export const increaseCart = createAsyncThunk(
    'carts/getIncreaseCart',
    async (data) => {
        const res = await axios.post(`http://localhost:8080/cart/increase-quantity`,data)
        console.log(res.data,'rerererer')
        return res.data
    }
)
export const removeFromCart = createAsyncThunk(
    'carts/removeCart',
    async (data)=>{
        const res = await axios.delete(`http://localhost:8080/cart/remove-one?product_id=${data.product_id}&user_id=${data.user_id}`)
        return data
    }
)
export const clearCart = createAsyncThunk(
    'carts/clearCart',
    async (data)=>{
        const res = await axios.delete(`http://localhost:8080/cart/remove-all?user_id=${data.user_id}`)
        return data
    }
)
