import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ordersStatusIncom: [],
  orders: [],
  carts: [],
  order: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    getIncome(state, action) {
      state.ordersStatusIncom = action.payload;
    },
    getOrders(state, action) {
      state.orders = action.payload;
    },
    createCart(state, action) {
      state.carts = action.payload;
    },
    createOrder(state, action) {
      state.order = action.payload;
    },
  },
});

const orderActions = orderSlice.actions;
const orderReducer = orderSlice.reducer;

export { orderActions, orderReducer };
