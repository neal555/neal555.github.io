import React from "react";
import "./loading.css";

const Loading = () => {
  return (
    <div className="loading-container" data-testid={"loading-component"}>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
