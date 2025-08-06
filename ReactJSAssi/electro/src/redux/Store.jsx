import { configureStore } from "@reduxjs/toolkit";
import SearchReducer from './SearchSlice';
import authReducer from './authSlice';
import cartReducer from "./CartSlice"
export const store = configureStore({
    reducer:{
        search:SearchReducer,
        auth: authReducer,
         cart: cartReducer,
    }
})