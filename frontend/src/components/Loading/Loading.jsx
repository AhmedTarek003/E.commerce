import React from "react";
import { RotatingLines } from "react-loader-spinner";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading">
      <RotatingLines
        strokeColor="white"
        strokeWidth="5"
        animationDuration="0.95"
        width="90"
        visible={true}
      />
    </div>
  );
};

export default Loading;
