import { toast } from "react-toastify";
import request from "../../utils/reques";
import { productsActions } from "../slices/productsSlice";

// Get All Products
export function getAllProducts() {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/products`);
      dispatch(productsActions.getProducts(data));
    } catch (error) {
      // console.log(error.response.data.msg);
    }
  };
}
// Get Products By Category
export function getProductsByCategory(category) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/products?category=${category}`);
      dispatch(productsActions.getProducts(data));
    } catch (error) {
      // console.log(error.response.data.msg);
    }
  };
}
// Get Product By Id
export function getProductById(productId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/products/${productId}`);
      dispatch(productsActions.getProduct(data));
    } catch (error) {
      // console.log(error.response.data.msg);
    }
  };
}
// Get Product By search
export function getProductBySearch(search) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(`api/products?search=${search}`);
      dispatch(productsActions.searchProducts(data));
    } catch (error) {
      // console.log(error.response.data.msg);
    }
  };
}
// create Product
export function createProduct(info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`api/products`, info, {
        headers: {
          Authorization: `Bearer ` + getState().auth.user.token,
        },
      });
      dispatch(productsActions.createProduct(data));
      toast.success("Created");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// Update Product
export function updatetProduct(productId, info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(`api/products/${productId}`, info, {
        headers: {
          Authorization: `Bearer ` + getState().auth.user.token,
        },
      });
      dispatch(productsActions.updateProduct(data));
      toast.success("Updated");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// Update Product
export function updatetProductImage(productId, info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `api/products/product-image/${productId}`,
        info,
        {
          headers: {
            Authorization: `Bearer ` + getState().auth.user.token,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      dispatch(productsActions.updateProduct(data));
      toast.success("Updated Images");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// Delete Product
export function DeleteProduct(productId) {
  return async (dispatch, getState) => {
    try {
      dispatch(productsActions.setLoading());
      const { data } = await request.delete(`api/products/${productId}`, {
        headers: {
          Authorization: `Bearer ` + getState().auth.user.token,
        },
      });
      dispatch(productsActions.deleteMsg(data.msg));
      toast.success(data.msg);
      dispatch(productsActions.clearLoading());
      setTimeout(() => {
        dispatch(productsActions.clearDeleteMsg());
      }, 1000);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
