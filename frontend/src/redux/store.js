import { configureStore } from "@reduxjs/toolkit";
import { productsReducer } from "./slices/productsSlice";
import { authReducer } from "./slices/authSlice";
import { usersReducer } from "./slices/usersSlice";
import { cartReducer } from "./slices/cartSlice";
import { orderReducer } from "./slices/orderSlice";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    auth: authReducer,
    users: usersReducer,
    cart: cartReducer,
    order: orderReducer,
  },
});
