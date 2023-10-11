import "./sidebar.css";
import { MdDashboard, MdNotificationsActive } from "react-icons/md";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="admin-sidebar">
      <div className="admin-dashbord-lists">
        <div className="admin-dashbord-list">
          <div className="admin-dashboard-list-name">
            <MdDashboard /> Dashboard
          </div>
          <ul className="menu-lists">
            <Link to={"/admin-dashboard"}>
              <li className="menu-list">Analytics</li>
            </Link>
            <Link to={"/productsList"}>
              <li className="menu-list">Products</li>
            </Link>
            <Link to={"/admin-users"}>
              <li className="menu-list">Users</li>
            </Link>
          </ul>
        </div>
        <div className="admin-dashbord-list">
          <div className="admin-dashboard-list-name">
            <AiOutlineMenuUnfold /> Quick Menu
          </div>
          <ul className="menu-lists">
            <Link to={"/admin-addProducts"}>
              <li className="menu-list">Add Product</li>
            </Link>
            <li className="menu-list">Transactions</li>
            <li className="menu-list">Reports</li>
          </ul>
        </div>
        <div className="admin-dashbord-list">
          <div className="admin-dashboard-list-name">
            <MdNotificationsActive /> Notifications
          </div>
          <ul className="menu-lists">
            <li className="menu-list">Mails</li>
            <li className="menu-list">Feedback</li>
            <li className="menu-list">Messages</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
