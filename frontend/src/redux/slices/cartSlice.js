import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  cart: localStorage.getItem("C,P")
    ? JSON.parse(localStorage.getItem("C,P"))
    : [],
  cartProducts: [],
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const findProduct = state.cartProducts.find(
        (c) => c._id === action.payload._id
      );
      if (!findProduct) {
        state.cartProducts.push(action.payload);
        const total = (state.totalPrice +=
          action.payload.price * action.payload.quantity);
        state.cart = { cartProducts: state.cartProducts, totalPrice: total };
        localStorage.setItem("C,P", JSON.stringify(state.cart));
      } else {
        toast.info(
          "You already added this product, if you want update delete him from your cart"
        );
      }
    },
    clearCart(state) {
      localStorage.removeItem("C,P");
      state.cartProducts = [];
      state.totalPrice = 0;
      state.cart = {
        cartProducts: state.cartProducts,
        totalPrice: state.totalPrice,
      };
    },
    removeItemFromCart(state, action) {
      state.cartProducts = state.cartProducts.filter(
        (i) => i._id !== action.payload._id
      );
      state.totalPrice -= action.payload.price * action.payload.quantity;
      state.cart = {
        cartProducts: state.cartProducts,
        totalPrice: state.totalPrice,
      };
      localStorage.setItem("C,P", JSON.stringify(state.cart));
    },
  },
});

const cartActions = cartSlice.actions;
const cartReducer = cartSlice.reducer;

export { cartActions, cartReducer };
