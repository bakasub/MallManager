import {createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const productList = createAsyncThunk(
    'product',
    async (data) => {
        const res = await axios.get('http://localhost:8080/product/all',data)
        return res
    }
)