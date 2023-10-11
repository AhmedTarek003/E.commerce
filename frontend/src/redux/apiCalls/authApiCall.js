import { toast } from "react-toastify";
import request from "../../utils/reques";
import { authActions } from "../slices/authSlice";

// Login
export function loginUser(userInfo) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`api/auth/login`, userInfo);
      localStorage.setItem("userInfo", JSON.stringify(data));
      dispatch(authActions.setUser(data));
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
// register
export function registerUser(userInfo) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`api/auth/register`, userInfo);
      dispatch(authActions.setRegisterMsg(data.msg));
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
export function logoutUser() {
  return async (dispatch) => {
    try {
      localStorage.removeItem("userInfo");
      dispatch(authActions.logoutUser());
    } catch (error) {
      console.log(error);
    }
  };
}
