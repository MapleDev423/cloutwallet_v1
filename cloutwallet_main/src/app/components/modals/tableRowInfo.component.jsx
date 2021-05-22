import React from "react";
import { Style } from "./tableRowInfo.styles";
import LineGraph from "./chart.component";

function TableRowInfo({
  username,
  coinHeld,
  userimage,
  marketValue,
  portfolio,
  gainloss,
  supplyHeld,
}) {
  const closeModal = () => {
    document.getElementById("modal").style.visibility = "hidden";
    document.getElementById("modal").style.opacity = 0;
  };
  return (
    <Style.Container id="modal">
      <div className="modal_container">
        <div className="user_info" onClick={closeModal}>
          <div className="close_icon">X</div>
          <img src={userimage} alt="userimage" />
          <p className="username">@{username}</p>
          <p className="coins_held">Coins Held: {coinHeld}</p>
        </div>

        <div className="graph_container">
          <LineGraph username={username} />
        </div>
        <div className="other_info">
          <p>Portfolio: {portfolio}</p>
          <p>Gain/Loss: {gainloss}</p>
          <p>Supply Held: {supplyHeld}</p>
          <p>Market Value: {marketValue}</p>
        </div>
      </div>
    </Style.Container>
  );
}

export default TableRowInfo;
