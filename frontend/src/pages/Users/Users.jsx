import Sidebar from "../../components/Admin-Sidebar/Sidebar";
import UserTable from "../../components/User-Table/UserTable";
import "./users.css";

const Users = () => {
  return (
    <section className="users-page">
      <Sidebar />
      <UserTable />
    </section>
  );
};

export default Users;
