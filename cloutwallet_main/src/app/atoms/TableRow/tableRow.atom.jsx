import React from "react";
import { Style } from "./tableRow.styles";
import Label from "../Label/label.atom";

function TableRow(
  {
    username,
    profilePicture,
    unitPrice,
    percentageChanges,
    coinHeld,
    marketValue,
    supplyHeld,
    portfolio,
    onClickHandler,
  },
  ref
) {
  const getColorClass = (num) => {
    return num > 0 ? "up" : num == 0 ? "normal" : "down";
  };
  return (
    <Style.Container
      onClick={() => {
        onClickHandler(
          username,
          coinHeld,
          profilePicture,
          marketValue,
          portfolio,
          percentageChanges,
          supplyHeld
        );
      }}
    >
      <th className="profile-data">
        <div className="first">
          <img src={profilePicture} className="image" alt="Creator Picture" />
          <span> {username} </span>
        </div>
      </th>
      <th>
        <span className={getColorClass(percentageChanges)}>
          {percentageChanges}%
        </span>
      </th>
      <th>{unitPrice}</th>
      <th>{coinHeld}</th>
      <th>{marketValue}</th>
      <th>{supplyHeld}</th>
      <th>{portfolio}</th>
    </Style.Container>
  );
}

export default TableRow;
