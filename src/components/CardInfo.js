import React from "react";

const CardInfo = ({ item }) => {
  return (
    <div className="card-info-container">
      <h2 className="card-info-flag">{item?.flag ?? "NO FALG"}</h2>
      <h2 className="card-info-name">{item?.name ?? "NO NAME"}</h2>
      <p>{`Dial code: ${item?.dialCode ?? "NO DIAL CODE"}`}</p>
      <p>{`Continent: ${item?.continent ?? "NO CONTINENT"}`}</p>
      <p>{`Currency code: ${item?.currencyCode ?? "NO CURRENCY CODE"}`}</p>
    </div>
  );
};
export default CardInfo;
