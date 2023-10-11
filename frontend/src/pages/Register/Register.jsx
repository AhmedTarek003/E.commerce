import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerUser } from "../../redux/apiCalls/authApiCall";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { registerMsg } = useSelector((state) => state.auth);

  useEffect(() => {
    if (registerMsg) {
      navigate("/login");
    }
  }, [registerMsg, navigate]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("Name is required");
    if (email.trim() === "") return toast.error("Email is required");
    if (password.trim() === "") return toast.error("Password is required");
    if (confirmPassword.trim() === "") {
      return toast.error("You must Confirm Password");
    }
    if (confirmPassword !== password) {
      return toast.error("Password not matched");
    }
    dispatch(registerUser({ name, email, password }));
  };

  return (
    <section className="register-page">
      <div className="auth-container">
        <h1 className="auth-title">Register</h1>
        <form onSubmit={formSubmitHandler} className="form-auth">
          <div className="form-auth-group">
            <label className="form-auth-label">Name</label>
            <input
              type="text"
              placeholder="enter your name"
              className="form-auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <input
              type="password"
              placeholder="enter your password"
              className="form-auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-auth-group">
            <label className="form-auth-label">Confirm Password</label>
            <input
              type="password"
              placeholder="confirm password"
              className="form-auth-input"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="form-Btn">
            Register
          </button>
        </form>
        <div className="need-help">
          <div className="ask-account">
            have an account ? <Link to={"/login"}>Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
