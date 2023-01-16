import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const res = await axios.get('http://localhost:8080/products')
        return res
    }
)
export const addProducts = createAsyncThunk(
    'products/addProducts',
    async (data) => {
        const res = await axios.post('http://localhost:8080/products/add',data)
        return data
    }
)
export const deleteProducts = createAsyncThunk(
    'products/deleteProducts',
    async (data) => {
        const res = await axios.delete(`http://localhost:8080/products/${data}`)
        return data
    }
)
export const findProducts = createAsyncThunk(
    'products/findProducts',
    async (data) => {
        const res = await axios.get('http://localhost:8080/products/find-by-name?name_product=' +data.name_product)
        return res
    }
)
export const updateProducts = createAsyncThunk(
    'products/updateProducts',
    async (data) => {
        const res = await axios.put(`http://localhost:8080/products/${data.product_id}`, data
        )
        return res
    }
)

export const searchProducts = createAsyncThunk(
    'products/searchProducts',
    async (data) => {
        const res = await axios.post(`http://localhost:8080/products/filter?price=${data.price}`)
        return res

    }
)