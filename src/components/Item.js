import React from "react";
import { resizeString } from "../utils/strings";
import "./components.css";

const Item = (props) => {
  return (
    <div
      className="item-container"
      onClick={props.onClick}
      data-testid={"country-item"}
    >
      <div className="item-flag">{props?.flag ?? "NO FLAG"}</div>
      <div className="item-name">{resizeString(props?.name ?? "NO_NAME")} </div>
    </div>
  );
};

export default Item;
