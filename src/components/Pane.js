import React from "react";
import "./components.css";

const Pane = ({ children }) => {
  return (
    <div className="pane-container">
      <div className="pane-content">{children}</div>
    </div>
  );
};

export default Pane;
