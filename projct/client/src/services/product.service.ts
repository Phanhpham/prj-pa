import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API lấy dữ liệu sản phẩm
export const getAllProduct: any = createAsyncThunk(
    "product/getAllProduct",
    async () => {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/product`);
        return response.data
    }
)

// API xóa sản phẩm
export const deleteProduct: any = createAsyncThunk(
    "product/deleteProduct",
    async (id: number) => {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.delete(`${url}/product/${id}`);
        return response.data
    }
)

// API tìm kiếm sản phẩm
export const searchProduct: any = createAsyncThunk(
    "product/searchProduct",
    async (searchItem: string) => {
        const url = import.meta.env.VITE_BASE_URL;
        const response = await axios.get(`${url}/product?nameProduct_like=${searchItem}`);
        return response.data
    }
)