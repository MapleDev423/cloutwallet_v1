import { Style } from "./creatorCoins.styles";
import { useState } from "react";
import { CREATOR_DATA } from "./creatorCoins.data";
import CreatorCard from "../../../molecule/CreatorCard/creatorCard.component";

function CreatorCoins() {
  const [mode, setMode] = useState("value");

  function clickHandler() {
    if (mode === "value") {
      setMode("price");
    } else {
      setMode("value");
    }
  }

  return (
    <Style.Container>
      <div className="c-header">
        <h2>Creator Coins</h2>
        <div className="c-mode">
          <Style.Span onClick={clickHandler} active={mode === "value"}>
            Value
          </Style.Span>
          <Style.Span onClick={clickHandler} active={mode === "price"}>
            Price
          </Style.Span>
        </div>
      </div>
      <div className="c-c-cards">
        {CREATOR_DATA.map((card) => (
          <CreatorCard card={card} key={card.key} mode={mode} />
        ))}
      </div>
    </Style.Container>
  );
}

export default CreatorCoins;
