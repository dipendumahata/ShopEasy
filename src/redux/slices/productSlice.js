import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios';

const initialState = {
    products: [],
    status: 'idle'
}

export const getProducts = createAsyncThunk("products/getProducts",
    async ()=>{
        let res = await axios.get('https://dummyjson.com/products');
        // console.log(res.data.products)
        return res.data.products;
    }
);


export const productSlice = createSlice({
    name:'products',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getProducts.pending,(state, action)=>{
            state.status="loading";
        })
        .addCase(getProducts.fulfilled,(state, action)=>{
            state.status="succeeded";
            // Add any fetched products to the array
            state.products = action.payload;
        })
        .addCase(getProducts.rejected,(state, action)=>{
            state.status="failed";
        })
    }
})


export default productSlice.reducer