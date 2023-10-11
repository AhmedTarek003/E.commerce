import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  product: null,
  searchProduct: [],
  loading: false,
  delMsg: null,
};

const productsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProducts(state, action) {
      state.products = action.payload;
    },
    getProduct(state, action) {
      state.product = action.payload;
    },
    searchProducts(state, action) {
      state.searchProduct = action.payload;
    },
    createProduct(state, action) {
      state.products.push(action.payload);
    },
    updateProduct(state, action) {
      state.product = action.payload;
    },
    setLoading(state) {
      state.loading = true;
    },
    clearLoading(state) {
      state.loading = false;
    },
    deleteMsg(state, action) {
      state.delMsg = action.payload;
    },
    clearDeleteMsg(state) {
      state.delMsg = null;
    },
  },
});

const productsActions = productsSlice.actions;
const productsReducer = productsSlice.reducer;

export { productsActions, productsReducer };
