import { useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/apiCalls/authApiCall";

const Login = () => {
  const dispatch = useDispatch();
  const [visbility, setVisbility] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    dispatch(loginUser({ email, password }));
  };

  return (
    <section className="login-page">
      <div className="auth-container">
        <h1 className="auth-title">Login</h1>
        <form onSubmit={formSubmitHandler} className="form-auth">
          <div className="form-auth-group">
            <label className="form-auth-label">Email</label>
            <input
              type="email"
              placeholder="enter your email"
              className="form-auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-auth-group">
            <label className="form-auth-label">Password</label>
            {visbility ? (
              <>
                <input
                  type="text"
                  placeholder="enter your password"
                  className="form-auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="visbility-password"
                  onClick={() => setVisbility(!visbility)}
                >
                  <MdVisibilityOff />
                </div>
              </>
            ) : (
              <>
                <input
                  type="password"
                  placeholder="enter your password"
                  className="form-auth-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="visbility-password"
                  onClick={() => setVisbility(!visbility)}
                >
                  <MdVisibility />
                </div>
              </>
            )}
          </div>
          <button type="submit" className="form-Btn">
            Login
          </button>
        </form>
        <div className="need-help">
          <div className="ask-account">
            create account ? <Link to={"/register"}>register</Link>
          </div>
          <Link to={"/forget-password"} className="ask-password">
            forget your password?
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Login;
