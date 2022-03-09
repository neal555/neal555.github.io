import React from "react";
import "./components.css";

const Error = ({ onRetry }) => {
  return (
    <div className="error-container">
      <div className="error-title">🙁</div>
      <div className="error-message">{"Something went wrong"}</div>
      <button className="error-button" onClick={onRetry}>
        {"Try again"}
      </button>
    </div>
  );
};
export default Error;
