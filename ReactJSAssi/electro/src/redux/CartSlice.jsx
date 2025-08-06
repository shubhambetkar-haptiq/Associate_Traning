import { createSlice } from '@reduxjs/toolkit';

// Load initial cart items from localStorage
const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    isOpen: false,
    items: storedItems, // Load from localStorage
  },
  reducers: {
    openCart: (state) => {
      state.isOpen = true;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
   addToCart: (state, action) => {
  const existingItem = state.items.find(item => item.id === action.payload.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.items.push({
      ...action.payload,
      quantity: 1,
      unitPrice: action.payload.price, // Save the original price
    });
  }

  localStorage.setItem('cartItems', JSON.stringify(state.items));
},

 updateQuantity: (state, action) => {
  const { id, type } = action.payload;
  const item = state.items.find(item => item.id === id);
  if (item) {
    if (type === 'increment') {
      item.quantity += 1;
    } else if (type === 'decrement' && item.quantity > 1) {
      item.quantity -= 1;
    }
    localStorage.setItem('cartItems', JSON.stringify(state.items));
  }
},


    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      localStorage.setItem('cartItems', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.setItem('cartItems', JSON.stringify([]));
    },
  },
});

export const { openCart, closeCart, addToCart, removeFromCart, clearCart,updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
