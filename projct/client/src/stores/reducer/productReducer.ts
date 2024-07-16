import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../../interface/admin";
import { deleteProduct, getAllProduct, searchProduct } from "../../services/product.service";

const productState: Product[] = [];

const productReducer = createSlice({
    name: "product",
    initialState: {
        product: productState,
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(getAllProduct.fulfilled, (state, action) => {
            state.product = action.payload;
        })
        .addCase(deleteProduct.fulfilled, (state, action) => {
            state.product = state.product.filter((item: Product) => item.id !== action.payload)
        })
        .addCase(searchProduct.fulfilled, (state, action) => {
            state.product = action.payload
        })
    }
})

export default productReducer.reducer