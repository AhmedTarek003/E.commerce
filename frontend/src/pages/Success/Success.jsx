import React from "react";
import "./success.css";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="success-page">
      <div className="success-title">Your order created successfully</div>
      <Link
        to={"/"}
        className="home-link"
        onClick={() => window.location.reload()}
      >
        Go to Home
      </Link>
    </div>
  );
};

export default SuccessPage;
