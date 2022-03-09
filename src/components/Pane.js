import React from "react";
import "./components.css";

const Pane = ({ children, title }) => {
  return (
    <div className="pane-container">
      {title}
      <div className="pane-content">{children}</div>
    </div>
  );
};

export default Pane;
