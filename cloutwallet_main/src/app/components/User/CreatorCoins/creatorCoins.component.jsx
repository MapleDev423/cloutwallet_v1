import { Style } from "./creatorCoins.styles";
import { useEffect, useState } from "react";
import CreatorCard from "../../../molecule/CreatorCard/creatorCard.component";

function CreatorCoins({ data, bitCloutPrice }) {
  const [mode, setMode] = useState("price");
  const [stateArray, setStateArray] = useState([]);

  function sortData() {
    if (data) {
      if (mode == "price") {
        return setStateArray(
          data.data.holdings
            .slice()
            .sort((a, b) =>
              a.BalanceNanos * a.ProfileEntryResponse.CoinPriceBitCloutNanos <
              b.BalanceNanos * b.ProfileEntryResponse.CoinPriceBitCloutNanos
                ? 1
                : -1
            )
        );
      } else if (mode == "value") {
        return setStateArray(
          data.data.holdings
            .slice()
            .sort((a, b) => (a.BalanceNanos < b.BalanceNanos ? 1 : -1))
        );
      }
    } else {
      return null;
    }
  }

  useEffect(() => {
    sortData();
  }, [data, mode, setMode]);

  useEffect(() => {
    sortData();
  }, [data]);

  function clickHandler(str) {
    if (str !== mode) {
      if (mode === "value") {
        setMode("price");
      } else {
        setMode("value");
      }
    }
  }

  return (
    <Style.Container>
      <div className="c-header">
        <h2>Creator Coins</h2>
        <div className="c-mode">
          <Style.Span
            onClick={() => clickHandler("price")}
            active={mode === "price"}
          >
            USD Value
          </Style.Span>
          <Style.Span
            onClick={() => clickHandler("value")}
            active={mode === "value"}
          >
            Coins
          </Style.Span>
        </div>
      </div>
      <div className="c-c-cards">
        {data
          ? stateArray.map((card) => (
              <CreatorCard
                bitCloutPrice={bitCloutPrice}
                card={card}
                key={card.CreatorPublicKeyBase58Check}
                mode={mode}
              />
            ))
          : "loading..."}
      </div>
    </Style.Container>
  );
}

export default CreatorCoins;
