import { useState } from "react";
import { toast } from "react-toastify";
import "./forgetPass.css";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../redux/apiCalls/passApiCall";

const ForgetPass = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("Email is required");
    dispatch(resetPassword({ email }));
  };

  return (
    <div className="Forget-passwor">
      <h1 className="rest-pass-title">Reset Password</h1>
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
        <button type="submit" className="form-Btn">
          Reset
        </button>
      </form>
    </div>
  );
};

export default ForgetPass;
