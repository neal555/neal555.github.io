import React from "react";
import { resizeString } from "../utils/strings";

const HistoryItem = (props) => {
  return (
    <div className="history-container" onClick={props.onClick}>
      <div className="history-content">
        <div className="history-flag">{props?.flag ?? "NO FLAG"}</div>
        <div className="history-name">
          {resizeString(props?.name ?? "NO_NAME")}{" "}
        </div>
      </div>
      <div className="history-counter">{props?.count ?? 1}</div>
    </div>
  );
};

export default HistoryItem;
