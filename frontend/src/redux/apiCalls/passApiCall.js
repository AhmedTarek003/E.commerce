import { toast } from "react-toastify";
import request from "../../utils/reques";

// REset Password
export function resetPassword(email) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `api/password/reset-password-link`,
        email
      );
      toast.success(data.msg);
    } catch (error) {
      console.log(error);
    }
  };
}
export function getResetPassword(userId, tokenId) {
  return async (dispatch) => {
    try {
      await request.get(
        `api/password/reset-password-link/${userId}/${tokenId}`
      );
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
export function createResetPassword(userId, tokenId, password) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `api/password/reset-password-link/${userId}/${tokenId}`,
        password
      );
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
