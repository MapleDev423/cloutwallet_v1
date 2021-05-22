import React from "react";
import { Style } from "./tableHead.styles";

const TableHead = React.forwardRef((props, ref) => {
  return (
    <Style.Container>
      <th
        className="cc"
        onClick={() => {
          props.onTableSort("CreatorCoins");
        }}
      >
        <div>
          <span>Creator Coins</span>
          {props.sortArray.category == "CreatorCoins" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
      <th
        className="cc"
        onClick={() => {
          props.onTableSort("gainloss");
        }}
      >
        <div>
          <span>24hr Gain/Loss</span>
          {props.sortArray.category == "CreatorCoins" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
      <th
        className="cp"
        onClick={() => {
          props.onTableSort("CoinPrice");
        }}
      >
        <div>
          <span>Coin Price</span>
          {props.sortArray.category == "CoinPrice" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
      <th
        className="ch"
        onClick={() => {
          props.onTableSort("CoinsHeld");
        }}
      >
        <div>
          <span>Coins Held</span>
          {props.sortArray.category == "CoinsHeld" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
      <th
        className="mv"
        onClick={() => {
          props.onTableSort("MarketValue");
        }}
      >
        <div>
          <span>USD Value</span>
          {props.sortArray.category == "MarketValue" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
      <th
        className="sh"
        onClick={() => {
          props.onTableSort("SupplyHeld");
        }}
      >
        <div>
          <span>Supply Held</span>
          {props.sortArray.category == "SupplyHeld" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
      <th
        className="port"
        onClick={() => {
          props.onTableSort("MarketValue");
        }}
      >
        <div>
          <span>Portfolio %</span>
          {props.sortArray.category == "MarketValue" && (
            <img
              width={10}
              height={10}
              src={`/${props.sortArray.ascending}_arrow.png`}
            />
          )}
        </div>
      </th>
    </Style.Container>
  );
});

export default TableHead;
