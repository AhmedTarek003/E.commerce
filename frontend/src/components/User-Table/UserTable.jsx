import { Delete } from "@mui/icons-material";
import "./userTable.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../../redux/apiCalls/usersApiCall";

const UserTable = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const selectAdmins = (e, id) => {
    // console.log(e.target.value, id);
    dispatch(updateUser(id, e.target.value));
  };

  const deleteUserHandler = (userId) => {
    dispatch(deleteUser(userId));
  };

  return (
    <div className="users-table">
      <h1 className="users-table-title">Users</h1>
      <div className="users-table-container">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>user</th>
              <th>id</th>
              <th>email</th>
              <th>admin</th>
              <th>actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user?._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="table-user">
                    <div className="user-table-Image">
                      {user?.name.trim().slice(0, 1)}
                    </div>
                    <div className="table-user-username">{user?.name}</div>
                  </div>
                </td>
                <td>{user?._id}</td>
                <td>{user?.email}</td>
                <td>
                  <select
                    className="userAdmin-select"
                    value={user?.isAdmin === true ? true : false}
                    onChange={(e) => selectAdmins(e, user._id, user.isAdmin)}
                  >
                    <option value="" disabled>
                      is user admin
                    </option>
                    <option value={user?.isAdmin === true ? true : false}>
                      {user?.isAdmin === true ? "Admin" : "Not Admin"}
                    </option>
                    <option value={user?.isAdmin === false ? true : false}>
                      {user?.isAdmin === false ? "Admin" : "Not Admin"}
                    </option>
                  </select>
                </td>
                <td>
                  <Delete
                    className="delete-user"
                    onClick={() => deleteUserHandler(user?._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTable;
