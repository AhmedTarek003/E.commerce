import { Link } from "react-router-dom";
import "./header.css";
import { LocalGroceryStoreOutlined, Logout, Search } from "@mui/icons-material";
import { Badge } from "@mui/material";
import SearchMenu from "../SearchMenue/SearchMenu";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Header = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [dropdown, setDropdown] = useState(false);
  const { user } = useSelector((state) => state.auth);

  const { cart } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="header">
      <div className="header-left">
        <Link to={"/"}>
          <div className="logo">ZE</div>
        </Link>
        <div className="search">
          <form onSubmit={(e) => e.preventDefault()} className="search-form">
            <input
              type="text"
              autoComplete="off"
              placeholder="search..."
              className="search-bar"
              id="searchHere"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="search-icon">
              <Search className="s-icon" />
            </div>
            {search.trim() !== "" && (
              <SearchMenu search={search} setSearch={setSearch} />
            )}
          </form>
        </div>
      </div>
      <div className="header-right">
        <div className="auth-buttons">
          {user ? (
            <div className="user-info" onClick={() => setDropdown(!dropdown)}>
              <span
                className="user-username"
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {user?.name}
              </span>
              <div
                className="userImage"
                style={{ cursor: "pointer", userSelect: "none" }}
              >
                {user?.name.trim().slice(0, 1)}
              </div>
              {dropdown && (
                <div className="drob-down-header">
                  {user?.isAdmin && (
                    <Link to="admin-dashboard" className="admin-link">
                      Admin Dashboard
                    </Link>
                  )}
                  <div className="logout" onClick={logoutHandler}>
                    <Logout className="logout-icon" />
                    Logout
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to={"/login"} className="auth-btn">
              Login
            </Link>
          )}
        </div>
        <div className="cart">
          <Link to={"/cart"}>
            <Badge badgeContent={cart?.cartProducts?.length} color="error">
              <LocalGroceryStoreOutlined style={{ color: "black" }} />
            </Badge>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
