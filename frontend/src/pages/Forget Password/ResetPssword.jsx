import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./forgetPass.css";
import { useDispatch } from "react-redux";
import {
  createResetPassword,
  getResetPassword,
} from "../../redux/apiCalls/passApiCall";
import { useParams } from "react-router-dom";

const ResetPass = () => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { userId } = useParams();
  const { tokenId } = useParams();

  useEffect(() => {
    dispatch(getResetPassword(userId, tokenId));
  }, [dispatch, userId, tokenId]);

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("Password is required");
    if (confirmPassword.trim() === "") {
      return toast.error("You must Confirm Password");
    }
    if (confirmPassword !== password) {
      return toast.error("Password not matched");
    }
    dispatch(createResetPassword(userId, tokenId, { password }));
  };

  return (
    <div className="Forget-passwor">
      <h1 className="rest-pass-title">Reset Password</h1>
      <form onSubmit={formSubmitHandler} className="form-auth">
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
          Reset
        </button>
      </form>
    </div>
  );
};

export default ResetPass;
