import { toast } from "react-toastify";
import request from "../../utils/reques";
import { orderActions } from "../slices/orderSlice";
import { cartActions } from "../slices/cartSlice";

// get Income
export function getIncome() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`api/orders/income`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(orderActions.getIncome(data));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// get All orders
export function getAllOrders() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`api/orders`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(orderActions.getOrders(data));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}

// create Cart
export function createCart(info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(
        `api/cart`,
        { products: info },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      dispatch(orderActions.createCart(data));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// create Order
export function createOrder(info) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.post(`api/orders`, info, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(orderActions.createOrder(data));
      dispatch(cartActions.clearCart());
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
