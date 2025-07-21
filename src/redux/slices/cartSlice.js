// cartSlice.js
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  cartItems: [],
  status: 'idle',
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(item => item.id === action.payload.id)
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].qty += 1
      } else {
        state.cartItems.push({ ...action.payload, qty: 1 })
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
    },
    increaseQty: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload)
      if (item) item.qty += 1
    },
    decreaseQty: (state, action) => {
      const item = state.cartItems.find(item => item.id === action.payload)
      if (item && item.qty > 1) {
        item.qty -= 1
      } else {
        state.cartItems = state.cartItems.filter(item => item.id !== action.payload)
      }
    }
  }
})

export const { addToCart, removeFromCart, increaseQty, decreaseQty } = cartSlice.actions
export default cartSlice.reducer
