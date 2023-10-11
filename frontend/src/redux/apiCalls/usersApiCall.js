import request from "../../utils/reques";
import { usersActions } from "../slices/usersSlice";
import { toast } from "react-toastify";

// Get all users
export function getAllUsers() {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.get(`api/users`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(usersActions.setUsers(data));
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
}

// Update user
export function updateUser(userId, bollen) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.put(
        `api/users/${userId}`,
        { isAdmin: bollen },
        {
          headers: {
            Authorization: "Bearer " + getState().auth.user.token,
          },
        }
      );
      // console.log(data);
      dispatch(usersActions.setUsers(data));
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };
}

// Delete user
export function deleteUser(userId) {
  return async (dispatch, getState) => {
    try {
      const { data } = await request.delete(`api/users/${userId}`, {
        headers: {
          Authorization: "Bearer " + getState().auth.user.token,
        },
      });
      dispatch(usersActions.deleteUsers(data?.user?._id));
      toast.success(data.msg);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
}
