import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const getProducts = createAsyncThunk(
    'products/getProducts',
    async () => {
        const res = await axios.get('http://localhost:8080/product/all')
        return res
    }
)
export const addProducts = createAsyncThunk(
    'products/addProducts',
    async (data) => {
        const res = await axios.post('http://localhost:8080/product/create',data)
        console.log(data,'data1')
        return data
    }
)
export const deleteProducts = createAsyncThunk(
    'products/deleteProducts',
    async (data) => {
        const res = await axios.delete(`http://localhost:8080/product/${data}`)
        console.log(data,'dataaaaaaaa')
        return data
    }
)
export const findProducts = createAsyncThunk(
    'products/findProducts',
    async (data) => {
        const res = await axios.get('http://localhost:8080/products/find-by-name?name_product=' +data.name_product)
        console.log('data', data)
        return res
    }
)