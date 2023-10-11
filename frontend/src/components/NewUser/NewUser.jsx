import { useEffect } from "react";
import "./newUser.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/apiCalls/usersApiCall";

const NewUser = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);
  return (
    <div className="new-user">
      <h1 className="new-user-title">New User</h1>
      {users.slice(0, 3)?.map((user) => (
        <div className="last-user" key={user?._id}>
          <div className="last-user-Image">{user?.name.trim().slice(0, 1)}</div>
          <div className="last-user-username">{user?.name}</div>
        </div>
      ))}
    </div>
  );
};

export default NewUser;
